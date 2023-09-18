module GenieBuilder

using Genie, Logging

include("Generators.jl")
using .Generators

const GBDIR = Ref{String}("")
const DB_FOLDER = Ref{String}("")
const DB_CONFIG_FILE = Ref{String}("")
const LOG_FOLDER = Ref{String}("")
const RUN_STATUS = Ref{Symbol}() # :install or :update
const WS_PORT = 10102

function __init__()
  GBDIR[] = joinpath(Base.DEPOT_PATH[1], "geniebuilder")
  DB_FOLDER[] = joinpath(GBDIR[], "db")
  DB_CONFIG_FILE[] = "connection.yml"
  Genie.config.server_document_root = abspath(joinpath(@__DIR__, "..", "public"))
  LOG_FOLDER[] = joinpath(GBDIR[], "log")
  Genie.config.path_log = LOG_FOLDER[]

  get!(ENV, "GENIE_BANNER", "false")
end

function main()
  Core.eval(Main, :(const UserApp = $(@__MODULE__)))

  Genie.genie(; context = @__MODULE__)

  Core.eval(Main, :(const Genie = UserApp.Genie))
  Core.eval(Main, :(using Genie))
end

function go(; port = get!(ENV, "GB_PORT", -1))
  if haskey(ENV, "RUN_STATUS")
    RUN_STATUS[] = ENV["RUN_STATUS"] |> Symbol
  else
    @debug "RUN_STATUS ENV was not set"
    ENV["RUN_STATUS"] = RUN_STATUS[] = :install
  end

  cd(normpath(@__DIR__, ".."))
  Genie.go()
  port = port == -1 ? Genie.config.server_port : port
  try
    Genie.up(port; async = false)
  catch ex
    @error ex
    stop()
  finally
    stop()
  end
end

function install(installdir::String)
  cd(normpath(installdir))
  Genie.Secrets.secret_file_exists() || Genie.Generator.write_secrets_file()

  isdir(LOG_FOLDER[]) || mkpath(LOG_FOLDER[])
  isdir(DB_FOLDER[]) || mkpath(DB_FOLDER[])

  if ! isfile(joinpath(DB_FOLDER[], DB_CONFIG_FILE[]))
    open(joinpath(DB_FOLDER[], DB_CONFIG_FILE[]), "w") do io
      write(io, """
        env: ENV["GENIE_ENV"]

        dev:
          adapter:  SQLite

        prod:
          adapter:  SQLite
      """)
    end
  end
end

function stop()
  Genie.Server.down!()
  Base.exit()
end

end
