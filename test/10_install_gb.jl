@safetestset "Genie Builder installation" begin

  gbdir = joinpath(@__DIR__, "geniebuilder") |> abspath

  if isdir(gbdir)
    @warn "Deleting existing geniebuilder directory"
    rm(gbdir, recursive = true)
  end

  push!(ARGS, "GBDIR=$gbdir")
  include("../scripts/rungb.jl")

end