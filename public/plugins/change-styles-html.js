setTimeout(function(){
    var Style = document.querySelector("style")
    console.log(Style)
    console.log(typeof Style); 
    console.log(Style.length); 

    var StyleText = Style.textContent;

    console.log(StyleText);

    /*StyleText = StyleText.replaceAll("!important","");*/

    StyleText = StyleText.replaceAll("#3b97e3","#306AFF");

    /*StyleText = StyleText.replaceAll("outline-offset: -2px","outline-offset: 0");*/
    StyleText = StyleText.replaceAll("outline-offset: -3px","outline-offset: -2px");
    
    StyleText = StyleText.replaceAll("outline: 3px solid #306AFF","outline: 2px solid #306AFF");

    StyleText = StyleText.replaceAll("outline: 1px dashed rgba(170,170,170,0.7)","outline:1px dashed rgba(204, 202, 198, 0.8)");

    StyleText = StyleText.replaceAll("#d983a6","#306bff7c!important");

    StyleText = StyleText.replaceAll("/* Layout */","/* Layout */.gjs-selected[data-gjs-type='video'],.gjs-selected[data-gjs-type='map'],.gjs-selected[data-gjs-type='bs-embed-responsive']{outline: 2px solid #306AFF!important;outline-offset:0px!important}");

    console.log(StyleText)

    Style.innerHTML = StyleText;

}, 1000)