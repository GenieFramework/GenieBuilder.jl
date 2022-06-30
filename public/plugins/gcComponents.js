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
                      Blocks
    -------------------------------------------- */
  
    editor.BlockManager.add( 
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


    

  let vtext_components = [
    { type:'p', tagName:'P', label:'Paragraph', icon:'html_elements/p.png' }, 
    { type:'span', tagName:'SPAN', label:'Span', icon:'html_elements/span.png' }, 
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
    editor.BlockManager.add( item.type, { label: item.label, content: `<${item.type} >Default content</${item.type}>`, media: `<img src="images/icons/components/${item.icon}" class="blockIcon"/>`, category: 'Texts'   }); 
  } );


  
    

  
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
          { label: 'Reactive Model 2', name: 'v-model', type:'select', options: [] },
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
    editor.BlockManager.add( 'q-table', { label: 'Table', content: `<q-table />`, media: `<img src="images/icons/components/ui_components/table.png" class="blockIcon"/>`, category: 'Forms'   }); 

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
    editor.BlockManager.add( '1 Column', { label: '1 Column', content: `<div class="row"><div class="col col-12 col-sm"></div></div>`, media: `<img src="images/icons/components/ui_components/1column.png" class="blockIcon"/>`, category: 'Layout'   }); 
    editor.BlockManager.add( '2 Column', { label: '2 Columns', content: `<div class="row"><div class="col col-6 col-sm"></div><div class="col col-6 col-sm"></div></div>`, media: `<img src="images/icons/components/ui_components/2columns.png" class="blockIcon"/>`, category: 'Layout'   }); 
    editor.BlockManager.add( '3 Column', { label: '3 Columns', content: `<div class="row"><div class="col col-4 col-sm"></div><div class="col col-4 col-sm"></div><div class="col col-4 col-sm"></div></div>`, media: `<img src="images/icons/components/ui_components/3columns.png" class="blockIcon"/>`, category: 'Layout'   }); 

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
    editor.BlockManager.add( 'qcolumn', { label: 'Column', content: `<div class="col col-12 col-sm st-module"></div>`, media: `<img src="images/icons/components/ui_components/container.png" class="blockIcon"/>`, category: 'Layout'   }); 


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
          <img src="images/icons/components/ui_components/chart.png" />
          <div>{${bindTextTraitValue}}</div>` );
        }
      },
    });
    editor.BlockManager.add( 'plotly', { label: 'Plotly Chart', content: `<plotly />`, media: `<img src="images/icons/components/ui_components/chart.png" class="blockIcon"/>`, category: 'Charts'   }); 


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