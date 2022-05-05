(pwd() != @__DIR__) && cd(@__DIR__) # allow starting app from bin/ dir

using GenieBuilder
const UserApp = GenieBuilder
GenieBuilder.main()