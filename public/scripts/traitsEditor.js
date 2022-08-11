function initTraitsEditor(){

    window.traitsEditor = new Vue({
        el:"#traits_panel",
        data: {
            allTraits: [ /* { id:"id1", value:"1" }, { id:"id2", value:"2" } */ ],
            enabledTraits: [], 
            categories: [], 
            categoriesStatus: {}, 
            traitValuesObj: {},
        },
        methods: {
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


    
                /* if( component.updateGenieModelProperties )
                component.updateGenieModelProperties(window.appConfiguration.modelFields); */
                

                console.log( "Traits Editor assignComponent TRAITS: ", this.traits );
            },

            onInputChanged(trait){
                let traitId = trait.id;
                let traitValue = trait.value;
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