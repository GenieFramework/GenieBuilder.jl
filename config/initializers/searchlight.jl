import GenieBuilder

using SearchLight
using Genie

SearchLight.Configuration.load(joinpath(DB_FOLDER[], DB_CONFIG_FILE[]))

if SearchLight.config.db_config_settings["adapter"] !== nothing
  eval(Meta.parse("using SearchLight$(SearchLight.config.db_config_settings["adapter"])"))
  SearchLight.connect()
  SearchLight.Migrations.init()
  SearchLight.Migrations.allup()
end