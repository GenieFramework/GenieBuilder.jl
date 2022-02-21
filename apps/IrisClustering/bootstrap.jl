(pwd() != @__DIR__) && cd(@__DIR__) # allow starting app from bin/ dir

using IrisClustering
push!(Base.modules_warned_for, Base.PkgId(IrisClustering))
IrisClustering.main()
