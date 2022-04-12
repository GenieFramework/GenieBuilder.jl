module ApplicationsController

import GenieBuilder

using Applications
using SearchLight
using Genie.Router
using Genie.Renderers.Json
using Genie.Requests
using HTTP
using JSON3
using GenieDevTools
using Genie.WebChannels
using Dates

const appsthreads = Dict()
const apphost = "http://127.0.0.1"

const FAILSTATUS = "KO"

fullpath(app::Application) = abspath(app.path * app.name)
get(appid) = SearchLight.findone(Application, id = parse(Int, appid))

function notify(message::String,
                appid::Union{SearchLight.DbId,Nothing} = nothing,
                status::String = "OK",
                type::String = "info",
                eventid::String = params(:eventid, "0")) :: Bool
  Genie.WebChannels.unsubscribe_disconnected_clients()

  Genie.WebChannels.broadcast(
    Dict(
      :message    => message,
      :appid      => isnothing(appid) ? 0 : appid.value,
      :status     => status,
      :type       => type,
      :eventid    => eventid,
      :timestamp  => Dates.now()
    ) |> JSON3.write
  )

  true
end

function apps()
  (:applications => all(Application)) |> json
end

function postcreate()
  pkgcmd = "add"
  `julia -e "using Pkg;Pkg.activate(\".\");
              Pkg.$(pkgcmd)(\"GenieAutoReload\");
              Pkg.$(pkgcmd)(url=\"https://github.com/GenieFramework/GenieDevTools.jl\");
              Pkg.$(pkgcmd)(\"Stipple\");
              Pkg.$(pkgcmd)(\"StippleUI\");
              Pkg.$(pkgcmd)(\"StipplePlotly\");"` |> run

  open(joinpath(Genie.config.path_initializers, "autoload.jl"), "w") do io
    write(io,
    """
    push!(LOAD_PATH,  "controllers", "models")
    """
    )
  end

  isdir(Genie.config.path_plugins) || mkdir(Genie.config.path_plugins)
  isdir("controllers") || mkdir("controllers")
  isdir("layouts") || mkdir("layouts")
  isdir("models") || mkdir("models")
  isdir("views") || mkdir("views")

  open(joinpath(Genie.config.path_plugins, "autoreload.jl"), "w") do io
    write(io,
    """
    using GenieAutoReload

    if ( Genie.Configuration.isdev() )
      Genie.config.websockets_server = true
      @async GenieAutoReload.autoreload(pwd())
    end
    """
    )
  end

  open(joinpath(Genie.config.path_plugins, "devtools.jl"), "w") do io
    write(io,
    """
    using GenieDevTools

    if ( Genie.Configuration.isdev() )
      GenieDevTools.register_routes()
    end
    """
    )
  end

  open(joinpath(Genie.config.path_plugins, "sessionstorage.jl"), "w") do io
    write(io,
    """
    using Stipple
    using Stipple.ModelStorage.Sessions

    Stipple.ModelStorage.Sessions.init()
    """
    )
  end

  open(joinpath("layouts", "app.jl.html"), "w") do io
    write(io,
    """
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Hello Genie</title>
        <% Genie.Assets.favicon_support() %>
      </head>
      <body>
        <% page(model, partial = true, [@yield]) %>
        <% GenieAutoReload.assets() %>
      </body>
    </html>
    """
    )
  end

  open(joinpath("views", "hello.jl.html"), "w") do io
    write(io,
    """
    <h1>Welcome!</h1>
    """
    )
  end

  open("routes.jl", "w") do io
    write(io,
    """
    using Stipple
    using StippleUI
    using StipplePlotly

    using GenieAutoReload

    using Stipple.Pages
    using Stipple.ModelStorage.Sessions

    Page("/", view = "views/hello.jl.html",
              layout = "layouts/app.jl.html",
              context = @__MODULE__)
    """
    )
  end
end

function create(name, path, port)
  name = Genie.Generator.validname(name)
  isempty(path) && (path = GenieBuilder.APPS_FOLDER)
  endswith(path, "/") || (path = "$path/")

  app = Application(; name, path, port)
  app = save!(app)

  # make sure apps/ folder exists

  current_path = pwd()
  output = (:application => app)

  try
    notify("started:create_app")
    cd(path)
    Genie.Generator.newapp(name, autostart = false, interactive = false)
    postcreate()
    notify("ended:create_app", app.id)
  catch ex
    @error ex
    delete(app)
    notify("failed:create_app", app.id)

    output = (:error => ex)
  finally
    cd(current_path)
  end

  output|> json
end

function status_request(app, donotify::Bool = true)
  status = try
    donotify && notify("started:status_request", app.id)
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
      donotify && notify("failed:status_request", app.id)
      :error
    end
  end
  donotify && notify("ended:status_request", app.id)

  status
end

function status(app)
  notify("started:status", app.id)
  status = status_request(app)

  notify("ended:status:$status", app.id)
  (:status => status) |> json
end

function start(app)
  appstatus = status_request(app)
  appstatus != :offline && notify("failed:start:$appstatus", app.id, FAILSTATUS, "error") && return (:status => appstatus) |> json

  try
    notify("started:start", app.id)
    appsthreads[fullpath(app)] = Base.Threads.@spawn begin
      try
        `julia -e "cd(\"$(fullpath(app))\");ENV[\"PORT\"]=$(app.port);using Pkg;Pkg.activate(\".\");using Genie;Genie.loadapp();up(async = false)"` |> run
      catch ex
        @error ex
        notify("failed:start", app.id, FAILSTATUS, "error")
      end
    end

    @async begin
      while status_request(app, false) == :offline
        sleep(0.5)
      end

      notify("ended:start", app.id)
    end
  catch
    notify("failed:start", app.id, FAILSTATUS, "error")
  end

  (:status => :ok) |> json
end

function stop(app)
  appstatus = status_request(app)
  appstatus != :online && notify("failed:stop:$appstatus", app.id, FAILSTATUS, "error") && return (:status => appstatus) |> json

  try
    notify("started:stop", app.id)
    HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/exit")
  catch ex
    @error ex
    notify("failed:stop", app.id, FAILSTATUS, "error")
  end

  (:status => if haskey(appsthreads, fullpath(app))
    try
      Base.throwto(appsthreads[fullpath(app)], InterruptException())
    catch ex
      @error ex
    end

    delete!(appsthreads, fullpath(app))
    notify("ended:stop", app.id)

    :ok
  else
    notify("failed:stop:notfound", app.id, FAILSTATUS, "error")
    :notfound
  end) |> json
end

function up(app)
  appstatus = status_request(app)
  appstatus != :offline && notify("failed:up:$appstatus", app.id, FAILSTATUS, "error") && return (:status => appstatus) |> json

  res = try
    notify("started:up", app.id)
    HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/up")
  catch ex
    @error ex
    notify("failed:up", app.id, FAILSTATUS, "error")
  end

  notify("ended:up", app.id)
  String(res.body) |> JSON3.read |> json
end

macro isonline(app, event)
  quote
    appstatus = status_request($(esc(app)))
    appstatus != :online && notify("failed:$(esc(event))", app.id, FAILSTATUS, "error") && return json(:status => appstatus)

    true
  end
end

function json2json(res)
  String(res.body) |> JSON3.read |> json
end

function down(app)
  if @isonline(app, "down")
    res = try
      notify("started:down", app.id)
      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/down")
    catch ex
      @error ex
      notify("failed:down", app.id, FAILSTATUS, "error")
    end

    notify("ended:down", app.id)
    res |> json2json
  end
end

function dir(app)
  if @isonline(app, "dir")
    res = try
      notify("started:dir", app.id)
      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/dir?path=$(params(:path, "."))")
    catch ex
      @error ex
      notify("failed:dir", app.id, FAILSTATUS, "error")
    end

    notify("ended:dir", app.id)
    res |> json2json
  end
end

function edit(app)
  if @isonline(app, "edit")
    res = try
      notify("started:edit", app.id)
      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/edit?path=$(params(:path, "."))")
    catch ex
      @error ex
      notify("failed:edit", app.id, FAILSTATUS, "error")
    end

    notify("ended:edit", app.id)
    res |> json2json
  end
end

function save(app)
  if @isonline(app, "save")
    res = try
      notify("started:save", app.id)
      HTTP.request( "POST",
                    "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/save?path=$(params(:path, "."))",
                      [], HTTP.Form(Dict("payload" => jsonpayload()["payload"])))
    catch ex
      @error ex
      notify("failed:save", app.id, FAILSTATUS, "error")
    end

    notify("ended:save", app.id)
    res |> json2json
  end
end

function log(app)
  if @isonline(app, "log")
    res = try
      notify("started:log", app.id)
      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/log")
    catch ex
      @error ex
      notify("failed:log", app.id, FAILSTATUS, "error")
    end

    notify("ended:log", app.id)
    res |> json2json
  end
end

function errors(app)
  if @isonline(app, "errors")
    res = try
      notify("started:errors", app.id)
      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/errors")
    catch ex
      @error ex
      notify("failed:errors", app.id, FAILSTATUS, "error")
    end

    notify("ended:errors", app.id)
    res |> json2json
  end
end

function pages(app)
  if @isonline(app, "pages")
    res = try
      notify("started:pages", app.id)
      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/pages")
    catch ex
      @error ex
      notify("failed:pages", app.id, FAILSTATUS, "error")
    end

    notify("ended:pages", app.id)
    res |> json2json
  end
end

function assets(app)
  if @isonline(app, "assets")
    res = try
      notify("started:assets", app.id)
      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/assets")
    catch ex
      @error ex
      notify("failed:assets", app.id, FAILSTATUS, "error")
    end

    notify("ended:assets", app.id)
    res |> json2json
  end
end

function startrepl(app)
  if @isonline(app, "startrepl")
    res = try
      notify("started:startrepl", app.id)
      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/startrepl")
    catch ex
      @error ex
      notify("failed:startrepl", app.id, FAILSTATUS, "error")
    end

    notify("ended:startrepl", app.id)
    res |> json2json
  end
end

end
