using Genie.Router
using ApplicationsController

const api_route = "/api/v1"
const app_route = "/apps/:appid"

route("$api_route/apps") do
  ApplicationsController.apps()
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

route("$api_route$app_route/assets") do
  ApplicationsController.assets(params(:appid) |> ApplicationsController.get)
end