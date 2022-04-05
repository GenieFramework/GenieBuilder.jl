(pwd() != @__DIR__) && cd(@__DIR__) # allow starting app from bin/ dir

using GenieBuilder
push!(Base.modules_warned_for, Base.PkgId(GenieBuilder))
GenieBuilder.main()