var windows = document.getElementsByClassName('window');
var close = document.getElementsByClassName("close");
var open = document.getElementsByClassName("open");

var mouseX = 0;
var mouseY = 0;

function open0() {
    windows[0].style.transition = 'top 0.5s';
    windows[0].style.top = '10%';
    setTimeout(function() {windows[0].style.transition = 'none';}, 500);
}

function close0() {
    windows[0].style.transition = 'top 0.5s';
    windows[0].style.top = '-100%';
    setTimeout(function() {windows[0].style.transition = 'none';}, 500);
}

window.onkeypress = function(event) {
    var x = event.which || event.keyCode;
    if (x == 102) {
        alert(document.getElementById('wallpaper').style.getPropertyValue('--background') == 'white');
    }
}
/*
function drag(event) {
    var dragTimer = setInterval(function() {
        windows[0].style.left = event.clientX + mouseX + 'px';
        mouseX = event.clientX;
        mouseY = event.clientY;
    }, 10)
    
    //alert('test');
}

function undrag() {
    clearInterval(dragTimer);
}*/
//Make the DIV element draggagle:
window.onload = function() {
    dragElement(document.getElementById("window0"));
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("bar0")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("bar0").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function settingSave() {
    document.getElementById('wallpaper').style.setProperty('--background', document.getElementById('backgroundInput').value);
}
function backgroundReset() {
    document.getElementById('wallpaper').style.setProperty('--background', 'url(background.png)');
}