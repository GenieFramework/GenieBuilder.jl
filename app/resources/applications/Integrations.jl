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
  include("integrations/geniecloud_disabled.jl")
end # end if

end # GenieCloud

end