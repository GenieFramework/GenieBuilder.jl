using Genie, Logging

const config = Genie.Configuration.config!(
  server_port                     = 10101,
  server_host                     = "0.0.0.0",
  log_level                       = Logging.Error,
  log_to_file                     = false,
  server_handle_static_files      = true, # for best performance set up Nginx or Apache web proxies and set this to false
  path_build                      = "build",
  format_julia_builds             = false,
  format_html_output              = false,
  cors_allowed_origins            = ["*"]
)

config.cors_headers["Access-Control-Allow-Origin"] = "*"
config.cors_headers["Access-Control-Allow-Headers"] = "Content-Type"