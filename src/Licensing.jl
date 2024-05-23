module Licensing

using HTTP, JSON, Logging, Random

# const LICENSE_API = get!(ENV, "GENIE_LICENSE_API", "https://genielicensing.hosting.genieframework.com/api/v1") # no trailing slash
const LICENSE_API = get!(ENV, "GENIE_LICENSE_API", "http://127.0.0.1:3333/api/v1") # no trailing slash
const USER_EMAIL = get!(ENV, "GENIE_USER_EMAIL", "__UNKNWON__@juliahub.com")
const USER_FULL_NAME = get!(ENV, "GENIE_USER_FULL_NAME", "JuliaHub User")
const ORIGIN = get!(ENV, "GENIE_ORIGIN", "JULIAHUB")
const METADATA = get!(ENV, "GENIE_METADATA", "")
const FAILED_SESSION_ID = "__failed_session_id__"

const GBFOLDER = joinpath(homedir(), ".geniebuilder")
const GBPASSFILE = joinpath(GBFOLDER, "pass")
const GBSESSIONFILE = joinpath(GBFOLDER, "sessionid")

@inline function is_failed_session()
  return ENV["GENIE_SESSION"] == FAILED_SESSION_ID
end

function isregistered()
  isfile(GBPASSFILE)
end

function password()
  isdir(GBFOLDER) || mkpath(GBFOLDER)
  pass = randstring('a':'z', 20) * "1!A"

  if ! isfile(GBPASSFILE)
    touch(GBPASSFILE)
    open(GBPASSFILE, "w") do io
      write(io, pass)
    end

    return pass
  end

  readline(GBPASSFILE)
end

function first_last_name(full_name = USER_FULL_NAME)
  parts = split(full_name, " ")
  if length(parts) == 1
    return parts[1], "_"
  end

  return parts[1], parts[end]
end

function register()
  response = HTTP.post( LICENSE_API * "/register";
                body = Dict(
                  "username" => randstring('a':'z', 12),
                  "password" => password(),
                  "email" => USER_EMAIL,
                  "firstName"  => first_last_name(USER_FULL_NAME)[1],
                  "lastName" => first_last_name(USER_FULL_NAME)[2],
                  "origin" => ORIGIN,
                  "metadata" => Dict("app_url" => METADATA) |> JSON.json
                ),
                status_exception = true
              )
end

function login()
  HTTP.post( LICENSE_API * "/login";
                body = Dict(
                  "password" => password(),
                  "email" => USER_EMAIL,
                  "origin" => ORIGIN,
                  "metadata" => Dict("app_url" => METADATA) |> JSON.json
                ),
                status_exception = true
              )
end

function start_session()
  session_data = try
    if ! isregistered()
      register()
    else
      login()
    end
  catch ex
    @warn("Failed to start session. Giving up. $ex")
    ENV["GENIE_SESSION"] = FAILED_SESSION_ID

    return
  end

  if session_data.status == 200
    try
      ENV["GENIE_SESSION"] = (session_data.body |> String |> JSON.parse)["token"]
    catch ex
      @warn("Failed to parse session data: $ex")
      ENV["GENIE_SESSION"] = FAILED_SESSION_ID
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
    @warn("Failed to parse status data: $ex")
    return Dict()
  end
end

function __init__() #TODO: uncouple this
  if get(ENV, "JULIAHUB_USEREMAIL", "") != ""
    ENV["GENIE_USER_EMAIL"] = ENV["JULIAHUB_USEREMAIL"]
  end
  if get(ENV, "JULIAHUB_USER_FULL_NAME", "") != ""
    ENV["GENIE_USER_FULL_NAME"] = ENV["JULIAHUB_USER_FULL_NAME"]
  end
  if get(ENV, "JULIA_PKG_SERVER", "") != ""
    ENV["GENIE_ORIGIN"] = ENV["JULIA_PKG_SERVER"]
  end
  if get(ENV, "JULIAHUB_APP_URL", "") != ""
    ENV["GENIE_METADATA"] = ENV["JULIAHUB_APP_URL"]
  end
end



end
