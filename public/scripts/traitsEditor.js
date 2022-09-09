function initTraitsEditor(){

    window.traitsEditor = new Vue({
        components: Quasar.components,
        el:"#traits_panel",
        data: {
            dummyProp: "", 
            allTraits: [ /* { id:"id1", value:"1" }, { id:"id2", value:"2" } */ ],
            enabledTraits: [], 
            categories: [], 
            categoriesStatus: {}, 
            traitValuesObj: {},

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
        },
        methods: {
            /* filterFn (val, update, abort) {
                let catindex = this.$el.getAttribute("categoryindex");
                let traitindex = this.$el.getAttribute("traitindex");
                console.log( "filterFn this.catindex, traitindex", catindex, traitindex );
                //console.log( "filterFn", val, update, abort, "ARGS: ", arguments );
                // call abort() at any time if you can't retrieve data somehow
          
                setTimeout(() => {
                  update(() => {
                    if (val === '') {
                      this.options = stringOptions
                    }
                    else {
                      const needle = val.toLowerCase()
                      this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
                    }
                  })
                }, 1500)
              }, */
            getAppModelFields: function(trait){
                let traitTypes = trait.attributes.juliaType?trait.attributes.juliaType.split("|") : [];
                let results = window.appConfiguration.modelFields.filter( (item)=>{
                    let modelPropType = item.type;
                    let cleanModelType = modelPropType.replace("Stipple.Reactive", "");
                    let modelBaseType = this.typesMap[cleanModelType];
                    for( let i=0; i<traitTypes.length; i++ ){
                        let traitType = traitTypes[i];
                        if( traitType === modelBaseType ){
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

            assignComponent: function( component ) {
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
                    let cat = trait.attributes.category || "General";
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

            onInputChanged(trait){
                let traitId = trait.id;
                let traitValue = this.traitValuesObj[traitId];
                console.log("Traits Editor onInputchanged", trait);
                let tr = traitsEditor.component.getTrait(traitId)
                tr.setValue(traitValue)
            }, 

            formatLabel( label ){
                let formatted = label.split('-').join(' ').split(':').join('');
                return formatted;
            }, 

            toggleCategory( category ){
                category.expanded = !category.expanded;
                this.categoriesStatus[category.name] = category.expanded;
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
            }

        }, 
        mounted(){
            console.log( "TraitsEditor mounted: ", window.selectedElementModel);
            if( window.selectedElementModel != null ){
                this.assignComponent( window.selectedElementModel );
            }
        }
    });
}