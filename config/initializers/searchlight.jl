import GenieBuilder

using SearchLight
using Genie

@delay SearchLight.Configuration.load(joinpath(GenieBuilder.DB_FOLDER[], GenieBuilder.DB_CONFIG_FILE[]))

if SearchLight.config.db_config_settings["adapter"] !== nothing
  @delay Core.eval(@__MODULE__, Meta.parse("using SearchLight$(SearchLight.config.db_config_settings["adapter"])"))
  @delay SearchLight :connect
  @delay SearchLight.Migrations :init
  @delay SearchLight.Migrations :allup
end