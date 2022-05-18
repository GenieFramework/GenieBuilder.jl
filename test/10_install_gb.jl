@safetestset "Genie Builder installation" begin
  using HTTP
  using JSON

  gbdir = joinpath(@__DIR__, "geniebuilder") |> abspath

  if isdir(gbdir)
    @warn "Deleting existing geniebuilder directory"
    rm(gbdir, recursive = true)
  end

  push!(ARGS, "GBDIR=$(gbdir)")
  server = @async include("../scripts/rungb.jl")

  gburl = "http://127.0.0.1:10101"
  attempts_count = 1
  while attempts_count <= 10
    try
      HTTP.get(gburl; status_exception = false)
      break
    catch ex
      if isa(ex, HTTP.IOExtras.IOError) # && contains(String(ex), "ECONNREFUSED")
        @error "Server is not up yet"
        attempts_count += 1
        sleep(10)
      else
        error("Server could not be started after $attempts_count attempts")
      end
    end
  end

  @info "Server is up"

  @test isdir(gbdir) == true
  @test isdir(joinpath(gbdir, "apps")) == true
  @test isdir(joinpath(gbdir, "db")) == true
  @test isfile(joinpath(gbdir, "Manifest.toml")) == true
  @test isfile(joinpath(gbdir, "db", "client.sqlite3")) == true
  @test isfile(joinpath(gbdir, "db", "connection.yml")) == true

  response = HTTP.get("$gburl/api/v1/apps")
  @test response.status == 200

  data = String(response.body) |> JSON.parse
  @show data

  @test isa(data, Dict) == true
  @test haskey(data, "applications") == true
  @test isa(data["applications"], Array) == true
  @test isempty(data["applications"]) == true

  try
    HTTP.get("$gburl/geniebuilder/stop")
  catch ex
    @test isa(ex, HTTP.IOExtras.IOError) == true
  end
end