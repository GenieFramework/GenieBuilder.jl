using Genie, Logging

Genie.Configuration.config!(
  server_port                     = 10101,
  websockets_port                 = 10102,
  server_host                     = "127.0.0.1",
  log_level                       = Logging.Info,
  log_to_file                     = true,
  server_handle_static_files      = true,
  path_build                      = "build",
  format_julia_builds             = true,
  format_html_output              = true,
  cors_allowed_origins            = ["*"]
)

Genie.config.cors_headers["Access-Control-Allow-Origin"] = "*"
Genie.config.cors_headers["Access-Control-Allow-Headers"] = "Content-Type"

ENV["JULIA_REVISE"] = "auto"
