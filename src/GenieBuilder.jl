module GenieBuilder

using Genie, Logging, LoggingExtras
using Scratch, TOML

@show ENV

const GBDIR = Ref{String}("")

function persist_settings()
  KEYNAME = "GBDIR"

  settings_folder = get_scratch!(Main, "geniebuilder")
  settings_file = joinpath(settings_folder, "settings.toml")

  if isfile(settings_file)
    settings = TOML.tryparsefile(settings_file)
    isa(settings, Dict) || (settings = Dict{String,Any}())
  else
    settings = Dict{String,Any}()
  end

  haskey(ENV, KEYNAME) && (settings[KEYNAME] = ENV[KEYNAME])
  haskey(settings, KEYNAME) || (settings[KEYNAME] = joinpath(homedir(), ".julia", "geniebuilder"))

  open(settings_file, "w") do io
    TOML.print(io, settings)
  end

  GBDIR[] = settings[KEYNAME]
end

function __init__()
  persist_settings()
end

const APPS_FOLDER = joinpath(GBDIR[], "apps")
const DB_FOLDER = joinpath(GBDIR[], "db")
const DB_NAME = "client.sqlite3"
const DB_CONFIG_FILE = "connection.yml"

@debug APPS_FOLDER
@debug DB_FOLDER

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

  isdir(DB_FOLDER) || mkdir(DB_FOLDER)
  cp(joinpath(dbpath, DB_NAME), joinpath(DB_FOLDER, DB_NAME))
  open(joinpath(DB_FOLDER, DB_CONFIG_FILE), "w") do io
    write(io, """
      env: ENV["GENIE_ENV"]

      dev:
        adapter:  SQLite
        database: $DB_FOLDER/client.sqlite3
        config:
    """)
  end
end

function stop()
  Genie.Server.down!()
  Base.exit()
end

end
