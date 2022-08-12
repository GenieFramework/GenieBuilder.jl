// To-do: Check how to do this better, since the theme may be different in some applications
(t = document.querySelector("html").classList).add.apply(t, ["stipple-core", "stipple-blue"]);

function createPreviewElements( htmlTemplate ){
    $('div[data-gjs-type="wrapper"]').append(htmlTemplate)
}

document.addEventListener('keydown', e => {
    console.log( "keyboard DOWN event detected at contentMain: ", e );
    if( e.ctrlKey || e.metaKey ){
      switch( e.key ){
        case "s":
          //e.preventDefault();
          /* savePage(); */
          break;
        case "z":
          e.preventDefault();
          if( e.shiftKey)
            document.execCommand("redo");
          else
            document.execCommand("undo");
          break;
        case "c":
          e.preventDefault();
          document.execCommand("copy");
          break;
        case "v":
          e.preventDefault();
          document.execCommand("paste");
          break;
        case "x":
          e.preventDefault();
          document.execCommand("cut");
        case "a":
          e.preventDefault();
          document.execCommand("selectAll");
      }
    }
  });

/* window.autorun = false; */