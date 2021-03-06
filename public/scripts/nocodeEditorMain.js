


window.autorun = false;
window.unsavedChanges = false;

const customPlugins = [ myNewComponentTypes, 
  customblock_quasar_avatar, customblock_quasar_badge, customblock_quasar_banner, customblock_quasar_chip, customblock_quasar_icon, customblock_quasar_item, customblock_quasar_list, customblock_quasar_popup_proxy, customblock_quasar_rating, customblock_quasar_spinner, customblock_quasar_timeline_entry, customblock_quasar_timeline, customblock_quasar_toggle, customblock_quasar_tree
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
    /* "grapesjs-blocks-avance",  */
    /* "grapesjs-blocks-basic",  */
    /* "grapesjs-echarts",  */
    "grapesjs-ga", 
    /* "grapesjs-navbar", 
    "grapesjs-page-break",  */

    /* "grapesjs-plugin-forms",  */
    "grapesjs-plugin-header", 
    "grapesjs-rte-extensions", 
    "grapesjs-rulers", 
    
    /*"grapesjs-blocks-bootstrap4", 
    "grapesjs-blocks-flexbox", 
    "grapesjs-code-editor", */
    "grapesjs-component-code-editor", 
    /*"grapesjs-custom-code", 
    "grapesjs-echarts", 
    "grapesjs-ga", 
    "grapesjs-navbar", 
    "grapesjs-page-break",  */
    "grapesjs-parser-postcss", 
    /* "grapesjs-plugin-actions", 
    "grapesjs-plugin-carousel", 
    "grapesjs-plugin-export", 
    "grapesjs-plugin-forms", 
    "grapesjs-plugin-header", 
    "grapesjs-rte-extensions", 
    "grapesjs-rulers", 
    "grapesjs-script-editor", 
    "grapesjs-shape-divider", 
    "grapesjs-table", 
    "grapesjs-touch", 
    "jquery.slim", 
    "nocode", 
    "popper" */
    "grapesjs-style-filter", 
    "grapesjs-style-bg", 
    /* "grapesjs-tooltip" */
    ],
    pluginsOpts: {
      'gjs-preset-webpage': { showStylesOnChange:0, blocksBasicOpts: false, blocks:[], countdownOpts: false, formsOpts: false, exportOpts: false, aviaryOpts: false, filestackOpts: false, navbarOpts: false,   }, 
      'grapesjs-component-code-editor': {
        openState: { pn: '500px', cv: 'calc( 100% - 500px)' }, 
        closedState: { pn: '200px', cv: 'calc( 100% - 200px)' }, 
        //clearData: true, 
        codeViewOptions: { 
          codeName: 'htmlmixed', 
          autoBeautify: true,
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineWrapping: true,
          styleActiveLine: true,
          smartIndent: true,
          indentWithTabs: true
        }
      }, 
      'grapesjs-rte-extensions': {
        // default options
        base: {
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
          link: true,
        },
        //fonts: {
        //  fontName: ['font1',...,'fontn'],
        //  fontSize: true,
        //  //An array of strings representing colors
        //  fontColor: ['#fff',...],
        //  //An array of strings representing colors
        //  hilite: ['#fff',...],
        //}
        fonts: {
          //fontColor: true,
          hilite: true,
        },
        format: {
          heading1: true,
          heading2: true,
          heading3: true,
          heading4: false,
          heading5: false,
          heading6: false,
          paragraph: true,
          quote: false,
          clearFormatting: true,
        },
        subscriptSuperscript: false,//|true
        indentOutdent: false,//|true
        list: false,//|true
        align: true,//|true
        /* actions: {
          copy: true,
          cut: true,
          paste: true,
          delete: true,
        }, */
        //actions: false,//|true
        //undoredo: true,//|true
        extra: true,//|true
        darkColorPicker: true,//|false
        maxWidth: '800px'
      }
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

  editor.StyleManager.addProperty('extra', { extend: 'filter' });
  editor.StyleManager.addProperty('extra', { extend: 'filter', property: 'backdrop-filter' });

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


  // Make sure the RTE tools stay within viewport
  editor.on('rteToolbarPosUpdate', (pos) => {
    let toolbarDiv = editor.RichTextEditor.getToolbarEl()
    let toolbarHeight = toolbarDiv.scrollHeight
    let toolbarWidth = toolbarDiv.scrollWidth
    let rect = editor.Canvas.getRect()
    if (pos.top <= 0 && pos.top > -8) 
    {	
      pos.top = (rect.height - toolbarHeight) + (pos.top - pos.canvasOffsetTop)
    }
    //check to see if the tool bar will go out of the screen and offset the left pos if it will.
    let overhangLeft = rect.width - (toolbarWidth + pos.canvasOffsetLeft);
    if(overhangLeft < 0)
    {
      pos.left = (overhangLeft -5)
    }
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

  editor.Panels.addButton('options', { 
    attributes: {
      title: 'Toggle Rulers'
    },
    context: 'toggle-rulers', //prevents rulers from being toggled when another views-panel button is clicked 
    label: `<svg width="18" viewBox="0 0 16 16"><path d="M0 8a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5A.5.5 0 0 1 0 8z"/><path d="M4 3h8a1 1 0 0 1 1 1v2.5h1V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2.5h1V4a1 1 0 0 1 1-1zM3 9.5H2V12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5h-1V12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/></svg>`,
    command: 'ruler-visibility',
    id: 'ruler-visibility'
  });

  editor.Panels.addButton('options', {  // Fist argument is part of container element's class (i.e. "gjs-pn-options")
    //id: 'myNewButton',
    //label: 'Gn',
    className: 'fa fa-floppy-disk',
    command: 'save-content',
    attributes: { title: 'Save Design', id:'saveButton' },
    active: false,
  });

  const pn = editor.Panels;
  const panelViews = pn.addPanel({
    id: "views"
  });
  panelViews.get("buttons").add([
    {
      attributes: {
        title: "Open Code"
      },
      className: "fa fa-file-code-o",
      command: "open-code",
      togglable: false, //do not close when button is clicked again
      id: "open-code"
    }
  ]);



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
