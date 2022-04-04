using SearchLight
using Genie

try
  dbpath = normpath(joinpath("..", "..", "db", "$(Genie.config.app_env).sqlite3"))
  isfile(dbpath) && chmod(dbpath, "0o664")
catch ex
  @error ex
end

try
  SearchLight.Configuration.load()

  if SearchLight.config.db_config_settings["adapter"] !== nothing
    eval(Meta.parse("using SearchLight$(SearchLight.config.db_config_settings["adapter"])"))
    SearchLight.connect()
  end
catch ex
  @error ex
end