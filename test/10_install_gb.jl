#==
@safetestset "Genie Builder installation" begin
  using HTTP
  using JSON

  gbdir = joinpath(@__DIR__, "geniebuilder") |> abspath
  isdir(gbdir) && chmod(gbdir, 0x775)

  push!(ARGS, "GBDIR=$(gbdir)")
  server = @async include("../scripts/rungb.jl")

  gburl = "http://127.0.0.1:10101"

  function trygetwait(url, message, attempts)
    attempts_count = 1
    while attempts_count <= attempts
      try
        response = HTTP.get(url; status_exception = false)
        return response
      catch ex
        if isa(ex, HTTP.IOExtras.IOError) # && contains(String(ex), "ECONNREFUSED")
          @error message
          attempts_count += 1
          sleep(10)
        else
          error("$message after $attempts_count attempts")
        end
      end
    end
  end

  # install geniebuilder and wait for it to succeed and start the server
  trygetwait(gburl, "Server was not started", 10)

  @info "Server is up"

  # upon successful installation, certain files and folders must exist
  @testset "Genie Builder has been set up" begin
    @test isdir(gbdir) == true
    @test isdir(joinpath(gbdir, "apps")) == true
    @test isdir(joinpath(gbdir, "db")) == true
    @test isfile(joinpath(gbdir, "Manifest.toml")) == true
    @test isfile(joinpath(gbdir, "db", "client.sqlite3")) == true
    @test isfile(joinpath(gbdir, "db", "connection.yml")) == true
    chmod(joinpath(gbdir), 0o775; recursive = true)
  end

  # once GB is installed and running, the /apps endpoint should be accessible
  @testset "Apps endpoint should return an empty list" begin
    response = HTTP.get("$gburl/api/v1/apps")
    @test response.status == 200
    data = String(response.body) |> JSON.parse

    # there should be an "applications" key in the response
    # but there should be no apps
    @test isa(data, Dict) == true
    @test haskey(data, "applications") == true
    @test isa(data["applications"], Array) == true
    @test isempty(data["applications"]) == true
  end

  appname = "GenieBuilderTestApp"

  # let's create an app
  @testset "App creation" begin
    response = HTTP.get("$gburl/api/v1/apps/create?name=$appname")
    @test response.status == 200
    app = String(response.body) |> JSON.parse

    # we should get a response that our app is being created
    @test app["application"]["id"]["value"] == 1
    @test app["application"]["name"] == appname
    @test contains(app["application"]["path"], joinpath(gbdir, "apps")) == true
    @test app["application"]["status"] == "creating"

    # now let's check if the app has been created
    for _ in 1:10
      response = HTTP.get("$gburl/api/v1/apps")
      @test response.status == 200
      apps = String(response.body) |> JSON.parse

      if apps["applications"][1]["status"] == "creating"
        @info "App is still being created"
        sleep(10)
        continue
      end

      app = apps["applications"][1]
      @test app["id"]["value"] == 1
      @test app["name"] == appname
      @test contains(app["path"], joinpath(gbdir, "apps")) == true
      @test app["status"] == "offline"

      break
    end
  end

  # now let's start the app
  @testset "Starting the app" begin
    response = HTTP.get("$gburl/api/v1/apps/1/start")
    @test response.status == 200
    @test (String(response.body) |> JSON.parse)["status"] == "ok"
  end

  # let's check if the app has been started
  @testset "App has successfully started" begin
    for _ in 1:10
      response = HTTP.get("$gburl/api/v1/apps")
      @test response.status == 200
      apps = String(response.body) |> JSON.parse

      if apps["applications"][1]["status"] == "starting"
        @info "App is still starting"
        sleep(10)
        continue
      end

      app = apps["applications"][1]
      @test app["id"]["value"] == 1
      @test app["name"] == appname
      @test contains(app["path"], joinpath(gbdir, "apps")) == true
      @test app["status"] == "online"

      break
    end
  end

  # let's get the status of the online app
  @testset "App status should be `online`" begin
    response = HTTP.get("$gburl/api/v1/apps/1/status")
    @test response.status == 200
    @test (String(response.body) |> JSON.parse)["status"] == "online"
  end

  # let's check the /pages endpoint
  @testset "Valid pages/ endpoint response" begin
    response = HTTP.get("$gburl/api/v1/apps/1/pages")
    @test response.status == 200
    appdata = (String(response.body) |> JSON.parse)["pages"][1]
    @test appdata["view"] == joinpath("views", "hello.jl.html")
    @test appdata["route"]["method"] == "GET"
    @test appdata["route"]["path"] == "/"
    @test isa(appdata["deps"]["styles"], Vector) == true
    @test isempty(appdata["deps"]["styles"]) == false
    @test isa(appdata["deps"]["scripts"], Vector) == true
    @test isempty(appdata["deps"]["scripts"]) == false
    @test appdata["layout"] == joinpath("layouts", "app.jl.html")
    @test appdata["model"]["name"] == "Stipple.Pages.EmptyModel"
  end

  # finally, let's stop Genie Builder
  @testset "Shutting down" begin
    try
      HTTP.get("$gburl/geniebuilder/stop")
    catch ex
      @test isa(ex, HTTP.IOExtras.IOError) == true
    end
  end

  # cleanup
  isdir(gbdir) && rm(gbdir; force = true, recursive = true)
  @test isdir(gbdir) == false
end
==#
