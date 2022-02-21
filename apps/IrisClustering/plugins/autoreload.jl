using GenieAutoReload

Genie.config.websockets_server = true

@async GenieAutoReload.autoreload(pwd())