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
        console.log( "setText: ", this.text);
      }, 
      onChanged(){
        console.log( "onChanged: ", this.text);
      }
    },
    template: '<textarea v-on:change="onChanged"></textarea>'
  });

  editor.TraitManager.addType('textarea', {
    createInput({ trait }) {
      const vueInst = new Vue({ render: h => h(TextAreaVueComponent) }).$mount();
      const textAreaInst = vueInst.$children[0];
      textAreaInst.$on('change', ev => this.onChange(ev)); // Use onChange to trigger onEvent
      this.textAreaInst = textAreaInst;
      return vueInst.$el;
    },
  
    onEvent({ component }) {
      const value = this.textAreaInst.getText() || 0;
      component.addAttributes({ value });
    },
  
    onUpdate({ component }) {
      const value = component.getAttributes().value || 0;
      this.textAreaInst.setText(value);
    },
  });



  let getModelValue = function( propName ){
    let vueApp = window[appName];
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
    let vueApp = window[appName];
    let vueProp = vueApp[newValue];
      if( vueProp != null )
        target.view.el.textContent = vueProp;
      else
        target.view.el.textContent = "{{ newValue }}";
      return this;
  };

  // Custom components
  // -----------------------------------
  let vtext_components = [
    { type:'p', tagName:'P', label:'Paragraph', icon:'html_elements/p.png' }, 
    { type:'span', tagName:'SPAN', label:'Span', icon:'default.png' }, 
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
            { label: 'Binded Text', name: 'v-text', type:'select', options: [] }, 
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
          let modelProps = [ { name:"** None **", value:"" }, ...properties];
          console.log( 'modelProps: ', modelProps, modelProps===properties );
          vtextTrait.set('options', modelProps );
        }
      }, 
      view: {
        onRender(changedProps){
          const { $el, model } = this;
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
          $el.append( innerText );
        }
      },
    });
    editor.BlockManager.add( item.type, { label: item.label, content: `<${item.type} v-text="">Default content</${item.type}>`, media: `<img src="images/icons/components/${item.icon}" class="blockIcon"/>`, category: 'Texts'   }); 
  } );


  /* editor.DomComponents.addType( "stpl-image", {
    isComponent: el => el.tagName == 'IMG',
    model: {
      defaults: { traits: [ { label: 'Binded Source', name: ':src', type:'select', options: [] } ], resizable: true },
      init() {  
        this.on('change:attributes::src', this.render)
      },
      render: function (target, newValue) {  
        let vueApp = window[appName];
        let vueProp = vueApp[newValue];
        setTimeout( ()=>{
          if( vueProp != null ){
            target.view.el.setAttribute( 'src', vueProp );
          }else{
            target.view.el.setAttribute( 'src', newValue );
          }
        }, 100)
          return this;
      },
      updateGenieModelProperties(properties){
        var vtextTrait = this.get('traits').where({name: ':src'})[0];
        vtextTrait.set('options', properties );
      }
    }, 
  });
  editor.BlockManager.add( 'img', { label: 'Stipple Image', content: `<img :src="" src="empty" />`, category: 'Stipple'   });  */
    

  
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
        traits: [ { label: 'Reactive Model', name: 'v-model', type:'select', options: [] } ], 
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
          traits: [ { label: 'Reactive Model', name: 'v-model', type:'select', options: [] } , 
          { label: 'Min', name: ':min', type:'number' }, 
          { label: 'Max', name: ':max', type:'number' } ]
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
          traits: [ { label: 'Reactive Model', name: 'v-model', type:'select', options: [] }, 
                    { label: 'Options', name: ':options', type:'select', options: [] }, 
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
                    { label: 'Use-chips', name: 'use-chips', type:'checkbox' }  
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
          var vtextTrait = this.get('traits').where({name: ':loading'})[0];
          vtextTrait.set('options', properties );          
          var vtextTrait = this.get('traits').where({name: ':readonly'})[0];
          vtextTrait.set('options', properties );
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()['v-model']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/ui_components/select.png" />
          <div>{${bindTextTraitValue}}</div>` );
        }
      },
    });
    editor.BlockManager.add( 'dropdown select', { label: 'Select', content: `<q-select />`, media: `<img src="images/icons/components/ui_components/select.png" class="blockIcon"/>`, category: 'Forms'   }); 
  
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
                    { label: 'Mask', name: 'mask', type:'text' }, 
                    { label: 'Landscape', name: 'landscape', type:'checkbox' }, 
                    { label: 'Multiple', name: 'multiple', type:'checkbox' }, 
                    { label: 'Range', name: 'range', type:'checkbox' }, 
                    { label: 'Years in month view', name: 'years-in-month-view', type:'checkbox' }, 
                    { label: 'Navigation min year month', name: 'navigation-min-year-month', type:'text' }, 
                    { label: 'Navigation max year month', name: 'navigation-max-year-month', type:'text' }
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

  /* --------------------------------------------
                      Q-EXPANSION-ITEM 
     -------------------------------------------- */
        
     editor.DomComponents.addType( "Expansion Item", {
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
          /* var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties ); */
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          
        }
      },
    });
    editor.BlockManager.add( 'Expansion Item', { label: 'Expansion Item', content: `<q-expansion-item />`, media: `<img src="images/icons/components/ui_components/expansion_item.png" class="blockIcon"/>`, category: 'Forms'   }); 


  /* --------------------------------------------
                      Q-TABLE 
     -------------------------------------------- */
        
     editor.DomComponents.addType( "table", {
      isComponent: el => {
        if( el.tagName == 'Q-TABLE' ){
          return { type: 'table'}
        }
      },
      model: {
        defaults: { 
          traits: [ 
            { label: 'Reactive Model', name: 'v-model', type:'text' }, 
            { label: 'Columns', name: ':columns', type:'text' }, 
            { label: 'Data', name: ':data', type:'text' }, 
            { label: 'Row-key', name: 'row-key', type:'text' }, 
            { label: 'Pagination Sync', name: ':pagination.sync', type:'text' }, 
                    
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
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()['v-model']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/ui_components/table.png" />
          <div>{${bindTextTraitValue}}</div>` );
        }
      },
    });
    editor.BlockManager.add( 'table', { label: 'Table', content: `<q-table />`, media: `<img src="images/icons/components/ui_components/table.png" class="blockIcon"/>`, category: 'Forms'   }); 

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
          <img src="images/icons/components/ui_components/ui_components/checkbox.png" />
          <div>{${bindTextTraitValue}}</div>` );
        }
      },
    });
    editor.BlockManager.add( 'Checkbox', { label: 'Checkbox', content: `<q-checkbox />`, media: `<img src="images/icons/components/ui_components/checkbox.png" class="blockIcon"/>`, category: 'Forms'   }); 
    
    
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
            { label: 'Label', name: 'label', type:'text' },                     
            { label: 'Size', name: 'size', type:'text' }, 
            { label: 'Outline', name: 'outline', type:'checkbox' }, 
            { label: 'Flat', name: 'flat', type:'checkbox' }, 
            { label: 'Unelevated', name: 'unelevated', type:'checkbox' }, 
            { label: 'Rounded', name: 'rounded', type:'checkbox' }, 
            { label: 'Push', name: 'push', type:'checkbox' }, 
            { label: 'Glossy', name: 'glossy', type:'checkbox' }, 
            { label: 'Fab', name: 'fab', type:'checkbox' }, 
            { label: 'Fab-mini', name: 'fab-mini', type:'checkbox' }, 
            { label: 'Padding', name: 'padding', type:'text' }, 
            { label: 'Color', name: 'color', type:'text' }, 
            { label: 'Text-color', name: 'text-color', type:'text' }, 
            { label: 'Dense', name: 'dense', type:'checkbox' }, 
            { label: 'Ripple', name: 'ripple', type:'text' }, 
            { label: 'Round', name: 'round', type:'checkbox' }             
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
          /* var vtextTrait = this.get('traits').where({name: 'v-model'})[0];
          vtextTrait.set('options', properties ); */
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()['v-model']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/ui_components/button.png" />
          <div>{${bindTextTraitValue}}</div>` );
        }
      },
    });
    editor.BlockManager.add( 'Button', { label: 'Button', content: `<q-btn label="Button"/>`, media: `<img src="images/icons/components/ui_components/button.png" class="blockIcon"/>`, category: 'Forms'   }); 

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
            { label: 'Reactive Model', name: 'v-model', type:'select', options: [] }, 
            { label: 'Type', name: 'type', type:'select', options: ["text", "password", "textarea", "email", "search", "tel", "file", "number", "url", "time", "date"] }, 
            { label: 'Label', name: 'label', type:'text' },                     
            { label: 'Hint', name: 'hint', type:'text' },                     
            { label: 'Max Length', name: 'maxlength', type:'number' },                     
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
          <img src="images/icons/components/ui_components/input_text_field.png" />
          <div>{${bindTextTraitValue}}</div>` );
        }
      },
    });
    editor.BlockManager.add( 'Input', { label: 'Input', content: `<q-input />`, media: `<img src="images/icons/components/ui_components/input_text_field.png" class="blockIcon"/>`, category: 'Forms'   }); 


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
    editor.BlockManager.add( '1 Column', { label: '1 Column', content: `<div class="row"><div class="col col-12 col-sm st-module"></div></div>`, media: `<img src="images/icons/components/ui_components/1column.png" class="blockIcon"/>`, category: 'Layout'   }); 
    editor.BlockManager.add( '2 Column', { label: '2 Columns', content: `<div class="row"><div class="col col-12 col-sm st-module"></div><div class="col col-12 col-sm st-module"></div></div>`, media: `<img src="images/icons/components/ui_components/2columns.png" class="blockIcon"/>`, category: 'Layout'   }); 
    editor.BlockManager.add( '3 Column', { label: '3 Columns', content: `<div class="row"><div class="col col-12 col-sm st-module"></div><div class="col col-12 col-sm st-module"></div><div class="col col-12 col-sm st-module"></div></div>`, media: `<img src="images/icons/components/ui_components/3columns.png" class="blockIcon"/>`, category: 'Layout'   }); 

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
    editor.BlockManager.add( 'qcolumn', { label: 'Column', content: `<div class="col col-12 col-sm st-module"></div>`, media: `<img src="images/icons/components/ui_components/1column.png" class="blockIcon"/>`, category: 'Layout'   }); 


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
    editor.BlockManager.add( 'header', { label: 'Header', content: `<header class="st-header q-pa-sm"><h1 class="st-header__title text-h3">Header Text</h1></header>`, media: `<img src="images/icons/components/html_elements/header.png" class="blockIcon"/>`, category: 'Layout'   }); ;


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
            { label: 'Data', name: ':data', type:'select', options:[] }, 
            { label: 'Layout', name: ':layout', type:'select', options:[] }, 
            { label: 'Config', name: ':config', type:'text' }, 
                    
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
          let vtextTrait = this.get('traits').where({name: ':data'})[0];
          vtextTrait.set('options', properties );
          vtextTrait = this.get('traits').where({name: ':layout'})[0];
          vtextTrait.set('options', properties );
        }
      }, 
      view: {
        onRender(){
          const { $el, model } = this;
          const bindTextTraitValue = model.getAttributes()[':data']
          $el.empty();
          $el.append( `
          <img src="images/icons/components/plotly-chart.png" />
          <div>{${bindTextTraitValue}}</div>` );
        }
      },
    });
    editor.BlockManager.add( 'plotly', { label: 'Plotly Chart', content: `<plotly />`, media: `<img src="images/icons/components/plotly-chart.png" class="blockIcon"/>`, category: 'Charts'   }); 


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