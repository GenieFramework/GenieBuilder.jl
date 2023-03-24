function init()::Nothing
  @debug "GenieCloud integration is not enabled.
  Please set the GC_API_ENDPOINT and GC_API_TOKEN environment variables."

  nothing
end

function updateapp(app, delay = 0)::Nothing
  nothing
end

function container_idle()::Nothing
  nothing
end

function container_active()::Nothing
  nothing
end

function deployapp(_)::Nothing
  nothing
end

function unpublishapp(_)::Nothing
  nothing
end

function suspendapp(_)::Nothing
  nothing
end

function resumeapp(_)::Nothing
  nothing
end