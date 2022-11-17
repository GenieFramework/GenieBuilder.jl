
window.GlobalConfig = window.GlobalConfig || { };

// Global config
GlobalConfig.GBJL_PROTOCOL =  window.location.protocol.split(":").join("");
GlobalConfig.GBJL_HOST =  window.location.hostname;
GlobalConfig.GBJL_PATH =  window.location.pathname;
GlobalConfig.GBJL_PORT =  window.location.port;

console.log( "GlobalConfig: ", GlobalConfig)