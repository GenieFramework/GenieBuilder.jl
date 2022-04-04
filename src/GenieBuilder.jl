module GenieBuilder

using Genie, Logging, LoggingExtras

function main()
  Core.eval(Main, :(const UserApp = $(@__MODULE__)))

  Genie.genie(; context = @__MODULE__)

  Core.eval(Main, :(const Genie = UserApp.Genie))
  Core.eval(Main, :(using Genie))

  Core.eval(Main, :(Genie.up()))
end

function go(; kwargs...)
  cd(normpath(@__DIR__, ".."))
  Genie.go()
  Genie.up(; kwargs...)
end

end
