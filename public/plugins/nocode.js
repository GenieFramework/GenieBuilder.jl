const editor = grapesjs.init({
  container : '#nocode',
  components: '',
  style: '',
  plugins: ['gjs-blocks-basic', 'grapesjs-plugin-forms', 'grapesjs-custom-code', 'grapesjs-touch',
            'grapesjs-blocks-bootstrap4', 'grapesjs-blocks-flexbox', 'grapesjs-table', 'grapesjs-plugin-actions',
            'grapesjs-shape-divider', 'grapesjs-blocks-avance', 'gjs-navbar', 'grapesjs-ga', 'grapesjs-echarts',
            'grapesjs-parser-postcss', 'grapesjs-rulers', 'grapesjs-script-editor', 'grapesjs-rte-extensions',
            'grapesjs-plugin-export'],
  pluginsOpts: {
    'gjs-blocks-basic': {},
    'grapesjs-plugins-forms': {},
    'grapesjs-custom-code': {},
    'grapesjs-touch': {},
    'grapesjs-blocks-bootstrap4': {},
    'grapesjs-blocks-flexbox': {},
    'grapesjs-table': {},
    'grapesjs-plugin-actions': {},
    'grapesjs-shape-divider': {},
    'grapesjs-blocks-avance': {},
    'gjs-navbar': {},
    'grapesjs-ga': {},
    'grapesjs-echarts': {},
    'grapesjs-parser-postcss': {},
    'grapesjs-rulers': {},
    'grapesjs-plugin-export': {},
    'grapesjs-rte-extensions': {
      // default options
      base: {
        bold: true,
        italic: true,
        underline: true,
        strikethrough: true,
        link: true,
      },
      //fonts: {
      //  fontName: ['font1',...,'fontn'],
      //  fontSize: true,
      //  //An array of strings representing colors
      //  fontColor: ['#fff',...],
      //  //An array of strings representing colors
      //  hilite: ['#fff',...],
      //}
      fonts: {
        fontColor: true,
        hilite: true,
      },
      format: {
        heading1: true,
        heading2: true,
        heading3: true,
        heading4: true,
        heading5: true,
        heading6: true,
        paragraph: true,
        quote: true,
        clearFormatting: true,
      },
      subscriptSuperscript: true,//|true
      indentOutdent: true,//|true
      list: true,//|true
      align: true,//|true
      actions: {
        copy: true,
        cut: true,
        paste: true,
        delete: true,
      },
      actions: true,//|true
      undoredo: true,//|true
      extra: true,//|true
      darkColorPicker: true,//|false
      maxWidth: '660px'
    },
    'grapesjs-script-editor': {}
  },
  canvas: {
    styles: [
      '/assets/css/bootstrap.min.css'
    ],
    scripts: [
      '/assets/js/jquery.slim.min.js',
      '/assets/js/popper.min.js',
      '/assets/js/bootstrap.min.js',
      '/assets/js/change-styles-html.js'
    ]
  }
});

const pn = editor.Panels;
const panelViews = pn.addPanel({
  id: 'views',
  id: 'options'
});
panelViews.get('buttons').add([{
  attributes: {
    title: 'Script'
  },
  className: 'fa fa-file-code-o',
  command: 'edit-script',
  // togglable: false, //do not close when button is clicked again
  id: 'edit-script'
}]);
panelViews.get('buttons').add([{
  attributes: {
    title: 'Toggle Rulers'
  },
  context: 'toggle-rulers', //prevents rulers from being toggled when another views-panel button is clicked
  label: `<svg width="18" viewBox="0 0 16 16"><path d="M0 8a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5A.5.5 0 0 1 0 8z"/><path d="M4 3h8a1 1 0 0 1 1 1v2.5h1V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2.5h1V4a1 1 0 0 1 1-1zM3 9.5H2V12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5h-1V12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/></svg>`,
  command: 'ruler-visibility',
  id: 'ruler-visibility'
}]);

editor.on('run:preview', () => editor.stopCommand('ruler-visibility'));