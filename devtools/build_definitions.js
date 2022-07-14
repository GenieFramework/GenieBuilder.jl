const path = require('path');
const fs = require('fs');
const axios = require('axios');


let outputFolder = './blocks/quasar';

let components = [
    { tag: "q-avatar", type: "avatar", urlEnd: "QAvatar" },
    { tag: "q-badge", type: "badge", urlEnd: "QBadge" },
    { tag: "q-banner", type: "banner", urlEnd: "QBanner" }, 
    { tag: "q-chip", type: "chip", urlEnd: "QChip" }, 
    { tag: "q-editor", type: "editor", urlEnd: "QEditor" }, 
    { tag: "q-radio", type: "radio", urlEnd: "QRadio" }, 
    //{ tag: "q-button", type: "button", urlEnd: "QButton" }, 
    { tag: "q-button-group", type: "button-group", urlEnd: "QButtonGroup" }, 
    { tag: "q-button-dropdown", type: "button-dropdown", urlEnd: "QButtonDropdown" }, 
    { tag: "q-toggle", type: "toggle", urlEnd: "QToggle" }, 
    { tag: "q-icon", type: "icon", urlEnd: "QIcon" }, 
    { tag: "q-knob", type: "knob", urlEnd: "QKnob" }, 
    { tag: "q-list", type: "list", urlEnd: "QList" }, 
    { tag: "q-item", type: "item", urlEnd: "QItem" }, 
    { tag: "q-popup-proxy", type: "popup-proxy", urlEnd: "QPopupProxy" }, 
    { tag: "q-rating", type: "rating", urlEnd: "QRating" }, 
    { tag: "q-separator", type: "separator", urlEnd: "QSeparator" }, 
    { tag: "q-space", type: "space", urlEnd: "QSpace" }, 
    { tag: "q-spinner", type: "spinner", urlEnd: "QSpinner" }, 
    { tag: "q-timeline", type: "timeline", urlEnd: "QTimeline" }, 
    { tag: "q-timeline-entry", type: "timeline-entry", urlEnd: "QTimelineEntry" }, 
    { tag: "q-toolbar", type: "toolbar", urlEnd: "QToolbar" }, 
    { tag: "q-tree", type: "tree", urlEnd: "QTree" }, 
    { tag: "q-video", type: "video", urlEnd: "QVideo" }, 
    { tag: "q-time", type: "time", urlEnd: "QTime" }
];

let index = 0;

function getComponentData(){
    console.log( "Getting component data...", index );
    let component = components[index];
    let url = 'https://quasar.dev/quasar-api/' + component.urlEnd + '.json';
    axios.get( url )
    .then( (result)=>{

        let propsArray = [{ label: "Reactive Model", name: "v-model", type: "select", options: [] }];
        for (const propName in result.data.props) {
            const element = result.data.props[propName];
            propsArray.push( { label:propName, name:':'+propName, type: "text" } ) ;
        }
        propsArray = JSON.stringify( propsArray );
        //console.log(propsArray)
        let fileContent = 
`{
    "type": "${component.type}", 
    "label": "${component.type}", 
    "tagName": "${component.tag.toUpperCase()}", 
    "category": "Quasar", 
    "content": "<${component.tag} />", 
    "media": "images/icons/components/ui_components/${component.type}.png", 
    "traits": ${ ( propsArray ) }
}`;
        console.log( "      Done" );
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
