using Genie.Router
using GenieBuilder
using GenieBuilder.ApplicationsController
using GenieBuilder.ApplicationsController.Applications
using RemoteREPL
using JSON3

Genie.config.websockets_server = true

const api_route = "/api/v1"
const app_route = "/apps/:appid"
const gb_route  = "/geniebuilder"

# GenieBuilder API

# return a list of all the apps
apps() = all(Application)

# registers a new path as a GenieBuilder app
register(name = "", path = pwd()) = ApplicationsController.register(name, path)

# unregisters an app from GenieBuilder
unregister(app) = ApplicationsController.unregister(app)
unregister(name = "", path = pwd()) = ApplicationsController.unregister(name, path)

# creates the Genie app skeleton
create(app) = ApplicationsController.create(app)
create(name = "", path = pwd()) = ApplicationsController.create(name, path)

# returns the app's status
status(app) = ApplicationsController.status(app).body |> JSON3.read
status(name = "", path = pwd()) = ApplicationsController.status(name, path).body |> JSON3.read

# starts the app
function start(app)
  ApplicationsController.start(app)
  @async begin
    sleep(3)
    Genie.Server.openbrowser("http://$(Genie.config.server_host):$(app.port)?appid=$(app.id.value)&filepath=$(app.path)")
  end
end
start(name = "", path = pwd()) = ApplicationsController.start(name, path)

# stops the app
stop(app) = ApplicationsController.stop(app)
stop(name = "", path = pwd()) = ApplicationsController.stop(name, path)

function startrepl()
  port = ApplicationsController.available_port() |> first
  @async serve_repl(port)

  port
end

function stop!()
  ApplicationsController.cleanup()
  GenieBuilder.exit()
end

function editor(app::Application)
  Genie.Server.openbrowser("http://$(Genie.config.server_host):$(Genie.config.server_port)?appid=$(app.id.value)&filepath=$(app.path)")
end
function editor(name = "", path = pwd())
  app = findone(Application, name = ApplicationsController.name_from_path(path))

  if app === nothing
    register()
    return editor(name, path)
  end

  editor(app)
end

# REST API
function routes()
  # return a list of all the apps
  route("$api_route/apps") do
    ApplicationsController.apps()
  end

  # registers a new path as a GenieBuilder app
  route("$api_route/apps/register") do
    register(params(:name, ""), params(:path, pwd()))
  end

  # creates the Genie app skeleton
  route("$api_route$app_route/create") do
    create(params(:appid) |> ApplicationsController.get)
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

  # unregisters an app from GenieBuilder
  route("$api_route$app_route/unregister") do # previously delete
    unregister(params(:appid) |> ApplicationsController.get)
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

  # GC integration routes
  route("$api_route$app_route/deploy") do
    try
      @async Integrations.GenieCloud.deployapp(params(:appid) |> ApplicationsController.get)
    catch ex
      @error ex
    end
  end
end

function ready()
  ApplicationsController.ready()
end

function main()
  routes()
  ready()
end

main()