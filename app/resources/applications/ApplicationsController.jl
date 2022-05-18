module ApplicationsController

import GenieBuilder

using GenieBuilder.Applications
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
const OKSTATUS = "OK"

fullpath(app::Application) = abspath(app.path * app.name)
get(appid) = SearchLight.findone(Application, id = parse(Int, appid))

function notify(message::String,
                appid::Union{SearchLight.DbId,Nothing} = nothing,
                status::String = "OK",
                type::String = "info",
                eventid::String = params(:eventid, "0")) :: Bool
  try
    Genie.WebChannels.unsubscribe_disconnected_clients()
  catch ex
    @error ex
  end

  try
    appid !== nothing && type == "error" && persist_status(SearchLight.findone(Application, id = appid.value), "error")
  catch ex
    @error ex
  end

  try
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
  catch ex
    @error ex
  end

  true
end

function apps()
  (:applications => all(Application)) |> json
end

function info(app)
  (:application => app) |> json
end

function postcreate()
  pkgcmd = "add"
  branch = "Geniev5"
  `julia -e  "using Pkg;
              Pkg.activate(\".\");
              Pkg.$(pkgcmd)(url=\"https://github.com/GenieFramework/Genie.jl\", rev=\"v5\");
              Pkg.$(pkgcmd)(url=\"https://github.com/GenieFramework/GenieSession.jl\");
              Pkg.$(pkgcmd)(url=\"https://github.com/GenieFramework/GenieSessionFileSession.jl\");
              Pkg.$(pkgcmd)(url=\"https://github.com/GenieFramework/GenieAutoReload.jl\");
              Pkg.$(pkgcmd)(url=\"https://github.com/GenieFramework/Stipple.jl\", rev=\"$(branch)\");
              Pkg.$(pkgcmd)(url=\"https://github.com/GenieFramework/StippleUI.jl\", rev=\"$(branch)\");
              Pkg.$(pkgcmd)(url=\"https://github.com/GenieFramework/StipplePlotly.jl\", rev=\"$(branch)\");
              Pkg.$(pkgcmd)(url=\"https://github.com/GenieFramework/GenieDevTools.jl\");
  "` |> run

  open(joinpath(Genie.config.path_initializers, "autoload.jl"), "w") do io
    write(io,
    """
    # Optional flat/non-resource MVC folder structure
    Genie.Loader.autoload(abspath("models"), abspath("controllers"))
    """
    )
  end

  isdir(Genie.config.path_plugins) || mkdir(Genie.config.path_plugins)
  isdir("controllers") || mkdir("controllers")
  isdir("layouts") || mkdir("layouts")
  isdir("models") || mkdir("models")
  isdir("views") || mkdir("views")

  open(joinpath(Genie.config.path_plugins, "devtools.jl"), "w") do io
    write(io,
    """
    using GenieDevTools
    using Stipple
    using GenieAutoReload

    if ( Genie.Configuration.isdev() )
      GenieDevTools.register_routes()
      Stipple.deps!(GenieAutoReload, GenieAutoReload.deps)
      GenieAutoReload.watch([pwd()])
    end
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
        <% Stipple.sesstoken() %>
        <title>Hello Genie</title>
        <% Genie.Assets.favicon_support() %>
      </head>
      <body>
        <% page(model, partial = true, [@yield]) %>
      </body>
    </html>
    """
    )
  end

  open(joinpath("views", "hello.jl.html"), "w") do io
    write(io,
    """
    <h1>Welcome!</h1>
    <p>This is the default view for the application.</p>
    <p>You can change this view by editing the file <code>views/hello.jl.html</code>.</p>
    """
    )
  end

  open("routes.jl", "w") do io
    write(io,
    """
    using Stipple
    using StippleUI
    using StipplePlotly

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
  persist_status(app, :creating)
  app = save!(app)

  # make sure apps/ folder exists

  current_path = pwd()
  output = (:application => app)

  try
    notify("started:create_app")

    Base.Threads.@spawn begin
      cd(path)
      Genie.Generator.newapp(name, autostart = false, interactive = false)
      postcreate()
      persist_status(app, :offline)

      notify("ended:create_app", app.id)
    end
  catch ex
    @error ex
    delete(app)
    notify("failed:create_app", app.id, FAILSTATUS, "error")

    output = (:error => ex)
  finally
    cd(current_path)
  end

  output |> json
end

function persist_status(app, status) :: Bool
  app.status = string(status)

  try
    save!(app)
  catch ex
    @error ex
    false
  end

  true
end

function status_request(app, donotify::Bool = true; statuscheck::Bool = false, persist::Bool = true)
  params(:statuscheck, statuscheck) || return Symbol(app.status)

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
  persist && persist_status(app, status)

  status
end

function status(app)
  notify("started:status", app.id)
  status = status_request(app; statuscheck = true)

  notify("ended:status:$status", app.id)
  (:status => status) |> json
end

function start(app)
  appstatus = status_request(app)

  try
    persist_status(app, "starting")
    notify("started:start", app.id)

    appsthreads[fullpath(app)] = Base.Threads.@spawn begin
      try
        `julia -e "cd(\"$(fullpath(app))\");ENV[\"PORT\"]=$(app.port);ENV[\"WSEXPPORT\"]=$(app.port);ENV[\"CHANNEL__\"]=\"$(app.channel)\";using Pkg;Pkg.activate(\".\");using Genie;Genie.loadapp();up(async = false)"` |> run
      catch ex
        @error ex
        notify("failed:start", app.id, FAILSTATUS, "error")
      end
    end

    @async begin
      while status_request(app, false; statuscheck = true, persist = false) in [:starting, :offline]
        sleep(1)
      end

      notify("ended:start", app.id)
      persist_status(app, "online")
    end
  catch
    notify("failed:start", app.id, FAILSTATUS, "error")
  end

  (:status => :ok) |> json
end

function stop(app)
  status = OKSTATUS
  # err = ""

  try
    persist_status(app, "stopping")
    notify("started:stop", app.id)

    @async HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/exit")

    sleep(1)

    if status_request(app, false; statuscheck = true) == :offline
      notify("ended:stop", app.id)
      persist_status(app, "offline")
    end
  catch ex
    @error ex
    notify("failed:stop", app.id, FAILSTATUS, "error")

    status = :error
    # err = string(ex)
  end

  if haskey(appsthreads, fullpath(app))
    try
      Base.throwto(appsthreads[fullpath(app)], InterruptException())
    catch ex
      @error ex
    end

    delete!(appsthreads, fullpath(app))
  end

  (:status => status) |> json
end

function up(app)
  appstatus = status_request(app)
  appstatus != :offline && notify("failed:up:$appstatus", app.id, FAILSTATUS, "error") && return (:status => appstatus) |> json

  res = try
    persist_status(app, "starting")
    notify("started:up", app.id)

    HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/up")
  catch ex
    @error ex
    notify("failed:up", app.id, FAILSTATUS, "error")
  end

  persist_status(app, "online")
  notify("ended:up", app.id)

  String(res.body) |> JSON3.read |> json
end

macro isonline(app)
  quote
    appstatus = status_request($(esc(app)))
    appstatus != :online && return json(:status => appstatus)

    true
  end
end

function delete(app)
  notify("started:delete", app.id)
  stop(app)

  persist_status(app, "deleted")
  notify("ended:delete", app.id)

  (:status => OKSTATUS) |> json
end

function restore(app)
  notify("started:restore", app.id)

  status = if app.status == "deleted"
    persist_status(app, "offline") ? notify("ended:restore", app.id) : notify("failed:restore", app.id)
    OKSTATUS
  else
    notify("failed:restore", app.id)
    FAILSTATUS
  end

  (:status => status) |> json
end

function purge(app)
  notify("started:purge", app.id)

  status = if app.status == "deleted"
    SearchLight.delete(app)

    try
      rm(fullpath(app); recursive = true)
      notify("ended:purge", app.id)
      OKSTATUS
    catch ex
      notify("failed:purge", app.id)
      FAILSTATUS
    end
  else
    notify("failed:purge", app.id)
    FAILSTATUS
  end

  (:status => status) |> json
end

function json2json(res)
  String(res.body) |> JSON3.read |> json
end

function down(app)
  if @isonline(app)
    res = try
      persist_status(app, "stopping")
      notify("started:down", app.id)

      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/down")
    catch ex
      @error ex
      notify("failed:down", app.id, FAILSTATUS, "error")
    end

    persist_status(app, "offline")
    notify("ended:down", app.id)

    res |> json2json
  end
end

function dir(app)
  if @isonline(app)
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
  if @isonline(app)
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
  if @isonline(app)
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
  if @isonline(app)
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
  if @isonline(app)
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
  if @isonline(app)
    res = try
      notify("started:pages", app.id)

      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/pages?CHANNEL__=$(app.channel)") |> json2json
    catch ex
      @error ex
      notify("failed:pages", app.id, FAILSTATUS, "error")

      (:status => :error) |> json
    end

    notify("ended:pages", app.id)

    res
  end
end

function valid_replport()
  replport = rand(50_000:60_000)
  isempty(find(Application, replport = replport)) || valid_replport()

  replport
end

function startrepl(app)
  if @isonline(app)
    res = try
      notify("started:startrepl", app.id)

      HTTP.request("GET", "$(apphost):$(app.port)$(GenieDevTools.defaultroute)/startrepl?port=$(app.replport != 0 ? app.replport : valid_replport())")
    catch ex
      @error ex
      notify("failed:startrepl", app.id, FAILSTATUS, "error")
    end

    status = try
      status = String(res.body) |> JSON3.read
      if status.status == "OK"
        app.replport = status.port
        save!(app)
      end

      status
    catch ex
      @error ex
    end

    notify("ended:startrepl", app.id)

    status |> json
  end
end

function cleanup()
  for app in find(Application, status = "online")
    stop(app)
  end
end

function reset_app_status()
  for app in find(Application)
    app.status = "offline"

    try
      save!(app)
    catch ex
      @error ex
    end
  end
end

end
