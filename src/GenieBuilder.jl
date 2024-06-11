module GenieBuilder

using Genie, Logging, TOML
using GenieCache, GenieCacheFileCache

import Pkg

include("Generators.jl")
include("Licensing.jl")
include("Actions.jl")
using .Generators
using .Licensing
using .Actions

const GBDIR = Ref{String}("")
const DB_FOLDER = Ref{String}("")
const DB_CONFIG_FILE = Ref{String}("")
const LOG_FOLDER = Ref{String}("")
const RUN_STATUS = Ref{Symbol}() # :install or :update
const WS_PORT = 10102
const VERSION = "0.16.x"

function __init__()
  GBDIR[] = joinpath(Base.DEPOT_PATH[1], "geniebuilder")
  DB_FOLDER[] = joinpath(GBDIR[], "db")
  DB_CONFIG_FILE[] = "connection.yml"
  Genie.config.server_document_root = abspath(joinpath(@__DIR__, "..", "public"))
  LOG_FOLDER[] = joinpath(GBDIR[], "log")
  Genie.config.path_log = LOG_FOLDER[]
  GenieCacheFileCache.cache_path!(joinpath(Base.DEPOT_PATH[1], "geniebuilder", "cache"))
  install()

  get!(ENV, "GENIE_BANNER", "false")
end

function main()
  Core.eval(Main, :(const UserApp = $(@__MODULE__)))

  Genie.genie(; context = @__MODULE__)

  Core.eval(Main, :(const Genie = UserApp.Genie))
  Core.eval(Main, :(using Genie))
end

function update()
  @info "Updating GenieBuilder"
  Pkg.update()

  nothing
end

function go(; port = get!(ENV, "GB_PORT", -1))
  @info "Starting GenieBuilder v$(get_version())"
  @async set_starting_flag() |> errormonitor

  try
    if Genie.Configuration.isprod()
      @async withcache(; key="system_update_GB", expiration=60*60*24) do # 24 hours cache
        @async update()  |> errormonitor
      end  |> errormonitor
    end
  catch
  end

  try
    _go(port)
  catch ex
    @error ex
    exit(1)
  end
end

function _go(port)
  isa(port, Int) || (port = parse(Int, port))

  if haskey(ENV, "RUN_STATUS")
    RUN_STATUS[] = ENV["RUN_STATUS"] |> Symbol
  else
    @debug "RUN_STATUS ENV was not set"
    ENV["RUN_STATUS"] = RUN_STATUS[] = :install
  end

  current_path = normpath(pwd())
  cd(normpath(@__DIR__, ".."))

  try
    Genie.config.log_to_file = true
    Genie.config.path_log = LOG_FOLDER[]

    Genie.go()
    cd(current_path)

    @async begin
      sleep(3)
      clear_starting_flag()
    end |> errormonitor

    port = port == -1 ? Genie.config.server_port : port

    @async Licensing.log(
      type = Actions.ACTION_START_SESSION,
      metadata = Dict(
        :port => port,
        :version => get_version()
      )
    ) |> errormonitor

    Genie.up(port; async = false)
  catch ex
    @error ex
    exit(1)
  end
end

function install(installpath::String = pwd()) :: Nothing
  current_dir = normpath(pwd())
  cd(installpath)

  isdir(GBDIR[]) || mkpath(GBDIR[])
  isdir(LOG_FOLDER[]) || mkpath(LOG_FOLDER[])
  isdir(DB_FOLDER[]) || mkpath(DB_FOLDER[])

  if ! isfile(joinpath(DB_FOLDER[], DB_CONFIG_FILE[]))
    try
      open(joinpath(DB_FOLDER[], DB_CONFIG_FILE[]), "w") do io
        write(io, """
          env: ENV["GENIE_ENV"]

          dev:
            adapter:  SQLite

          prod:
            adapter:  SQLite
        """)
      end
    catch ex
      @error ex
    end
  end

  cd(current_dir)

  nothing
end

function get_version()
  try
    project_toml = abspath(normpath(joinpath(@__DIR__, "..", "Project.toml")))
    p = TOML.parsefile(project_toml)
    get(p, "version", VERSION)
  catch ex
    @error ex
    VERSION
  end
end

function exit()
  GenieBuilder.Licensing.log(type = Actions.ACTION_END_SESSION)
  Genie.Server.down!()
  Base.exit()
end

const configdir = joinpath(homedir(), ".geniebuilder")
const starting_flag = joinpath(configdir, "gbstarting")

function set_starting_flag()
  try
    isdir(configdir) || mkpath(configdir)
    touch(starting_flag)
  catch ex
    @warn "Could not create starting flag file"
    @error ex
  end
end

function clear_starting_flag()
  try
    isfile(starting_flag) && rm(starting_flag)
  catch ex
    @warn "Could not remove starting flag file"
    @error ex
  end
end

atexit() do
  clear_starting_flag()
end

end
