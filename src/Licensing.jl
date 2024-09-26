"""
Licensing integration for JuliaHub
"""
module Licensing

using Base64, HTTP, JSON, Logging, Random
import GenieBuilder, GenieBuilder.Settings
import Base: log

const LICENSE_API = get!(ENV, "GENIE_LICENSE_API", "https://genielicensing.hosting.genieframework.com/api/v1") # no trailing slash
# const LICENSE_API = get!(ENV, "GENIE_LICENSE_API", "http://127.0.0.1:3333/api/v1") # no trailing slash #TODO: change this to the production URL

const GBFOLDER = GenieBuilder.GBFOLDER
const GBPASSFILE = joinpath(GBFOLDER, "pass")
const GBSESSIONFILE = joinpath(GBFOLDER, "sessionid")

const COMMERCIAL_LICENSE = Ref{Union{Bool,Nothing}}(nothing)
function commercial_license()
  isnothing(COMMERCIAL_LICENSE[]) && status()
  # @show COMMERCIAL_LICENSE[]
  COMMERCIAL_LICENSE[] == true
end

function isregistered() :: Bool
  isfile(GBPASSFILE)
end

function isloggedin() :: Bool
  if isfile(GBSESSIONFILE)
    token = read(GBSESSIONFILE, String)
    if token != ""
      ENV["GENIE_SESSION"] = token
      ! isempty(status()) && return true
    end
  end

  false
end

function password()
  isdir(GBFOLDER) || mkpath(GBFOLDER)
  pass = randstring('a':'z', 20) * "1!A" # add the postfix to pass the password validation

  if ! isfile(GBPASSFILE)
    touch(GBPASSFILE)
    open(GBPASSFILE, "w") do io
      write(io, pass)
    end

    return pass
  end

  readline(GBPASSFILE)
end

function rmpassword()
  isfile(GBPASSFILE) && rm(GBPASSFILE)
end

function first_last_name(full_name = USER_FULL_NAME)
  parts = split(full_name, " ")
  if length(parts) == 1
    return parts[1], "_"
  end

  return parts[1], parts[end]
end

function register()
  response = try HTTP.post( LICENSE_API * "/register";
                body = Dict(
                  "username" => randstring('a':'z', 12),
                  "password" => password(),
                  "email" => USER_EMAIL,
                  "firstName"  => first_last_name(USER_FULL_NAME)[1],
                  "lastName" => first_last_name(USER_FULL_NAME)[2],
                  "origin" => ORIGIN,
                  "metadata" => Dict("app_url" => METADATA) |> JSON.json
                ),
                status_exception = false
              )
  catch ex
    @error("Failed to make registration request: $ex")
    rmpassword()

    return ""
  end

  if response.status == 400
    body = try
      r = JSON.parse(String(response.body))

      # email already exists
      if haskey(r, "messages") && haskey(r["messages"], "email") && ("Email is already taken" in r["messages"]["email"])
        pass = reset_password()
        ! isempty(pass) && return login()
      end
    catch ex
      @error("Failed to parse registration response: $ex")
      rmpassword()

      return ""
    end
  end

  if response.status == 200
    return String(response.body)
  end

  rmpassword()
  throw("Failed to register: $(response.status) $(String(response.body))")
end

function login()
  response = try HTTP.post( LICENSE_API * "/login";
                body = Dict(
                  "password" => password(),
                  "email" => USER_EMAIL,
                  "origin" => ORIGIN,
                  "metadata" => Dict("app_url" => METADATA) |> JSON.json
                ),
                status_exception = false
              )
  catch ex
    @error("Failed to make login request: $ex")

    return ""
  end

  if response.status == 401
    message = try
      r = JSON.parse(String(response.body))

      if haskey(r, "error") && r["error"] == "Invalid email or password"
        return register()
      end
    catch ex
      @error("Failed to login")
      return ""
    end
  end

  if response.status != 200
    @error("Failed to login: $(response.status) $(String(response.body))")

    return ""
  end

  return String(response.body)
end

function reset_password()
  response = try HTTP.post( LICENSE_API * "/reset_password";
                body = Dict(
                  "email" => USER_EMAIL,
                  "password" => password(),
                  "firstName"  => first_last_name(USER_FULL_NAME)[1],
                  "lastName" => first_last_name(USER_FULL_NAME)[2],
                  "origin" => ORIGIN,
                  "metadata" => Dict("app_url" => METADATA) |> JSON.json
                ),
                status_exception = false
              )
  catch ex
    @error("Failed to make login request: $ex")

    return ""
  end

  if response.status != 200
    @error("Failed to login: $(response.status) $(String(response.body))")

    return ""
  end

  return String(response.body)
end

function logoff() :: Nothing
  rm(GBSESSIONFILE)
  ENV["GENIE_SESSION"] = FAILED_SESSION_ID

  nothing
end

function start_session()
  isloggedin() && return ENV["GENIE_SESSION"]

  session_data = try
    isregistered() ? login() : register()
  catch ex
    @warn("Failed to start session. $ex")
    return ENV["GENIE_SESSION"] = FAILED_SESSION_ID
  end

  if ! isempty(session_data)
    try
      ENV["GENIE_SESSION"] = (session_data |> JSON.parse)["token"]
    catch ex
      @warn("Failed to parse session data: $ex")
      return ENV["GENIE_SESSION"] = FAILED_SESSION_ID
    end

    try
      open(GBSESSIONFILE, "w") do io
        write(io, ENV["GENIE_SESSION"])
      end
    catch ex
      @warn("Failed to save session data: $ex")
    end
  end

  ENV["GENIE_SESSION"]
end

function headers(; content_type::AbstractString = "application/json")
  Dict(
    "Authorization" => "Bearer " * ENV["GENIE_SESSION"],
    "Content-Type" => content_type
  )
end

# log an action
function log(;
              type::Union{AbstractString,Symbol},
              metadata::AbstractDict = Dict(),
              origin::Union{AbstractString,Nothing} = ORIGIN,
              force::Bool = false)
  # we check the telemetry settings only if the force flag is not set and the user has a commercial license
  # otherwise we log the action regardless of the telemetry settings
  ! force && commercial_license() && GenieBuilder.Settings.@check_telemetry

  if ! isloggedin()
    @warn("User not logged in, skipping logging")
    return
  end

  payload = Dict(
    "origin" => origin,
    "type" => type,
    "metadata" => metadata
  )

  response = try
    HTTP.get(LICENSE_API * "/action?payload=$(JSON.json(payload) |> base64encode)";
              headers = headers(),
              status_exception = true,
              detect_content_type = true,
              verbose = false,
              cookies = false,
    )
  catch ex
    @warn("Failed to log action: $ex")
    @async start_session() |> errormonitor
  end

  nothing
end

# logoff user from GBL
function logoff()
  response = try
    HTTP.get(LICENSE_API * "/logoff";
      headers = headers(),
      status_exception = true,
      detect_content_type = true,
      verbose = false,
      cookies = false,
    )
  catch ex
    @warn("Failed to logoff: $ex")
  end

  nothing
end

function quotas()
  # TODO: review this, quotas should not be affected by telemetry settings
  # but let's understand how much traffic this generates first
  GenieBuilder.Settings.@check_telemetry

  if ! isloggedin()
    @warn("User not logged in, skipping quotas")
    return Dict()
  end

  quotas_data = try
    HTTP.get(LICENSE_API * "/quotas";
              status_exception = true,
              headers = headers()
    )
  catch ex
    @warn("Failed to get quotas: $ex")
    @async start_session() |> errormonitor
    return Dict()
  end

  if quotas_data.status != 200
    return Dict()
  end

  try
    (quotas_data.body |> String |> JSON.parse)["quotas"]
  catch ex
    @warn("Failed to parse quotas data: $ex")
    @async start_session() |> errormonitor
    return Dict()
  end
end

function status()
  status_data = try
    HTTP.get(LICENSE_API * "/status";
              status_exception = true,
              headers = headers()
    )
  catch ex
    @warn("Failed to get status: $ex")
    @async start_session() |> errormonitor
    return Dict()
  end

  if status_data.status != 200
    @warn("Failed to get status: $(status_data.status)")
    return Dict()
  end

  try
    user_status = (status_data.body |> String |> JSON.parse)
    COMMERCIAL_LICENSE[] = user_status["license"] != "trial" && user_status["license"] != "edu" && user_status["license_status"] != "expired"
    return user_status
  catch ex
    @error ex
    @warn("Failed to parse status data: $ex")
    return Dict()
  end
end

function __init__() #TODO: uncouple this
  ENV["GENIE_USER_EMAIL"] = get(ENV, "JULIAHUB_USEREMAIL", "")
  ENV["GENIE_USER_FULL_NAME"] =  get(ENV, "JULIAHUB_USER_FULL_NAME", "")
  ENV["GENIE_ORIGIN"] = get(ENV, "JULIA_PKG_SERVER", "local")
  ENV["GENIE_METADATA"] = get(ENV, "JULIAHUB_APP_URL", "")

  @eval const USER_EMAIL = ENV["GENIE_USER_EMAIL"]
  @eval const USER_FULL_NAME = ENV["GENIE_USER_FULL_NAME"]
  @eval const ORIGIN = ENV["GENIE_ORIGIN"]
  @eval const METADATA = ENV["GENIE_METADATA"]
end



end
