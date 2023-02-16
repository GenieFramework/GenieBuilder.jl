module Integrations

module GenieCloud

using HTTP
using JSON3
using SearchLight

import GenieBuilder

# this wraps the whole module body!
if haskey(ENV, "GC_API_ENDPOINT") && haskey(ENV, "GC_API_TOKEN")
  include("integrations/geniecloud.jl")
else
  function init()::Nothing
    @debug "GenieCloud integration is not enabled.
    Please set the GC_API_ENDPOINT and GC_API_TOKEN environment variables."

    nothing
  end

  function updateapp(app, delay = 0)::Nothing
    nothing
  end

  function container_idle()::Nothing
    nothing
  end
end # end if

end # GenieCloud

end