module Settings

using JSON
import GenieBuilder
import Logging

export @check_telemetry

const SETTINGS = Ref{Dict{String, Any}}(Dict{String, Any}())
const ENV_KEYS = Dict(
  "telemetry" => "GENIE_TELEMETRY"
)

macro check_telemetry()
  return quote
    if ! data("telemetry")
      # @show("Telemetry is disabled, skipping logging")
      return
    else
      # @show("Telemetry is enabled")
    end
  end
end

function default_from_env(key::String, default) :: Bool
  haskey(ENV, key) || (ENV[key] = "") # default to empty string
  (isempty(ENV[key]) || ENV[key] == string(default)) && return default # ENV vars are strings
end

function load_settings()
  if isfile(joinpath(GenieBuilder.GBFOLDER, "settings.json"))
    SETTINGS[] = try
      JSON.parsefile(joinpath(GenieBuilder.GBFOLDER, "settings.json"))
    catch ex
      @error ex
      Dict{String, Any}()
    end
  end

  # @show SETTINGS[]

  haskey(SETTINGS[], "settings") || (SETTINGS[] = Dict{String, Any}("settings" => Dict{String, Any}()))
  haskey(SETTINGS[]["settings"], "telemetry") || (SETTINGS[]["settings"]["telemetry"] = default_from_env(ENV_KEYS["telemetry"], true))

  # env overrides settings
  haskey(ENV, ENV_KEYS["telemetry"]) && ! isempty(ENV[ENV_KEYS["telemetry"]]) && (SETTINGS[]["settings"]["telemetry"] = ENV[ENV_KEYS["telemetry"]])

  nothing
end

function data()
  haskey(SETTINGS[], "settings") || load_settings()
  # @show SETTINGS[]
  return SETTINGS[]["settings"]
end

function data(key::String)
  return data()[key]
end

function __init__()
  load_settings()
end

end