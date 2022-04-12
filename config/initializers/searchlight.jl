import GenieBuilder

using SearchLight
using Genie

dbpath = normpath(joinpath(GenieBuilder.DB_FOLDER, GenieBuilder.DB_NAME))
isfile(dbpath) && chmod(dbpath, 0o664)

SearchLight.Configuration.load(joinpath(DB_FOLDER, DB_CONFIG_FILE))

if SearchLight.config.db_config_settings["adapter"] !== nothing
  eval(Meta.parse("using SearchLight$(SearchLight.config.db_config_settings["adapter"])"))
  SearchLight.connect()
end