module ApplicationsController

using Applications
using SearchLight
using Genie.Router
using Genie.Renderers.Json
using HTTP
using JSON3
using GenieDevTools

const appsthreads = Dict()

fullpath(app::Application) = "." * app.path * app.name
get(appid) = SearchLight.findone(Application, id = parse(Int, appid))

function apps()
  (:applications => all(Application)) |> json
end

function status_request(app)
  status = try
    res = HTTP.request("GET", "http://localhost:$(app.port)$(GenieDevTools.defaultroute)/id")
    if res.status >= 500
      :error
    elseif res.status == 404
      :offline
    elseif res.status == 200
      :online
    end
  catch ex
    if isa(ex, HTTP.IOExtras.IOError)
      :offline
    else
      :error
    end
  end

  @show status

  status
end

function status(app)
  (:status => status_request(app)) |> json
end

function start(app)
  appstatus = status_request(app)
  appstatus != :offline && return (:status => appstatus) |> json

  appsthreads[fullpath(app)] = Base.Threads.@spawn(`julia -e "cd(\"$(fullpath(app))\");ENV[\"PORT\"]=$(app.port);using Pkg;Pkg.activate(\".\");using Genie;Genie.loadapp();up(async = false)"` |> run)

  (:status => :ok) |> json
end

function stop(app)
  appstatus = status_request(app)
  appstatus != :online && return (:status => appstatus) |> json

  HTTP.request("GET", "http://localhost:$(app.port)$(GenieDevTools.defaultroute)/down")
  HTTP.request("GET", "http://localhost:$(app.port)$(GenieDevTools.defaultroute)/exit")

  (:status => if haskey(appsthreads, fullpath(app))
    try
      Base.throwto(appsthreads[fullpath(app)], InterruptException())
    catch
    end

    delete!(appsthreads, fullpath(app))

    :ok
  else
    :notfound
  end) |> json
end

function up(app)
  appstatus = status_request(app)
  appstatus != :offline && return (:status => appstatus) |> json

  res = HTTP.request("GET", "http://localhost:$(app.port)$(GenieDevTools.defaultroute)/up")

  String(res.body) |> JSON3.read |> json
end

function down(app)
  appstatus = status_request(app)
  appstatus != :online && return (:status => appstatus) |> json

  res = HTTP.request("GET", "http://localhost:$(app.port)$(GenieDevTools.defaultroute)/down")

  String(res.body) |> JSON3.read |> json
end

function dir(app)
  appstatus = status_request(app)
  appstatus != :online && return (:status => appstatus) |> json

  res = HTTP.request("GET", "http://localhost:$(app.port)$(GenieDevTools.defaultroute)/dir?path=$(params(:path, "."))")

  String(res.body) |> JSON3.read |> json
end

function edit(app)
  appstatus = status_request(app)
  appstatus != :online && return (:status => appstatus) |> json

  res = HTTP.request("GET", "http://localhost:$(app.port)$(GenieDevTools.defaultroute)/edit?path=$(params(:path, "."))")

  String(res.body) |> JSON3.read |> json
end

function save(app)
  appstatus = status_request(app)
  appstatus != :online && return (:status => appstatus) |> json

  res = HTTP.request("POST",
                      "http://localhost:$(app.port)$(GenieDevTools.defaultroute)/edit?path=$(params(:path, "."))",
                      [],
                      HTTP.Form(Dict("payload" => params(:payload)))
                    )

  String(res.body) |> JSON3.read |> json
end

function log(app)
  appstatus = status_request(app)
  appstatus != :online && return (:status => appstatus) |> json

  res = HTTP.request("GET", "http://localhost:$(app.port)$(GenieDevTools.defaultroute)/log")

  String(res.body) |> JSON3.read |> json
end

function errors(app)
  appstatus = status_request(app)
  appstatus != :online && return (:status => appstatus) |> json

  res = HTTP.request("GET", "http://localhost:$(app.port)$(GenieDevTools.defaultroute)/errors")

  String(res.body) |> JSON3.read |> json
end

end
