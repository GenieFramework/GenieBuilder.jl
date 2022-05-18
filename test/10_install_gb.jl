@safetestset "Genie Builder installation" begin

  const gbdir = joinpath(@__DIR__, "geniebuilder") |> abspath
  if isdir(gbdir)
    @warn "Deleting existing geniebuilder directory"
    rm(gbdir, recursive = true)
  end

  push!(ARGS, "gbdir=$gbdir")
  include("../scripts/rungb.jl")

end