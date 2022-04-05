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
  try
    @eval Genie.up(; async = false)
  catch ex
    @error ex
    stop()
  finally
    stop()
  end
end

function postinstall()
  cd(normpath(joinpath(@__DIR__, "..")))
  Genie.Generator.write_secrets_file()
  dbpath = normpath(joinpath(".", "db"))
  ispath(dbpath) ? chmod(dbpath, 0o775; recursive = true) : @warn("db path $dbpath does not exist")
end

function stop()
  Genie.AppServer.down!()
  exit()
end

end
