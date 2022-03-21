using Stipple
using StippleUI
using StipplePlotly

using GenieAutoReload

using Iris

using Stipple.Pages
using Stipple.ModelStorage.Sessions


Page("/", view = "views/iris.jl.html",
          layout = "views/layouts/app.jl.html",
          model = () -> (init_from_storage(IrisModel) |> Iris.handlers),
          context = @__MODULE__)