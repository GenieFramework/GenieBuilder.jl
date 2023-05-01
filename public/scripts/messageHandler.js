var eventMethod = window.addEventListener
			? "addEventListener"
			: "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod === "attachEvent"
    ? "onmessage"
    : "message";

eventer(messageEvent, function (e) {		
    console.log( "messageHandler: message received in no-code context", e.data )
    let command = e.data.command;
    if (command === "restoreUnsavedChangesReply"){
        let appId = e.data.appId;
        let appName = e.data.appName;
        let filePath = e.data.filePath;
        console.log( "restoreUnsavedChangesReply: ", appId, appName, filePath );
        let unsavedChanges = retrieveUnsavedChanges();
        if( !unsavedChanges ){
            console.error("User answered to restore unsaved changes, but there are no unsaved changes");
        }else{
            if( e.data.answer == "Yes" ){
                window.appConfiguration.template = unsavedChanges.content;
                window.appConfiguration.grapesStyles = unsavedChanges.styles;
                window.unsavedChanges = true;
            }else{                
                resetUnsavedChanges();
            }
        }
        initNoCodeEditor();
        
    }else if(command == "updateBindingsList" ){
        fetchAndUpdateModelBindings();
    }
    
});

console.log( "messageHandler for no-code context")