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

import StippleUI
import GeniePackageManager
import GenieDevTools

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
const RESTARTING_STATUS = "restarting"

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

fullpath(app::Application) = abspath(app.path)
get(appid) = ApplicationsController.get(parse(Int, appid))
get(appid::SearchLight.DbId) = ApplicationsController.get(appid.value)
get(appid::Int) = begin
  appid = SearchLight.findone(Application, id = appid)
  isnothing(appid) && throw(Genie.Exceptions.ExceptionalResponse(404,
                                                                ["Content-Type" => "application/json"],
                                                                Dict(:status => FAILSTATUS,
                                                                      :error => "App not found") |> JSON3.write))
  appid
end

"""
  notify(...)

Notifies the GenieBuilder UI of an event via websockets push
"""
function notify(message::String,
                appid::Union{SearchLight.DbId,Nothing} = nothing,
                status::String = OKSTATUS,
                type::Union{String,Symbol} = "info",
                eventid::String = params(:eventid, "0")) :: Bool
  type = string(type)

  # println(Dict(
  #   :message    => message,
  #   :appid      => isnothing(appid) ? 0 : appid.value,
  #   :status     => status,
  #   :type       => type,
  #   :eventid    => eventid
  # ))

  try
    Genie.WebChannels.unsubscribe_disconnected_clients()
  catch ex
    @error ex
  end

  try
    appid !== nothing && type == ERROR_STATUS &&
      persist_status(SearchLight.findone(Application, id = appid.value), ERROR_STATUS)
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
function notify(; message::String,
                  appid::Union{SearchLight.DbId,Nothing} = nothing,
                  status::String = OKSTATUS,
                  type::Union{String,Symbol} = "info",
                  eventid::String = params(:eventid, "0")) :: Bool
  notify(message, appid, status, type, eventid)
end


"""
  valid_appname(name::String)

Generates a valid app name from a string by removing all non-alphanumeric characters
"""
function valid_appname(name::AbstractString)
  filter(! isempty, [x.match for x in collect(eachmatch(r"[0-9a-zA-Z]*", name))]) |> join
end

"""
  apps()

Returns a list of all registered apps
"""
function apps()
  (:applications => all(Application)) |> json
end

"""
  info(app)

Returns the info of an app
"""
function info(app::Application)
  (:application => app) |> json
end


function name_from_path(path::AbstractString)
  splitpath(path)[end] |> valid_appname |> lowercase
end


"""
  register(; name = "", path = "")

Registers a file system path as an app with GenieBuilder
"""
function register(name::AbstractString = "", path::AbstractString = pwd(); autostart::Bool = true)
  try
    notify("started:register_app")

    path = abspath(normpath(path))
    isdir(path) || throw(ArgumentError("Path $path is not a directory"))

    endswith(path, "/") || (path = "$path/")
    isempty(name) && (name = name_from_path(path))
    port, replport, pkgmngport = available_port()

    app = Application(; name, path, port, replport, pkgmngport)
    app.status = CREATING_STATUS
    app = save!(app)

    persist_status(app, OFFLINE_STATUS)
    notify("ended:register_app", app.id)

    autostart && start(app)

    return app |> json
  catch ex
    @error(ex)
    notify("failed:register_app", nothing, FAILSTATUS, ERROR_STATUS)

    return (:status => FAILSTATUS, :error => ex) |> json
  end
end

"""
  unregister(app)

Unregisters an app with GenieBuilder
"""
function unregister(app::Application)
  app_id = app.id

  notify("started:unregister", app_id)
  stop(app)
  SearchLight.delete(app)
  notify("ended:unregister", app_id)

  (:status => OKSTATUS) |> json
end

"""
  create(app)

Creates the Genie app skeleton
"""
function create(app::Application; name::AbstractString = "", path::AbstractString = pwd())
  notify("started:create", app.id)

  try
    boilerplate(app.path)
    notify("ended:create", app.id)
  catch ex
    @error ex
    notify("failed:create", app.id, FAILSTATUS, ERROR_STATUS)

    return (:status => FAILSTATUS, :error => ex) |> json
  end

  (:status => OKSTATUS) |> json
end
function create(app::Nothing; name::AbstractString = "", path::AbstractString = pwd())
  try
    isdir(path) || mkpath(path)
    register(name, path; autostart = false)

    app = GenieBuilder.app!(name, path)
    create(app)
    start(app)

    return (:status => OKSTATUS) |> json
  catch ex
    return (:status => FAILSTATUS, :error => ex) |> json
  end
end
create(name::AbstractString = "", path::AbstractString = pwd()) = create(findone(Application; name = isempty(name) ? name_from_path(path) : name))

"""
  boilerplate(app_path::String)
"""
function boilerplate(app_path::String)
  # set up the Julia environment
  app_path = abspath(normpath(app_path))
  isdir(app_path) || mkpath(app_path)

  try
    cmd = Cmd(`julia --startup-file=no -e '
                using Pkg;
                Pkg._auto_gc_enabled[] = false;
                Pkg.activate(".");
                Pkg.add("GenieFramework");
                exit(0);
    '`; dir = app_path)
    cmd |> run
  catch ex
    @error ex
    rethrow(ex)
  end

  # generate the app's files
  try
    current_path = pwd()
    cd(app_path)

    GenieBuilder.Generators.app()
    GenieBuilder.Generators.view()

    cd(current_path)
  catch ex
    @error ex
    rethrow(ex)
  end

  nothing
end
boilerplate(app::Application) = boilerplate(app.path)

"""
  persist_status(app, status)

Persists the status of an app in the database
"""
function persist_status(app::Union{Application,Nothing}, status::AbstractString) :: Bool
  app === nothing && return false

  app.status = string(status)

  try
    save!(app)
  catch ex
    @error ex
    return false
  end

  true
end

"""
  status_request(...)

Makes a HTTP request to an app to check its status.
"""
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
      donotify && notify("failed:status_request", app.id, FAILSTATUS, ERROR_STATUS)
      ERROR_STATUS
    end
  end

  donotify && notify("ended:status_request", app.id)
  persist && persist_status(app, status)

  status |> string
end

"""
  status(app)

REST endpoint to check the status of an app
"""
function status(app::Application)
  notify("started:status", app.id)
  status = status_request(app; statuscheck = true)

  notify("ended:status:$status", app.id)
  (:status => status) |> json
end
function status(_::Nothing)
  (:status => "NOT FOUND") |> json
end

"""
  watch(path, appid)

Watches a path for changes and notifies the GenieBuilder UI
"""
function watch(path::AbstractString, appid::Int)
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

"""
  unwatch(path, appid)

Unwatches a path for changes
"""
function unwatch(path::AbstractString, appid::DbId)
  delete!(Genie.config.watch_handlers, appid.value)
  Genie.Watch.unwatch(path)
end


"""
  start(app)

Starts an app
"""
function start(app::Application)
  app.status in [STARTING_STATUS, ONLINE_STATUS] && return (:status => OKSTATUS) |> json
  app.status == ERROR_STATUS && return (:status => ERROR_STATUS, :error => "App is in error state") |> json

  try
    notify("started:start", app.id)
    persist_status(app, STARTING_STATUS)

    appsthreads[fullpath(app)] = Base.Threads.@spawn begin
      try
        cmd = Cmd(`julia --startup-file=no -e '
                                                using Pkg;
                                                Pkg._auto_gc_enabled[] = false;
                                                Pkg.activate(".");
                                                using GenieFramework;
                                                @genietools();
                                                using GenieFramework.Genie;
                                                Core.eval(Main, :(const UserApp = $(@__MODULE__)));
                                                Genie.genie(context = @__MODULE__);
                                                up(; async = true, open_browser = true);
                                                while true
                                                  sleep(1)
                                                end
                  '`; dir = fullpath(app), detach = false)
        cmd = addenv(cmd, "PORT" => app.port,
                          "WSPORT" => app.port,
                          "WSEXPPORT" => app.port,
                          "GENIE_ENV" => "dev",
                          "GENIE_BANNER" => "false",
                          "GENIE_PUSH_ERRORS" => "false",)

        # in the cloud the :<port> becomes /<path>
        # haskey(ENV, "GB_SOURCE") && ENV["GB_SOURCE"] == "cloud" && (cmd = addenv(cmd, "BASEPATH" => "/$(app.port)"))

        cmd |> run

        app.error = ""
        save!(app)
      catch ex
        @error ex
        notify("failed:start", app.id, FAILSTATUS, ERROR_STATUS)

        if isempty(app.error)
          app.error = ex
          persist_status(app, ERROR_STATUS)
        end

        return (:status => FAILSTATUS) |> json
      end
    end

    @async begin
      while status_request(app, false; statuscheck = true, persist = false) in [STARTING_STATUS, OFFLINE_STATUS]
        sleep(1)
      end

      notify("ended:start", app.id)
      persist_status(app, ONLINE_STATUS)
      watch(fullpath(app), app.id)
      @async tailapplog(app) |> errormonitor
    end |> errormonitor
  catch ex
    @error ex
    notify("failed:start", app.id, FAILSTATUS, ERROR_STATUS)

    return (:status => FAILSTATUS) |> json
  end

  # app.status = ""
  save!(app)

  (:status => OKSTATUS) |> json
end

"""
  tailapplog(app)

Tails an app's log and notifies the GenieBuilder UI
"""
function tailapplog(app::Application)
  if ! isfile joinpath(fullpath(app), "log")
    # wait for the log file to be created
    sleep(10)
    return tailapplog(app)
  end

  GenieDevTools.tailapplog(joinpath(fullpath(app), "log")) do line
    type = GenieDevTools.logtype(line)
    line = "log:message $line"
    line = Genie.WebChannels.tagbase64encode(line)
    notify(;  message = line,
              appid = app.id,
              type = type,
              status = type == :error ? ERROR_STATUS : OKSTATUS,
          )
    if type == :error
      app.error = line
      persist_status(app, ERROR_STATUS)
    end

    parselog(; line, type, appid = app.id)
  end
end

function parselog(; line::AbstractString, type::Symbol, appid) :: Nothing
  output = GenieDevTools.parselog(line)
  if ! isnothing(output)
    notify(;  message = output,
              appid = appid,
              type = type,
              status = ERROR_STATUS
          )
  end

  return
end

"""
  stop(app)

Stops an app
"""
function stop(app::Application)
  status = OKSTATUS

  try
    persist_status(app, STOPPING_STATUS)
    notify("started:stop", app.id)

    @async HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/exit") |> errormonitor

    sleep(2)

    if status_request(app, false; statuscheck = true) == OFFLINE_STATUS
      notify("ended:stop", app.id)
      app.error = ""
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
stop(name::AbstractString = "", path::AbstractString = pwd()) = stop(findone(Application; name = isempty(name) ? name_from_path(path) : name))

"""
  @isonline(app)

Checks if an app is online
"""
macro isonline(app)
  quote
    appstatus = status_request($(esc(app)))
    appstatus != ONLINE_STATUS && return json(:status => appstatus)

    true
  end
end

"""
  uuid()

Computes an app's UUID (unique identifier) based on its secret token
"""
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

function json2json(res::HTTP.Response)
  String(res.body) |> JSON3.read |> json
end

"""
  dir(app)

Returns the contents of a directory from an app
"""
function dir(app::Application)
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

"""
  edit(app)

Returns the contents of a file from an app
"""
function edit(app::Application)
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

"""
  save(app)

Saves the contents of a file from an app
"""
function save(app::Application)
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

"""
  pages(app)

Returns the pages of an app
"""
function pages(app::Application)
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

"""
  available_port()

Returns two available HTTP ports, one for the app, the other for the remote REPL
"""
function available_port()
  apps = SearchLight.find(Application)
  isempty(apps) && return (first(PORTS_RANGE), first(PORTS_RANGE)+1, first(PORTS_RANGE)+2)
  usedports = [app.port for app in apps] |> sort!

  available_port = 0
  p = first(PORTS_RANGE)
  while p < last(PORTS_RANGE)
    if p ∉ usedports && p+1 ∉ usedports && p+2 ∉ usedports
      available_port = p
      break
    end
    p += 3
  end

  available_port == UNDEFINED_PORT && throw(UnavailablePortException("$(PORTS_RANGE) ports are all in use"))
  return (available_port, available_port + 1, available_port + 2)
end

"""
  startrepl(app)

Starts a remote REPL for an app
"""
function startrepl(app::Application)
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

"""
  startpkgmng(app)

Starts the package manager web app for an app
"""
function startpkgmng(app::Application)
  try
    notify("started:pkgmng", app.id)
    cmd = Cmd(`julia --startup-file=no -e '
                using Pkg;
                Pkg._auto_gc_enabled[] = false;
                Pkg.activate(".");
                using GenieFramework;
                using GenieFramework.GeniePackageManager;
                using Genie;
                GeniePackageManager.register_routes();
                up(; port = parse(Int, ENV["PORT"]), async = false, open_browser = true);
    '`; dir = app.path)
    cmd = addenv(cmd, "PORT" => app.pkgmngport,
                      "HOST" => apphost,
                      "GENIE_ENV" => "dev",
                      "GENIE_BANNER" => "false")
    @async cmd |> run |> errormonitor
  catch ex
    @error ex
    notify("failed:pkgmng", app.id, FAILSTATUS, ERROR_STATUS)
    rethrow(ex)
  end

  notify("ended:startrepl", app.id)

  Dict(
    :status => OKSTATUS,
    :path => "$(apphost):$(app.pkgmngport)$(GeniePackageManager.defaultroute)"
  ) |> json
end

"""
  stoppkgmng(app)

Stops the package manager web app for an app
"""
function stoppkgmng(app::Application)
  res = try
    notify("started:stoppkgmng", app.id)

    HTTP.request("GET", "$(apphost):$(app.pkgmngport)$(GeniePackageManager.defaultroute)/exit")
  catch ex
    @error ex
    notify("failed:stoppkgmng", app.id, FAILSTATUS, ERROR_STATUS)
  end

  notify("ended:stoppkgmng", app.id)

  (:status => OKSTATUS) |> json
end

"""
  cleanup()

Stops all running apps
"""
function cleanup()
  for app in find(Application, status = ONLINE_STATUS)
    stop(app)
  end
end

"""
  subscribe()

Subscribes websockets client to GenieBuilder UI push notifications
"""
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

"""
  unsubscribe()

Unsubscribes websockets client from GenieBuilder UI push notifications
"""
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

"""
  ready()

Notifies the GenieBuilder UI that it is ready to receive requests
"""
function ready() :: Nothing
  @info "GenieBuilder ready! RUN_STATUS = $(GenieBuilder.RUN_STATUS[])"
  notify("ended:gbstart", nothing)

  nothing
end

"""
  status()

Confirms that GenieBuilder is running
"""
function status()
  (:status => OKSTATUS) |> json
end


function download(app::Application)
  app_path = fullpath(app)
  endswith(app_path, "/") && (app_path = app_path[1:end-1])
  appname = basename(app_path)
  zip_temp_path = Base.tempdir()
  w = ZipFile.Writer(joinpath(zip_temp_path, "$appname.zip"))

  try
    for (root, dirs, files) in walkdir(app_path)
      for file in files
        filepath = joinpath(root, file)
        f = open(filepath, "r")
        content = read(f, String)
        close(f)
        filename = Sys.iswindows() ? split(filepath, "$appname\\")[2] : split(filepath, "$appname/")[2]
        zipfilepath = joinpath(appname, filename)
        zf = ZipFile.addfile(w, zipfilepath; method=ZipFile.Deflate)
        write(zf, content)
      end
    end
  catch ex
    @error "failed to write zip file: ", ex
  finally
    close(w)
  end

  Genie.Router.download("$appname.zip", root = zip_temp_path)
end

end
