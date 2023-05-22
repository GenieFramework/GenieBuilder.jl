module ApplicationsController

import GenieBuilder

using GenieBuilder.Applications
using SearchLight
using Genie
using Genie.Renderers.Json
using Genie.Requests
using HTTP
using JSON3
using GenieDevTools
using Genie.WebChannels
using Dates
using Scratch
using ZipFile
using GenieBuilder.Integrations

const appsthreads = Dict()
const apphost = "http://127.0.0.1"

const FAILSTATUS = "KO"
const OKSTATUS = "OK"

const CREATING_STATUS = "creating"
const STARTED_STATUS  = "started"
const STARTING_STATUS = "starting"
const ONLINE_STATUS   = "online"
const STOPPING_STATUS = "stopping"
const OFFLINE_STATUS  = "offline"
const DELETING_STATUS = "deleting"
const DELETED_STATUS  = "deleted"
const ERROR_STATUS    = "error"

const UNDEFINED_PORT = 0
MODIFIED_APP_NAME_PATTERN = r"^([0-9a-zA-Z]+)\d{8}T\d{4}$"

const UUIDSTORE_FILENAME = "uuidstore.txt"
const GB_SCRATCH_SPACE_NAME = "gbuuid"
const DEFAULT_PORT_RANGE = 9101:9200
const PORTS_RANGE = try
  if haskey(ENV, "APPS_PORT_START_RANGE") && haskey(ENV, "APPS_PORT_END_RANGE")
    parse(Int, ENV["APPS_PORT_START_RANGE"]):parse(Int, ENV["APPS_PORT_END_RANGE"])
  else
    DEFAULT_PORT_RANGE
  end
catch ex
  @error ex
  DEFAULT_PORT_RANGE
end

struct UnavailablePortException <: Exception
  msg::String
end

Base.showerror(io::IO, e::UnavailablePortException) = print(io, e.msg, " \nplease free Ports to create GenieBuilder App")

fullpath(app::Application) = abspath(app.path * app.name)
get(appid) = ApplicationsController.get(parse(Int, appid))
get(appid::SearchLight.DbId) = ApplicationsController.get(appid.value)
get(appid::Int) = SearchLight.findone(Application, id = appid)

function notify(message::String,
                appid::Union{SearchLight.DbId,Nothing} = nothing,
                status::String = OKSTATUS,
                type::String = "info",
                eventid::String = params(:eventid, "0")) :: Bool
  try
    Genie.WebChannels.unsubscribe_disconnected_clients()
  catch ex
    @error ex
  end

  try
    appid !== nothing && type == ERROR_STATUS && persist_status(SearchLight.findone(Application, id = appid.value), ERROR_STATUS)
  catch ex
    @error ex
  end

  try
    Genie.WebChannels.broadcast(
      Dict(
        :message    => message,
        :appid      => isnothing(appid) ? 0 : appid.value,
        :status     => status,
        :type       => type,
        :eventid    => eventid,
        :timestamp  => Dates.now()
      ) |> JSON3.write
    )
    @debug "Notification from app id $appid : $message"
  catch ex
    @error ex
  end

  true
end

function valid_appname(name::String)
  filter(! isempty, [x.match for x in collect(eachmatch(r"[0-9a-zA-Z]*", name))]) |> join
end

function apps()
  (:applications => all(Application)) |> json
end

function info(app)
  (:application => app) |> json
end

function postcreate(path) :: Nothing
  current_path = pwd()
  cd(path)

  GenieBuilder.Generators.app()
  GenieBuilder.Generators.view()

  cd(current_path)

  nothing
end

function run_as_genie_app(filepath::String)
  isfile(filepath) || error("File not found: $filepath")
  app = findone(Application; filepath)
  app !== nothing && return start(app)

  name = valid_appname(dir(filepath) * "-" * basename(filepath))
  create(name, filepath)
end


function setup_new_app(new_app_path::String, app::Application)
  try
    isdir(new_app_path) || mkdir(new_app_path)
    cmd = Cmd(`julia --startup-file=no -e '
                using Pkg;
                Pkg._auto_gc_enabled[] = false;
                Pkg.activate(".");
                Pkg.add("GenieFramework");
    '`; dir = new_app_path)
    cmd |> run
  catch ex
    @error ex
    isdir(new_app_path) && rm(new_app_path)
    delete(app)
    rethrow(ex)
  end

  try
    postcreate(new_app_path)
  catch ex
    @error ex
    rethrow(ex)
  end
end


function create(name, path = "", port = UNDEFINED_PORT; source = nothing)
  name = valid_appname(name) |> lowercase
  isempty(path) && (path = GenieBuilder.APPS_FOLDER[])
  endswith(path, "/") || (path = "$path/")
  port, replport = available_port()
  app = Application(; name, path, port, replport)
  app.status = CREATING_STATUS

  try
    app = save!(app)
  catch ex
    @error(ex)
    notify("failed:create_app", nothing, FAILSTATUS, ERROR_STATUS)
    return (:error => ex)
  end

  current_path = pwd()
  output = (:application => app)

  try
    notify("started:create_app")
    isdir(path) || mkdir(path)
    cd(path)

    new_app_path = joinpath(path, name)

    if source !== nothing && isfile(source)
      try
        unzip(source, new_app_path)
      catch ex
        @error ex
        error("Failed to unzip $source to $new_app_path")
      end
    end

    if isdir(new_app_path) && ! isempty(readdir(new_app_path))
      @warn("$new_app_path is not empty -- importing app instead")
      persist_status(app, OFFLINE_STATUS)
      notify("ended:import_app", app.id)
      notify("ended:create_app", app.id)

      return output |> json
    end

    Base.Threads.@spawn begin
      setup_new_app(new_app_path, app)

      persist_status(app, OFFLINE_STATUS)
      notify("ended:create_app", app.id)
    end
  catch ex
    @error ex
    notify("failed:create_app", app.id, FAILSTATUS, ERROR_STATUS)
    output = (:error => ex)
  finally
    cd(current_path)
  end

  output |> json
end

function persist_status(app::Union{Application,Nothing}, status) :: Bool
  app === nothing && return false

  app.status = string(status)

  try
    save!(app)
  catch ex
    @error ex
    return false
  end

  try
    @async Integrations.GenieCloud.updateapp(app)
  catch ex
    @error ex
  end

  true
end

function status_request(app, donotify::Bool = true; statuscheck::Bool = false, persist::Bool = true) :: String
  params(:statuscheck, statuscheck) || return app.status

  status = try
    donotify && notify("started:status_request", app.id)
    res = HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/id")
    if res.status >= 500
      ERROR_STATUS
    elseif res.status == 404
      OFFLINE_STATUS
    elseif res.status == 200
      ONLINE_STATUS
    end
  catch ex
    if isa(ex, HTTP.Exceptions.ConnectError)
      OFFLINE_STATUS
    else
      donotify && notify("failed:status_request", app.id)
      ERROR_STATUS
    end
  end

  donotify && notify("ended:status_request", app.id)
  persist && persist_status(app, status)

  status |> string
end
const status_request! = status_request # alias to express invocation for side effects

function status(app)
  notify("started:status", app.id)
  status = status_request(app; statuscheck = true)

  notify("ended:status:$status", app.id)
  (:status => status) |> json
end

function isdeleted(app)
  app.status == DELETED_STATUS
end

function watch(path, appid)
  app = try
    ApplicationsController.get(appid.value)
  catch ex
    @error ex
  end

  Genie.config.watch_handlers["$(appid.value)"] = [
    () -> begin
            try
              HTTP.request("GET", "$(apphost):$(app.port)")
            catch ex
              @error ex
            end
          end
    () -> ApplicationsController.notify("changed:files", appid)
  ]

  Genie.Watch.watchpath(path)
  @async Genie.Watch.watch()
end

function unwatch(path, appid)
  delete!(Genie.config.watch_handlers, appid.value)
  Genie.Watch.unwatch(path)
end

function start(app)
  if isdeleted(app)
    notify("failed:start", app.id, FAILSTATUS, DELETED_STATUS)
    return (:status => DELETED_STATUS) |> json
  end

  status_request!(app)

  try
    persist_status(app, STARTING_STATUS)
    notify("started:start", app.id)

    appsthreads[fullpath(app)] = Base.Threads.@spawn begin
      try
        cmd = Cmd(`julia --startup-file=no -e '
                                                using Pkg;
                                                Pkg._auto_gc_enabled[] = false;
                                                Pkg.activate(".");
                                                using GenieFramework;
                                                using GenieFramework.Genie;
                                                Core.eval(Main, :(const UserApp = $(@__MODULE__)))
                                                Genie.genie(context = @__MODULE__);
                                                up(async = false);
                  '`; dir = fullpath(app), detach = false)
        cmd = addenv(cmd, "PORT" => app.port,
                          "WSPORT" => app.port,
                          "WSEXPPORT" => app.port,
                          "GENIE_ENV" => "dev",
                          "GENIE_BANNER" => "false")

        # in the cloud the :<port> becomes /<path>
        haskey(ENV, "GB_SOURCE") && ENV["GB_SOURCE"] == "cloud" && (cmd = addenv(cmd, "BASEPATH" => "/$(app.port)"))

        cmd |> run
      catch ex
        @error ex
        notify("failed:start", app.id, FAILSTATUS, ERROR_STATUS)
      end
    end

    @async begin
      while status_request(app, false; statuscheck = true, persist = false) in [STARTING_STATUS, OFFLINE_STATUS]
        sleep(1)
      end

      notify("ended:start", app.id)
      persist_status(app, ONLINE_STATUS)
      watch(fullpath(app), app.id)
    end
  catch ex
    @error ex
    notify("failed:start", app.id, FAILSTATUS, ERROR_STATUS)
  end

  (:status => OKSTATUS) |> json
end

function stop(app)
  status = OKSTATUS

  try
    persist_status(app, STOPPING_STATUS)
    notify("started:stop", app.id)

    @async HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/exit")

    sleep(1)

    if status_request(app, false; statuscheck = true) == OFFLINE_STATUS
      notify("ended:stop", app.id)
      persist_status(app, OFFLINE_STATUS)
    end
  catch ex
    @error ex
    notify("failed:stop", app.id, FAILSTATUS, ERROR_STATUS)

    status = ERROR_STATUS
  end

  if haskey(appsthreads, fullpath(app))
    try
      Base.throwto(appsthreads[fullpath(app)], InterruptException())
    catch ex
      @debug ex
    end

    delete!(appsthreads, fullpath(app))
  end

  unwatch(fullpath(app), app.id)

  (:status => status) |> json
end

function up(app)
  appstatus = status_request(app)
  appstatus != OFFLINE_STATUS && notify("failed:up:$appstatus", app.id, FAILSTATUS, ERROR_STATUS) && return (:status => appstatus) |> json

  res = try
    persist_status(app, STARTING_STATUS)
    notify("started:up", app.id)

    HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/up")
  catch ex
    @error ex
    notify("failed:up", app.id, FAILSTATUS, ERROR_STATUS)
  end

  persist_status(app, ONLINE_STATUS)
  notify("ended:up", app.id)

  String(res.body) |> JSON3.read |> json
end

macro isonline(app)
  quote
    appstatus = status_request($(esc(app)))
    appstatus != ONLINE_STATUS && return json(:status => appstatus)

    true
  end
end

function split_app_name(appname)
  matches = match(MODIFIED_APP_NAME_PATTERN, appname)
  if matches === nothing
      error("Invalid app name!")
  else
      return matches.captures[1]
  end
end

function move_to_folder(app, from_folder, to_folder)
  app_path = joinpath(from_folder, app.name)

  app_new_name = if match(MODIFIED_APP_NAME_PATTERN, app.name) !== nothing
    isdir(joinpath(to_folder, split_app_name(app.name))) ? app.name : split_app_name(app.name)
  else
    app.name * Dates.format(now(), "yyyymmddTHHMM")
  end

  try
    modify_app_fields(app, Dict("name" => app_new_name, "path" => joinpath(to_folder, "")))
    mv(app_path, joinpath(to_folder, app_new_name))
  catch err
    open(joinpath(app_path, ".trashme"), "w") do io
      write(io, app_new_name)
    end
    @error err
  end

  mv(app_path, joinpath(to_folder, app_new_name))
  modify_app_fields(app, Dict("name" => app_new_name, "path" => joinpath(to_folder, "")))
end

function modify_app_fields(app, fields)
  try
    SearchLight.updatewith!(app, fields)
    save!(app)
  catch err
    @error err
  end
end

function delete(app)
  notify("started:delete", app.id)
  stop(app)

  persist_status(app, DELETED_STATUS)
  notify("ended:delete", app.id)

  move_to_folder(app, GenieBuilder.APPS_FOLDER[], GenieBuilder.TRASH_FOLDER[])

  (:status => OKSTATUS) |> json
end

function restore(app)
  notify("started:restore", app.id)

  status = if app.status == DELETED_STATUS
    persist_status(app, OFFLINE_STATUS) ? notify("ended:restore", app.id) : notify("failed:restore", app.id)
    OKSTATUS
    move_to_folder(app, GenieBuilder.TRASH_FOLDER[], GenieBuilder.APPS_FOLDER[])
  else
    notify("failed:restore", app.id)
    FAILSTATUS
  end

  (:status => status) |> json
end

function purge(app)
  notify("started:purge", app.id)

  status = if app.status == DELETED_STATUS
    SearchLight.delete(app)

    try
      rm(fullpath(app); recursive = true)
      notify("ended:purge", app.id)
      OKSTATUS
    catch ex
      notify("failed:purge", app.id)
      FAILSTATUS
    end
  else
    notify("failed:purge", app.id)
    FAILSTATUS
  end

  (:status => status) |> json
end

function download(app)
  app_path = fullpath(app)
  appname = basename(app_path)
  zip_temp_path = Base.tempdir()
  w = ZipFile.Writer(joinpath(zip_temp_path, "$appname.zip"))
  compress = true

  try
    for (root, dirs, files) in walkdir(app_path)
      for file in files
        filepath = joinpath(root, file)
        f = open(filepath, "r")
        content = read(f, String)
        close(f)
        zipfilepath = joinpath(appname, split(filepath, "$appname/")[2])
        zf = ZipFile.addfile(w, zipfilepath; method=(compress ? ZipFile.Deflate : ZipFile.Store))
        write(zf, content)
      end
    end
    close(w)
  catch ex
    @error "failed to write zip file: ", ex
  finally
    close(w)
  end

  Genie.Router.download("$appname.zip", root = zip_temp_path)
end

function unzip(file, exdir = "")
  file = isabspath(file) ?  file : joinpath(pwd(), file)
  out_path = (isempty(exdir) ? dirname(file) : (isabspath(exdir) ? exdir : joinpath(pwd(), exdir)))
  isdir(out_path) ? "" : mkdir(out_path)
  zarchive = ZipFile.Reader(file)
  for f in zarchive.files
    try
      full_file_path = joinpath(out_path, f.name)
      if (endswith(f.name,"/") || endswith(f.name,"\\"))
        mkdir(full_file_path)
      else
        write(full_file_path, read(f))
      end
    catch ex
      @error "failed to unzip file: ", ex
    end
  end

  close(zarchive)

  nothing
end

function uuid()
  uuidstore_filepath = joinpath(@get_scratch!(GB_SCRATCH_SPACE_NAME), UUIDSTORE_FILENAME)

  if !isfile(uuidstore_filepath)
    touch(uuidstore_filepath)
    uuid = Genie.Secrets.secret_token()[end-11:end]

    try
      open(uuidstore_filepath, "w") do io
        write(io, uuid)
      end
    catch ex
      @error "filed to write secret to $uuidstore_filepath", ex
    end

    (:uuid => uuid) |> json
  else
    try
      open(uuidstore_filepath, "r") do io
        return (:uuid => readline(io)) |> json
      end
    catch ex
      @error "failed to Read from $uuidstore_filepath scratchspace", ex
    end

    (:uuid => Genie.Secrets.secret_token()[end-11:end]) |> json
  end
end

function json2json(res)
  String(res.body) |> JSON3.read |> json
end

function down(app)
  if @isonline(app)
    res = try
      persist_status(app, STOPPING_STATUS)
      notify("started:down", app.id)

      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/down")
    catch ex
      @error ex
      notify("failed:down", app.id, FAILSTATUS, ERROR_STATUS)
    end

    persist_status(app, OFFLINE_STATUS)
    notify("ended:down", app.id)

    res |> json2json
  end
end

function dir(app)
  if @isonline(app)
    res = try
      notify("started:dir", app.id)

      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/dir?path=$(params(:path, "."))")
    catch ex
      @error ex
      notify("failed:dir", app.id, FAILSTATUS, ERROR_STATUS)
    end

    notify("ended:dir", app.id)

    res |> json2json
  end
end

function edit(app)
  if @isonline(app)
    res = try
      notify("started:edit", app.id)

      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/edit?path=$(params(:path, "."))")
    catch ex
      @error ex
      notify("failed:edit", app.id, FAILSTATUS, ERROR_STATUS)
    end

    notify("ended:edit", app.id)

    res |> json2json
  end
end

function save(app)
  if @isonline(app)
    res = try
      notify("started:save", app.id)

      HTTP.request( "POST",
                    "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/save?path=$(params(:path, "."))",
                      [], HTTP.Form(Dict("payload" => jsonpayload()["payload"])))
    catch ex
      @error ex
      notify("failed:save", app.id, FAILSTATUS, ERROR_STATUS)
    end

    notify("ended:save", app.id)

    res |> json2json
  end
end

function pages(app)
  if @isonline(app)
    res = try
      notify("started:pages", app.id)

      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/pages?CHANNEL__=$(app.channel)") |> json2json
    catch ex
      @error ex
      notify("failed:pages", app.id, FAILSTATUS, ERROR_STATUS)

      (:status => :error) |> json
    end

    notify("ended:pages", app.id)

    res
  end
end

function available_port()
  apps = SearchLight.find(Application)
  isempty(apps) && return (first(PORTS_RANGE), first(PORTS_RANGE)+1)
  usedports = [app.port for app in apps] |> sort!

  available_port = 0
  p = first(PORTS_RANGE)
  while p < last(PORTS_RANGE)
    if p ∉ usedports && p+1 ∉ usedports
      available_port = p
      break
    end
    p += 2
  end

  available_port == UNDEFINED_PORT && throw(UnavailablePortException("$(PORTS_RANGE) ports are all in use"))
  return (available_port, available_port + 1)
end

function startrepl(app)
  if @isonline(app)
    res = try
      notify("started:startrepl", app.id)

      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/startrepl?port=$(app.replport != 0 ? app.replport : available_port())")
    catch ex
      @error ex
      notify("failed:startrepl", app.id, FAILSTATUS, ERROR_STATUS)
    end

    status = try
      status = String(res.body) |> JSON3.read
      if status.status == OKSTATUS
        app.replport = status.port
        save!(app)
      end

      status
    catch ex
      @error ex
    end

    notify("ended:startrepl", app.id)

    status |> json
  end
end

function cleanup()
  for app in find(Application, status = ONLINE_STATUS)
    stop(app)
  end
end

function reset_app_status()
  for app in find(Application)
    app.status == DELETED_STATUS && continue

    app.status = OFFLINE_STATUS
    try
      save!(app)
    catch ex
      @error ex
    end
  end
end

function subscribe()
  try
    Genie.WebChannels.subscribe(params(:WS_CLIENT), "geniebuilder")
    (:status => OKSTATUS) |> JSON3.write
  catch ex
    Dict(
      :status => FAILSTATUS,
      :error => ex
    ) |> JSON3.write
  end
end

function unsubscribe()
  try
    Genie.WebChannels.unsubscribe(params(:WS_CLIENT), "geniebuilder")
    (:status => OKSTATUS) |> JSON3.write
  catch ex
    Dict(
      :status => FAILSTATUS,
      :error => ex
    ) |> JSON3.write
  end
end

function import_apps() :: Nothing
  isdir(GenieBuilder.APPS_FOLDER[]) || begin
    @error "APPS_FOLDER not found: $(GenieBuilder.APPS_FOLDER[])"
    return
  end

  for existing_app in readdir(GenieBuilder.APPS_FOLDER[])
    ! isdir(joinpath(GenieBuilder.APPS_FOLDER[], existing_app)) && continue
    startswith(existing_app, ".") && continue

    appname = valid_appname(existing_app)
    if isempty(find(Application, name = appname))
      appname != existing_app && mv(joinpath(GenieBuilder.APPS_FOLDER[], existing_app), joinpath(GenieBuilder.APPS_FOLDER[], appname))
      create(appname)
    end
  end

  nothing
end

function ready() :: Nothing
  @info "GenieBuilder ready! RUN_STATUS = $(GenieBuilder.RUN_STATUS[])"

  notify("ended:gbstart", nothing)

  (@async import_apps()) |> errormonitor
  (@async Integrations.GenieCloud.init()) |> errormonitor

  nothing
end

function status()
  (:status => OKSTATUS) |> json
end

end
