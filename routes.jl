using Genie.Router
using GenieBuilder
using GenieBuilder.ApplicationsController
using RemoteREPL

Genie.config.websockets_server = true

const api_route = "/api/v1"
const app_route = "/apps/:appid"

function routes()
  route("$api_route/apps") do
    ApplicationsController.apps()
  end

  route("$api_route/apps/create") do
    ApplicationsController.create(params(:name), params(:path, ""), params(:port, rand(45_000:60_000)))
  end

  route("$api_route$app_route/status") do
    ApplicationsController.status(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/start") do
    ApplicationsController.start(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/stop") do
    ApplicationsController.stop(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/up") do
    ApplicationsController.up(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/down") do
    ApplicationsController.down(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/dir") do
    ApplicationsController.dir(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/edit") do
    ApplicationsController.edit(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/save", method = POST) do
    ApplicationsController.save(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/log") do
    ApplicationsController.log(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/errors") do
    ApplicationsController.errors(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/pages") do
    ApplicationsController.pages(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/startrepl") do
    ApplicationsController.startrepl(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/info") do
    ApplicationsController.info(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/delete") do
    ApplicationsController.delete(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/restore") do
    ApplicationsController.restore(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$app_route/purge") do
    ApplicationsController.purge(params(:appid) |> ApplicationsController.get)
  end

  route("/") do
    serve_static_file("index.html")
  end

  route("/geniebuilder/stop") do
    ApplicationsController.cleanup()
    GenieBuilder.stop()
  end

  route("/geniebuilder/startrepl") do
    port = rand(40_000:50_000)

    @async serve_repl(port)

    port
  end

  route("/geniebuilder/uuid") do
    ApplicationsController.uuid()
  end

  route("/geniebuilder/logs") do
    ApplicationsController.logs()
  end

  channel("/geniebuilder/subscribe") do
    ApplicationsController.subscribe()
  end

  channel("/geniebuilder/unsubscribe") do
    ApplicationsController.unsubscribe()
  end

  channel("/geniebuilder/stop") do
    GenieBuilder.stop()
  end
end

function ready()
  ApplicationsController.ready()
end

function main()
  ApplicationsController.reset_app_status()
  routes()
  ready()
end

main()