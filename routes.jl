using Genie.Router
using GenieBuilder
using GenieBuilder.ApplicationsController
using RemoteREPL

Genie.config.websockets_server = true

const api_route = "/api/v1"
const app_route = "/apps/:appid"
const gb_route  = "/geniebuilder"


# REST API
function routes()
  # return a list of all the apps
  route("$api_route/apps") do
    ApplicationsController.apps()
  end

  # registers a new path as a GenieBuilder app
  route("$api_route/apps/register") do
    ApplicationsController.register(params(:name, ""), params(:path, ""))
  end

  # creates the Genie app skeleton
  route("$api_route$app_route/create") do
    ApplicationsController.create(params(:appid) |> ApplicationsController.get)
  end

  # returns the app's status
  route("$api_route$app_route/status") do
    ApplicationsController.status(params(:appid) |> ApplicationsController.get)
  end

  # starts the app
  route("$api_route$app_route/start") do
    ApplicationsController.start(params(:appid) |> ApplicationsController.get)
  end

  # stops the app
  route("$api_route$app_route/stop") do
    ApplicationsController.stop(params(:appid) |> ApplicationsController.get)
  end

  # unregisters an app from GenieBuilder
  route("$api_route$app_route/unregister") do # previously delete
    ApplicationsController.unregister(params(:appid) |> ApplicationsController.get)
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
    ApplicationsController.cleanup()
    GenieBuilder.stop()
  end

  # starts GenieBuilder remote repl
  route("$gb_route/startrepl") do
    port = ApplicationsController.available_port() |> first

    @async serve_repl(port)

    port
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

  # stops the GenieBuilder server
  channel("$gb_route/stop") do
    GenieBuilder.stop()
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