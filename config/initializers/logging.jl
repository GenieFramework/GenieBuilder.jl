import Genie

log_path, log_name = if haskey(ENV, "GB_LOG_FILE") && ispath(dirname(ENV["GB_LOG_FILE"]))
    (dirname(ENV["GB_LOG_FILE"]), basename(ENV["GB_LOG_FILE"]))
else
    Genie.config.path_log, Genie.Logger.default_log_name()
end

Genie.Logger.initialize_logging(; log_path, log_name)