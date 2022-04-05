// Note: All this code needs to be executed only when the HTML template is ready (wheen Vue's root element exists)
function init(){
    Stipple.init({theme: 'stipple-blue'});
    // Note: need to be declared in window
    window.Hello = 
    
    //new Vue({"mixins":[watcherMixin, reviveMixin],"data":{"name":"","surname":"","isready":false,"isprocessing":false,"age":55}});
    new Vue({"el":"#Hello","mixins":[watcherMixin, reviveMixin],"data":{"name":"John","photo":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Lillium_Stamens.jpg/320px-Lillium_Stamens.jpg","surname":"Smith","isready":false,"isprocessing":false,"age":55}});
      Hello.$watch(function(){return this.name}, _.debounce(function(newVal, oldVal){
    Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'name', 'newval': newVal, 'oldval': oldVal}});
  }, 300), {deep: true});


  Hello.$watch(function(){return this.surname}, _.debounce(function(newVal, oldVal){
    Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'surname', 'newval': newVal, 'oldval': oldVal}});
  }, 300), {deep: true});


  Hello.$watch(function(){return this.photo}, _.debounce(function(newVal, oldVal){
    Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'photo', 'newval': newVal, 'oldval': oldVal}});
  }, 300), {deep: true});


  Hello.$watch(function(){return this.age}, _.debounce(function(newVal, oldVal){
    Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'age', 'newval': newVal, 'oldval': oldVal}});
  }, 300), {deep: true});


  Hello.$watch(function(){return this.isready}, _.debounce(function(newVal, oldVal){
    Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'isready', 'newval': newVal, 'oldval': oldVal}});
  }, 300), {deep: true});


  Hello.$watch(function(){return this.isprocessing}, _.debounce(function(newVal, oldVal){
    Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'isprocessing', 'newval': newVal, 'oldval': oldVal}});
  }, 300), {deep: true});


  console.log( "[checkorder] hello parse_payload OVERWRITE" );
    window.parse_payload = function(payload){
        if (payload.key) {
            window.Hello.revive_payload(payload)
            window.Hello.updateField(payload.key, payload.value);
        }
    }
}

function app_ready() {
  if ((document.readyState === "complete" || document.readyState === "interactive") && Genie.WebChannels.socket.readyState === 1) {
    Genie.WebChannels.sendMessageTo(CHANNEL, 'watchers', {'payload': {'field':'isready', 'newval': true, 'oldval': false}});
Hello.isready = true;
  } else {
    setTimeout(app_ready, Genie.Settings.webchannels_timeout);
  }
};
