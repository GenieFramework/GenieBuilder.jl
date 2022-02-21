(pwd() != @__DIR__) && cd(@__DIR__) # allow starting app from bin/ dir

using GenieCloud
push!(Base.modules_warned_for, Base.PkgId(GenieCloud))
GenieCloud.main()
