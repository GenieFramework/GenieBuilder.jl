module Dashboards

using Stipple, StippleUI
using DataFrames
using Applications

using HTTP
using JSON3
using GenieDevTools

export Dashboard

@reactive mutable struct Dashboard <: ReactiveModel
  apps = DataFrame(Application) |> DataTable
  current_app_url = R("http://localhost:9000")
  current_app_files = R([])
end

function handlers(m)
  on(m.isready) do _
    m.current_app_files[] = fs()
  end

  m
end

function fs(url = "http://localhost:9000")
  res = HTTP.request("GET", "$url$(GenieDevTools.defaultroute)/fs")
  if res.status == 200
    return res.body |> String |> JSON3.read
  end

  []
end

end