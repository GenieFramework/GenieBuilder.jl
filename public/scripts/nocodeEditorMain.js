document.addEventListener('keydown', e => {
  console.log( "keyboard DOWN event detected at noCodeEditorMain: ", e );
  if( e.ctrlKey || e.metaKey ){
    switch( e.key ){
      case "s":
        e.preventDefault();
        editor.runCommand("save-content");
        break;
      case "z":
        e.preventDefault();
        if( e.shiftKey)
          document.execCommand("redo");
        else
          document.execCommand("undo");
        break;
      case "c":
        e.preventDefault();
        document.execCommand("copy");
        break;
      case "v":
        e.preventDefault();
        document.execCommand("paste");
        break;
      case "x":
        e.preventDefault();
        document.execCommand("cut");
      case "a":
        e.preventDefault();
        document.execCommand("selectAll");
    }
  }
});



window.autorun = false;
window.unsavedChanges = false;
window.selectedElementModel = null;

const customPlugins = [ myNewComponentTypes, 
  customblock_quasar_separator, customblock_quasar_space, customblock_quasar_toolbar, customblock_quasar_input, customblock_quasar_button, customblock_quasar_button_group, customblock_quasar_button_dropdown, customblock_quasar_select, customblock_quasar_radio, customblock_quasar_checkbox, customblock_quasar_toggle, customblock_quasar_slider, customblock_quasar_range, customblock_quasar_datePicker, customblock_quasar_timePicker, customblock_quasar_editor, customblock_quasar_knob, customblock_quasar_list, customblock_quasar_item, customblock_quasar_item_label, customblock_quasar_dataTable, customblock_quasar_img, customblock_quasar_video, customblock_quasar_avatar, customblock_quasar_badge, customblock_quasar_banner, customblock_quasar_chip, customblock_quasar_icon, customblock_quasar_rating, customblock_quasar_spinner, customblock_quasar_tree, customblock_quasar_popup_proxy, customblock_quasar_timeline, customblock_quasar_timeline_entry, customblock_quasar_expansion_item
];

function initNoCodeEditor(){
  console.log( "initNoCodeEditor()" );
  // Initialize the editor instance
  const editor = window.editor = grapesjs.init({
    /* -------------------------------------------------------
           Editor's Basic properties
    ------------------------------------------------------- */
    plugins: [ ...customPlugins, 'gjs-preset-webpage', 
    "grapesjs-ga", 
    "grapesjs-rte-extensions", 
    "grapesjs-rulers", 
    "grapesjs-component-code-editor", 
    "grapesjs-parser-postcss", 
    "grapesjs-table", 
    "grapesjs-style-filter", 
    "grapesjs-style-bg", 
    ],
    pluginsOpts: {
      'gjs-preset-webpage': { showStylesOnChange:0, blocksBasicOpts: false, blocks:[], countdownOpts: false, formsOpts: false, exportOpts: false, aviaryOpts: false, filestackOpts: false, navbarOpts: false,   }, 
      'grapesjs-component-code-editor': {
        openState: { pn: '500px', cv: 'calc( 100% - 500px)' }, 
        closedState: { pn: '300px', cv: 'calc( 100% - 300px)' }, 
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

  editor.Panels.addButton('options', {  
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

  // remove the default, official, trait manager button
  editor.Panels.getPanel('views').get('buttons').remove('open-tm');

  let editPanel = null;
  const panelViewsContainer = pn.addPanel({
    id: "viewsContainer"
  });
  panelViews.get("buttons").add([
    {
      attributes: {
        title: "Props Editor"
      },
      className: "fa fa-cog",
      command: "open-props-editor",
      togglable: false, //do not close when button is clicked again
      id: "open-props-editor", 
      command: {
        run: function (editor) {
            if(editPanel == null){
                const editMenuDiv = document.createElement('div')
                editMenuDiv.innerHTML = `
                <div id="traits_panel" class="gjs-pn-panel gjs-one-bg gjs-two-color panel__right" style="padding: 0px; width: 100%;border-bottom: none !important;">
                  <div class="gjs-trt-traits">
                      <div v-if="categories.length==0" style="margin-top: 20px;">The selected element doesn't have any editable properties</div>
                      <div style="margin-top: 5px;" v-if="categories.length>0">
                        <div style="width: 80%; width: 295px; padding: 0px 5px;">
                          <q-input outlined bottom-slots v-model="search" :dense="true" placeholder="Filter Properties">                  
                            <template v-slot:append>
                              <div>
                                <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer"></q-icon>
                                <q-icon v-if="search == ''" name="search"></q-icon>
                              </div>
                            </template>
                          </q-input>                          
                        </div>
                      </div>
                      <div v-if="categories.length>0 && category.shouldShow" v-for="category, $categoryindex in categoriesFiltered" class="gjs-sm-sector gjs-sm-sector__general no-select gjs-sm-open">
                        <div @click="toggleCategory(category)" class="gjs-sm-sector-title" style="text-transform: capitalize;"><i :class="{ 'gjs-caret-icon':true, 'fa':true, 'fa-caret-down':category.expanded, 'fa-caret-right':!category.expanded}" style="margin-right: 10px;"></i> {{category.name}} 
                        
                        </div>
                        <div class="gjs-sm-properties" v-if="category.expanded">
                          <div v-if="trait.shouldShow" v-for="trait, $traitindex in category.traits" class="gjs-trt-trait gjs-trt-trait--text" style="margin-bottom: 0px;">
                              <div class="gjs-label-wrp">
                                  <div class="gjs-label traitLabel" style="text-transform: capitalize">{{formatLabel(trait)}}
                                  
                                  <q-tooltip v-if="trait.attributes.desc" :delay="250" content-class="bg-indigo traitTooltipContent" transition-show="scale" transition-hide="scale">
                                    <div style="max-width: 300px;">
                                      <div style="font-weight: bold; font-size: 1.6em; text-transform: capitalize;">{{trait.attributes.label}} <span style="font-size: 0.6em; margin-left: 5px;" v-if="trait.attributes.juliaType">({{trait.attributes.juliaType?.split('|').join(', ')}})</span></div>                                      
                                      <div>{{trait.attributes.desc}}</div>
                                      <div v-if="trait.attributes.examples?.length>0" style="font-weight: bold; font-size: 1.1em; margin-top:10px; margin-bottom:-10px;">Examples</div>
                                      <ul>
                                        <li v-for="example in trait.attributes.examples">{{example}}</li>
                                      </ul>
                                    </div>
                                  </q-tooltip>
                              </div>
                              </div>
                              <div class="gjs-field gjs-field-text" style="">
                                <trait-field :trait="trait" :traitvaluesobj="traitValuesObj"></trait-field>
                              </div>
                          </div>
                        </div>
                      </div>
                      <br>
                  </div>
                </div>
            `
               
                const panels = pn.getPanel('views-container')
                panels.set('appendContent', editMenuDiv).trigger('change:appendContent')
                editPanel = editMenuDiv;
                initTraitsEditor();
            }
            editPanel.style.display = 'block'
        },
        stop: function (editor) {
            if(editPanel != null){
                editPanel.style.display = 'none'
            }
        }

    }
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


  editor.on('component:input', (model) => {
    console.log("component::input ", model);
    let currentTemplate = editor.getHtml( { cleanId:true } );
    let hasChanged = window.lastSavedHTML != currentTemplate;
    markUnsavedChanges(true);
    //window.lastSavedHTML = currentTemplate;
    console.log("component updated. Has changed? ", hasChanged, model)
  });

  editor.on('component:selected', (model) => {
    console.log("component selected: ", model);

    window.selectedElementModel = model;
    window.traitsEditor?.assignComponent( model );

    // show the properties editor panel if there are traits to show
    // (some components do not have traits)
    if( model.attributes?.traits?.models?.length > 0 ){
      let blockBtn = editor.Panels.getButton('views', 'open-props-editor')
      blockBtn.set('active', 1);
    }
  });

  editor.on('component:deselected', (model) => {
    console.log("component deselected: " );
    window.selectedElementModel = null;
    window.traitsEditor?.assignComponent(  );
  });
  editor.on('block:drag:stop', (model) => {
    let message = {
      command: "logEvent", 
      eventName: "blockAdded",
      eventDetail: model.attributes.tagName
    };
    console.log("Block added: ", model, message );
    logEvent( message );
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

  let componentTypes = editor.DomComponents.getTypes();
  console.log( 'componentTypes', componentTypes );
  componentTypes.forEach( (componentType) => {
    let componentModel = componentType.model;
    console.log( '  - componentModel.id', componentModel.id );
  });

  componentTypes.forEach(component => {
    let componentTraits = component.model.getDefaults().traits;
    let hasVtext = componentTraits.find( trait => trait.name == 'v-text' );
    if( !hasVtext ){
      componentTraits.push({
        //component.addTrait({
          name: 'v-text', 
          type: "text",
          label: 'Text Binding', 
          category: 'main properties',
          changeProp: 1
        });
      }
    let hasVif = componentTraits.find( trait => trait.name == 'v-if' );
    if( !hasVif ){
      componentTraits.push({
      //component.addTrait({
        name: 'v-if', 
        type: "text",
        label: 'Condition',
        category: 'main properties',
        changeProp: 1
      });
    }
  });


  editor.addComponents( currentTemplate );
  editor.setStyle( appConfiguration.grapesStyles );
  console.log( "grapesjs styles injected: ", appConfiguration.grapesStyles );

  window.lastSavedHTML = editor.getHtml( { cleanId:true } );

}

function markUnsavedChanges( yesNo ){
  document.querySelector("#saveButton").classList.add('warningIcon');
  document.querySelector("#unsavedChangesAlert").style.display = "block";
  window.unsavedChanges = true;
}

function logEvent( message ){
  console.log( 'logEvent', message );
  parent.postMessage( message, "*");
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


