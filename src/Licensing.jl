"""
Licensing integration for JuliaHub
"""
module Licensing

using HTTP, JSON, Logging, Random

const LICENSE_API = get!(ENV, "GENIE_LICENSE_API", "https://genielicensing.hosting.genieframework.com/api/v1") # no trailing slash
# const LICENSE_API = get!(ENV, "GENIE_LICENSE_API", "http://127.0.0.1:3333/api/v1") # no trailing slash #TODO: change this to the production URL
const FAILED_SESSION_ID = ""

const GBFOLDER = joinpath(homedir(), ".geniebuilder")
const GBPASSFILE = joinpath(GBFOLDER, "pass")
const GBSESSIONFILE = joinpath(GBFOLDER, "sessionid")

@inline function is_failed_session() :: Bool
  get(ENV, "GENIE_SESSION", FAILED_SESSION_ID) == FAILED_SESSION_ID
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
  subscription_info = fetch_subscription_info() # fetch JH subscription info TODO:
  @async update_user_info(subscription_info) |> errormonitor # update user info in the GLS backend TODO:

  if is_subscription_expired(subscription_info)
    @warn("Subscription expired")
    logoff()

    return ENV["GENIE_SESSION"]
  end

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

function headers()
  Dict(
    "Authorization" => "Bearer " * ENV["GENIE_SESSION"],
    "Content-Type" => "application/json"
  )
end

# TODO: implement this
function fetch_subscription_info()
  # 1/ retrieve the subscription info from JuliaHub API and return it

  Dict()
end

# TODO: implement this
function update_user_info(subscription_info) :: Nothing
  # 1/ update the user info in the GLS backend

  nothing
end

function is_subscription_expired(subscription_info) :: Bool
  # 1/ check if the subscription is expired
  false
end

function log(origin, type, payload::AbstractDict)
  if is_failed_session()
    @warn("No session found, skipping logging")
    return
  end

  response = try
    HTTP.post(LICENSE_API * "/action";
              body = Dict(
                "origin" => origin,
                "type" => type,
                "metadata" => payload |> JSON.json
              ),
              headers = headers(),
              status_exception = true
    )
  catch ex
    @warn("Failed to log action: $ex")
    @async start_session() |> errormonitor
    return
  end

  @show response

  nothing
end

function quotas()
  if is_failed_session()
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
  if is_failed_session()
    return Dict()
  end

  quotas_data = try
    HTTP.get(LICENSE_API * "/status";
              status_exception = true,
              headers = headers()
    )
  catch ex
    @warn("Failed to get status: $ex")
    @async start_session() |> errormonitor
    return Dict()
  end

  if quotas_data.status != 200
    return Dict()
  end

  try
    (quotas_data.body |> String |> JSON.parse)
  catch ex
    # @warn("Failed to parse status data: $ex")
    return Dict()
  end
end

function __init__() #TODO: uncouple this
  ENV["GENIE_USER_EMAIL"] = get(ENV, "JULIAHUB_USEREMAIL", "")
  ENV["GENIE_USER_FULL_NAME"] =  get(ENV, "JULIAHUB_USER_FULL_NAME", "")
  ENV["GENIE_ORIGIN"] = get(ENV, "JULIA_PKG_SERVER", "JULIAHUB")
  ENV["GENIE_METADATA"] = get(ENV, "JULIAHUB_APP_URL", "")

  @eval const USER_EMAIL = get!(ENV, "GENIE_USER_EMAIL", "")
  @eval const USER_FULL_NAME = get!(ENV, "GENIE_USER_FULL_NAME", "")
  @eval const ORIGIN = get!(ENV, "GENIE_ORIGIN", "JULIAHUB")
  @eval const METADATA = get!(ENV, "GENIE_METADATA", "")
end



end
