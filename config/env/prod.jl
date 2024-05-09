using Genie, Logging

Genie.Configuration.config!(
  server_port                     = 10101,
  websockets_port                 = 10101,
  server_host                     = (Sys.iswindows() ? "127.0.0.1" : "0.0.0.0"),
  log_level                       = Logging.Error,
  log_to_file                     = true,
  server_handle_static_files      = true, # for best performance set up Nginx or Apache web proxies and set this to false
  path_build                      = "build",
  format_julia_builds             = false,
  format_html_output              = false,
  cors_allowed_origins            = ["*"]
)

ENV["JULIA_REVISE"] = "off"