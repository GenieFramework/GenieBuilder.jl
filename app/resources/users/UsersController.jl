module UsersController

  import GenieBuilder

  using GenieBuilder.Integrations

  function inactive()
    userstatus = "inactive"
    GenieBuilder.Integrations.GenieCloud.user_activity(userstatus)
  end
end
