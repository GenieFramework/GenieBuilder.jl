
const path = require('path');
const fs = require('fs');
const components = require('./blocksList.js');

// definitions directory
const directoryPath = path.join(__dirname, 'blocks', 'quasar');

// fet list of definition files
/* let files = fs.readdirSync(directoryPath);
files = files.map(file => {
    return directoryPath + '/' + file;
}); */

let files = components.map(component => {
    return directoryPath + '/' + component.type + '.json';
}); 

// get block template
console.log( files );

let pluginNames = [];
let classNames = [];
let clasImgsNames = [];

let output = "";

for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    let fileContent = fs.readFileSync(filePath, 'utf8');
    fileContent = JSON.parse( fileContent );
    let blockCode = generateBlockCode( fileContent );
    output += blockCode;
}
//console.log( blockCode );
fs.writeFileSync( './blockDefinitions.js', output );

console.log( "Plugin classes: \n", pluginNames.join(', ') );
console.log( "\n" );
console.log( "CSS classes: \n", classNames.join(', ') );
console.log( "\n" );
console.log( "CSS Img classes: \n", clasImgsNames.join('\n') );



function generateBlockCode( blockDef ){
    let pluginName = `customblock_quasar_${blockDef.type}`;
    pluginNames.push( pluginName );
    classNames.push( blockDef.tagName.toLowerCase() );
    //clasImgsNames.push( blockDef.tagName.toLowerCase() + ' img' );
    clasImgsNames.push( `${blockDef.tagName.toLowerCase()}{   background-image: url(../${blockDef.media}); }` );
    let blockCode = `
    const ${pluginName.split("-").join("_")} = editor => {
        editor.DomComponents.addType("${blockDef.type}", {
            isComponent: el => {
                if (el.tagName == '${blockDef.tagName}') {
                    return { type: '${blockDef.type}' }
                }
            },
            model: {
                defaults: {
                    traits: ${ JSON.stringify( blockDef.traits, null, 4 ) },
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
                    
                }
            },
        });
        editor.BlockManager.add('${blockDef.type}', { label: '${blockDef.label}', content: '<${blockDef.tagName.toLowerCase()} />', media: '<img src="${blockDef.media}" class="blockIcon" />', category: '${blockDef.category}' });
    }    

    `;
    return blockCode;
}