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
        modelFields: [], 
        modelFieldsTypes: [], 
      };
  
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
        let parsedFields = [];
        for (let i = 0; i < fields.length; i++) {
            const fieldName = fields[i];
            const fieldType = currentPage.model.types[i];
            // to-do: use a whitelist or dictionary instead of these hardcoded values
            const typeSupported = fieldType.indexOf("String") >= 0 || fieldType.indexOf("Bool") >= 0 || fieldType.indexOf("Int64") >= 0;
            let fieldObject = { name: fieldName, value:fieldName, type: fieldType, typeSupported: typeSupported };
            parsedFields.push( fieldObject );            
        }
        /* currentPage.model.fields.map( field=>{
            return { name: field, value:field };
        } ); */
        appConfig.modelFields = parsedFields;
        console.log( "[chained] 2 Current Page: ", currentPage, fields, parsedFields );

        let deps = currentPage.deps;
        // PArse dependencies
        appConfig.contentStyles = [
            "https://fonts.googleapis.com/css?family=Material+Icons", 
            "css/editor-components.css"
        ];
        deps.styles.forEach( (item)=>{
         appConfig.contentStyles.push( appConfig.url + item );
        } );

      appConfig.contentScripts = [      
          "scripts/channelInject.js", 
          "./libs/jquery.min.js",
          "scripts/contentMain.js", 
      ];
      // Define a list of libraries/Assets not needed in the editor context
      // and avoid loading them to optimise newtwork/memory/cpu resources
      const blackList = [ "plotly", "quasar", "vueresize", "vueplotly" ];
      deps.scripts.forEach( (item)=>{
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
        
        return ApiConnector.readFileContents( filePath );
    })
    .then( (fileContents)=>{
        appConfig.template = fileContents;
        window.appConfiguration = appConfig;
        window.appName = appConfiguration.vueAppName;
        initNoCodeEditor();  
    })
  };