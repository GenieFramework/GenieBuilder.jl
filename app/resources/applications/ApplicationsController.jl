module ApplicationsController

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

function notify(message::String, app_id::SearchLight.DbId, status::String = "OK", type::String = "info",
                eventid::String = params(:eventid, "0")) :: Bool
  Genie.WebChannels.unsubscribe_disconnected_clients()

  Genie.WebChannels.broadcast(
    Dict(
      :message    => message,
      :appid      => app_id.value,
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

  notify("started:start", app.id)
  try
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

  notify("started:stop", app.id)
  try
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

  notify("started:up", app.id)
  res = try
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
    notify("started:down", app.id)
    res = try
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
    notify("started:dir", app.id)
    res = try
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
    notify("started:edit", app.id)
    res = try
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
    notify("started:save", app.id)
    res = try
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
    notify("started:log", app.id)
    res = try
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
    notify("started:errors", app.id)
    res = try
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
    notify("started:pages", app.id)
    res = try
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
    notify("started:assets", app.id)
    res = try
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
    notify("started:startrepl", app.id)
    res = try
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
