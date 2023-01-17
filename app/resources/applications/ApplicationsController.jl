module ApplicationsController

import GenieBuilder

using GenieBuilder.Applications
using SearchLight
using Genie
using Genie.Router
using Genie.Renderers.Json
using Genie.Requests
using HTTP
using JSON3
using GenieDevTools
using Genie.WebChannels
using Dates
using DotEnv
using Scratch

const appsthreads = Dict()
const apphost = "http://127.0.0.1"

const APP_STATE = Dict(
  :FAIL => "KO",
  :OK => "OK",
  :DELETED => "deleted",
  :OFFLINE => "offline",
  :ONLINE => "online",
  :ERROR => "error",
  :STARTING => "starting",
  :STOPPING => "stopping")

const UNDEFINED_PORT = 0
const UUIDSTORE_FILENAME = "uuidstore.txt"
const GB_SCRATCH_SPACE_NAME = "gbuuid"

DotEnv.config()
const PORTS_RANGE = parse(Int, ENV["APPS_PORT_START_RANGE"]):parse(Int, ENV["APPS_PORT_END_RANGE"])

struct UnavailablePortException <: Exception
  msg::String
end

Base.showerror(io::IO, e::UnavailablePortException) = print(io, e.msg, " \nplease free Ports to create GenieBuilder App")

fullpath(app::Application) = abspath(app.path * app.name)
get(appid) = SearchLight.findone(Application, id = parse(Int, appid))

function notify(message::String,
                appid::Union{SearchLight.DbId,Nothing} = nothing,
                status::String = APP_STATE[:OK],
                type::String = "info",
                eventid::String = params(:eventid, "0")) :: Bool
  try
    Genie.WebChannels.unsubscribe_disconnected_clients()
  catch ex
    @error ex
  end

  try
    appid !== nothing && type == APP_STATE[:ERROR] && persist_status(SearchLight.findone(Application, id = appid.value), APP_STATE[:ERROR])
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

  name = Genie.Generator.validname(dir(filepath) * "-" * basename(filepath))
  create(name, filepath)
end

function create(name, path = "", port = UNDEFINED_PORT)
  name = Genie.Generator.validname(name)
  isempty(path) && (path = GenieBuilder.APPS_FOLDER[])
  endswith(path, "/") || (path = "$path/")
  port, replport = available_port()
  app = Application(; name, path, port=port, replport=replport)
  persist_status(app, :creating)

  try
    app = save!(app)
  catch ex
    @error(ex)
    notify("failed:create_app", nothing, APP_STATE[:FAIL], APP_STATE[:ERROR])
    return (:error => ex)
  end

  current_path = pwd()
  output = (:application => app)

  try
    notify("started:create_app")
    isdir(path) || mkdir(path)
    cd(path)

    new_app_path = joinpath(path, name)
    if isdir(new_app_path) && ! isempty(readdir(new_app_path))
      @warn("$new_app_path is not empty -- importing app instead")
      persist_status(app, APP_STATE[:OFFLINE])
      notify("ended:import_app", app.id)
      notify("ended:create_app", app.id)

      return output |> json
    end

    Base.Threads.@spawn begin
      try
        isdir(new_app_path) || mkdir(new_app_path)
        cmd = Cmd(`julia --startup-file=no -e '
                    using Pkg;
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

      persist_status(app, APP_STATE[:OFFLINE])
      notify("ended:create_app", app.id)
    end
  catch ex
    @error ex
    notify("failed:create_app", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])
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
    false
  end

  true
end

function status_request(app, donotify::Bool = true; statuscheck::Bool = false, persist::Bool = true) :: String
  params(:statuscheck, statuscheck) || return app.status

  status = try
    donotify && notify("started:status_request", app.id)
    res = HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/id")
    if res.status >= 500
      APP_STATE[:ERROR]
    elseif res.status == 404
      APP_STATE[:OFFLINE]
    elseif res.status == 200
      APP_STATE[:ONLINE]
    end
  catch ex
    if isa(ex, HTTP.Exceptions.ConnectError)
      APP_STATE[:OFFLINE]
    else
      donotify && notify("failed:status_request", app.id)
      APP_STATE[:ERROR]
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
  app.status == APP_STATE[:DELETED]
end

#TODO: READ ABOUT WATCH
function watch(path, appid)
  Genie.config.watch_handlers["$(appid.value)"] = [()->ApplicationsController.notify("changed:files", appid)]
  Genie.Watch.watchpath(path)
  @async Genie.Watch.watch()
end

function unwatch(path, appid)
  delete!(Genie.config.watch_handlers, appid.value)
  Genie.Watch.unwatch(path)
end

function start(app)
  if isdeleted(app)
    notify("failed:start", app.id, APP_STATE[:FAIL], APP_STATE[:DELETED])
    return (:status => APP_STATE[:DELETED]) |> json
  end

  status_request!(app)

  try
    persist_status(app, APP_STATE[:STARTING])
    notify("started:start", app.id)

    appsthreads[fullpath(app)] = Base.Threads.@spawn begin
      try
        cmd = Cmd(`julia --startup-file=no -e '
                                                using Pkg;
                                                Pkg.activate(".");
                                                using GenieFramework;
                                                using GenieFramework.Genie;
                                                Core.eval(Main, :(const UserApp = $(@__MODULE__)))
                                                Genie.genie(context = @__MODULE__);
                                                up(async = false);
                  '`; dir = fullpath(app), detach = false)
        #FIXME: CLEANUP AND USE GENIE ENV VARIABLES
        cmd = addenv(cmd, "PORT" => app.port,
                          "WSPORT" => app.port,
                          "WSEXPPORT" => app.port,
                          "GENIE_ENV" => "dev",
                          "GENIE_BANNER" => "false")
        cmd |> run
      catch ex
        @error ex
        notify("failed:start", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])
      end
    end

    @async begin
      while status_request(app, false; statuscheck = true, persist = false) in [APP_STATE[:STARTING], APP_STATE[:OFFLINE]]
        sleep(1)
      end

      notify("ended:start", app.id)
      persist_status(app, APP_STATE[:ONLINE])
      watch(fullpath(app), app.id)
    end
  catch ex
    @error ex
    notify("failed:start", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])
  end

  (:status => APP_STATE[:OK]) |> json
end

function stop(app)
  status = APP_STATE[:OK]

  try
    persist_status(app, APP_STATE[:STOPPING])
    notify("started:stop", app.id)

    @async HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/exit")

    sleep(1)

    if status_request(app, false; statuscheck = true) == APP_STATE[:ONLINE]
      notify("ended:stop", app.id)
      persist_status(app, APP_STATE[:OFFLINE])
    end
  catch ex
    @error ex
    notify("failed:stop", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])

    status = APP_STATE[:ERROR]
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
  appstatus != APP_STATE[:OFFLINE] && notify("failed:up:$appstatus", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR]) && return (:status => appstatus) |> json

  res = try
    persist_status(app, APP_STATE[:STARTING])
    notify("started:up", app.id)

    HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/up")
  catch ex
    @error ex
    notify("failed:up", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])
  end

  persist_status(app, APP_STATE[:ONLINE])
  notify("ended:up", app.id)

  String(res.body) |> JSON3.read |> json
end

macro isonline(app)
  quote
    appstatus = status_request($(esc(app)))
    appstatus != APP_STATE[:ONLINE] && return json(:status => appstatus)

    true
  end
end

function delete(app)
  notify("started:delete", app.id)
  stop(app)

  persist_status(app, APP_STATE[:DELETED])
  notify("ended:delete", app.id)

  (:status => APP_STATE[:OK]) |> json
end

function restore(app)
  notify("started:restore", app.id)

  status = if app.status == APP_STATE[:DELETED]
    persist_status(app, APP_STATE[:OFFLINE]) ? notify("ended:restore", app.id) : notify("failed:restore", app.id)
    APP_STATE[:OK]
  else
    notify("failed:restore", app.id)
    APP_STATE[:FAIL]
  end

  (:status => status) |> json
end

function purge(app)
  notify("started:purge", app.id)

  status = if app.status == APP_STATE[:DELETED]
    SearchLight.delete(app)

    try
      rm(fullpath(app); recursive = true)
      notify("ended:purge", app.id)
      APP_STATE[:OK]
    catch ex
      notify("failed:purge", app.id)
      APP_STATE[:FAIL]
    end
  else
    notify("failed:purge", app.id)
    APP_STATE[:FAIL]
  end

  (:status => status) |> json
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
      persist_status(app, APP_STATE[:STOPPING])
      notify("started:down", app.id)

      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/down")
    catch ex
      @error ex
      notify("failed:down", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])
    end

    persist_status(app, APP_STATE[:OFFLINE])
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
      notify("failed:dir", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])
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
      notify("failed:edit", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])
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
      notify("failed:save", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])
    end

    notify("ended:save", app.id)

    res |> json2json
  end
end

function pages(app)
  if @isonline(app)
    res = try
      notify("started:pages", app.id)

      #TODO: READ CHANNELS
      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/pages?CHANNEL__=$(app.channel)") |> json2json
    catch ex
      @error ex
      notify("failed:pages", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])

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
      notify("failed:startrepl", app.id, APP_STATE[:FAIL], APP_STATE[:ERROR])
    end

    status = try
      status = String(res.body) |> JSON3.read
      if status.status == APP_STATE[:OK]
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
  for app in find(Application, status = APP_STATE[:ONLINE])
    stop(app)
  end
end

function reset_app_status()
  for app in find(Application)
    app.status == APP_STATE[:DELETED] && continue

    app.status = APP_STATE[:OFFLINE]
    try
      save!(app)
    catch ex
      @error ex
    end
  end
end

#TODO: READ SUBSCRIPTION
function subscribe()
  try
    Genie.WebChannels.subscribe(params(:WS_CLIENT), "geniebuilder")
    (:status => APP_STATE[:OK]) |> JSON3.write
  catch ex
    Dict(
      :status => APP_STATE[:FAIL],
      :error => ex
    ) |> JSON3.write
  end
end

#TODO: READ UNSUBSCRIBE
function unsubscribe()
  try
    Genie.WebChannels.unsubscribe(params(:WS_CLIENT), "geniebuilder")
    (:status => APP_STATE[:OK]) |> JSON3.write
  catch ex
    Dict(
      :status => APP_STATE[:FAIL],
      :error => ex
    ) |> JSON3.write
  end
end

function import_apps()
  for existing_app in readdir(GenieBuilder.APPS_FOLDER[])
    ! isdir(joinpath(GenieBuilder.APPS_FOLDER[], existing_app)) && continue
    startswith(existing_app, ".") && continue

    appname = Genie.Generator.validname(existing_app)
    if isempty(find(Application, name = appname))
      appname != existing_app && mv(joinpath(GenieBuilder.APPS_FOLDER[], existing_app), joinpath(GenieBuilder.APPS_FOLDER[], appname))
      create(appname)
    end
  end
end

function ready() :: Nothing
  @info "GenieBuilder ready! RUN_STATUS = $(GenieBuilder.RUN_STATUS[])"

  notify("ended:gbstart", nothing)
  GenieBuilder.RUN_STATUS[] == :install && @async begin
    sleep(20)
    notify("terms:show", nothing)
  end

  import_apps()

  nothing
end

function status()
  (:status => APP_STATE[:OK]) |> json
end

end
