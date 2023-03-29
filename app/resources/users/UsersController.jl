module UsersController

  import GenieBuilder

  using GenieBuilder.Integrations
  using Genie.Renderers.Json

  function inactive()::Nothing
    @async GenieBuilder.Integrations.GenieCloud.container_idle()

    nothing
  end

  function active()::Nothing
    @async GenieBuilder.Integrations.GenieCloud.container_active()

    nothing
  end

  function info()::Nothing
    GenieBuilder.Integrations.GenieCloud.user_info() |> json
  end
end
