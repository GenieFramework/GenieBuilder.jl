module GenieBuilder

using Genie, Logging

const GBDIR = Ref{String}("")
const APPS_FOLDER = Ref{String}("")
const DB_FOLDER = Ref{String}("")
const DB_NAME = Ref{String}("")
const DB_CONFIG_FILE = Ref{String}("")
const LOG_FOLDER = Ref{String}("")
const RUN_STATUS = Ref{Symbol}() # :install or :update

function __init__()
  GBDIR[] = pwd()
  APPS_FOLDER[] = joinpath(GBDIR[], "apps")
  DB_FOLDER[] = joinpath(GBDIR[], "db")
  DB_NAME[] = "client.sqlite3"
  DB_CONFIG_FILE[] = "connection.yml"
  Genie.config.server_document_root = abspath(joinpath(@__DIR__, "..", "public"))
  LOG_FOLDER[] = joinpath(GBDIR[], "log")
  Genie.config.path_log = LOG_FOLDER[]
end

function main()
  Core.eval(Main, :(const UserApp = $(@__MODULE__)))

  Genie.genie(; context = @__MODULE__)

  Core.eval(Main, :(const Genie = UserApp.Genie))
  Core.eval(Main, :(using Genie))
end

function go()
  RUN_STATUS[] = ENV["RUN_STATUS"] |> Symbol

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
  isfile(joinpath(pwd(), Genie.config.path_config, Genie.Secrets.SECRETS_FILE_NAME)) || Genie.Generator.write_secrets_file()

  isdir(LOG_FOLDER[]) || mkpath(LOG_FOLDER[])

  dbpath = normpath(joinpath(".", "db"))
  ispath(dbpath) ? chmod(dbpath, 0o775; recursive = true) : @warn("db path $dbpath does not exist")

  isdir(DB_FOLDER[]) || mkdir(DB_FOLDER[])
  isfile(joinpath(DB_FOLDER[], DB_NAME[])) || cp(joinpath(dbpath, DB_NAME[]), joinpath(DB_FOLDER[], DB_NAME[]))

  if ! isfile(joinpath(DB_FOLDER[], DB_CONFIG_FILE[]))
    open(joinpath(DB_FOLDER[], DB_CONFIG_FILE[]), "w") do io
      write(io, """
        env: ENV["GENIE_ENV"]

        dev:
          adapter:  SQLite
          database: $(DB_FOLDER[])/client.sqlite3
          config:

        prod:
          adapter:  SQLite
          database: $(DB_FOLDER[])/client.sqlite3
          config:
      """)
    end
  end
end

function stop()
  Genie.Server.down!()
  Base.exit()
end

end
