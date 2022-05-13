// To-do: Check how to do this better, since the theme may be different in some applications
(t = document.querySelector("html").classList).add.apply(t, ["stipple-core", "stipple-blue"]);

function createPreviewElements( htmlTemplate ){
    //$('div[data-gjs-type="wrapper"]').append(`<h1 id="LILO">PEPEPEP</h1>`)
    $('div[data-gjs-type="wrapper"]').append(htmlTemplate)
}

/* window.autorun = false; */