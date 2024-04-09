// To-do: Check how to do this better, since the theme may be different in some applications
(t = document.querySelector("html").classList).add.apply(t, ["stipple-core", "stipple-blue"]);

function createPreviewElements( htmlTemplate ){
    $('div[data-gjs-type="wrapper"]').append(htmlTemplate)
}

function findElementsWithValueInAnyAttribute( value ){
    let elements = [];
    let allElements = document.querySelectorAll("*");
    for( let i = 0; i < allElements.length; i++ ){
        let element = allElements[i];
        for( let j = 0; j < element.attributes.length; j++ ){
            let attribute = element.attributes[j];
            if( attribute.nodeName.indexOf('gb_b_') == 0 && attribute.value.includes(value) ){
            //if( attribute.value == value ){
                elements.push(element);
                break;
            }
        }
    }
    return elements;
}

function getElementPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left/*  + window.pageXOffset */,
    y: rect.top/*  + window.pageYOffset */, 
    width: rect.width,
    height: rect.height,
  };
}

function getElementPositions(elements) {
  const positions = [];

  elements.forEach((element) => {
    let position = getElementPosition(element);
    positions.push(position);
  });

  return positions;
}

window.addEventListener(
  "message",
  (event) => {
    if (event.data.target !== "main-controller") return;


    let matchingElements = findElementsWithValueInAnyAttribute( event.data.payload.bindingName)
    let elementsPositions = getElementPositions(matchingElements);
      let message = { target: "nocode-builder", payload:elementsPositions };
      window.parent.postMessage(message, "*");

    

  },
  false,
);



document.addEventListener('keydown', e => {
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