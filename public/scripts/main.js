window.onload = () => {
    console.log( "---onLoad()" );
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectId = window.projectId = urlParams.get('appid');
    const filePath = window.filePath = urlParams.get('filepath');
    const modelName = urlParams.get('modelname');
    if( !projectId || !filePath ){
        alert( "Url should contain valid 'appid' and 'filepath' parameters" );
        return;
    }

    let appConfig = {
        url: null,
        vueAppName: modelName, 
        contentScripts: [], 
        contentStyles: [], 
        template: null, 
        fileTree: null, 
        pages: null, 
        currentPage: null, 
        modelFields: []
      };
  
    //ApiConnector.getProjectInfo( projectId )
    ApiConnector.projectId = projectId;
    ApiConnector.getAppsList( )
    .then( (result)=>{
        console.log( "[chained] 1 apps list retrieved: ", result );
        for (let i = 0; i < result.length; i++) {
            const appInfo = result[i];
            if( appInfo.id.value == ApiConnector.projectId ){
                appConfig.url = `http://${ApiConnector.hostName}:${appInfo.port}`;
                break;
            }
        }
        return ApiConnector.getProjectPages();
    })

    .then( (result)=>{
        console.log( "[chained] 2 pages list retrieved: ", result );
        let currentPage = result.filter( (page)=>{
            return page.view == filePath;
        } );
        currentPage = currentPage[0];
        let fields = currentPage.model.fields;
        let parsedFields = currentPage.model.fields.map( field=>{
            return { name: field, value:field };
        } );
        appConfig.modelFields = parsedFields;
        console.log( "[chained] 2 Current Page: ", currentPage, fields, parsedFields );
        return ApiConnector.getProjectAssets();
    })
    .then( (result)=>{
        console.log( "[chained] 3 assets list retrieved: ", result );
        
          appConfig.contentStyles = [
              "https://fonts.googleapis.com/css?family=Material+Icons", 
              //"http://127.0.0.1:24838/stipple.jl/master/assets/css/stipplecore.css", 
              //"http://127.0.0.1:24838/stippleui.jl/master/assets/css/quasar.min.css", 
              "css/editor-components.css"
          ];
          result.styles.forEach( (item)=>{
            /* 
            let regex = /<script.*?src="(.*?)"/gmi;
            let url = regex.exec(item);
            appConfig.contentScripts.push( appConfig.url + url[1] );
            */
           appConfig.contentStyles.push( appConfig.url + item );
          } );

        // To-do: these hardcoded dependencies should come from the API
        appConfig.contentScripts = [      
            "scripts/channelInject.js", 
            "./libs/jquery.min.js",
            "scripts/contentMain.js", 
        ];
        // Define a list of libraries/Assets not needed in the editor context
        // and avoid loading them to optimise newtwork/memory/cpu resources
        const blackList = [ "plotly", "quasar", "vueresize", "vueplotly" ];
        result.scripts.forEach( (item)=>{
           //appConfig.contentScripts.push( appConfig.url + item );
           const scriptPath = appConfig.url + item;
           let blackListed = false;
              for (let j = 0; j < blackList.length; j++) {
                  const blackListedElement = blackList[j];
                  if( scriptPath.indexOf( blackListedElement ) >= 0 ){
                      blackListed = true;
                      break;
                  }
              }
              if( !blackListed ){
                let myScript = document.createElement("script");
                myScript.setAttribute("src", scriptPath);
                document.body.appendChild(myScript);              
              }
          } );
          
          //return ApiConnector.getProjectPages();
          return ApiConnector.readFileContents( filePath );
    })
    .then( (fileContents)=>{
        appConfig.template = fileContents;
        window.appConfiguration = appConfig;
        window.appName = appConfiguration.vueAppName;
        //initCodeEditor();  
        initNoCodeEditor();  
        //initFileExplorer();
        setTimeout(() => {
            //codeEditor.setValue( fileContents )            
        }, 3000);
    })
    /* .then( (result)=>{
        console.log( "[chained] 3 pages list retrieved: ", result );
        let parsedPagesList = [];
        for (let i = 0; i < result.length; i++) {
            const elementIn = result[i];
            let elementOut = 
                { 
                    text: elementIn.route.method + " " + elementIn.route.path, 
                    opened: true, 
                    children: [
                        { 
                            text: `Model (${elementIn.model.name})`,
                            filePath: elementIn.model.name,
                            icon: "fa fa-file icon-state-default"
                        }, 
                        { 
                            text: `View (${elementIn.view})`,
                            filePath: elementIn.view,
                            icon: "fa fa-file icon-state-default"
                        }, 
                        { 
                            text: `Layout (${elementIn.layout})`,
                            filePath: elementIn.layout,
                            icon: "fa fa-file icon-state-default"
                        }
                    ] 
                };
                parsedPagesList.push( elementOut );            
        }
        appConfig.pages = parsedPagesList;
        return ApiConnector.getFolderContents('.');
        
    })
    .then( (result)=>{
        console.log( "[chained] 4 folder contents retrieved: ", result );
        let parsedFileTree = [];
        for (let i = 0; i < result.dir.length; i++) {
            const elementIn = result.dir[i];
            let elementOut;
            if( elementIn.dir ){
                elementOut = { text: elementIn.dir, opened: true, children: [] };
            }else{
                elementOut = { text: elementIn.file, icon: "fa fa-file icon-state-default" };
            }
            parsedFileTree.push( elementOut );            
        }
        appConfig.fileTree = parsedFileTree;
        console.log( "app config: ", appConfig );
        window.appConfiguration = appConfig;
        window.appName = appConfiguration.vueAppName;
        initCodeEditor();  
        //initNoCodeEditor();  
        initFileExplorer();
        //runVue();
    }); */

    /* ApiConnector.getProjectAssets( projectId )
    .then( (projectInfo)=>{
      console.log( "ApiConnector.getProjectInfo() callback" );

      // Extract script src values
     
      console.log( "Content Scripts: ", appConfig.contentScripts );




      window.appConfiguration = projectInfo;
      window.appName = appConfiguration.vueAppName;
      initCodeEditor();  
      initNoCodeEditor();  
      initFileExplorer();
      runVue();
    }).catch( (error)=>{
        console.log( "Error catched: ", error );
    } ) */
  };