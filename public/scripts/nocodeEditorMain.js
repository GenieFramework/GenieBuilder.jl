/* window.onload = () => {
  console.log( "---onLoad: ", document.querySelector( "#codeEditor" ) );

  ApiConnector.getProjectInfo(1, (projectInfo)=>{
    console.log( "ApiConnector.getProjectInfo() callback" );
    window.appConfiguration = projectInfo;
    window.appName = appConfiguration.vueAppName;
    initCodeEditor();  
    initNoCodeEditor();  
    runVue();
  })
}; */

function initNoCodeEditor(){
  console.log( "initNoCodeEditor()" );
  // Initialize the editor instance
  const editor = window.editor = grapesjs.init({
    /* -------------------------------------------------------
           Editor's Basic properties
    ------------------------------------------------------- */
    plugins: [myNewComponentTypes, 'gjs-preset-webpage'],
    pluginsOpts: {
      'gjs-preset-webpage': { showStylesOnChange:0, blocksBasicOpts: false, blocks:[], countdownOpts: false, formsOpts: false, exportOpts: false, aviaryOpts: false, filestackOpts: false, navbarOpts: false,   }
    },
    container: '#gjs',
    canvas: {
      scripts: appConfiguration.contentScripts,
      styles: appConfiguration.contentStyles,
    },
    fromElement: true,
    height: '100%', // Size of the editor
    panels: { defaults: [] }, // Remove default panel
    storageManager: { autoload: 0 },
  }); // End of "grapesjs.init()" 
  editor.setStyle("body { background-color: unset}");
  
  // Shorcuts to the editor's canvas window and document
  // (used later to communicate/access with the iframe's scope and contents)
  window.canvasWindow = document.querySelector("iframe.gjs-frame").contentWindow;
  window.canvasDocument = canvasWindow.document;

  // Set components outline visible by default
  editor.runCommand('sw-visibility');


  /* -------------------------------------------------------
            Editor's Panels (top and side bars)
     ------------------------------------------------------- */

  editor.Panels.addButton('options', {  // Fist argument is part of container element's class (i.e. "gjs-pn-options")
    //id: 'myNewButton',
    //label: 'Gn',
    className: 'fa fa-database',
    command: 'show-genie-model',
    attributes: { title: 'Show Geniel model' },
    active: false,
  });

  editor.Panels.addButton('options', {  // Fist argument is part of container element's class (i.e. "gjs-pn-options")
    //id: 'myNewButton',
    //label: 'Gn',
    className: 'fa fa-floppy-disk',
    command: 'save-content',
    attributes: { title: 'Save Design' },
    active: false,
  });


  /* -------------------------------------------------------
      Editor's commands (mainly for opening/closing panels)
     ------------------------------------------------------- */


  editor.Commands.add('set-device-desktop', {
    run: editor => editor.setDevice('Desktop')
  });
  editor.Commands.add('set-device-mobile', {
    run: editor => editor.setDevice('Mobile')
  });
  editor.Commands.add('show-genie-model', {
    run: editor => {
      console.log("command 'show-genie-model' has run");
      let panel = document.querySelector("#genie_model");
      console.log("genie model view: ", panel);
      if (panel.style.display != "block")
        panel.style.display = "block";
      else
        panel.style.display = "none";
    }
  });
  editor.Commands.add('save-content', {
    run: editor => {
      console.log("command 'save-content' has run");
      window.savePage();
    }
  });


  // Custom events
  editor.on('run:preview', () => {
    // do stuff...
    console.log("entered preview");

    let currentTemplate = editor.getHtml();
    currentTemplate = currentTemplate.replaceAll( `id="editableDOM"`, `id="${appName}"` );   
    //editor.addComponents(currentTemplate);
    canvasWindow.createPreviewElements( currentTemplate );
    window.startPreview();
  });
  editor.on('stop:preview', () => {
    // do stuff...
    console.log("Exited preview");
    window.stopPreview();
    /* let previewComponent = editor.getComponents().models.filter( (item)=>{
      return item.ccid == appName;
    });
    console.log( "preview filter: ", previewComponent );
    if( previewComponent.length == 1 ){
      previewComponent[0].remove(); */
      canvasDocument.querySelector(`#${appName}`).remove();
    /* }else{
      console.error( "Preview element not found");
    } */
  });
  editor.on('component:update', (model) => {
    // do stuff...
    console.log("component updated: ", model)
  });
  editor.on('component:selected', (model) => {
    // do stuff...
    console.log("component selected: ", model);
    let modelProps = [];
    for( let p in window[appName].$data ){
      modelProps.push( {value:p, name:p } );
    }
    if( model.updateGenieModelProperties )
      model.updateGenieModelProperties(modelProps);
  });




  // Pass initial Vue code
  console.log( "viewTemplate used");
  // Change the main container id to "#editableDOM"
  let currentTemplate = appConfiguration.template;
  let containerDivPresent = currentTemplate.indexOf( `id="${appName}"` );
  if( containerDivPresent >= 0 )
    currentTemplate = currentTemplate.replaceAll(`id="${appName}"`, `id="editableDOM"`);    
  else{
    let containerHtml = '<div id="editableDOM" class="container">';
    currentTemplate = containerHtml + currentTemplate + '</div>';
  }
  editor.addComponents( currentTemplate );


  runVue();
}

/* window.parse_payload = function(payload){
  console.log( "parse_payload() editorMain");
    if (payload.key) {
        window[appName].revive_payload(payload)
        window[appName].updateField(payload.key, payload.value);
        window.updateEditorElements(payload);
    }
} */

function savePage(){
  let currentTemplate = editor.getHtml( { cleanId:true } );
  //currentTemplate = currentTemplate.replaceAll( `id="editableDOM"`, `id="${appName}"` );   
  
  // remove body tag
  currentTemplate = currentTemplate.replaceAll( `<body>`, `` ).replaceAll( `</body>`, `` );   

  let containerHtml = '<div id="editableDOM" class="container">';

  let containerDivPresent = currentTemplate.indexOf( containerHtml );
  if( containerDivPresent >= 0 ){
    currentTemplate = currentTemplate.replace( containerHtml, ``);    
    currentTemplate = currentTemplate.replace(new RegExp( '</div>' + '$'), '');

  }

  console.log( "savePage() called" );
  //console.log( "savePage() called: \n", currentTemplate );
  parent.postMessage( 
    {
      command: "saveContent", 
      app_id: window.projectId,
      path: window.filePath,
      content:currentTemplate
    }, "*");
}

function runVue(){
  /* let checker = setInterval( ()=>{
    let rootElement = document.getElementById('app_panel');
      console.log("runVue #app_panel", rootElement )
      if( rootElement && window.initStipple ){
          initStipple("#app_panel");
          //initLocalVueModelWatcher();
          clearInterval(checker);
      }
  }, 2000); */
}

/* function initLocalVueModelWatcher(){
  for( let p in window[appName].$data ){
    window[appName].$watch(function(){return this[p]}, function(newVal, oldVal){
      let payload = { key:p, value:newVal }
      updateEditorElements( payload );
    }, {deep: true});

  }
} */

/* function startPreview(){
  console.log( "inner iframe :: startPreview()" );
  canvasWindow.initStipple('#'+appName);
  canvasWindow.app_ready();
  canvasDocument.querySelector(`#editableDOM`).style.display = "none";
}

function stopPreview(){
  console.log( "inner iframe :: stopPreview()" );
  canvasWindow[appName].$destroy();
  canvasDocument.querySelector(`#editableDOM`).style.display = "";  
} */

/* function updateEditorElements( payload ){
  // Update views with text bindings
  let selector = `*[v-text='${payload.key}']`;
  let results = canvasDocument.querySelectorAll(selector);
  results.forEach( el =>{
    el.innerText = payload.value;
  });
  // Update views with SC bindings
  selector = `img[\\3A src='${payload.key}']`;  // In order to use the colon character here, it has to be escaped with  "\\3A "
  results = canvasDocument.querySelectorAll(selector);
  results.forEach( el =>{
    el.setAttribute( 'src', payload.value );
  });
} */

/* function showCodeEditor(){
    //$('div.split-pane').splitPane('lastComponentSize', 500);
    $('#codeEditor').css( 'display', 'flex');
}
function hideCodeEditor(){
    //$('div.split-pane').splitPane('lastComponentSize', 0);
    $('#codeEditor').css( 'display', 'none');
} */