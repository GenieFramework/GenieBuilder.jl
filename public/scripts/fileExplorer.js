initFileExplorer = () => {
    console.log( "initFileExplorer(): ", document.querySelector("#fileExplorer") );
    new Vue({
        el: "#explorerBar", 
        //el: "#fileExplorer", 
        data: {
            projectFileTree: appConfiguration.fileTree, 
            projectPages: appConfiguration.pages
        },
        methods: {
        itemClick (node ) {
            const filePath = node.model.filePath || node.model.text;
            console.log( filePath + ' clicked !', node.model );
            if( node.model.children.length == 0 ){
                ApiConnector.readFileContents( filePath )
                .then( (fileContents)=>{
                    codeEditor.setValue( fileContents )
                })
            }
        }
        }
    });
};
