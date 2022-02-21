module DashboardsController

using Stipple, StippleUI
using GenieAutoReload
using Dashboards

function index()
  html(:dashboards, :dashboard, context = @__MODULE__, model = init(Dashboard) |> Dashboards.handlers)
end

end