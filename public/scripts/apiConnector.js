class ApiConnector{
    constructor(){
      console.log( "new APiConnector created!");
    }
    static hostName = "127.0.0.1";
    static port = "10101";
    static get baseUrl(){
      return `http://${ApiConnector.hostName}:${ApiConnector.port}/api/v1/apps/`
    }
    static projectId = null;
    static appsList = [];

    static getApiUrl( endpoint ){
      let fullUrl = ApiConnector.baseUrl + ApiConnector.projectId + '/' + endpoint;
      return fullUrl;
    }


    static getAppsList(){
      return new Promise( (resolve, reject) => {
        axios.get( ApiConnector.baseUrl )
          .then(  (response) => resolve( response.data.applications ) )
          .catch( (error) => reject( error ) );
      });
    }

    static getProjectAssets(){
      return new Promise( (resolve, reject) => {
          axios.get( ApiConnector.getApiUrl('assets') )
            .then(  (response) => resolve( response.data.deps ) )
            .catch( (error) => reject( error ) );
        } );
    }

    static getProjectPages(){
      return new Promise( (resolve, reject) => {
          axios.get( ApiConnector.getApiUrl('pages') )
            .then(  (response) => resolve( response.data.pages ) )
            .catch( (error) => reject( error ) );
        } );
    }
    static getFolderContents(path){
      return new Promise( (resolve, reject) => {
          axios.get( ApiConnector.getApiUrl('dir?path='+path) )
            .then(  (response) => resolve( response.data ) )
            .catch( (error) => reject( error ) );
        } );
    }

    static readFileContents(path){
      return new Promise( (resolve, reject) => {
          axios.get( ApiConnector.getApiUrl('edit?path='+path) )
            .then(  (response) => resolve( response.data.content ) )
            .catch( (error) => reject( error ) );
        } );

        // To-do: call the api endpoint when it is implemented
        let apiUrl = 'apiMock/'+fileName;
        axios.get(apiUrl)
          .then(function (response) {
            console.log( "ApiConnector::readFileContents callback: ", response);
            resultCallback( response.data );
          })
          .catch(function (error) {
            console.log( "ApiConnector::readFileContents ERROR: ", error);
          });
    }

    static saveProjectTemplate(id, data, successCallback){
        // To-do: call the api endpoint when it is implemented
        successCallback( { success:true } );
    }
}