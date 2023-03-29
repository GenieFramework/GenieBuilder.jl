
const AUTO_SYNC_INTERVAL = 30 # seconds
const SYNC_DELAY = 2 # seconds

function datasync()::Nothing
  container_online()
  importapps()

  nothing
end

function init()::Nothing
  container_started()
  datasync()

  while AUTO_SYNC_INTERVAL > 0
    sleep(AUTO_SYNC_INTERVAL)
    datasync()
  end

  nothing
end

function getapps()
  try
    response = HTTP.get(GC_API_ENDPOINT_APPS; headers = GC_API_HEADERS, status_exception = false)

    String(response.body) |> JSON3.read
  catch
    # @error e
    Vector{JSON3.Object}()
  end
end

function importapps()::Nothing
  for app in getapps()
    # @debug app

    # retrieve matching app from GenieBuilder database
    existing_app = try
      findone(GenieBuilder.Applications.Application, name = app.name)
    catch ex
      # @error ex
      continue
    end


    # if the app is in error state or deleted, update the status of GenieCloud app end continue
    if existing_app !== nothing && (
      GenieBuilder.ApplicationsController.status == GenieBuilder.ApplicationsController.DELETED_STATUS ||
      GenieBuilder.ApplicationsController.status == GenieBuilder.ApplicationsController.ERROR_STATUS)

      @async updateapp(existing_app, 0)
      continue
    end

    # if the app is creating, starting or offline and does not exist locally, create it locally
    if existing_app === nothing
      if app.dev_status == GenieBuilder.ApplicationsController.CREATING_STATUS ||
          app.dev_status == GenieBuilder.ApplicationsController.STARTING_STATUS ||
            app.dev_status == GenieBuilder.ApplicationsController.OFFLINE_STATUS
        GenieBuilder.ApplicationsController.create(app.name)
        @async updateapp(existing_app, SYNC_DELAY)
      end

      # rest of the actions are only for existing apps
      continue
    end

    # if the app is in starting state but not starting nor online, start it from GenieBuilder
    if app.dev_status == GenieBuilder.ApplicationsController.STARTING_STATUS &&
            existing_app.status != GenieBuilder.ApplicationsController.STARTING_STATUS &&
              existing_app.status != GenieBuilder.ApplicationsController.ONLINE_STATUS
      GenieBuilder.ApplicationsController.start(existing_app)
      @async updateapp(existing_app, SYNC_DELAY)
      continue
    end

    # if the app is in stopping state but not stopping nor offline, stop it from GenieBuilder
    if app.dev_status == GenieBuilder.ApplicationsController.STOPPING_STATUS &&
            existing_app.status != GenieBuilder.ApplicationsController.OFFLINE_STATUS &&
              existing_app.status != GenieBuilder.ApplicationsController.STOPPING_STATUS
      GenieBuilder.ApplicationsController.stop(existing_app)
      @async updateapp(existing_app, SYNC_DELAY)
      continue
    end

    # if the app is in deleting state, delete it from GenieBuilder -- but do not purge the app
    if app.dev_status == GenieBuilder.ApplicationsController.DELETING_STATUS
      GenieBuilder.ApplicationsController.delete(existing_app)
      @async updateapp(existing_app, SYNC_DELAY)
      continue
    end
  end

  nothing
end

function updateapp(app, delay = 0)::Nothing
  sleep(delay)
  try
    response = HTTP.patch(GC_API_ENDPOINT_APPS * "/$(app.name)";
                          headers = GC_API_HEADERS,
                          body = Dict(
                                        "name" => app.name,
                                        "devStatus" => app.status,
                                        "devPort" => app.port,
                                      ) |> JSON3.write,
                          status_exception = false
                        )
    @debug response.body |> String
  catch
    # @error e
  end

  nothing
end

function deployapp(app)::Nothing
  prod_app_action(app, :deploy)
end

function unpublishapp(app)::Nothing
  prod_app_action(app, :unpublish)
end

function suspendapp(app)::Nothing
  prod_app_action(app, :suspend)
end

function resumeapp(app)::Nothing
  prod_app_action(app, :resume)
end

function prod_app_action(app, action)::Nothing
  try
    response = HTTP.get(GC_API_ENDPOINT_APPS * "/$(app.name)/$action/prod";
                        headers = GC_API_HEADERS,
                        status_exception = false
                        )
    @debug response.body |> String
  catch
    # @error e
  end
end

function container_started(delay = 0)::Nothing
  update_container_status(delay; status = GenieBuilder.ApplicationsController.STARTED_STATUS)
end

function container_online(delay = 0)::Nothing
  update_container_status(delay; status = GenieBuilder.ApplicationsController.ONLINE_STATUS)
end

function container_idle()
  update_container_status(0; status = GenieBuilder.ApplicationsController.STOPPING_STATUS)
end

function container_active()
  update_container_status(0; status = GenieBuilder.ApplicationsController.ONLINE_STATUS)
end

function update_container_status(delay = 0; status)::Nothing
  sleep(delay)
  try
    response = HTTP.patch(GC_API_ENDPOINT_CONTAINERS * "/?heartbeat=true";
                          headers = GC_API_HEADERS,
                          body = Dict("status" => status) |> JSON3.write,
                          status_exception = false
                        )
    @debug response.body |> String
  catch e
    # @error e
  end

  nothing
end

function user_info()
  try
    response = HTTP.get(GC_API_ENDPOINT_USER * "/me";
                        headers = GC_API_HEADERS,
                        status_exception = false)

    String(response.body) |> JSON3.read
  catch e
    @error e
    Dict()
  end
end