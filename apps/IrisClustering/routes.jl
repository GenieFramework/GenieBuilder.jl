using Stipple
using StippleUI
using StipplePlotly

using GenieAutoReload

using Iris

route("/") do
  html(path"views/iris.jl", layout = path"views/layouts/app.jl.html",
        context = @__MODULE__,
        model = init_from_storage(IrisModel) |> Iris.handlers
  )
end