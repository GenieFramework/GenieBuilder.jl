const path = require('path');
const fs = require('fs');
const axios = require('axios');
const components = require('./blocksList.js');

let outputFolder = './blocks/quasar';



let index = 0;

function getComponentData(){
    let component = components[index];
    console.log( "Getting component data...", index + ' of ' + components.length, ": ", component.type );
    let url = 'https://quasar.dev/quasar-api/' + component.urlEnd + '.json';
    axios.get( url )
    .then( (result)=>{

        let propsArray = [{ label: "Data Binding", name: "v-model", type: "select", options: [] }];
        for (const propName in result.data.props) {
            const element = result.data.props[propName];
            let traitType = element.type;
            /* if( Array.isArray(traitType) ){
                traitType = traitType.join(","); */
            propsArray.push( 
                {   label:propName, 
                    name:':'+propName, 
                    type:traitType, 
                    desc:element.desc, 
                    category:element.category, 
                    examples:element.examples, 
                    enabled: true
                } ) ;
        }
        propsArray = JSON.stringify( propsArray, null, 2 );
        //console.log(propsArray)
        let fileContent = 
`{
    "type": "${component.type}", 
    "label": "${component.blockName}", 
    "tagName": "${component.tag.toUpperCase()}", 
    "category": "${component.blockCategory}", 
    "content": "<${component.tag} />", 
    "media": "images/icons/components/ui_components/${component.icon}.png", 
    "traits": ${ ( propsArray ) }
}`;
        //console.log( "      Done" );
        fs.writeFileSync( path.join( outputFolder, component.type + '.json' ), fileContent );




        index++;
        if( index < components.length ){
            getComponentData();
        }else{
            console.log( "FINISHED" );
        }
    } )
}

getComponentData();
