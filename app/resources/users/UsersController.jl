module UsersController

  import GenieBuilder

  using GenieBuilder.Integrations

  function inactive()
    GenieBuilder.Integrations.GenieCloud.container_idle()

    nothing
  end
end
