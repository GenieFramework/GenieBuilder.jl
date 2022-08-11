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




    
    editor.BlockManager.add( 'divElement', { label: 'Div', content: `<div>Div Text</div>`, media: `<img src="images/icons/components/ui_components/container.png" class="blockIcon"/>`, category: 'Content'   });




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
        category: 'Content'   
      }
    ); 




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