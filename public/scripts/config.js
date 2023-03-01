
window.GlobalConfig = window.GlobalConfig || { };

// Global config
GlobalConfig.GB_SOURCE_LOCAL = 'local';
GlobalConfig.GB_SOURCE_CLOUD = 'cloud';
GlobalConfig.GBJL_PROTOCOL =  window.location.protocol.split(":").join("");
GlobalConfig.GBJL_HOST =  window.location.hostname;
GlobalConfig.GBJL_PATH =  window.location.pathname;
GlobalConfig.GBJL_PORT =  window.location.port;
GlobalConfig.GB_SOURCE =  (window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1") ? GlobalConfig.GB_SOURCE_LOCAL : GlobalConfig.GB_SOURCE_CLOUD;

console.log( "GlobalConfig: ", GlobalConfig)