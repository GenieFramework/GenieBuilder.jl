module GenieCloud

using HTTP
using JSON3
using SearchLight

import GenieBuilder

function __init__()
  @static if haskey(ENV, "GC_API_ENDPOINT") && haskey(ENV, "GC_API_TOKEN")
    include("geniecloud_enabled.jl")
  else
    include("geniecloud_disabled.jl")
  end
end

end # GenieCloud