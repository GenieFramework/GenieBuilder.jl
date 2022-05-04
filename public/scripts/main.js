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
        pages: null
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
        return ApiConnector.getProjectAssets();
    })
    .then( (result)=>{
        console.log( "[chained] 2 assets list retrieved: ", result );
        // To-do: these hardcoded dependencies should come from the API
        appConfig.contentScripts = [      
            "scripts/channelInject.js"    , 
            /* "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/underscore-min.js", 
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/vue.min.js", 
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/stipplecore.js", 
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/vue_filters.js", 
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/watchers.js", 
            "https://cdn.statically.io/gh/genieframework/stipple.jl/master/assets/js/keepalive.js",  */
            //"https://cdn.statically.io/gh/genieframework/stippleplotly.jl/master/assets/js/plotly2.min.js", 
            //"https://cdn.statically.io/gh/genieframework/stippleplotly.jl/master/assets/js/resizesensor.min.js", 
            //"https://cdn.statically.io/gh/genieframework/stippleplotly.jl/master/assets/js/lodash.min.js", 
           // "https://cdn.statically.io/gh/genieframework/stippleplotly.jl/master/assets/js/vueresize.min.js", 
            //"https://cdn.statically.io/gh/genieframework/stippleplotly.jl/master/assets/js/vueplotly.min.js", 
            //"https://cdn.statically.io/gh/genieframework/stippleui.jl/master/assets/js/quasar.umd.min.js", 

            //"http://127.0.0.1:24838/genie.jl/master/assets/js/1507798244867743252/channels.js", 
            //"scripts/genie/channels.js", 
    
            //"scripts/genie/channelsPkgs.js",
            //"scripts/genie/modelPkgs.js",
            "./libs/jquery.min.js",
            "scripts/contentMain.js"    , 
            // -------------
            /* "http://127.0.0.1:48493/genie.jl/master/assets/js/channels.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/underscore-min.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/vue.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/stipplecore.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/vue_filters.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/watchers.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/keepalive.js",
            "http://127.0.0.1:48493/stippleui.jl/master/assets/js/quasar.umd.min.js",
            "http://127.0.0.1:48493/stippleplotly.jl/master/assets/js/plotly2.min.js",
            "http://127.0.0.1:48493/stippleplotly.jl/master/assets/js/resizesensor.min.js",
            
            "http://127.0.0.1:48493/stippleplotly.jl/master/assets/js/lodash.min.js",
            "http://127.0.0.1:48493/stippleplotly.jl/master/assets/js/vueresize.min.js",
            "http://127.0.0.1:48493/stippleplotly.jl/master/assets/js/vueplotly.min.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/stipplepagesemptymodel.js",
            "http://127.0.0.1:48493/js/plugins/autoreload.js" */
            // -------------
            /* "http://127.0.0.1:48493/stipple.jl/master/assets/js/vue.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/vue_filters.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/underscore-min.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/stipplecore.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/watchers.js",
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/keepalive.js",
            //"http://127.0.0.1:48493/stipple.jl/master/assets/js/irisirismodel.js",
            
            "http://127.0.0.1:48493/genie.jl/master/assets/js/channels.js",
            "http://127.0.0.1:48493/stippleui.jl/master/assets/js/quasar.umd.min.js",
            "http://127.0.0.1:48493/stippleplotly.jl/master/assets/js/plotly2.min.js",
            "http://127.0.0.1:48493/stippleplotly.jl/master/assets/js/resizesensor.min.js",
            "http://127.0.0.1:48493/stippleplotly.jl/master/assets/js/lodash.min.js",
            "http://127.0.0.1:48493/stippleplotly.jl/master/assets/js/vueresize.min.js",
            "http://127.0.0.1:48493/stippleplotly.jl/master/assets/js/vueplotly.min.js", 
            "http://127.0.0.1:48493/stipple.jl/master/assets/js/stipplepagesemptymodel.js",
            "http://127.0.0.1:48493/js/plugins/autoreload.js" */
            
            
            /* "http://127.0.0.1:53754/stipple.jl/master/assets/js/underscore-min.js",
            "http://127.0.0.1:53754/stipple.jl/master/assets/js/vue.js",
            "http://127.0.0.1:53754/stipple.jl/master/assets/js/stipplecore.js",
            "http://127.0.0.1:53754/stipple.jl/master/assets/js/vue_filters.js",
            "http://127.0.0.1:53754/stipple.jl/master/assets/js/watchers.js",
            "http://127.0.0.1:53754/stipple.jl/master/assets/js/keepalive.js",
            "http://127.0.0.1:53754/stipple.jl/master/assets/js/stipplepagesemptymodel.js",
            "http://127.0.0.1:53754/js/plugins/autoreload.js" */

            /* appConfig.url + "/genie.jl/master/assets/js/channels.js", 
            appConfig.url + "/stipple.jl/master/assets/js/underscore-min.js", 
            appConfig.url + "/stipple.jl/master/assets/js/vue.js", 
            appConfig.url + "/stipple.jl/master/assets/js/stipplecore.js", 
            appConfig.url + "/stipple.jl/master/assets/js/watchers.js", 
            appConfig.url + "/stippleui.jl/master/assets/js/quasar.umd.min.js", 
            appConfig.url + "/stippleplotly.jl/master/assets/js/plotly2.min.js", 
            appConfig.url + "/stippleplotly.jl/master/assets/js/resizesensor.min.js", 
            appConfig.url + "/stippleplotly.jl/master/assets/js/lodash.min.js", 
            appConfig.url + "/stippleplotly.jl/master/assets/js/vueresize.min.js", 
            appConfig.url + "/stippleplotly.jl/master/assets/js/vueplotly.min.js", 
            appConfig.url + "/stipple.jl/master/assets/js/vue_filters.js", 
            appConfig.url + "/stipple.jl/master/assets/js/keepalive.js", 
            appConfig.url + "/stipple.jl/master/assets/js/stipplepagesemptymodel.js", 
            appConfig.url + "/js/plugins/autoreload.js" */
        ];
        result.scripts.forEach( (item)=>{
            /* 
            let regex = /<script.*?src="(.*?)"/gmi;
            let url = regex.exec(item);
            appConfig.contentScripts.push( appConfig.url + url[1] );
            */
           appConfig.contentScripts.push( appConfig.url + item );
          } );
        
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

          // Inject same scripts in editor context (root)
          for (let i = 0; i < appConfig.contentScripts.length; i++) {
              const scriptPath = appConfig.contentScripts[i];
              let myScript = document.createElement("script");
                myScript.setAttribute("src", scriptPath);
                document.body.appendChild(myScript);              
          }
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