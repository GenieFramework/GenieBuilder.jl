module GenieCloud

using HTTP
using JSON3
using SearchLight

import GenieBuilder

function __init__()
  @static if haskey(ENV, "GC_API_ENDPOINT") && haskey(ENV, "GC_API_TOKEN")
    @eval begin
      const GC_API_VERSION = "/api/v1"
      const GC_API_ENDPOINT_USERS = ENV["GC_API_ENDPOINT"] * "/$GC_API_VERSION"
      const GC_API_ENDPOINT_APPS = ENV["GC_API_ENDPOINT"] * "/$GC_API_VERSION" * "/apps"
      const GC_API_ENDPOINT_CONTAINERS = ENV["GC_API_ENDPOINT"] * "/$GC_API_VERSION" * "/containers"
      const GC_API_HEADERS = [
        "Authorization" => "bearer $(ENV["GC_API_TOKEN"])",
        "Content-Type" => "application/json",
        "Accept" => "application/json",
      ]
    end

    include("geniecloud_enabled.jl")
  else
    include("geniecloud_disabled.jl")
  end
end

end # GenieCloud