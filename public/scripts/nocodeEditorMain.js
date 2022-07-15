


window.autorun = false;
window.unsavedChanges = false;

const customPlugins = [ myNewComponentTypes, 
  customblock_quasar_avatar, customblock_quasar_badge, customblock_quasar_banner, customblock_quasar_button_dropdown, customblock_quasar_button_group, customblock_quasar_button, customblock_quasar_chip, customblock_quasar_editor, customblock_quasar_icon, customblock_quasar_item, customblock_quasar_knob, customblock_quasar_list, customblock_quasar_popup_proxy, customblock_quasar_radio, customblock_quasar_rating, customblock_quasar_separator, customblock_quasar_space, customblock_quasar_spinner, customblock_quasar_time, customblock_quasar_timeline_entry, customblock_quasar_timeline, customblock_quasar_toggle, customblock_quasar_toolbar, customblock_quasar_tree, customblock_quasar_video
];

function initNoCodeEditor(){
  console.log( "initNoCodeEditor()" );
  // Initialize the editor instance
  const editor = window.editor = grapesjs.init({
    /* -------------------------------------------------------
           Editor's Basic properties
    ------------------------------------------------------- */
    plugins: [ ...customPlugins, 'gjs-preset-webpage', 
    /* "bootstrap.bundle", 
    "bootstrap.bundle.min", 
    "bootstrap", 
    "bootstrap.min", 
    "change-styles-html", 
    "grapes.min", 
    */
    "grapesjs-blocks-avance", 
    "grapesjs-blocks-basic", 
    /* "grapesjs-echarts",  */
    "grapesjs-ga", 
    "grapesjs-navbar", 
    "grapesjs-page-break", 

    "grapesjs-plugin-forms", 
    "grapesjs-plugin-header", 
    "grapesjs-rte-extensions", 
    "grapesjs-rulers", 
    
    /*"grapesjs-blocks-bootstrap4.min", 
    "grapesjs-blocks-flexbox.min", 
    "grapesjs-code-editor.min", 
    "grapesjs-component-code-editor.min", 
    "grapesjs-custom-code.min", 
    "grapesjs-echarts.min", 
    "grapesjs-ga.min", 
    "grapesjs-navbar.min", 
    "grapesjs-page-break.min", 
    "grapesjs-parser-postcss.min", 
    "grapesjs-plugin-actions.min", 
    "grapesjs-plugin-carousel.min", 
    "grapesjs-plugin-export.min", 
    "grapesjs-plugin-forms.min", 
    "grapesjs-plugin-header.min", 
    "grapesjs-rte-extensions.min", 
    "grapesjs-rulers.min", 
    "grapesjs-script-editor.min", 
    "grapesjs-shape-divider.min", 
    "grapesjs-table.min", 
    "grapesjs-touch.min", 
    "jquery.slim.min", 
    "nocode", 
    "popper.min" */
    ],
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
    storageManager: { autoload: 0, type: 'onChange' },
  }); // End of "grapesjs.init()" 
  editor.setStyle("body { background-color: unset}");

  editor.on('load', () => {
    console.log( "manage non-removable items");

    const notRemovableTags = ['body'];
    const notRemovableIds = ['editableDOM'];

    // recursive function to traverse component tree
    const updateRecursive = componentModel => {
      let bannedTag = notRemovableTags.indexOf(componentModel.attributes.tagName) !== -1;
      let bannedId = notRemovableIds.indexOf(componentModel.attributes.attributes.id) !== -1;
        if (bannedId || bannedTag) {
            // set not removable
            componentModel.set({removable: false, selectable: false, hoverable: false});
            // remove remove icon from toolbar
            componentModel.set({
               toolbar: componentModel.get('toolbar')?.filter(tlb => tlb.command !== 'tlb-delete')
            });
        }
        // recurse
        componentModel.get('components').each(model => updateRecursive(model));
    }
    // start recursion
    let rootComponent = this.editor.DomComponents.getComponent();
    console.log( "manage non-removable item components: ", rootComponent);
    updateRecursive(rootComponent);

    setTimeout( ()=>{
      document.querySelector("#saveButton").classList.remove('warningIcon');
      document.querySelector("#unsavedChangesAlert").style.display = "none";
      window.unsavedChanges = false;
    }, 100)
});

  editor.on('storage:start', (evt)=>{
    console.log( "Contents changed! " )
  });
  
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
    className: 'fa fa-repeat',
    command: 'refresh-nocode-editor',
    attributes: { title: 'Refresh no-code editor' },
    active: false,
  });

  editor.Panels.addButton('options', {  // Fist argument is part of container element's class (i.e. "gjs-pn-options")
    //id: 'myNewButton',
    //label: 'Gn',
    className: 'fa fa-floppy-disk',
    command: 'save-content',
    attributes: { title: 'Save Design', id:'saveButton' },
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
  editor.Commands.add('refresh-nocode-editor', {
    run: editor => {
      console.log("command 'refresh-nocode-editor' has run");
      window.location.reload()
    }
  });

  editor.Commands.add('save-content', {
    run: editor => {
      console.log("command 'save-content' has run");
      window.savePage();
    }
  });


  // Custom events
  editor.on('change:changesCount', e => {
    console.log( "no-code editor content has changed: ", e );
    markUnsavedChanges(true);
   });

  /* editor.on('run:preview', () => {
    // do stuff...
    console.log("entered preview");

    let currentTemplate = editor.getHtml();
    currentTemplate = currentTemplate.replaceAll( `id="editableDOM"`, `id="${vueAppName}"` );   
    //editor.addComponents(currentTemplate);
    canvasWindow.createPreviewElements( currentTemplate );
    window.startPreview();
  });
  editor.on('stop:preview', () => {
    // do stuff...
    console.log("Exited preview");
    window.stopPreview();
   
      canvasDocument.querySelector(`#${vueAppName}`).remove();
  }); */
  editor.on('component:input', (model) => {
    // do stuff...
    console.log("component::input ", model);
    let currentTemplate = editor.getHtml( { cleanId:true } );
    let hasChanged = window.lastSavedHTML != currentTemplate;
    markUnsavedChanges(true);
    //window.lastSavedHTML = currentTemplate;
    console.log("component updated. Has changed? ", hasChanged, model)
  });

  editor.on('component:selected', (model) => {
    // do stuff...
    console.log("component selected: ", model);
    
    if( model.updateGenieModelProperties )
      model.updateGenieModelProperties(appConfiguration.modelFields);
  });




  // Pass initial Vue code
  console.log( "viewTemplate used");
  // Change the main container id to "#editableDOM"
  let currentTemplate = appConfiguration.template;
  let containerDivPresent = currentTemplate.indexOf( `id="${vueAppName}"` );
  if( containerDivPresent >= 0 )
    currentTemplate = currentTemplate.replaceAll(`id="${vueAppName}"`, `id="editableDOM"`);    
  else{
    let containerHtml = '<div id="editableDOM" class="container">';
    currentTemplate = containerHtml + currentTemplate + '</div>';
  }
  editor.addComponents( currentTemplate );
  editor.setStyle( appConfiguration.grapesStyles );
  console.log( "grapesjs styles injected: ", appConfiguration.grapesStyles );

  window.lastSavedHTML = editor.getHtml( { cleanId:true } );


  runVue();
}

function markUnsavedChanges( yesNo ){
  document.querySelector("#saveButton").classList.add('warningIcon');
  document.querySelector("#unsavedChangesAlert").style.display = "block";
  window.unsavedChanges = true;
}


function savePage(){
  let currentTemplate = editor.getHtml( { cleanId:true } );
  let currentStyles = editor.getCss({ avoidProtected: true });
  console.log( "Grapes CSS styles: ", currentStyles );

  window.lastSavedHTML = currentTemplate;
  
  // remove body tag
  currentTemplate = currentTemplate.replaceAll( `<body>`, `` ).replaceAll( `</body>`, `` );   

  let containerHtml = '<div id="editableDOM" class="container">';

  let containerDivPresent = currentTemplate.indexOf( containerHtml );
  if( containerDivPresent >= 0 ){
    currentTemplate = currentTemplate.replace( containerHtml, ``);    
    currentTemplate = currentTemplate.replace(new RegExp( '</div>' + '$'), '');

  }

  console.log( "savePage() called 3" );
  //console.log( "savePage() called: \n", currentTemplate );
  parent.postMessage( 
    {
      command: "saveContent", 
      app_id: window.projectId,
      appName: window.appName,
      appPath: window.appPath,
      path: window.filePath,
      content:currentTemplate, 
      styles: currentStyles
    }, "*");
    // Update the "unsaved changes" alert status and visibility
    document.querySelector("#saveButton").classList.remove('warningIcon');
    document.querySelector("#unsavedChangesAlert").style.display = "none";
    window.unsavedChanges = false;
}

function runVue(){
  let checker = setInterval( ()=>{
    let vueApp = window[ appConfiguration.vueAppName ];
    let rootElement = document.getElementById('app_panel');
      console.log("runVue #app_panel", rootElement, vueApp )
      if( rootElement && window.initStipple /* && vueApp */ ){ 
          initStipple("#app_panel");
          initWatchers();
          app_ready();
          //initLocalVueModelWatcher();
          clearInterval(checker);
      }
  }, 2000);
}
