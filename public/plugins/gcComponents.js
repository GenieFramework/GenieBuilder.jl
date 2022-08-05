// Create plugin for custom block
const myNewComponentTypes = editor => {
  // Custom trait type for long texts (textarea)
  let TextAreaVueComponent = Vue.component('longtext', {
    data: function () {
      return {
        text: 'Hello'
      }
    },
    methods: {
      getText(){
        return this.text;
      }, 
      setText(text){
        this.text = text;
        //console.log( "setText: ", this.text);
      }, 
      onChanged(){
        //console.log( "onChanged: ", this.text);
      }
    },
    template: '<textarea v-on:change="onChanged" v-model="text" ></textarea>'
  });

  editor.TraitManager.addType('textarea', {
    createInput({ trait }) {
      //console.log( "textArea :: createInput: ", trait);
      const vueInst = new Vue({ render: h => h(TextAreaVueComponent) }).$mount();
      const textAreaInst = vueInst.$children[0];
      textAreaInst.$on('change', ev => this.onChange(ev)); // Use onChange to trigger onEvent
      this.textAreaInst = textAreaInst;
      this.traitId = trait.id;
      return vueInst.$el;
    },
  
    onEvent({ component }) {
      //console.log( "textArea :: onEvent: ", component, this.textAreaInst, component.getAttributes());
      const value = this.textAreaInst.getText() || 0;
      component.addAttributes({ value });
    },
    
    onUpdate({ component }) {
      //console.log( "textArea :: onUpdate: ", component, this.textAreaInst, component.getAttributes());
      const value = component.getAttributes()[this.traitId] || '';
      this.textAreaInst.setText(value);
    },
  });



  let getModelValue = function( propName ){
    let vueApp = window[vueAppName];
    if( !propName )
      return null;
    if( !vueApp )
      return `{{${propName}}}`;
    let vueProp = vueApp[propName];
      if( vueProp != null )
        return vueProp;
      else
        return `{{${propName}}}`;
  }

  let renderTextFunction = function (target, newValue) {  
    console.log( "renderTextFunction: ", target, newValue );
    let vueApp = window[vueAppName];
    let vueProp = vueApp[newValue];
      if( vueProp != null )
        target.view.el.textContent = vueProp;
      else
        target.view.el.textContent = "{{ newValue }}";
      return this;
  };

  // Custom components
  // -----------------------------------

    /* --------------------------------------------
              BLOCK CATEGORY: LAYOUT
     -------------------------------------------- */

    /* --------------------------------------------
                      ROW
     -------------------------------------------- */
        
     editor.DomComponents.addType( "qrow", {
      isComponent: el => {
        if( el.tagName == 'DIV' && el.classList.contains('row') ){
          return { type: 'qrow' }
        }
      },
      model: {
        defaults: { 
          traits: [ 
            /* { label: 'Reactive Model', name: 'v-model', type:'select', options: [] }, 
            { label: 'Label', name: 'label', type:'text' },                     
            { label: 'Hint', name: 'hint', type:'text' },                     
            { label: 'Max Length', name: 'maxlength', type:'number' },       */               
          ], 
          droppable: true,
          draggable: true,
          editable: true,
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
         /*  var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties ); */
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          //const bindTextTraitValue = model.getAttributes()['v-model']
          
        }
      },
    });

    /* --------------------------------------------
                      COLUMN
     -------------------------------------------- */
        
     editor.DomComponents.addType( "qcolumn", {
      isComponent: el => {
        if( el.tagName == 'DIV' && el.classList.contains('col') ){
          return { type: 'qcolumn' }
        }
      },
      model: {
        defaults: { 
          traits: [ 
            /* { label: 'Reactive Model', name: 'v-model', type:'select', options: [] }, 
            { label: 'Label', name: 'label', type:'text' },                     
            { label: 'Hint', name: 'hint', type:'text' },                     
            { label: 'Max Length', name: 'maxlength', type:'number' },       */               
          ], 
          droppable: true,
          draggable: '.row',
          editable: true,
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
         /*  var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties ); */
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          //const bindTextTraitValue = model.getAttributes()['v-model']
          
        }
      },
    });

    editor.BlockManager.add( '1 Column', { label: '1 Column row', content: `<div class="row"><div class="col col-12 col-sm">Column content</div></div>`, media: `<img src="images/icons/components/ui_components/1column.png" class="blockIcon"/>`, category: 'Layout'   }); 
    editor.BlockManager.add( '2 Column', { label: '2 Columns row', content: `<div class="row"><div class="col col-6 col-sm">Column 1 content</div><div class="col col-6 col-sm">Column 2 content</div></div>`, media: `<img src="images/icons/components/ui_components/2columns.png" class="blockIcon"/>`, category: 'Layout'   }); 
    editor.BlockManager.add( '3 Column', { label: '3 Columns row', content: `<div class="row"><div class="col col-4 col-sm">Column 1 content</div><div class="col col-4 col-sm">Column 2 content</div><div class="col col-4 col-sm">Column 3 content</div></div>`, media: `<img src="images/icons/components/ui_components/3columns.png" class="blockIcon"/>`, category: 'Layout'   }); 

    editor.BlockManager.add( 'qcolumn', { label: 'Column', content: `<div class="col col-12 col-sm st-module">Column content</div>`, media: `<img src="images/icons/components/ui_components/container.png" class="blockIcon"/>`, category: 'Layout'   }); 
    
    
    editor.BlockManager.add( 'Sidebar Left', { label: 'Sidebar Left', content: `<header class="st-header q-pa-sm">
          <h1 class="st-header__title text-h3">Header Text</h1>
      </header>
      <div class="row">
          <div class="col col-3">Column 1 content</div>
          <div class="col">Column 2 content</div>
      </div>`, media: `<img src="images/icons/components/ui_components/sidebar_left.png" class="blockIcon"/>`, category: 'Layout'   }); 
    
    editor.BlockManager.add( 'Sidebar Right', { label: 'Sidebar Right', content: `<header class="st-header q-pa-sm">
          <h1 class="st-header__title text-h3">Header Text</h1>
      </header>
      <div class="row">
        <div class="col">Column 1 content</div>
        <div class="col col-3">Column 2 content</div>
      </div>`, media: `<img src="images/icons/components/ui_components/sidebar_right.png" class="blockIcon"/>`, category: 'Layout'   }); 
    
    editor.BlockManager.add( 'Sidebars', { label: '2 Sidebars', content: `<header class="st-header q-pa-sm">
          <h1 class="st-header__title text-h3">Header Text</h1>
      </header>
      <div class="row">
          <div class="col col-3">Column 1 content</div>
          <div class="col">Column 2 content</div>
          <div class="col col-3">Column 3 content</div>
      </div>`, media: `<img src="images/icons/components/ui_components/sidebars.png" class="blockIcon"/>`, category: 'Layout'   }); 

    


/* --------------------------------------------
              BLOCK CATEGORY: CONTENT
     -------------------------------------------- */

  let vtext_components = [
    { type:'p', tagName:'P', label:'Paragraph', icon:'html_elements/p.png' }, 
    /* { type:'span', tagName:'SPAN', label:'Span', icon:'html_elements/span.png' },  */
    { type:'h1', tagName:'H1', label:'Heading 1', icon:'ui_components/H1.png' }, 
    { type:'h2', tagName:'H2', label:'Heading 2', icon:'ui_components/H2.png' }, 
    { type:'h3', tagName:'H3', label:'Heading 3', icon:'ui_components/H3.png' }, 
    { type:'h4', tagName:'H4', label:'Heading 4', icon:'ui_components/H4.png' }, 
    { type:'h5', tagName:'H5', label:'Heading 5', icon:'ui_components/H5.png' }, 
    { type:'h6', tagName:'H6', label:'Heading 6', icon:'ui_components/H6.png' }, 
  ];

  /* --------------------------------------------
                TEXT-BASED COMPONENTS
    -------------------------------------------- */
    
  vtext_components.forEach( item =>{
    editor.DomComponents.addType( item.type, {
      isComponent: el => el.tagName == item.tagName,
      extend: "text", 
      model: {
        defaults: { 
          traits: [ 
            //{ label: 'Binded Text', name: 'v-text', type:'select', options: [] }, 
          ] 
        },
        init() { 
          const { model } = this; // model is the component
          this.on('change:attributes', this.render) 
        },
        render: function(model, changedProps){
          this.view.onRender(changedProps);
        },
        
        updateGenieModelProperties(properties){
          var vtextTrait = this.get('traits').where({name: 'v-text'})[0];
          if( !vtextTrait )
            return;
          let modelProps = [ { name:"** None **", value:"" }, ...properties];
          console.log( 'modelProps: ', modelProps, modelProps===properties );
          vtextTrait.set('options', modelProps );
        }
      }, 
      view: {
        onRender(changedProps){
          /* const { $el, model } = this;
          let innerText = '';
          const bindTextTraitValue = model.getAttributes()['v-text'];
          if( bindTextTraitValue == null )
            return;
          
            $el.empty();
          if( bindTextTraitValue == '' ){
            innerText = "-- Text Placeholder --";
          }else{
              innerText = `{${bindTextTraitValue}}`;
          }
          $el.append( innerText ); */
        }
      },
    });
    editor.BlockManager.add( item.type, { label: item.label, content: `<${item.type} >Default content</${item.type}>`, media: `<img src="images/icons/components/${item.icon}" class="blockIcon"/>`, category: 'Content'   }); 
  } );

  /* --------------------------------------------
                      HEADER
     -------------------------------------------- */
        
     editor.DomComponents.addType( "header", {
      isComponent: el => {
        if( el.tagName == 'HEADER' ){
          return { type: 'header' }
        }
      },
      model: {
        defaults: { 
          traits: [          
          ], 
          droppable: true,
          draggable: true,
          editable: true,
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
         /*  var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties ); */
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          //const bindTextTraitValue = model.getAttributes()['v-model']
          
        }
      },
    });
    editor.BlockManager.add( 'header', { label: 'Header', content: `<header class="st-header q-pa-sm"><h1 class="st-header__title text-h3">Header Text</h1></header>`, media: `<img src="images/icons/components/html_elements/header.png" class="blockIcon"/>`, category: 'Content'   }); 
    
    editor.BlockManager.add( 'footer', { label: 'Footer', content: `<footer class="st-footer q-pa-sm">Footer Text</footer>`, media: `<img src="images/icons/components/html_elements/footer.png" class="blockIcon"/>`, category: 'Content'   });
    
    editor.BlockManager.add( 'horizontalRule', { label: 'Horizontal Rule', content: `<hr />`, media: `<img src="images/icons/components/html_elements/hr.png" class="blockIcon"/>`, category: 'Content'   });




    editor.DomComponents.addType("separator", {
      isComponent: el => {
          if (el.tagName == 'Q-SEPARATOR') {
              return { type: 'separator' }
          }
      },
      model: {
          defaults: {
              traits: [
{
  "label": "Reactive Model",
  "name": "v-model",
  "type": "select",
  "options": []
},
{
  "label": "dark",
  "name": ":dark",
  "type": "text"
},
{
  "label": "spaced",
  "name": ":spaced",
  "type": "text"
},
{
  "label": "inset",
  "name": ":inset",
  "type": "text"
},
{
  "label": "vertical",
  "name": ":vertical",
  "type": "text"
},
{
  "label": "size",
  "name": ":size",
  "type": "text"
},
{
  "label": "color",
  "name": ":color",
  "type": "text"
}
],
          },
          init() {
              this.on('change:attributes', this.handleAttrChange);
          },
          handleAttrChange() {
              this.render();
          },
          render: function () {
              this.view.onRender();
          },
          updateGenieModelProperties(properties) {
              var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
              vtextTrait.set('options', properties);
          }
      },
      view: {
          onRender() {
              const { $el, model } = this;
              /* const bindTextTraitValue = model.getAttributes()['v-model']
              $el.empty();
              $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
          }
      },
  });
  editor.BlockManager.add('separator', { label: 'Separator', content: '<q-separator />', media: '<img src="images/icons/components/ui_components/separator.png" class="blockIcon" />', category: 'Content' });




  // --------- SPACE --------

      editor.DomComponents.addType("space", {
          isComponent: el => {
              if (el.tagName == 'Q-SPACE') {
                  return { type: 'space' }
              }
          },
          model: {
              defaults: {
                  traits: [
  {
      "label": "Reactive Model",
      "name": "v-model",
      "type": "select",
      "options": []
  }
],
              },
              init() {
                  this.on('change:attributes', this.handleAttrChange);
              },
              handleAttrChange() {
                  this.render();
              },
              render: function () {
                  this.view.onRender();
              },
              updateGenieModelProperties(properties) {
                  var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                  vtextTrait.set('options', properties);
              }
          },
          view: {
              onRender() {
                  const { $el, model } = this;
                  /* const bindTextTraitValue = model.getAttributes()['v-model']
                  $el.empty();
                  $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
              }
          },
      });
      editor.BlockManager.add('space', { label: 'Space', content: '<q-space />', media: '<img src="images/icons/components/ui_components/space.png" class="blockIcon" />', category: 'Content' });



      editor.DomComponents.addType("toolbar", {
        isComponent: el => {
            if (el.tagName == 'Q-TOOLBAR') {
                return { type: 'toolbar' }
            }
        },
        model: {
            defaults: {
                traits: [
{
    "label": "Reactive Model",
    "name": "v-model",
    "type": "select",
    "options": []
},
{
    "label": "inset",
    "name": ":inset",
    "type": "text"
}
],
            },
            init() {
                this.on('change:attributes', this.handleAttrChange);
            },
            handleAttrChange() {
                this.render();
            },
            render: function () {
                this.view.onRender();
            },
            updateGenieModelProperties(properties) {
                var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                vtextTrait.set('options', properties);
            }
        },
        view: {
            onRender() {
                const { $el, model } = this;
                /* const bindTextTraitValue = model.getAttributes()['v-model']
                $el.empty();
                $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
            }
        },
    });
    editor.BlockManager.add('toolbar', { label: 'Toolbar', content: '<q-toolbar />', media: '<img src="images/icons/components/ui_components/toolbar.png" class="blockIcon" />', category: 'Content' });
  


    
    editor.BlockManager.add( 'divElement', { label: 'Div', content: `<div>Div Text</div>`, media: `<img src="images/icons/components/ui_components/container.png" class="blockIcon"/>`, category: 'Content'   });







/* --------------------------------------------
              BLOCK CATEGORY: FORMS
     -------------------------------------------- */

     /* --------------------------------------------
                      Q-INPUT
     -------------------------------------------- */
        
     editor.DomComponents.addType( "Input", {
      isComponent: el => {
        if( el.tagName == 'Q-INPUT' ){
          return { type: 'Input'}
        }
      },
      model: {
        defaults: { 
          traits: [ 
            {
              label: 'Reactive Model',
              name: 'v-model',
              type: 'select',
              options: []
            },
            { label: 'name', name: 'name', type: 'text' },
            { label: 'mask', name: ':mask', type: 'text' },
            { label: 'fill-mask', name: 'fill-mask', type: 'checkbox' },
            {
              label: 'reverse-fill-mask',
              name: 'reverse-fill-mask',
              type: 'checkbox'
            },
            { label: 'unmasked-value', name: 'unmasked-value', type: 'checkbox' },
            { label: 'error', name: 'error', type: 'checkbox' },
            { label: 'error-message', name: ':error-message', type: 'text' },
            { label: 'no-error-icon', name: 'no-error-icon', type: 'checkbox' },
            { label: 'rules', name: 'rules', type: 'text' },
            { label: 'reactive-rules', name: 'reactive-rules', type: 'checkbox' },
            { label: 'lazy-rules', name: 'lazy-rules', type: 'checkbox' },
            { label: 'label', name: ':label', type: 'text' },
            { label: 'stack-label', name: 'stack-label', type: 'checkbox' },
            { label: 'hint', name: ':hint', type: 'text' },
            { label: 'hide-hint', name: 'hide-hint', type: 'checkbox' },
            { label: 'prefix', name: ':prefix', type: 'text' },
            { label: 'suffix', name: ':suffix', type: 'text' },
            { label: 'label-color', name: ':label-color', type: 'text' },
            { label: 'color', name: ':color', type: 'text' },
            { label: 'bg-color', name: ':bg-color', type: 'text' },
            { label: 'dark', name: 'dark', type: 'checkbox' },
            { label: 'loading', name: 'loading', type: 'checkbox' },
            { label: 'clearable', name: 'clearable', type: 'checkbox' },
            { label: 'clear-icon', name: ':clear-icon', type: 'text' },
            { label: 'filled', name: 'filled', type: 'checkbox' },
            { label: 'outlined', name: 'outlined', type: 'checkbox' },
            { label: 'borderless', name: 'borderless', type: 'checkbox' },
            { label: 'standout', name: 'standout', type: 'checkbox' },
            { label: 'label-slot', name: 'label-slot', type: 'checkbox' },
            { label: 'bottom-slots', name: 'bottom-slots', type: 'checkbox' },
            {
              label: 'hide-bottom-space',
              name: 'hide-bottom-space',
              type: 'checkbox'
            },
            { label: 'counter', name: 'counter', type: 'checkbox' },
            { label: 'rounded', name: 'rounded', type: 'checkbox' },
            { label: 'square', name: 'square', type: 'checkbox' },
            { label: 'dense', name: 'dense', type: 'checkbox' },
            { label: 'item-aligned', name: 'item-aligned', type: 'checkbox' },
            { label: 'disable', name: 'disable', type: 'checkbox' },
            { label: 'readonly', name: 'readonly', type: 'checkbox' },
            { label: 'autofocus', name: 'autofocus', type: 'checkbox' },
            { label: 'for', name: ':for', type: 'text' },
            { label: 'shadow-text', name: ':shadow-text', type: 'text' },
            { label: 'type', name: 'type', type:'select', options: ["text", "password", "textarea", "email", "search", "tel", "file", "number", "url", "time", "date"] },
            { label: 'debounce', name: ':debounce', type: 'text' },
            { label: 'maxlength', name: 'maxlength', type: 'text' },
            { label: 'autogrow', name: 'autogrow', type: 'checkbox' },
            { label: 'input-class', name: ':input-class', type: 'text' },
            { label: 'input-style', name: ':input-style', type: 'text' }
            /* { label: 'Reactive Model', name: 'v-model', type:'select', options: [] }, 
            { label: 'Type', name: 'type', type:'select', options: ["text", "password", "textarea", "email", "search", "tel", "file", "number", "url", "time", "date"] }, 
            { label: 'Label', name: 'label', type:'text' },                     
            { label: 'Hint', name: 'hint', type:'text' },                     
            { label: 'Max Length', name: 'maxlength', type:'number' },       */               
          ], 
          droppable: true,
          draggable: true,
          editable: true,
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
          var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties );
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()['v-model']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/ui_components/input_text_field.png" />` );
        }
      },
    });
    editor.BlockManager.add( 'TextInput', { label: 'Text', content: `<q-input />`, media: `<img src="images/icons/components/ui_components/input_text_field.png" class="blockIcon"/>`, category: 'Forms'   }); 




    /* --------------------------------------------
                    Q-BTN (BUTTON)
     -------------------------------------------- */
        
     editor.DomComponents.addType( "Button", {
      isComponent: el => {
        if( el.tagName == 'Q-BTN' ){
          return { type: 'Button'}
        }
      },
      model: {
        defaults: { 
          traits: [ 
            { label: 'On Click', name: 'v-on:click', type:'text' },                     
            { label: 'Label', name: ':label', type:'text' },                     
            { label: 'Size', name: ':size', type:'text' }, 
            { label: 'Outline', name: ':outline', type:'text' }, 
            { label: 'Flat', name: ':flat', type:'text' }, 
            { label: 'Unelevated', name: ':unelevated', type:'text' }, 
            { label: 'Rounded', name: ':rounded', type:'text' }, 
            { label: 'Push', name: ':push', type:'text' }, 
            { label: 'Glossy', name: ':glossy', type:'text' }, 
            { label: 'Fab', name: ':fab', type:'text' }, 
            { label: 'Fab-mini', name: ':fab-mini', type:'text' }, 
            { label: 'Padding', name: ':padding', type:'text' }, 
            { label: 'Color', name: ':color', type:'text' }, 
            { label: 'Text-color', name: ':text-color', type:'text' }, 
            { label: 'Dense', name: ':dense', type:'text' }, 
            { label: 'Ripple', name: ':ripple', type:'text' }, 
            { label: 'Round', name: ':round', type:'text' }             
          ], 
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          //this.view.onRender();
        },
        updateGenieModelProperties(properties){
          //var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          //vtextTrait.set('options', properties );
        }
      }, 
      view: {
        onRender(){
          /* const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()['v-model']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/ui_components/button.png" />
          <div>{${bindTextTraitValue}}</div>` ); */
        }
      },
    });
    editor.BlockManager.add( 'Button', { label: 'Button', content: `<q-btn label="Button"/>`, media: `<img src="images/icons/components/ui_components/button.png" class="blockIcon"/>`, category: 'Forms'   }); 



    
      editor.DomComponents.addType("button-group", {
          isComponent: el => {
              if (el.tagName == 'Q-BUTTON-GROUP') {
                  return { type: 'button-group' }
              }
          },
          model: {
              defaults: {
                  traits: [
                      {
                          "label": "Reactive Model",
                          "name": "v-model",
                          "type": "select",
                          "options": []
                      }
                  ],
              },
              init() {
                  this.on('change:attributes', this.handleAttrChange);
              },
              handleAttrChange() {
                  this.render();
              },
              render: function () {
                  this.view.onRender();
              },
              updateGenieModelProperties(properties) {
                  var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                  vtextTrait.set('options', properties);
              }
          },
          view: {
              onRender() {
                  const { $el, model } = this;
                  /* const bindTextTraitValue = model.getAttributes()['v-model']
                  $el.empty();
                  $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
              }
          },
      });
      editor.BlockManager.add('button-group', { label: 'Button Group', content: '<q-button-group />', media: '<img src="images/icons/components/ui_components/button-group.png" class="blockIcon" />', category: 'Forms' });
  


     
    
      editor.DomComponents.addType("button-dropdown", {
          isComponent: el => {
              if (el.tagName == 'Q-BUTTON-DROPDOWN') {
                  return { type: 'button-dropdown' }
              }
          },
          model: {
              defaults: {
                  traits: [
  {
      "label": "Reactive Model",
      "name": "v-model",
      "type": "select",
      "options": []
  }
],
              },
              init() {
                  this.on('change:attributes', this.handleAttrChange);
              },
              handleAttrChange() {
                  this.render();
              },
              render: function () {
                  this.view.onRender();
              },
              updateGenieModelProperties(properties) {
                  var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
                  vtextTrait.set('options', properties);
              }
          },
          view: {
              onRender() {
                  const { $el, model } = this;
                  /* const bindTextTraitValue = model.getAttributes()['v-model']
                  $el.empty();
                  $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
              }
          },
      });
      editor.BlockManager.add('button-dropdown', { label: 'Button Dropdown', content: '<q-button-dropdown />', media: '<img src="images/icons/components/ui_components/button-dropdown.png" class="blockIcon" />', category: 'Forms' });
      


      /* --------------------------------------------
                      Q-SELECT 
     -------------------------------------------- */
        
     editor.DomComponents.addType( "dropdown select", {
      isComponent: el => {
        if( el.tagName == 'Q-SELECT' ){
          return { type: 'dropdown select'}
        }
      },
      model: {
        defaults: { 
          traits: [ 
            { label: 'Reactive Model', name: 'v-model', type:'select', options: [] }, 
            { label: 'name', name: 'name', type: 'text' },
            { label: 'options', name: ':options', type: 'text' },
            {
              label: 'virtual-scroll-horizontal',
              name: 'virtual-scroll-horizontal',
              type: 'checkbox'
            },
            {
              label: 'virtual-scroll-slice-size',
              name: ':virtual-scroll-slice-size',
              type: 'text'
            },
            {
              label: 'virtual-scroll-slice-ratio-before',
              name: 'virtual-scroll-slice-ratio-before',
              type: ':text'
            },
            {
              label: 'virtual-scroll-slice-ratio-after',
              name: ':virtual-scroll-slice-ratio-after',
              type: 'text'
            },
            {
              label: 'virtual-scroll-item-size',
              name: ':virtual-scroll-item-size',
              type: 'text'
            },
            {
              label: 'virtual-scroll-sticky-size-start',
              name: ':virtual-scroll-sticky-size-start',
              type: 'text'
            },
            {
              label: 'virtual-scroll-sticky-size-end',
              name: ':virtual-scroll-sticky-size-end',
              type: 'text'
            },
            { label: 'table-colspan', name: ':table-colspan', type: 'text' },
            { label: 'error', name: 'error', type: 'checkbox' },
            { label: 'error-message', name: ':error-message', type: 'text' },
            { label: 'no-error-icon', name: 'no-error-icon', type: 'checkbox' },
            /* { label: 'rules', name: 'rules', type: undefined }, */
            { label: 'reactive-rules', name: 'reactive-rules', type: 'checkbox' },
            { label: 'lazy-rules', name: 'lazy-rules', type: 'checkbox' },
            { label: 'label', name: ':label', type: 'text' },
            { label: 'stack-label', name: 'stack-label', type: 'checkbox' },
            { label: 'hint', name: ':hint', type: 'text' },
            { label: 'hide-hint', name: 'hide-hint', type: 'checkbox' },
            { label: 'prefix', name: ':prefix', type: 'text' },
            { label: 'suffix', name: ':suffix', type: 'text' },
            { label: 'label-color', name: ':label-color', type: 'text' },
            { label: 'color', name: ':color', type: 'text' },
            { label: 'bg-color', name: ':bg-color', type: 'text' },
            { label: 'dark', name: 'dark', type: 'checkbox' },
            { label: 'loading', name: 'loading', type: 'checkbox' },
            { label: 'clearable', name: 'clearable', type: 'checkbox' },
            { label: 'clear-icon', name: ':clear-icon', type: 'text' },
            { label: 'filled', name: 'filled', type: 'checkbox' },
            { label: 'outlined', name: 'outlined', type: 'checkbox' },
            { label: 'borderless', name: 'borderless', type: 'checkbox' },
            { label: 'standout', name: 'standout', type: 'checkbox' },
            { label: 'label-slot', name: 'label-slot', type: 'checkbox' },
            { label: 'bottom-slots', name: 'bottom-slots', type: 'checkbox' },
            {
              label: 'hide-bottom-space',
              name: 'hide-bottom-space',
              type: 'checkbox'
            },
            { label: 'counter', name: 'counter', type: 'checkbox' },
            { label: 'rounded', name: 'rounded', type: 'checkbox' },
            { label: 'square', name: 'square', type: 'checkbox' },
            { label: 'dense', name: 'dense', type: 'checkbox' },
            { label: 'item-aligned', name: 'item-aligned', type: 'checkbox' },
            { label: 'disable', name: 'disable', type: 'checkbox' },
            { label: 'readonly', name: 'readonly', type: 'checkbox' },
            { label: 'autofocus', name: 'autofocus', type: 'checkbox' },
            { label: 'for', name: ':for', type: 'text' },
            { label: 'multiple', name: 'multiple', type: 'checkbox' },
            { label: 'display-value', name: ':display-value', type: 'text' },
            {
              label: 'display-value-html',
              name: 'display-value-html',
              type: 'checkbox'
            },
            /* { label: 'options', name: 'options', type: undefined },
            { label: 'option-value', name: 'option-value', type: undefined },
            { label: 'option-label', name: 'option-label', type: undefined },
            { label: 'option-disable', name: 'option-disable', type: undefined }, */
            { label: 'hide-selected', name: 'hide-selected', type: 'checkbox' },
            {
              label: 'hide-dropdown-icon',
              name: 'hide-dropdown-icon',
              type: 'checkbox'
            },
            { label: 'dropdown-icon', name: ':dropdown-icon', type: 'text' },
            { label: 'max-values', name: ':max-values', type: 'text' },
            { label: 'options-dense', name: 'options-dense', type: 'checkbox' },
            { label: 'options-dark', name: 'options-dark', type: 'checkbox' },
            {
              label: 'options-selected-class',
              name: ':options-selected-class',
              type: 'text'
            },
            { label: 'options-html', name: 'options-html', type: 'checkbox' },
            { label: 'options-cover', name: 'options-cover', type: 'checkbox' },
            { label: 'menu-shrink', name: 'menu-shrink', type: 'checkbox' },
            { label: 'menu-anchor', name: ':menu-anchor', type: 'text' },
            { label: 'menu-self', name: ':menu-self', type: 'text' },
            /* { label: 'menu-offset', name: 'menu-offset', type: undefined }, */
            {
              label: 'popup-content-class',
              name: ':popup-content-class',
              type: 'text'
            },
            {
              label: 'popup-content-style',
              name: ':popup-content-style',
              type: 'text'
            },
            { label: 'use-input', name: 'use-input', type: 'checkbox' },
            { label: 'use-chips', name: 'use-chips', type: 'checkbox' },
            { label: 'fill-input', name: 'fill-input', type: 'checkbox' },
            { label: 'new-value-mode', name: ':new-value-mode', type: 'text' },
            { label: 'map-options', name: 'map-options', type: 'checkbox' },
            { label: 'emit-value', name: 'emit-value', type: 'checkbox' },
            { label: 'input-debounce', name: ':input-debounce', type: 'text' },
            { label: 'input-class', name: ':input-class', type: 'text' },
            { label: 'input-style', name: ':input-style', type: 'text' },
            { label: 'tabindex', name: ':tabindex', type: 'text' },
            { label: 'autocomplete', name: ':autocomplete', type: 'text' },
            { label: 'transition-show', name: ':transition-show', type: 'text' },
            { label: 'transition-hide', name: ':transition-hide', type: 'text' },
            {
              label: 'transition-duration',
              name: ':transition-duration',
              type: 'text'
            },
            { label: 'behavior', name: ':behavior', type: 'text' }
                    /* { label: 'Options', name: ':options', type:'select', options: [] }, 
                    { label: 'Hide-bottom-space', name: 'hide-bottom-space', type:'checkbox' }, 
                    { label: 'Label', name: 'label', type:'text' }, 
                    { label: 'New-value-mode', name: 'new-value-mode', type:'text' }, 
                    { label: 'Loading', name: ':loading', type:'select', options: [] }, 
                    { label: 'Clearable', name: 'clearable', type:'checkbox' }, 
                    { label: 'Readonly', name: ':readonly', type:'select', options: [] }, 
                    { label: 'Max-values', name: 'max-values', type:'number' }, 
                    { label: 'Hint', name: 'hint', type:'text' }, 
                    { label: 'Rules', name: ':rules', type:'text' }, 
                    { label: 'Use-input', name: 'use-input', type:'checkbox' }, 
                    { label: 'Multiple', name: 'multiple', type:'checkbox' }, 
                    { label: 'Counter', name: 'counter', type:'checkbox' }, 
                    { label: 'Filled', name: 'filled', type:'checkbox' }, 
                    { label: 'Use-chips', name: 'use-chips', type:'checkbox' }   */
                  ], 
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
          var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties );
          var vtextTrait = this.get('traits').where({name: ':options'})[0];
          vtextTrait.set('options', properties );          
         /*  var vtextTrait = this.get('traits').where({name: ':loading'})[0];
          vtextTrait.set('options', properties );          
          var vtextTrait = this.get('traits').where({name: ':readonly'})[0];
          vtextTrait.set('options', properties ); */
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()['v-model']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/ui_components/select.png" />` );
        }
      },
    });
    editor.BlockManager.add( 'dropdown select', { label: 'Select', content: `<q-select />`, media: `<img src="images/icons/components/ui_components/select.png" class="blockIcon"/>`, category: 'Forms'   }); 




    /* --------------------------------------------
                      Q-RADIO
     -------------------------------------------- */


     editor.DomComponents.addType("Radio", {
      isComponent: el => {
          if (el.tagName == 'Q-RADIO') {
              return { type: 'Radio' }
          }
      },
      model: {
          defaults: {
              traits: [
                  {
                      "label": "Reactive Model",
                      "name": "v-model",
                      "type": "select",
                      "options": []
                  },
                  {
                      "label": "name",
                      "name": ":name",
                      "type": "text"
                  },
                  {
                      "label": "size",
                      "name": ":size",
                      "type": "text"
                  },
                  {
                      "label": "model-value",
                      "name": ":model-value",
                      "type": "text"
                  },
                  {
                      "label": "val",
                      "name": ":val",
                      "type": "text"
                  },
                  {
                      "label": "label",
                      "name": ":label",
                      "type": "text"
                  },
                  {
                      "label": "left-label",
                      "name": ":left-label",
                      "type": "text"
                  },
                  {
                      "label": "checked-icon",
                      "name": ":checked-icon",
                      "type": "text"
                  },
                  {
                      "label": "unchecked-icon",
                      "name": ":unchecked-icon",
                      "type": "text"
                  },
                  {
                      "label": "color",
                      "name": ":color",
                      "type": "text"
                  },
                  {
                      "label": "keep-color",
                      "name": ":keep-color",
                      "type": "text"
                  },
                  {
                      "label": "dark",
                      "name": ":dark",
                      "type": "text"
                  },
                  {
                      "label": "dense",
                      "name": ":dense",
                      "type": "text"
                  },
                  {
                      "label": "disable",
                      "name": ":disable",
                      "type": "text"
                  },
                  {
                      "label": "tabindex",
                      "name": ":tabindex",
                      "type": "text"
                  }
              ],
          },
          init() {
              this.on('change:attributes', this.handleAttrChange);
          },
          handleAttrChange() {
              this.render();
          },
          render: function () {
              this.view.onRender();
          },
          updateGenieModelProperties(properties) {
              var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
              vtextTrait.set('options', properties);
          }
      },
      view: {
          onRender() {
              const { $el, model } = this;
              /* const bindTextTraitValue = model.getAttributes()['v-model']
              $el.empty();
              $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
          }
      },
  });
  editor.BlockManager.add('radio', { label: 'Radio', content: '<q-radio />', media: '<img src="images/icons/components/ui_components/radio.png" class="blockIcon" />', category: 'Forms' });






    /* --------------------------------------------
                      Q-CHECKBOX
     -------------------------------------------- */
        
     editor.DomComponents.addType( "Checkbox", {
      isComponent: el => {
        if( el.tagName == 'Q-CHECKBOX' ){
          return { type: 'Checkbox'}
        }
      },
      model: {
        defaults: { 
          traits: [ 
            { label: 'Reactive Model', name: 'v-model', type:'select', options: [] }, 
            { label: 'Label', name: 'label', type:'text' },                     
          ], 
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
          var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties );
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()['v-model']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/ui_components/checkbox.png" />` );
        }
      },
    });
    editor.BlockManager.add( 'Checkbox', { label: 'Checkbox', content: `<q-checkbox />`, media: `<img src="images/icons/components/ui_components/checkbox.png" class="blockIcon"/>`, category: 'Forms'   }); 
    
    



      /* --------------------------------------------
                      Q-SLIDER 
     -------------------------------------------- */
        
  editor.DomComponents.addType( "slider", {
    isComponent: el => {
      if( el.tagName == 'Q-SLIDER' ){
        return { type: 'slider'}
      }
    },
    model: {
      defaults: { 
        //traits: [ { label: 'Reactive Model', name: 'v-model', type:'select', options: [] } ], 
        traits: [
          { label: 'Reactive Model', name: 'v-model', type:'select', options: [] },
          { label: 'name', name: ':name', type: 'text' },
          { label: 'snap', name: 'snap', type: 'checkbox' },
          { label: 'reverse', name: 'reverse', type: 'checkbox' },
          { label: 'vertical', name: 'vertical', type: 'checkbox' },

          { label: 'min', name: ':min', type: 'text' },
          { label: 'max', name: ':max', type: 'text' },
          { label: 'inner-min', name: ':inner-min', type: 'text' },
          { label: 'inner-max', name: ':inner-max', type: 'text' },
          { label: 'step', name: ':step', type: 'text' },
          { label: 'color', name: ':color', type: 'text' },
          { label: 'track-color', name: ':track-color', type: 'text' },
          { label: 'track-img', name: ':track-img', type: 'text' },
          {
            label: 'inner-track-color',
            name: ':inner-track-color',
            type: 'text'
          },
          { label: 'inner-track-img', name: ':inner-track-img', type: 'text' },
          { label: 'selection-color', name: ':selection-color', type: 'text' },
          { label: 'selection-img', name: ':selection-img', type: 'text' },
          { label: 'label', name: 'label', type: 'checkbox' },
          { label: 'label-color', name: ':label-color', type: 'text' },
          { label: 'label-text-color', name: ':label-text-color', type: 'text' },
          {
            label: 'switch-label-side',
            name: ':switch-label-side',
            type: 'checkbox'
          },
          { label: 'label-always', name: 'label-always', type: 'checkbox' },
          { label: 'markers', name: 'markers', type: 'checkbox' },
          { label: 'marker-labels', name: 'marker-labels', type: 'checkbox' },
          {
            label: 'marker-labels-class',
            name: 'marker-labels-class',
            type: 'text'
          },
          {
            label: 'switch-marker-labels-side',
            name: 'switch-marker-labels-side',
            type: 'checkbox'
          },
          { label: 'track-size', name: ':track-size', type: 'text' },
          { label: 'thumb-size', name: ':thumb-size', type: 'text' },
          { label: 'thumb-color', name: ':thumb-color', type: 'text' },
          { label: 'thumb-path', name: ':thumb-path', type: 'text' },
          { label: 'dark', name: 'dark', type: 'checkbox' },
          { label: 'dense', name: 'dense', type: 'checkbox' },
          { label: 'disable', name: 'disable', type: 'checkbox' },
          { label: 'readonly', name: 'readonly', type: 'checkbox' },
          { label: 'tabindex', name: ':tabindex', type: 'text' },
          { label: 'label-value', name: ':label-value', type: 'text' }
        ], 
      },
      init() {  
        this.on('change:attributes', this.handleAttrChange);
      },
      handleAttrChange() {
        this.render();
      },
      render: function(){
        this.view.onRender();
      },
      updateGenieModelProperties(properties){
        var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
        vtextTrait.set('options', properties );
      }
    }, 
    view: {
      onRender(){
        const { $el, model } = this;
        const bindTextTraitValue = model.getAttributes()['v-model']
        $el.empty();
        $el.append( `
        <img src="images/icons/components/ui_components/slider.png" />
        <div>{${bindTextTraitValue}}</div>` );
      }
    },
  });
  editor.BlockManager.add( 'slider', { label: 'Slider', content: `<q-slider />`, media: `<img src="images/icons/components/ui_components/slider.png" class="blockIcon"/>`, category: 'Forms'   }); 
  
  
  
  /* --------------------------------------------
                      Q-RANGE 
     -------------------------------------------- */
        
     editor.DomComponents.addType( "range", {
      isComponent: el => {
        if( el.tagName == 'Q-RANGE' ){
          return { type: 'range'}
        }
      },
      model: {
        defaults: { 
          traits: [ 
            { label: 'Reactive Model', name: 'v-model', type:'select', options: [] } , 
            { label: 'name', name: 'name', type: 'text' },
            { label: 'min', name: ':min', type: 'text' },
            { label: 'max', name: ':max', type: 'text' },
            { label: 'inner-min', name: ':inner-min', type: 'text' },
            { label: 'inner-max', name: ':inner-max', type: 'text' },
            { label: 'step', name: ':step', type: 'text' },
            { label: 'snap', name: 'snap', type: 'checkbox' },
            { label: 'reverse', name: 'reverse', type: 'checkbox' },
            { label: 'vertical', name: 'vertical', type: 'checkbox' },
            { label: 'color', name: ':color', type: 'text' },
            { label: 'track-color', name: ':track-color', type: 'text' },
            { label: 'track-img', name: ':track-img', type: 'text' },
            {
              label: 'inner-track-color',
              name: ':inner-track-color',
              type: 'text'
            },
            { label: 'inner-track-img', name: ':inner-track-img', type: 'text' },
            { label: 'selection-color', name: ':selection-color', type: 'text' },
            { label: 'selection-img', name: ':selection-img', type: 'text' },
            { label: 'label', name: 'label', type: 'checkbox' },
            { label: 'label-color', name: ':label-color', type: 'text' },
            { label: 'label-text-color', name: ':label-text-color', type: 'text' },
            {
              label: 'switch-label-side',
              name: 'switch-label-side',
              type: 'checkbox'
            },
            { label: 'label-always', name: 'label-always', type: 'checkbox' },
            { label: 'markers', name: 'markers', type: 'checkbox' },
            { label: 'marker-labels', name: 'marker-labels', type: 'checkbox' },
            {
              label: 'marker-labels-class',
              name: ':marker-labels-class',
              type: 'text'
            },
            {
              label: 'switch-marker-labels-side',
              name: 'switch-marker-labels-side',
              type: 'checkbox'
            },
            { label: 'track-size', name: ':track-size', type: 'text' },
            { label: 'thumb-size', name: ':thumb-size', type: 'text' },
            { label: 'thumb-color', name: ':thumb-color', type: 'text' },
            { label: 'thumb-path', name: ':thumb-path', type: 'text' },
            { label: 'dark', name: 'dark', type: 'checkbox' },
            { label: 'dense', name: 'dense', type: 'checkbox' },
            { label: 'disable', name: 'disable', type: 'checkbox' },
            { label: 'readonly', name: 'readonly', type: 'checkbox' },
            { label: 'tabindex', name: ':tabindex', type: 'text' },
            { label: 'drag-range', name: 'drag-range', type: 'checkbox' },
            {
              label: 'drag-only-range',
              name: 'drag-only-range',
              type: 'checkbox'
            },
            { label: 'left-label-color', name: ':left-label-color', type: 'text' },
            {
              label: 'left-label-text-color',
              name: ':left-label-text-color',
              type: 'text'
            },
            {
              label: 'right-label-color',
              name: ':right-label-color',
              type: 'text'
            },
            {
              label: 'right-label-text-color',
              name: ':right-label-text-color',
              type: 'text'
            },
            { label: 'left-label-value', name: ':left-label-value', type: 'text' },
            {
              label: 'right-label-value',
              name: ':right-label-value',
              type: 'text'
            },
            { label: 'left-thumb-color', name: ':left-thumb-color', type: 'text' },
            {
              label: 'right-thumb-color',
              name: ':right-thumb-color',
              type: 'text'
            }
        ]
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
          var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties );
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()['v-model']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/ui_components/range.png" />
          <div>{${bindTextTraitValue}}</div>` );
        }
      },
    });
    editor.BlockManager.add( 'range', { label: 'Range', content: `<q-range />`, media: `<img src="images/icons/components/ui_components/range.png" class="blockIcon"/>`, category: 'Forms'   }); 
  

    
  
  /* --------------------------------------------
                      Q-DATE 
     -------------------------------------------- */
        
     editor.DomComponents.addType( "Date Picker", {
      isComponent: el => {
        if( el.tagName == 'Q-DATE' ){
          return { type: 'Date Picker'}
        }
      },
      model: {
        defaults: { 
          traits: [ { label: 'Reactive Model', name: 'v-model', type:'select', options: [] }, 
                    { label: 'Mask', name: ':mask', type:'text' }, 
                    { label: 'Landscape', name: 'landscape', type:'checkbox' }, 
                    { label: 'Multiple', name: 'multiple', type:'checkbox' }, 
                    { label: 'Range', name: 'range', type:'checkbox' }, 
                    { label: 'Years in month view', name: 'years-in-month-view', type:'checkbox' }, 
                    { label: 'Navigation min year month', name: ':navigation-min-year-month', type:'text' }, 
                    { label: 'Navigation max year month', name: ':navigation-max-year-month', type:'text' }
                  ], 
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
          var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties );
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()['v-model']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/ui_components/date_picker.png" />
          <div>{${bindTextTraitValue}}</div>` );
        }
      },
    });
    editor.BlockManager.add( 'date picker', { label: 'Date Picker', content: `<q-date />`, media: `<img src="images/icons/components/ui_components/date_picker.png" class="blockIcon"/>`, category: 'Forms'   }); 



    editor.DomComponents.addType("time", {
      isComponent: el => {
          if (el.tagName == 'Q-TIME') {
              return { type: 'time' }
          }
      },
      model: {
          defaults: {
              traits: [
{
  "label": "Reactive Model",
  "name": "v-model",
  "type": "select",
  "options": []
},
{
  "label": "name",
  "name": ":name",
  "type": "text"
},
{
  "label": "landscape",
  "name": ":landscape",
  "type": "text"
},
{
  "label": "mask",
  "name": ":mask",
  "type": "text"
},
{
  "label": "locale",
  "name": ":locale",
  "type": "text"
},
{
  "label": "calendar",
  "name": ":calendar",
  "type": "text"
},
{
  "label": "color",
  "name": ":color",
  "type": "text"
},
{
  "label": "text-color",
  "name": ":text-color",
  "type": "text"
},
{
  "label": "dark",
  "name": ":dark",
  "type": "text"
},
{
  "label": "square",
  "name": ":square",
  "type": "text"
},
{
  "label": "flat",
  "name": ":flat",
  "type": "text"
},
{
  "label": "bordered",
  "name": ":bordered",
  "type": "text"
},
{
  "label": "readonly",
  "name": ":readonly",
  "type": "text"
},
{
  "label": "disable",
  "name": ":disable",
  "type": "text"
},
{
  "label": "model-value",
  "name": ":model-value",
  "type": "text"
},
{
  "label": "format24h",
  "name": ":format24h",
  "type": "text"
},
{
  "label": "default-date",
  "name": ":default-date",
  "type": "text"
},
{
  "label": "options",
  "name": ":options",
  "type": "text"
},
{
  "label": "hour-options",
  "name": ":hour-options",
  "type": "text"
},
{
  "label": "minute-options",
  "name": ":minute-options",
  "type": "text"
},
{
  "label": "second-options",
  "name": ":second-options",
  "type": "text"
},
{
  "label": "with-seconds",
  "name": ":with-seconds",
  "type": "text"
},
{
  "label": "now-btn",
  "name": ":now-btn",
  "type": "text"
}
],
          },
          init() {
              this.on('change:attributes', this.handleAttrChange);
          },
          handleAttrChange() {
              this.render();
          },
          render: function () {
              this.view.onRender();
          },
          updateGenieModelProperties(properties) {
              var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
              vtextTrait.set('options', properties);
          }
      },
      view: {
          onRender() {
              const { $el, model } = this;
              /* const bindTextTraitValue = model.getAttributes()['v-model']
              $el.empty();
              $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
          }
      },
  });
  editor.BlockManager.add('time', { label: 'Time Picker', content: '<q-time />', media: '<img src="images/icons/components/ui_components/time.png" class="blockIcon" />', category: 'Forms' });






    editor.DomComponents.addType("editor", {
      isComponent: el => {
          if (el.tagName == 'Q-EDITOR') {
              return { type: 'editor' }
          }
      },
      model: {
          defaults: {
              traits: [
{
  "label": "Reactive Model",
  "name": "v-model",
  "type": "select",
  "options": []
},
{
  "label": "fullscreen",
  "name": ":fullscreen",
  "type": "text"
},
{
  "label": "no-route-fullscreen-exit",
  "name": ":no-route-fullscreen-exit",
  "type": "text"
},
{
  "label": "model-value",
  "name": ":model-value",
  "type": "text"
},
{
  "label": "readonly",
  "name": ":readonly",
  "type": "text"
},
{
  "label": "square",
  "name": ":square",
  "type": "text"
},
{
  "label": "flat",
  "name": ":flat",
  "type": "text"
},
{
  "label": "dense",
  "name": ":dense",
  "type": "text"
},
{
  "label": "dark",
  "name": ":dark",
  "type": "text"
},
{
  "label": "disable",
  "name": ":disable",
  "type": "text"
},
{
  "label": "min-height",
  "name": ":min-height",
  "type": "text"
},
{
  "label": "max-height",
  "name": ":max-height",
  "type": "text"
},
{
  "label": "height",
  "name": ":height",
  "type": "text"
},
{
  "label": "definitions",
  "name": ":definitions",
  "type": "text"
},
{
  "label": "fonts",
  "name": ":fonts",
  "type": "text"
},
{
  "label": "toolbar",
  "name": ":toolbar",
  "type": "text"
},
{
  "label": "toolbar-color",
  "name": ":toolbar-color",
  "type": "text"
},
{
  "label": "toolbar-text-color",
  "name": ":toolbar-text-color",
  "type": "text"
},
{
  "label": "toolbar-toggle-color",
  "name": ":toolbar-toggle-color",
  "type": "text"
},
{
  "label": "toolbar-bg",
  "name": ":toolbar-bg",
  "type": "text"
},
{
  "label": "toolbar-outline",
  "name": ":toolbar-outline",
  "type": "text"
},
{
  "label": "toolbar-push",
  "name": ":toolbar-push",
  "type": "text"
},
{
  "label": "toolbar-rounded",
  "name": ":toolbar-rounded",
  "type": "text"
},
{
  "label": "paragraph-tag",
  "name": ":paragraph-tag",
  "type": "text"
},
{
  "label": "content-style",
  "name": ":content-style",
  "type": "text"
},
{
  "label": "content-class",
  "name": ":content-class",
  "type": "text"
},
{
  "label": "placeholder",
  "name": ":placeholder",
  "type": "text"
}
],
          },
          init() {
              this.on('change:attributes', this.handleAttrChange);
          },
          handleAttrChange() {
              this.render();
          },
          render: function () {
              this.view.onRender();
          },
          updateGenieModelProperties(properties) {
              var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
              vtextTrait.set('options', properties);
          }
      },
      view: {
          onRender() {
              const { $el, model } = this;
              /* const bindTextTraitValue = model.getAttributes()['v-model']
              $el.empty();
              $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
          }
      },
  });
  editor.BlockManager.add('editor', { label: 'Editor', content: '<q-editor />', media: '<img src="images/icons/components/ui_components/editor.png" class="blockIcon" />', category: 'Forms' });



  editor.DomComponents.addType("knob", {
    isComponent: el => {
        if (el.tagName == 'Q-KNOB') {
            return { type: 'knob' }
        }
    },
    model: {
        defaults: {
            traits: [
{
"label": "Reactive Model",
"name": "v-model",
"type": "select",
"options": []
},
{
"label": "name",
"name": ":name",
"type": "text"
},
{
"label": "size",
"name": ":size",
"type": "text"
},
{
"label": "model-value",
"name": ":model-value",
"type": "text"
},
{
"label": "min",
"name": ":min",
"type": "text"
},
{
"label": "max",
"name": ":max",
"type": "text"
},
{
"label": "inner-min",
"name": ":inner-min",
"type": "text"
},
{
"label": "inner-max",
"name": ":inner-max",
"type": "text"
},
{
"label": "step",
"name": ":step",
"type": "text"
},
{
"label": "reverse",
"name": ":reverse",
"type": "text"
},
{
"label": "instant-feedback",
"name": ":instant-feedback",
"type": "text"
},
{
"label": "color",
"name": ":color",
"type": "text"
},
{
"label": "center-color",
"name": ":center-color",
"type": "text"
},
{
"label": "track-color",
"name": ":track-color",
"type": "text"
},
{
"label": "font-size",
"name": ":font-size",
"type": "text"
},
{
"label": "thickness",
"name": ":thickness",
"type": "text"
},
{
"label": "angle",
"name": ":angle",
"type": "text"
},
{
"label": "show-value",
"name": ":show-value",
"type": "text"
},
{
"label": "tabindex",
"name": ":tabindex",
"type": "text"
},
{
"label": "disable",
"name": ":disable",
"type": "text"
},
{
"label": "readonly",
"name": ":readonly",
"type": "text"
}
],
        },
        init() {
            this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
            this.render();
        },
        render: function () {
            this.view.onRender();
        },
        updateGenieModelProperties(properties) {
            var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
            vtextTrait.set('options', properties);
        }
    },
    view: {
        onRender() {
            const { $el, model } = this;
            /* const bindTextTraitValue = model.getAttributes()['v-model']
            $el.empty();
            $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
        }
    },
});
editor.BlockManager.add('knob', { label: 'Knob', content: '<q-knob />', media: '<img src="images/icons/components/ui_components/knob.png" class="blockIcon" />', category: 'Forms' });



  /* --------------------------------------------
                      Lists
    -------------------------------------------- */
editor.BlockManager.add('quasarList', { label: 'List', content: '<q-list />', media: '<img src="images/icons/components/ui_components/list.png" class="blockIcon" />', category: 'Lists' });

editor.BlockManager.add('quasarItem', { label: 'ListItem', content: '<q-item />', media: '<img src="images/icons/components/ui_components/item.png" class="blockIcon" />', category: 'Lists' });

editor.BlockManager.add('quasarItemLabel', { label: 'ListItem Label', content: '<q-item-label />', media: '<img src="images/icons/components/ui_components/list-item-label.png" class="blockIcon" />', category: 'Lists' });




  /* --------------------------------------------
                      Tables
    -------------------------------------------- */

/* --------------------------------------------
                      Q-TABLE 
     -------------------------------------------- */
        
     editor.DomComponents.addType( "q-table", {
      isComponent: el => {
        if( el.tagName == 'Q-TABLE' ){
          return { type: 'q-table'}
        }
      },
      model: {
        defaults: { 
          traits: [ 
            {
              label: 'Reactive Model',
              name: 'v-model',
              type: 'select',
              options: []
            },
            { label: 'fullscreen', name: 'fullscreen', type: 'checkbox' },
            {
              label: 'no-route-fullscreen-exit',
              name: 'no-route-fullscreen-exit',
              type: 'checkbox'
            },
            { label: 'row-key', name: 'row-key', type: 'text' },
            { label: 'virtual-scroll', name: 'virtual-scroll', type: 'checkbox' },
            {
              label: 'virtual-scroll-slice-size',
              name: ':virtual-scroll-slice-size',
              type: 'text'
            },
            {
              label: 'virtual-scroll-slice-ratio-before',
              name: ':virtual-scroll-slice-ratio-before',
              type: 'text'
            },
            {
              label: 'virtual-scroll-slice-ratio-after',
              name: ':virtual-scroll-slice-ratio-after',
              type: 'text'
            },
            {
              label: 'virtual-scroll-item-size',
              name: ':virtual-scroll-item-size',
              type: 'text'
            },
            {
              label: 'virtual-scroll-sticky-size-start',
              name: ':virtual-scroll-sticky-size-start',
              type: 'text'
            },
            {
              label: 'virtual-scroll-sticky-size-end',
              name: ':virtual-scroll-sticky-size-end',
              type: 'text'
            },
            { label: 'table-colspan', name: ':table-colspan', type: 'text' },
            { label: 'color', name: ':color', type: 'text' },
            { label: 'icon-first-page', name: ':icon-first-page', type: 'text' },
            { label: 'icon-prev-page', name: ':icon-prev-page', type: 'text' },
            { label: 'icon-next-page', name: ':icon-next-page', type: 'text' },
            { label: 'icon-last-page', name: ':icon-last-page', type: 'text' },
            { label: 'grid', name: 'grid', type: 'checkbox' },
            { label: 'grid-header', name: 'grid-header', type: 'checkbox' },
            { label: 'dense', name: 'dense', type: 'checkbox' },
            { label: 'loading', name: 'loading', type: 'checkbox' },
            { label: 'title', name: 'title', type: 'text' },
            { label: 'hide-header', name: 'hide-header', type: 'checkbox' },
            { label: 'hide-bottom', name: 'hide-bottom', type: 'checkbox' },
            {
              label: 'hide-selected-banner',
              name: 'hide-selected-banner',
              type: 'checkbox'
            },
            { label: 'hide-no-data', name: 'hide-no-data', type: 'checkbox' },
            {
              label: 'hide-pagination',
              name: 'hide-pagination',
              type: 'checkbox'
            },
            { label: 'dark', name: 'dark', type: 'checkbox' },
            { label: 'flat', name: 'flat', type: 'checkbox' },
            { label: 'bordered', name: 'bordered', type: 'checkbox' },
            { label: 'square', name: 'square', type: 'checkbox' },
            { label: 'separator', name: ':separator', type: 'text' },
            { label: 'wrap-cells', name: 'wrap-cells', type: 'checkbox' },
            {
              label: 'binary-state-sort',
              name: 'binary-state-sort',
              type: 'checkbox'
            },
            {
              label: 'column-sort-order',
              name: ':column-sort-order',
              type: 'text'
            },
            { label: 'no-data-label', name: ':no-data-label', type: 'text' },
            { label: 'no-results-label', name: ':no-results-label', type: 'text' },
            { label: 'loading-label', name: ':loading-label', type: 'text' },
            {
              label: 'rows-per-page-label',
              name: ':rows-per-page-label',
              type: 'text'
            },
            { label: 'table-style', name: ':table-style', type: 'text' },
            { label: 'table-class', name: ':table-class', type: 'text' },
            {
              label: 'table-header-style',
              name: ':table-header-style',
              type: 'text'
            },
            {
              label: 'table-header-class',
              name: ':table-header-class',
              type: 'text'
            },
            {
              label: 'card-container-style',
              name: ':card-container-style',
              type: 'text'
            },
            {
              label: 'card-container-class',
              name: ':card-container-class',
              type: 'text'
            },
            { label: 'card-style', name: ':card-style', type: 'text' },
            { label: 'card-class', name: ':card-class', type: 'text' },
            { label: 'title-class', name: ':title-class', type: 'text' },
            { label: 'filter', name: ':filter', type: 'text' },
            { label: 'selection', name: ':selection', type: 'text' }
            /* { label: 'Reactive Model', name: 'v-model', type:'text' }, 
            { label: 'Columns', name: ':columns', type:'text' }, 
            { label: 'Data', name: ':data', type:'text' }, 
            { label: 'Row-key', name: 'row-key', type:'text' }, 
            { label: 'Pagination Sync', name: ':pagination.sync', type:'text' },  */
                    
          ], 
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
         updateGenieModelProperties(properties){
          var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties );
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()['v-model']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/ui_components/table.png" />` );
        }
      },
    });
    editor.BlockManager.add( 'q-table', { label: 'Data Table', content: `<q-table />`, media: `<img src="images/icons/components/ui_components/table.png" class="blockIcon"/>`, category: 'Tables'   }); 







  /* --------------------------------------------
                      Blocks
    -------------------------------------------- */
  
   /*  editor.BlockManager.add( 
      'titleAndContent', 
      { 
        label: 'Title + Content', 
        content: `<div class="row">
            <div class="col col-12">
                <h6>Title</h6>
                <div>Placeholder</div>
            </div>
          </div>`, 
        media: `<img src="images/icons/components/html_elements/header.png" class="blockIcon"/>`, 
        category: 'Blocks'   
      }
    ); 
 */

    

  
    

  
  
  
  

  /* --------------------------------------------
                      Q-EXPANSION-ITEM 
     -------------------------------------------- */
        
     /* editor.DomComponents.addType( "Expansion Item", {
      isComponent: el => {
        if( el.tagName == 'Q-EXPANSION-ITEM' ){
          return { type: 'Expansion Item'}
        }
      },
      model: {
        defaults: { 
          traits: [ 
                    { label: 'Label', name: 'label', type:'text' }, 
                    { label: 'Icon', name: 'icon', type:'text' }, 
                    { label: 'Expand separator', name: 'expand-separator', type:'checkbox' }, 
                  ], 
          droppable: true,
          draggable: true,
          editable: true,
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
          // var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          //vtextTrait.set('options', properties ); 
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          
        }
      },
    });
    editor.BlockManager.add( 'Expansion Item', { label: 'Expansion Item', content: `<q-expansion-item />`, media: `<img src="images/icons/components/ui_components/expansion_item.png" class="blockIcon"/>`, category: 'Forms'   }); 


  

     */
    
    


    /* --------------------------------------------
                      Loop Iterator
     -------------------------------------------- */
        
     /* editor.DomComponents.addType( "loop Iterator", {
      isComponent: el => {
        if( el.tagName == 'DIV' && el.classList.contains('loop-iterator') ){
          return { type: 'loop Iterator' }
        }
      },
      model: {
        defaults: { 
          traits: [             
            { label: 'Loop', name: 'v-for', type:'text', default:null },                    
          ], 
          droppable: true,
          draggable: true,
          editable: true,
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
          //var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          //vtextTrait.set('options', properties );
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          //const bindTextTraitValue = model.getAttributes()['v-model']
          
        }
      },
    });
    editor.BlockManager.add( 'loop Iterator', { label: 'Loop Iterator', content: `<div v-for="" class="loop-iterator"></div>`, media: `<img src="images/icons/components/default.png" class="blockIcon"/>`, category: 'Control Logic'   }); 
 */
    /* --------------------------------------------
                      Conditional
     -------------------------------------------- */
        
     /* editor.DomComponents.addType( "conditional Block", {
      isComponent: el => {
        if( el.tagName == 'DIV' && el.classList.contains('conditional-block') ){
          return { type: 'conditional Block' }
        }
      },
      model: {
        defaults: { 
          traits: [             
            { label: 'Show if', name: 'v-show', type:'text', default:null }, 
            { label: 'Run if', name: 'v-if', type:'text', default:null },                 
          ], 
          droppable: true,
          draggable: true,
          editable: true,
        },
        init() {  
          this.on('change:attributes', this.handleAttrChange);
        },
        handleAttrChange() {
          this.render();
        },
        render: function(){
          this.view.onRender();
        },
        updateGenieModelProperties(properties){
          //var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          //vtextTrait.set('options', properties );
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          //const bindTextTraitValue = model.getAttributes()['v-model']
          
        }
      },
    });
    editor.BlockManager.add( 'conditional Block', { label: 'Conditional Block', content: `<div class="conditional-block"></div>`, media: `<img src="images/icons/components/default.png" class="blockIcon"/>`, category: 'Control Logic'   }); 
 */


    
  /* --------------------------------------------
                      PLOTLY
     -------------------------------------------- */


   editor.DomComponents.addType( "plotly", {
    isComponent: el => {
      if( el.tagName == 'PLOTLY' ){
        return { type: 'plotly'}
      }
    },
    model: {
      defaults: { 
        traits: [ 
          { label: 'Data', name: ':data', type:'textarea' }, 
          { label: 'Layout', name: ':layout', type:'textarea' }, 
          { label: 'Config', name: ':config', type:'textarea' }, 
                  
        ], 
      },
      init() {  
        this.on('change:attributes', this.handleAttrChange);
      },
      handleAttrChange() {
        this.render();
      },
      render: function(){
        this.view.onRender();
      },
      updateGenieModelProperties(properties){
        /* let vtextTrait = this.get('traits').where({name: ':data'})[0];
        vtextTrait.set('options', properties );
        vtextTrait = this.get('traits').where({name: ':layout'})[0];
        vtextTrait.set('options', properties ); */
      }
    }, 
    view: {
      onRender(){
        const { $el, model } = this;
        const bindTextTraitValue = model.getAttributes()[':data']
        $el.empty();
        $el.append( `
        <img src="images/icons/components/ui_components/chart.png" />` );
      }
    },
  });

    
    editor.BlockManager.add( 'scatterChart', { label: 'Scatter', content: `<plotly :data="[{
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      type: 'scatter'
    }]" />`, media: `<img src="images/icons/components/charts/scatter.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    editor.BlockManager.add( 'lineChart', { label: 'Line', content: `<plotly :data="[{
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      type: 'scatter'
    }]" />`, media: `<img src="images/icons/components/charts/line.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    editor.BlockManager.add( 'mapboxChart', { label: 'Mapbox', content: `<plotly :data="[{
      type: 'scattermapbox',
      text: [ 10, 5 ],
      lon: [ -90.1744208, -90.9007405 ],
      lat: [ 38.0032799, 38.0021822 ],
      marker: { color: 'fuchsia', size: 4 }
    }]" :layout="{
      dragmode: 'zoom',
      mapbox: { style: 'open-street-map', center: { lat: 38, lon: -90 }, zoom: 3 }
    }" />`, media: `<img src="images/icons/components/charts/lineMaps.png" class="blockIcon"/>`, category: 'Charts'   }); 


    editor.BlockManager.add( 'barChart', { label: 'Bar', content: `<plotly :data="[{
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      type: 'bar'
    }]" />`, media: `<img src="images/icons/components/charts/bar.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'pieChart', { label: 'Pie', content: `<plotly :data="[{
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie'
    }]" :layout="{
      height: 400,
      width: 500
    }" />`, media: `<img src="images/icons/components/charts/pie.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'bubbleChart', { label: 'Bubble', content: `<plotly :data="[{
      x: [1, 2, 3, 4],
      y: [10, 11, 12, 13],
      mode: 'markers',
      marker: {
        size: [40, 60, 80, 100]
      }
    }]" />`, media: `<img src="images/icons/components/charts/bubble.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'heatmapsChart', { label: 'Heatmaps', content: `<plotly :data="[{
      z: [[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
      x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      y: ['Morning', 'Afternoon', 'Evening'],
      type: 'heatmap',
      hoverongaps: false
    }]" />`, media: `<img src="images/icons/components/charts/heatMaps.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'contourChart', { label: 'Contour', content: `<plotly :data="[{
      z: [[10, 10.625, 12.5, 15.625, 20],
           [5.625, 6.25, 8.125, 11.25, 15.625],
           [2.5, 3.125, 5., 8.125, 12.5],
           [0.625, 1.25, 3.125, 6.25, 10.625],
           [0, 0.625, 2.5, 5.625, 10]],
      x: [-9, -6, -5 , -3, -1],
      y: [0, 1, 4, 5, 7],
      type: 'contour'
    }]" />`, media: `<img src="images/icons/components/charts/contour.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'boxChart', { label: 'Box', content: `<plotly :data="[{
      y: [0, 1, 1, 2, 3, 5, 8, 13, 21],
      type: 'box'
    }]" />`, media: `<img src="images/icons/components/charts/box.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'histogramChart', { label: 'Histogram', content: `<plotly :data="[{
      x: [2, 12, 4, 6, 9, 5],
      type: 'histogram',
  }]" />`, media: `<img src="images/icons/components/charts/histogram.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'funnelChart', { label: 'Funnel', content: `<plotly :data="[{
      type: 'funnel', 
      y: ['Website visit', 'Downloads', 'Potential customers', 'Invoice sent', 'Closed delas'], 
      x: [13873, 10533, 5443, 2703, 908], 
    }]" />`, media: `<img src="images/icons/components/charts/funnel_funnelArea.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'indicatorChart', { label: 'Indicator', content: `<plotly :data="[{
      domain: { x: [0, 1], y: [0, 1] },
      value: 450,
      title: { text: 'Speed' },
      type: 'indicator',
      mode: 'gauge+number',
      delta: { reference: 400 },
      gauge: { axis: { range: [null, 500] } }
    }
  ]" />`, media: `<img src="images/icons/components/charts/indicator.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'scatter3dChart', { label: 'Scatter3D', content: `<plotly :data="[{
      x: [1,2,3,4,5], 
      y: [1,1,1,2,3], 
      z: [5,4,4,3,2],
      mode: 'markers',
      type: 'scatter3d'
    }]" />`, media: `<img src="images/icons/components/charts/scatter3d.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'surface3dChart', { label: '3dSurface', content: `<plotly :data="[{
      z: [ [1,2,3,4,5], [1,1,1,2,3], [5,4,4,3,2] ],
      type: 'surface'
    }]"  />`, media: `<img src="images/icons/components/charts/3dSurface.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'mesh3dChart', { label: 'Mesh3D', content: `<plotly :data="[{
      x: [1,2,3,4,5], 
      y: [1,1,1,2,3], 
      z: [5,4,4,3,2],
      type: 'mesh3d'
    }]" />`, media: `<img src="images/icons/components/charts/3dMesh.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'bubbleMapChart', { label: 'Bubble Map', content: `<plotly :data="[{
      type: 'scattergeo',
      mode: 'markers',
      locations: ['FRA', 'DEU', 'RUS', 'ESP'],
      marker: {
          size: [20, 30, 15, 10],
          color: [10, 20, 40, 50],
          cmin: 0,
          cmax: 50,
          colorscale: 'Greens',
          colorbar: {
              title: 'Some rate',
              ticksuffix: '%',
              showticksuffix: 'last'
          },
  
          line: {
              color: 'black'
          }
      },
      name: 'europe data'
  }]" :layout="{
    'geo': {
        'scope': 'europe',
        'resolution': 50
    }
}" />`, media: `<img src="images/icons/components/charts/bubbleMaps.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    

    editor.BlockManager.add( 'linesMapChart', { label: 'Lines Map', content: `<plotly :data="[{
      type: 'scattergeo',
      lat: [ 40.7127, 51.5072 ],
      lon: [ -74.0059, 0.1275 ],
      mode: 'lines',
      line:{
          width: 2,
          color: 'blue'
      }
    }]" :layout="{
      showlegend: false,
      geo: {
          resolution: 50,
          showland: true,
          showlakes: true,
          projection: {
            type: 'equirectangular'
          },
          coastlinewidth: 2,
          lataxis: {
            range: [ 20, 60 ],
            showgrid: true,
            tickmode: 'linear',
            dtick: 10
          },
    
          lonaxis:{
            range: [-100, 20],
            showgrid: true,
            tickmode: 'linear',
            dtick: 20
          }
        }
    }" />`, media: `<img src="images/icons/components/charts/lineMaps.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    
    editor.BlockManager.add( 'scatterMapboxChart', { label: 'Scatter Mapbox', content: `<plotly :data="[{
      type: 'scattermapbox',
      fill: 'toself',
      lon: [-74, -70, -70, -74],
      lat: [47, 47, 45, 45],
      marker: { size: 10, color: 'orange' }
    }]" :layout="{
      mapbox: {
        style: 'stamen-terrain',
        center: { lon: -73, lat: 46 },
        zoom: 5
      },
    
      showlegend: false,
      height: 450,
      width: 600
    }" />`, media: `<img src="images/icons/components/charts/scatterMapBox.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    
    editor.BlockManager.add( 'chloroPlethChart', { label: 'Chloropleth', content: `<plotly :data="[{
      type: 'chloropleth',
      locationmode: 'country names',
      locations: ['Lithuania' ,'Russia','Romania' ,'Ukraine'], 
      z: [17.5, 16.8, 15.4, 15.1],
      text: ['Lithuania' ,'Russia','Romania' ,'Ukraine'],
      autocolorscale: true
  }]" :layout="{  title: 'Pure alcohol consumption<br>among adults (age 15+) in 2010',
  geo: { projection: { type: 'robinson' }}
}" />`, media: `<img src="images/icons/components/charts/choropleth.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    
    editor.BlockManager.add( 'streamTubeChart', { label: 'StreamTube', content: `<plotly :data="[{
      type: 'streamtube',
      x: [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2],
      y: [0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2],
      z: [0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2],
      u: [1,1,1,1,1,1,1,1,1,1.841470985,1.841470985,1.841470985,1.841470985,1.841470985,1.841470985,1.841470985,1.841470985,1.841470985,1.909297427,1.909297427,1.909297427,1.909297427,1.909297427,1.909297427,1.909297427,1.909297427,1.909297427],
      v: [1,1,1,0.5403023059,0.5403023059,0.5403023059,-0.4161468365,-0.4161468365,-0.4161468365,1,1,1,0.5403023059,0.5403023059,0.5403023059,-0.4161468365,-0.4161468365,-0.4161468365,1,1,1,0.5403023059,0.5403023059,0.5403023059,-0.4161468365,-0.4161468365,-0.4161468365],
      w: [0,0.088656062,0.169392742,0,0.088656062,0.169392742,0,0.088656062,0.169392742,0,0.088656062,0.169392742,0,0.088656062,0.169392742,0,0.088656062,0.169392742,0,0.088656062,0.169392742,0,0.088656062,0.169392742,0,0.088656062,0.169392742],
      sizeref: 0.5,
      cmin: 0,
      cmax: 3
    }]" :layout="{
      scene: {
        camera: {
          eye: {
           x: -0.7243612458865182,
           y: 1.9269804254717962,
           z: 0.6704828299861716
          }
        }
      }
    }" />`, media: `<img src="images/icons/components/charts/streamtube.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    
    editor.BlockManager.add( 'coneChart', { label: 'Cone', content: `<plotly :data="[{
      type: 'cone',
      x: [1], y: [1], z: [1],
      u: [1], v: [1], w: [0]
    }]" :layout="{
      'scene': {
        'camera': {
          'eye': {x: -0.76, y: 1.8, z: 0.92}
        }
      }
    }" />`, media: `<img src="images/icons/components/charts/cone.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    
    editor.BlockManager.add( 'histogram2d', { label: 'Histogram2D', content: `<plotly :data="[
      {
        x: [0.37,0.18,0.31,0.73,0.94,0.28,0.68,0.26,0.14,0.93,0.33,0.77,0.18,0.97,0.57,0.95,0.08,0.91,0.96,0.07,0.31,0.19,0.81,0.03,0.91,0.41,0.42,0.66,0.75,0.56],
        y: [0.60,0.62,0.39,0.18,0.98,0.98,0.10,0.33,0.54,0.24,0.45,0.64,0.75,0.27,0.75,0.16,0.09,0.57,0.39,0.17,0.06,0.92,0.11,0.56,0.43,0.63,0.02,0.92,0.88,0.08],
        type: 'histogram2d'
      }
    ]"  />`, media: `<img src="images/icons/components/charts/histogram2d.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    
    editor.BlockManager.add( 'histogram2dcontour', { label: 'Histogram2DContour', content: `<plotly :data="[
      {
        x: [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2],
        y: [0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2],
        type: 'histogram2dcontour'
      }
    ]" />`, media: `<img src="images/icons/components/charts/histogram2dContour.png" class="blockIcon"/>`, category: 'Charts'   }); 
    
    
    editor.BlockManager.add( 'scatterGlChart', { label: 'ScatterGL', content: `<plotly :data="[{
      type: 'scattergl',
      mode: 'markers',
      marker: {
          line: {
              width: 1,
              color: '#404040'}
      },
      x: [1,3,2,6,3,4,8,6,9,10],
      y: [6,7,4,8,2,3,1,9,5,10]
   }]" />`, media: `<img src="images/icons/components/charts/scatter.png" class="blockIcon"/>`, category: 'Charts'   }); 


        
  editor.BlockManager.add( 'plotly', { label: 'Generic Chart', content: `<plotly />`, media: `<img src="images/icons/components/ui_components/chart.png" class="blockIcon"/>`, category: 'Charts'   }); 




  
    
  /* --------------------------------------------
                     MULTIMEDIA
     -------------------------------------------- */
     editor.DomComponents.addType("audio", {
      isComponent: el => {
          if (el.tagName == 'AUDIO') {
              return { type: 'audio' }
          }
      },
      model: {
          defaults: {
              traits: [
                /* {
                  "label": "Reactive Model",
                  "name": "v-model",
                  "type": "select",
                  "options": []
                }, */
                { "label": "src",  "name": ":src",  "type": "text"   },
                { "label": "autoplay",  "name": ":autoplay",  "type": "text"   },
                { "label": "controls",  "name": ":controls",  "type": "text"   },
                { "label": "crossorigin",  "name": ":crossorigin",  "type": "text"   },
                { "label": "loop",  "name": ":loop",  "type": "text"   },
                { "label": "muted",  "name": ":muted",  "type": "text"   },
                { "label": "preload",  "name": ":preload",  "type": "text"   }
              ]
          },
          init() {
              this.on('change:attributes', this.handleAttrChange);
          },
          handleAttrChange() {
              this.render();
          },
          render: function () {
              this.view.onRender();
          },
          updateGenieModelProperties(properties) {
              /* var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
              vtextTrait.set('options', properties); */
          }
      },
      view: {
          onRender() {
              const { $el, model } = this;
              /* const bindTextTraitValue = model.getAttributes()['v-model']
              $el.empty();
              $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
          }
      },
  });

    editor.BlockManager.add( 'audio', { label: 'Audio', content: `<audio :controls="true" />`, media: `<img src="images/icons/components/html_elements/audio.png" class="blockIcon"/>`, category: 'Multimedia'   }); 



     editor.DomComponents.addType("quasarImage", {
      isComponent: el => {
          if (el.tagName == 'Q-IMG') {
              return { type: 'quasarImage' }
          }
      },
      model: {
          defaults: {
              traits: [
                /* {
                  "label": "Reactive Model",
                  "name": "v-model",
                  "type": "select",
                  "options": []
                }, */
                { "label": "src",  "name": ":src",  "type": "text"   },
                { "label": "ration", "name": ":ration", "type": "text"  },
                { "label": "srcset",  "srcset": ":name",  "type": "text"  },
                { "label": "sizes", "name": ":sizes", "type": "text"  },
                { "label": "placeholder-src",  "name": ":placeholder-src",  "type": "text"  },
                { "label": "initial-ratio", "name": ":initial-ratio", "type": "text"  }, 
                { "label": "width", "name": ":width", "type": "text"  }, 
                { "label": "height", "name": ":height", "type": "text"  }, 
                { "label": "loading", "name": ":loading", "type": "text"  }, 
                { "label": "crossorigin", "name": ":crossorigin", "type": "text"  }, 
                { "label": "decoding", "name": ":decoding", "type": "text"  }, 
                { "label": "referrerpolicy", "name": ":referrerpolicy", "type": "text"  }, 
                { "label": "fetchpriority", "name": ":fetchpriority", "type": "text"  }, 
                { "label": "fit", "name": ":fit", "type": "text"  }, 
                { "label": "position", "name": ":position", "type": "text"  }, 
                { "label": "alt", "name": ":alt", "type": "text"  }, 
                { "label": "draggable", "name": ":draggable", "type": "text"  }, 
                { "label": "img-class", "name": ":img-class", "type": "text"  }, 
                { "label": "img-style", "name": ":img-style", "type": "text"  }, 
                { "label": "spinner-color", "name": ":spinner-color", "type": "text"  }, 
                { "label": "spinner-size", "name": ":spinner-size", "type": "text"  }, 
                { "label": "no-spinner", "name": ":no-spinner", "type": "text"  }, 
                { "label": "no-native-menu", "name": ":no-native-menu", "type": "text"  }, 
                { "label": "no-transition", "name": ":no-transition", "type": "text"  }
                ],
          },
          init() {
              this.on('change:attributes', this.handleAttrChange);
          },
          handleAttrChange() {
              this.render();
          },
          render: function () {
              this.view.onRender();
          },
          updateGenieModelProperties(properties) {
              /* var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
              vtextTrait.set('options', properties); */
          }
      },
      view: {
          onRender() {
              const { $el, model } = this;
              /* const bindTextTraitValue = model.getAttributes()['v-model']
              $el.empty();
              $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
          }
      },
  });

    editor.BlockManager.add( 'quasarImage', { label: 'Image', content: `<q-img />`, media: `<img src="images/icons/components/ui_components/img.png" class="blockIcon"/>`, category: 'Multimedia'   }); 




    editor.DomComponents.addType("video", {
      isComponent: el => {
          if (el.tagName == 'Q-VIDEO') {
              return { type: 'video' }
          }
      },
      model: {
          defaults: {
              traits: [
/* {
  "label": "Reactive Model",
  "name": "v-model",
  "type": "select",
  "options": []
}, */
{
  "label": "ratio",
  "name": ":ratio",
  "type": "text"
},
{
  "label": "src",
  "name": ":src",
  "type": "text"
},
{
  "label": "title",
  "name": ":title",
  "type": "text"
},
{
  "label": "fetchpriority",
  "name": ":fetchpriority",
  "type": "text"
},
{
  "label": "loading",
  "name": ":loading",
  "type": "text"
},
{
  "label": "referrerpolicy",
  "name": ":referrerpolicy",
  "type": "text"
}
],
          },
          init() {
              this.on('change:attributes', this.handleAttrChange);
          },
          handleAttrChange() {
              this.render();
          },
          render: function () {
              this.view.onRender();
          },
          updateGenieModelProperties(properties) {
              /* var vtextTrait = this.get('traits').where({ name: 'v-model' })[0];
              vtextTrait.set('options', properties); */
          }
      },
      view: {
          onRender() {
              const { $el, model } = this;
              /* const bindTextTraitValue = model.getAttributes()['v-model']
              $el.empty();
              $el.append( '<img src="images/icons/components/ui_components/badge.png" />' ); */
          }
      },
  });
  editor.BlockManager.add('video', { label: 'Video', content: '<q-video />', media: '<img src="images/icons/components/ui_components/video.png" class="blockIcon" />', category: 'Multimedia' });

    
    /* 
    editor.BlockManager.add( 'XXXXXXXXXX', { label: 'XXXXXXXXXX', content: `<plotly :data="XXXXXXXXXX" :layout="XXXXXXXXXX" />`, media: `<img src="images/icons/components/ui_components/chart.png" class="blockIcon"/>`, category: 'Charts'   });  */
    
    
   


  /*     
    // VUE BLOCK
    editor.DomComponents.addType('vueblock', {
      // Make the editor understand when to bind `my-input-type`
      isComponent: el => el.tagName === 'VUEBLOCK',
    
      // Model definition
      model: {
        // Default properties
        defaults: {
          tagName: 'vueblock',

          // Custom properties
          linkedVariable: "", 

          script: function(props) {
            const app1El = document.createElement("div");
            app1El.id = "appIKA";
      
            //const app1Script = document.createElement("script");
            //app1Script.type = "text/javascript";
            //app1Script.src = "blocks/vueBlock.js";
      
            this.appendChild(app1El);
            //this.appendChild(app1Script);

            console.log( "My Traits: ", this )
            new Vue({
                el: "#appIKA",
                store: window.store, 
                data: {
                    //traits: this.model.traits,
                  linkedVariable: props.linkedVariable, 
                  message: "Hi Vue!"
                },
                template: `<section style="min-height: 50px;" class="vueComponent">
                  <div style="margin: 10px 0px;">
                      <input @change="messageChanged" type="text" name="modelMessage" id="" v-model="$store.state[linkedVariable]"> {{ $store.state[linkedVariable] }} - ({{linkedVariable}})
                  </div>
                </section>`, 
                methods: {
                  changeMessage( msg ){
                    console.log( "changeMEssage(): ", msg );
                    this.message = msg;
                  }, 
                  messageChanged(){
                    console.log("messageChanged");
                    socket.emit('message', this.$store.state.message);
                  }
                }, 
                mounted(){
                  console.log( "stipple vue component mounted" );
                  window.vueComponents.push( this );
                }
              });
          }, 
          //draggable: 'form, form *', // Can be dropped only inside `form` elements
          droppable: false, // Can't drop other elements inside
          attributes: { // Default attributes
            type: 'text',
            name: 'default-name',
            linkedVariable: "",
            placeholder: 'Insert text here',
          },
          traits: [
            'type',
            'name',
            { name: 'linkedVariable', changeProp: true },
            'placeholder',
            { type: 'checkbox', name: 'required' },
          ],
          'script-props': ['linkedVariable'],
        }
      }
    });
    editor.BlockManager.add("vueBlock", {
        label: "Vue Block",
        content: {
          type: 'vueblock', 
        }
      }); 
      */
  };