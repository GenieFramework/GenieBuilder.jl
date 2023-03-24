using Genie.Router
using GenieBuilder
using GenieBuilder.ApplicationsController
using GenieBuilder.UsersController
using GenieBuilder.Integrations
using RemoteREPL

Genie.config.websockets_server = true

const api_route = "/api/v1"
const app_route = "/apps/:appid"
const gb_route  = "/geniebuilder"
const user_route = "/user"

function routes()
  route("$api_route/apps") do
    ApplicationsController.apps()
  end

  route("$api_route/apps/create") do
    ApplicationsController.create(params(:name), params(:path, ""), params(:port, ApplicationsController.available_port()))
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

  route("$api_route$app_route/download") do
    ApplicationsController.download(params(:appid) |> ApplicationsController.get)
  end

  route("$api_route$user_route/inactive") do
    UsersController.inactive()
  end

  route("$api_route$user_route/active") do
    UsersController.active()
  end

  route("/") do
    serve_static_file("index.html")
  end

  route("$gb_route/stop") do
    ApplicationsController.cleanup()
    GenieBuilder.stop()
  end

  route("$gb_route/startrepl") do
    port = ApplicationsController.available_port() |> first

    @async serve_repl(port)

    port
  end

  route("$gb_route/uuid") do
    ApplicationsController.uuid()
  end

  channel("$gb_route/subscribe") do
    ApplicationsController.subscribe()
  end

  channel("$gb_route/unsubscribe") do
    ApplicationsController.unsubscribe()
  end

  channel("$gb_route/stop") do
    GenieBuilder.stop()
  end

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

  route("$api_route$app_route/unpublish") do
    try
      @async Integrations.GenieCloud.unpublishapp(params(:appid) |> ApplicationsController.get)
    catch ex
      @error ex
    end
  end

  route("$api_route$app_route/suspend") do
    try
      @async Integrations.GenieCloud.suspendapp(params(:appid) |> ApplicationsController.get)
    catch ex
      @error ex
    end
  end

  route("$api_route$app_route/resume") do
    try
      @async Integrations.GenieCloud.resumeapp(params(:appid) |> ApplicationsController.get)
    catch ex
      @error ex
    end
  end
  # end GC integration routes
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