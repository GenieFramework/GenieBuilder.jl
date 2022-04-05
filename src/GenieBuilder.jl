module GenieBuilder

using Genie, Logging, LoggingExtras

function main()
  Core.eval(Main, :(const UserApp = $(@__MODULE__)))

  Genie.genie(; context = @__MODULE__)

  Core.eval(Main, :(const Genie = UserApp.Genie))
  Core.eval(Main, :(using Genie))
end

function go()
  cd(normpath(@__DIR__, ".."))
  Genie.go()
  @eval Genie.up(; async = false)
end

function postinstall()
  cd(normpath(joinpath(@__DIR__, "..")))
  # chmod(normpath("."), 0o775; recursive = true)
  Genie.Generator.write_secrets_file()
  dbpath = normpath(joinpath(".", "db"))
  ispath(dbpath) ? chmod(dbpath, 0o775; recursive = true) : @warn("db path $dbpath does not exist")
end

end
