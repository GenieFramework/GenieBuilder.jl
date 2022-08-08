function initTraitsEditor(){

    window.traitsEditor = new Vue({
        el:"#traits_panel",
        data: {
            allTraits: [ /* { id:"id1", value:"1" }, { id:"id2", value:"2" } */ ],
            enabledTraits: []
        },
        methods: {
            assignComponent: function( component ) {
                console.log( "Traits Editor assignComponent: ", component );
                this.component = component;
                this.traits = component.attributes.traits.models;
                this.enabledTraits = this.traits.filter( (trait)=>{ 
                    return trait.get('enabled') !== false;
                } );
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
            }

        }
    });
}