module ApplicationsController

using Applications
using SearchLight
using Genie.Router
using Genie.Renderers.Json
using Genie.Requests
using HTTP
using JSON3
using GenieDevTools

const appsthreads = Dict()
const apphost = "http://localhost"

fullpath(app::Application) = "." * app.path * app.name
get(appid) = SearchLight.findone(Application, id = parse(Int, appid))

function apps()
  (:applications => all(Application)) |> json
end

function status_request(app)
  status = try
    res = HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/id")
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

  # HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/down")

  try
    HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/exit")
  catch ex
    @error ex
  end

  (:status => if haskey(appsthreads, fullpath(app))
    try
      Base.throwto(appsthreads[fullpath(app)], InterruptException())
    catch ex
      @error ex
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

  res = HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/up")

  String(res.body) |> JSON3.read |> json
end

macro ifonline(app)
  quote
    appstatus = status_request($(esc(app)))
    appstatus != :online && return json(:status => appstatus)

    true
  end
end

function json2json(res)
  String(res.body) |> JSON3.read |> json
end

function down(app)
  @ifonline(app) && HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/down") |> json2json
end

function dir(app)
  @ifonline(app) && HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/dir?path=$(params(:path, "."))") |> json2json
end

function edit(app)
  @ifonline(app) && HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/edit?path=$(params(:path, "."))") |> json2json
end

function save(app)
  @ifonline(app) && HTTP.request("POST",
                      "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/save?path=$(params(:path, "."))",
                      [],
                      HTTP.Form(Dict("payload" => jsonpayload()["payload"]))
                    ) |> json2json
end

function log(app)
  @ifonline(app) && HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/log") |> json2json
end

function errors(app)
  @ifonline(app) && HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/errors") |> json2json
end

function pages(app)
  @ifonline(app) && HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/pages") |> json2json
end

function assets(app)
  @ifonline(app) && HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/assets") |> json2json
end

end
