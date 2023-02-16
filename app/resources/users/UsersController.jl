module UsersController

  import GenieBuilder

  using GenieBuilder.Integrations

  function inactive()::Nothing
    @async GenieBuilder.Integrations.GenieCloud.container_idle()

    nothing
  end
end
