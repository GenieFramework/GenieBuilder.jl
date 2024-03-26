using Genie.Router
using GenieBuilder
using GenieBuilder.ApplicationsController
using GenieBuilder.ApplicationsController.Applications
using RemoteREPL
using JSON3
import GenieDevTools
using Logging
using GenieLicensing

Genie.config.websockets_server = true

const api_route = "/api/v1"
const app_route = "/apps/:appid"
const gb_route  = "/geniebuilder"

Genie.config.cors_headers["Access-Control-Allow-Origin"] = "*"
Genie.Configuration.add_cors_header!("Access-Control-Allow-Headers", "GB-SessionId")

# GenieBuilder API

app!(name::String = "", path::String = pwd()) = findone(Application, name = isempty(name) ?
                                                                            ApplicationsController.name_from_path(path) :
                                                                            name)

# return a list of all the apps
apps() = all(Application)

# registers a new path as a GenieBuilder app
register(name::String = "", path::String = pwd()) = ApplicationsController.register(name, path)

# unregisters an app from GenieBuilder
unregister(app::Application) = ApplicationsController.unregister(app)
unregister(name::String = "", path::String = pwd()) = unregister(app!(name, path))

# creates the Genie app skeleton
create(app::Union{Application,Nothing}; name::AbstractString = "", path::AbstractString = pwd()) = ApplicationsController.create(app; name, path)
function create(name::String = "", path::String = pwd())
  create(app!(name, path); name, path)
end

# returns the app's status
status(app::Union{Application,Nothing}) = ApplicationsController.status(app)

# starts the app
function start(app::Application)
  # @async begin
  #   sleep(15)
  #   openbrowser(app)
  # end
  ApplicationsController.start(app)
end

function openbrowser(app::Application)
  Genie.Server.openbrowser("http://$(Genie.config.server_host):$(app.port)?appid=$(app.id.value)&filepath=$(app.path)&CHANNEL__=$(app.channel)")
end

# stops the app
stop(app::Application) = ApplicationsController.stop(app)

function startrepl()
  port = ApplicationsController.available_port() |> first
  @async serve_repl(port) |> errormonitor

  port
end

function stop!()
  ApplicationsController.cleanup()
  GenieBuilder.exit()
end

# starts the app
function restart(app::Application)
  ApplicationsController.stop(app)
  ApplicationsController.start(app)
end

function editor(app::Application)
  Genie.Server.openbrowser("http://$(Genie.config.server_host):$(Genie.config.server_port)?appid=$(app.id.value)&filepath=$(app.path)")
end
function editor(name::String = "", path::String = pwd())
  app = app!(name, path)

  if app === nothing
    register()
    return editor(name, path)
  end

  editor(app)
end

# REST API
function register_routes()
  # return a list of all the apps
  route("$api_route/apps") do
    ApplicationsController.apps()
  end

  # registers a new path as a GenieBuilder app
  route("$api_route/apps/register") do
    @async GenieLicensing.log("GenieBuilder.jl", "apps-register",
                              Dict("name" => params(:name, ""), "path" => params(:path, pwd()))) |> errormonitor

    register(params(:name, ""), params(:path, pwd()))
  end

  # creates the Genie app skeleton
  route("$api_route/apps/create") do
    @async GenieLicensing.log("GenieBuilder.jl", "apps-create",
                              Dict("name" => params(:name, ""), "path" => params(:path, pwd()))) |> errormonitor

    create(params(:name, ""), params(:path, pwd()))
  end

  # returns the app's status
  route("$api_route$app_route/status") do
    status(params(:appid) |> ApplicationsController.get)
  end

  # starts the app
  route("$api_route$app_route/start") do
    start(params(:appid) |> ApplicationsController.get)
  end

  # stops the app
  route("$api_route$app_route/stop") do
    stop(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/restart") do
    restart(params(:appid) |> ApplicationsController.get)
  end

  # unregisters an app from GenieBuilder
  route("$api_route$app_route/unregister") do # previously delete
    unregister(params(:appid) |> ApplicationsController.get)
  end

  # registers a new path as a GenieBuilder app
  route("$api_route/apps/unregister") do
    unregister(params(:name, ""), params(:path, pwd()))
  end

  # returns the contents of a directory from an app
  route("$api_route$app_route/dir") do
    ApplicationsController.dir(params(:appid) |> ApplicationsController.get)
  end

  # returns the contents of a file from an app
  route("$api_route$app_route/edit") do
    ApplicationsController.edit(params(:appid) |> ApplicationsController.get)
  end

  # saves the contents of a file from an app
  route("$api_route$app_route/save", method = POST) do
    ApplicationsController.save(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/log") do
    ApplicationsController.log(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/errors") do
    ApplicationsController.errors(params(:appid) |> ApplicationsController.get)
  end

  # returns the pages of an app
  route("$api_route$app_route/pages") do
    ApplicationsController.pages(params(:appid) |> ApplicationsController.get)
  end

  # starts a remote REPL for an app
  route("$api_route$app_route/startrepl") do
    ApplicationsController.startrepl(params(:appid) |> ApplicationsController.get)
  end

  # returns the info of an app
  route("$api_route$app_route/info") do
    ApplicationsController.info(params(:appid) |> ApplicationsController.get)
  end

  # starts the app's package manager
  route("$api_route$app_route/startpkgmng") do
    ApplicationsController.startpkgmng(params(:appid) |> ApplicationsController.get)
  end

  # stops the app's package manager
  route("$api_route$app_route/stoppkgmng") do
    ApplicationsController.stoppkgmng(params(:appid) |> ApplicationsController.get)
  end

  # zip the app and download it
  route("$api_route$app_route/download") do
    ApplicationsController.download(params(:appid) |> ApplicationsController.get)
  end

  # serves the no-code editor index page
  route("/") do
    serve_static_file("index.html")
  end

  # stops the GenieBuilder server
  route("$gb_route/stop") do
    stop!()
  end

  # starts GenieBuilder remote repl
  route("$gb_route/startrepl") do
    startrepl()
  end

  # app uuid
  route("$gb_route/uuid") do
    ApplicationsController.uuid()
  end

  # subscribes to websockets notifications
  channel("$gb_route/subscribe") do
    ApplicationsController.subscribe()
  end

  # unsubscribes from websockets notifications
  channel("$gb_route/unsubscribe") do
    ApplicationsController.unsubscribe()
  end

  # returns the status of the GenieBuilder server
  route("$gb_route/status.json") do
    ApplicationsController.status()
  end

  # returns the settings of the GenieBuilder server
  route("$gb_route/settings") do
    ApplicationsController.settings()
  end

  route("$gb_route/platform_info") do
    ApplicationsController.platform_info()
  end

  route("mocks/send_user_message") do
    ApplicationsController.send_user_message(;  text = "This is a test message from GenieBuilder",
                                                button_text = "Do stuff",
                                                button_link = "https://genieframework.com")
  end

  nothing
end

function autocheck_apps_status()
  for app in GenieBuilder.apps()
    with_logger(NullLogger()) do
      ApplicationsController.status_request(app, false; statuscheck = true)
      sleep(1)
    end
  end
  sleep(30)
end

function ready()
  ApplicationsController.ready()
end

function main()
  @async GenieDevTools.tailapplog(GenieBuilder.LOG_FOLDER[]; env = lowercase(ENV["GENIE_ENV"])) do line
    type = GenieDevTools.logtype(line)
    line = "log:message $line"
    line = Genie.WebChannels.tagbase64encode(line)
    ApplicationsController.notify(; message = line,
                                    type = type,
                                    status = type == :error ? ApplicationsController.ERROR_STATUS : ApplicationsController.OKSTATUS)
  end |> errormonitor

  @async begin
    while true
      autocheck_apps_status()
    end
  end |> errormonitor

  register_routes()
  ready()
end

main()