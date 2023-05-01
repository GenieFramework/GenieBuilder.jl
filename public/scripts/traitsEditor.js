function initTraitsEditor(){

    let traitComponent = Vue.component('trait-field', {
        components: Quasar.components,
        props: [ 'trait',  'traitvaluesobj'],
        data: function () {
          return {
            count: 0, 
            typesMap: {
                "{Bool}": "Bool", 
                "{String}": "String", 
                "{Char}": "String", 
                "{Number}": "Number", 
                    "{Int64}": "Number", 
                    "{Int32}": "Number", 
                    "{Int16}": "Number", 
                    "{Int8}": "Number",
                "{Vector}": "Vector",
                    "{Vector{Bool}}": "Vector",
                    "{Vector{String}}": "Vector",
                    "{Vector{Char}}": "Vector",
                    "{Vector{Number}}": "Vector",
                    "{Vector{Int64}}": "Vector",
                    "{Vector{Int32}}": "Vector",
                    "{Vector{Int16}}": "Vector",
                    "{Vector{Int8}}": "Vector", 
                "{Object}": "Object", 
                "{Dict}": "Object", 
            }
          }
        },
        //template: '<button v-on:click="count++">Me ha pulsado {{ count }} veces.</button>', 
        template: `<q-select
            ref="select"
            new-value-mode="add-unique" use-input hide-selected fill-input hide-dropdown-icon clearable
            v-model="traitvaluesobj[trait.id]" 
            :options="getAppModelFields(trait)"
            :placeholder="trait.attributes.juliaType?.split('|').join(', ')||''" 
            @input="onInputChanged(trait)" `+
            /* @keyup="keyUp($event, trait)"  */
            `@filter="filterFn" 
            @focus="onFocus(trait)" 
            class="propSelect"` + 
            /* @keyup="onkeyup" 
            :class="{bindingMatch: inputValueMatchesModelProperty() }" */
        `></q-select>`, 
        methods: {
            onFocus(trait){
                console.log( 'onInputFocus()', trait );
                let message = {
                    command: "logEvent", 
                    eventName: "componentPropertyFocused",
                    eventDetail: {
                        app_id: window.projectId, 
                        block_id: selectedElementModel.attributes.tagName,
                        block_name: selectedElementModel.attributes.type, 
                        property_name: trait.id
                    }
                  };
                  logEvent( message );
            },
            filterFn (val, update, abort) {          
                setTimeout(() => {
                  update(() => {
                    let fieldsList = this.getAppModelFields(this.trait);
                    if (val === '') {
                        this.$refs.select.options = fieldsList;
                    }
                    else {
                      const needle = val.toLowerCase()
                      this.$refs.select.options = fieldsList.filter(v => v.toLowerCase().indexOf(needle) > -1)
                    }
                  })
                }, 500)
              },
            
            /* inputValueMatchesModelProperty( ){
                let inputValue = this.inputValue || this.traitvaluesobj[this.trait.id]; // this.traitvaluesobj[this.trait.id]; //
                let matches = false;
                for (let i = 0; i < window.appConfiguration.modelFields.length; i++) {
                    const element = window.appConfiguration.modelFields[i];
                    if( element.name == inputValue ){
                        matches = true;
                        break;
                    }                    
                }
                 
                //let matches = window.appConfiguration.modelFields.find( p => p.name == inputValue );
                return matches;
            },  */

            getAppModelFields: function(trait){
                //console.log( 'getAppModelFields()', trait );
                //let inputValue = this.$refs.select?.inputValue || "";
                let traitTypes = trait.attributes.juliaType?trait.attributes.juliaType.split("|") : [];
                let results = window.appConfiguration.modelFields.filter( (item)=>{
                    // If julia type not send, include all bindings
                    let juliaTypeNotSet = trait.attributes.juliaType == null || trait.attributes.juliaType.length == 0;
                    if( juliaTypeNotSet )
                        return true

                    let modelPropType = item.type;
                    let cleanModelType = modelPropType.replace("Stipple.Reactive", "");
                    let modelBaseType = this.typesMap[cleanModelType];
                    for( let i=0; i<traitTypes.length; i++ ){
                        let traitType = traitTypes[i];
                        let matchesType = modelBaseType == traitType;
                        //let containsSearch = inputValue=='' || inputValue==null || item.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
                        if( matchesType /* && containsSearch */ ){
                            return true;
                        }
                    }
                    return false;
                });
                results = results.map( (item)=>{
                    return item.name;
                });
                return results;
            }, 
            onInputChanged(trait){
                let traitId = trait.id;
                let traitValue = this.traitvaluesobj[traitId];
                console.log("Traits Editor onInputchanged", traitId, traitValue, trait );
                let tr = traitsEditor.component.getTrait(traitId)
                tr.setValue(traitValue);
                //this.inputValue = traitValue;
                markUnsavedChanges(true);

                let message = {
                    command: "logEvent", 
                    eventName: "componentPropertyChanged",
                    eventDetail: {
                        app_id: window.projectId, 
                        block_id: selectedElementModel.attributes.tagName,
                        block_name: selectedElementModel.attributes.type, 
                        property_name: trait.id
                    }
                  };
                  logEvent( message );
            }, 
            /* onkeyup(){
                let inputValue;
                if( this.$refs.select ){
                    inputValue = this.$refs.select.inputValue
                }else{
                    inputValue = this.traitvaluesobj[this.trait.id];
                }
                this.inputValue = inputValue;
                this.$forceUpdate();
            } */
            /* keyUp( event, trait ){
                console.log( "input value: ", this.$refs.select.inputValue );
            }, */
        }
      })

    window.traitsEditor = new Vue({
        components: { ...Quasar.components, traitComponent },
        el:"#traits_panel",
        data: {
            search: "", 
            dummyProp: "", 
            allTraits: [ /* { id:"id1", value:"1" }, { id:"id2", value:"2" } */ ],
            enabledTraits: [], 
            categories: [], 
            categoriesStatus: {}, 
            traitValuesObj: {},
            userPrompt: "", 
            aiExpanded: true, 
            /* aiError: null, 
            aiRequestStatus: "idle",  */
            aiKey: window.aiKey,
            enteredAiKey: "",
            aiRequests: {}, 
            selectedElementAiRequest: null, 
            aiPreviewShown: false
        },
        computed: {
            getSelectedElement(){
                let selection =  editor.getSelected()
                return selection;
            },

            categoriesFiltered(){
                if( !this.categories )
                    return [];
                
                /* if( this.search=="" )
                    return this.categories; */
                
                let searchLowercase = this.search.toLowerCase();

                //let categoriesFiltered = [];
                this.categories.forEach( (category)=>{
                    let numMatchesInCategory = 0;
                    category.traits.forEach( (trait)=>{
                        let label = (trait.attributes.label && trait.attributes.label.length > 0 )?trait.attributes.label:trait.attributes.name;
                        let traitLabel = label.toLowerCase();
                        let traitDescription = trait.attributes.desc ? trait.attributes.desc.toLowerCase() : "";
                        let matchesSearchLabel = this.search=="" || traitLabel.indexOf( searchLowercase ) > -1;
                        let matchesSearchLDesc = this.search=="" || traitDescription.indexOf( searchLowercase ) > -1;
                        trait.shouldShow = matchesSearchLabel || matchesSearchLDesc;
                        if( trait.shouldShow )
                            numMatchesInCategory++;
                    });
                    category.shouldShow = numMatchesInCategory > 0;
                    /* let filteredTraits = category.traits.filter( (trait)=>{
                        let traitName = trait.name.toLowerCase();
                        return traitName.toLowerCase().indexOf( searchLowercase ) > -1;
                    });
                    if( filteredTraits.length > 0 ){
                        categoriesFiltered.push({
                            name: category.name, 
                            traits: filteredTraits
                        });
                    } */
                });
                return this.categories;
            }
        },
        methods: {

            showAIPreview(){
                // Get the current state of the page being edited and build a virtual DOM
                let currentTemplate = editor.getHtml();
                const parser = new DOMParser();
                const virtualDOM = parser.parseFromString( currentTemplate, 'text/html');

                // Take note of the selected element id, as we'll use it to do the necessary replacements
                let selectedElementId = this.getSelectedElement.ccid;

                // Find the selected element within the virtual DOM
                const selectedElementVirtual = virtualDOM.querySelector('#'+selectedElementId);

                // Build the new element from the AI response
                let newEditedElementHtml = this.aiRequests[selectedElementId].aiApiResponse;
                const newElementParser = new DOMParser();
                const newEditedElementDocument = newElementParser.parseFromString(newEditedElementHtml, 'text/html');
                const newEditedElement = newEditedElementDocument.body.firstChild;

                // Replace the selected element with the new element
                selectedElementVirtual.replaceWith(newEditedElement);

                // Get the final edited HTML
                const serializer = new XMLSerializer();
                const finalEditedHtml = serializer.serializeToString(virtualDOM.body.firstChild);
                const finalCleanHtml = getCleanHtmlForSaving( finalEditedHtml );

                // Remove the iframe if it exists (e.g. from a previous interaction)
                let iframe = document.getElementById("ai_preview_iframe");
                if( iframe ){                    // remove the iframe
                    iframe.parentNode.removeChild(iframe);
                }

                // Create the iframe element and add it to the real DOM
                iframe = document.createElement('iframe');
                iframe.id="ai_preview_iframe";
                let iframeContainer = document.querySelector("#ai_preview_iframe_container");
                iframeContainer.appendChild(iframe);

                // Set the visibility flag so that the preview is displayed (vue will use it)
                this.aiPreviewShown = true;

                // Build the final, full HTML for the iframe content
                let iframeContent = `
                <!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
 
  <title>Genie App</title>
  <base href="${appConfig.url}">
  <link rel="stylesheet" href="/css/autogenerated.css" />
  <style>
    ._genie_logo {
      background: url('/stipple.jl/master/assets/img/genie-logo.img') no-repeat;
      background-size: 40px;
      padding-top: 22px;
      padding-right: 10px;
      color: transparent;
      font-size: 9pt;
    }

    ._genie .row .col-12 {
      width: 50%;
      margin: auto;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div id="${appConfig.vueAppName}" class="container" v-cloak>
        <!-- <div id="Main_App_varMain_App_ReactiveModel" class="container" v-cloak v-if='isready'> -->
          ${finalCleanHtml}
        </div>
        <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet" />    
        <link href="/stipple.jl/master/assets/css/stipplecore.css" rel="stylesheet" />
        <link href="/stippleui.jl/master/assets/css/quasar.min.css" rel="stylesheet" />    
        `;
        // Add all script dependencies for this app
        for( let i = 0; i < appConfig.rawDepScripts.length; i++ ){
            let depUrl = appConfig.rawDepScripts[i];
            if( depUrl.indexOf( "/geniepackagemanager" ) == -1 ){
                iframeContent += `<script src="${appConfig.rawDepScripts[i]}"></script>`;
            }
        }

        /* 
        <script src="/genie.jl/master/assets/js/channels.js"></script>
        <script src="/stipple.jl/master/assets/js/underscore-min.js"></script>
        <script src="/stipple.jl/master/assets/js/vue.js"></script>
        <script src="/stipple.jl/master/assets/js/stipplecore.js"></script>
        <script src="/stipple.jl/master/assets/js/vue_filters.js" defer></script>
        <script src="/stipple.jl/master/assets/js/watchers.js"></script>
        <script src="/stipple.jl/master/assets/js/keepalive.js" defer></script>
        <script src="/stippleui.jl/master/assets/js/quasar.umd.min.js"></script>
        <script src="/stippleplotly.jl/master/assets/js/plotly2.min.js"></script>
        <script src="/stippleplotly.jl/master/assets/js/resizesensor.min.js"></script>
        <script src="/stippleplotly.jl/master/assets/js/lodash.min.js"></script>
        <script src="/stippleplotly.jl/master/assets/js/vueresize.min.js"></script>
        <script src="/stippleplotly.jl/master/assets/js/vueplotly.min.js"></script>
        <script src="/stippleplotly.jl/master/assets/js/sentinel.min.js"></script>
        <script src="/stippleplotly.jl/master/assets/js/syncplot.js"></script>
        <script src="/genieautoreload.jl/master/assets/js/autoreload.js"></script>
        <script src="/stipple.jl/master/assets/js/main_app_varmain_app_reactivemodel.js" defer></script>
         */
        iframeContent += `</div>
    </div>
  </div>
  <footer class="_genie container">
    <div class="row">
      <div class="col-12">
        <p class="text-muted credit" style="text-align:center;color:#8d99ae;">Built with

          <a class="_genie_logo" href="https://genieframework.com" target="_blank" ref="nofollow">Genie</a>
        </p>
      </div>
    </div>
  </footer>
</body>

</html>
                
                `;

                // Finally write the content to the iframe
                const iframeDoc = iframe.contentWindow.document;
                iframeDoc.open();
                iframeDoc.write(iframeContent);
                iframeDoc.close();
            }, 

            setAiKey(){
                console.log( 'setAiKey' );
                let msgObject = { aiKey: this.enteredAiKey };
                this.aiKey = window.aiKey = this.enteredAiKey;
                msgObject.command = "setAiKey";
                parent.postMessage(
                    msgObject,
                    "*"
                );
            },

            openAiKeyPage(){
                console.log( 'openAiKeyPage' );
                let msgObject = {};
                msgObject.command = "openAiKeyPage";
                parent.postMessage(
                    msgObject,
                    "*"
                );
            },

            discardAiChanges(){
                this.aiRequests[this.getSelectedElement.ccid] = null
                this.selectedElementAiRequest = null;
                this.aiPreviewShown = false;
            },
            
            acceptAiChanges(){
                let requestObject = this.aiRequests[this.getSelectedElement.ccid]
                if( requestObject ){
                    let newElement = editor.getSelected().replaceWith(requestObject.aiApiResponse)
                    this.aiRequests[this.getSelectedElement.ccid] = null
                    this.selectedElementAiRequest = null;
                    editor.select( newElement )
                    this.aiPreviewShown = false;
                }
            },
            acceptAIErrorMessage(){
                this.aiRequests[this.getSelectedElement.ccid] = null
                this.selectedElementAiRequest = null;
            },

            aiSendClicked(){
                let selectedElement = this.getSelectedElement

                let selectedHtml = selectedElement.toHTML()
                let userPrompt = this.userPrompt;

                this.aiRequests[selectedElement.ccid] = {
                    selectedHtml: selectedHtml, 
                    userPrompt: userPrompt, 
                    aiRequestStatus: "sent"
                };

                let requestObject = this.aiRequests[selectedElement.ccid];
                this.selectedElementAiRequest = requestObject;
                this.userPrompt = "";

                //let fullPrompt = `I have this piece of html code: \n\n${selectedHtml}\n\n${userPrompt}`
                console.log( "aiSendClicked()! ", selectedElement.ccid, selectedElement.cid, selectedElement )
                //let aiApiUrl = "http://localhost:3000/api/send-message"
                //let aiApiUrl = "https://uyh10c-ip-3-253-25-80.tunnelmole.com/api/v1/codegen";
                let aiApiUrl = "https://ai.geniecloud.app/api/v1/codegen";
                //this.aiRequestStatus = "sent";
                axios.post( aiApiUrl, 
                    { 
                        content_type: "html", 
                        //info: "quasar", 
                        prompt: userPrompt, 
                        code: selectedHtml
                    }, 
                    {
                        headers: {
                            Authorization: "Bearer " + this.aiKey, 
                        }
                    },
                )
                .then( (response)=>{
                    let responseObject = JSON.parse( response.request.response )
                    console.log( "AI response: ", responseObject )
                    //let dymmyResponseCode = `<table><tr><td>One</td><td>Two</td></tr><tr><td>Three</td><td>Four</td></tr></table>`
                    if( responseObject.error ){
                        console.log( 'responseObject.error', responseObject.error );
                        requestObject.aiError = responseObject.error;
                        requestObject.aiRequestStatus = "error";
                    }else{
                        requestObject.aiRequestStatus = "received";
                        requestObject.aiApiResponse = responseObject.response;
                    }
                    this.$forceUpdate();
                } )
                .catch( (err)=>{
                    console.log( "Error sending message to AI: ", err );
                    requestObject.aiError = err.message;
                    requestObject.aiRequestStatus = "idle";
                    this.$forceUpdate();
                } )
                this.$forceUpdate();
            },            
            
            getTraitTooltipText(trait){
                let result = '(' + trait.attributes.type + ')\n' + trait.attributes.desc;
                if( trait.attributes.examples ){
                    let cleanExamples = trait.attributes.examples.map( item =>{
                        if( typeof item == "string" && item.indexOf("=") > 0 )
                            return item.split("=")[1];
                        else
                            return item;
                    });

                    result += '\n\nExamples: \n - ' + cleanExamples.join('\n - ');
                }
                return result;
            }, 
            
            assignComponent: function( component ) {
                this.selectedElementAiRequest = null;
                if( component ){
                    this.selectedElementAiRequest = this.aiRequests[component.ccid];
                }

                console.log( "Traits Editor assignComponent: ", component );
                this.component = component;
                if( !component ){
                    this.traitValuesObj = {};
                    this.allTraits = [];
                    this.enabledTraits = [];
                    this.categories = [];
                    return;
                }
                this.traitValuesObj = component.attributes.attributes;
                this.traits = component.attributes.traits.models;
                this.enabledTraits = this.traits.filter( (trait)=>{ 
                    return trait.get('enabled') !== false;
                } );


                let categoriesDict = {};
                let categories = [];

                this.enabledTraits.forEach( (trait)=>{ 
                    // Prevent v-textfrom being shown in non-editable components
                    if( !this.component.attributes.editable && trait.attributes.name == "v-text" )
                        return;

                    let cat = trait.attributes.category || "main properties";
                    if( (trait.id=="id" || trait.id=="title" ) && cat == "main properties" )
                        return;
                        
                    if( this.categoriesStatus[cat] === undefined)
                        this.categoriesStatus[cat] = true;

                    if( categoriesDict[cat] == null ){
                        categoriesDict[cat] = { name: cat, expanded: this.categoriesStatus[cat], traits: [] };
                        categories.push( categoriesDict[cat] );
                        
                    }
                    categoriesDict[cat].traits.push( trait );
                } );
                this.categories = categories;
                console.log( "Traits Editor assignComponent TRAITS: ", this.traits );
            },

            

            

            formatLabel( trait ){
                let label = (trait.attributes.label && trait.attributes.label.length > 0 )?trait.attributes.label:trait.attributes.name;
                let formatted = label.split('-').join(' ').split(':').join('');
                return formatted;
            }, 

            toggleCategory( category ){
                category.expanded = !category.expanded;
                this.categoriesStatus[category.name] = category.expanded;
            }, 
            

        }, 
        mounted(){
            console.log( "TraitsEditor mounted: ", window.selectedElementModel);
            if( window.selectedElementModel != null ){
                this.assignComponent( window.selectedElementModel );
            }
        }
    });
}