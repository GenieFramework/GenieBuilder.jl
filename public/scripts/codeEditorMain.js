initCodeEditor = () => {

  new Vue({
    el: "#codeEditor", 
    data: {
      //projectFileTree: appConfiguration.fileTree
    },
    methods: {
      
    }
  });

    require.config({ paths: { vs: './libs/vs' } });

    require(['vs/editor/editor.main'], function () {
        window.codeEditor = monaco.editor.create(document.getElementById('codeEditor'), {
            value: '',
            language: 'julia', 
            automaticLayout: true
        });
    });
};
