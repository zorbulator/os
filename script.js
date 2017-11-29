var windows = document.getElementsByClassName('window');
var close = document.getElementsByClassName("close");

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

function open1() {
    windows[1].style.transition = 'top 0.5s';
    windows[1].style.top = '10%';
    setTimeout(function() {windows[1].style.transition = 'none';}, 500);
}

function close1() {
    windows[1].style.transition = 'top 0.5s';
    windows[1].style.top = '-100%';
    setTimeout(function() {windows[1].style.transition = 'none';}, 500);
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
    dragElement(document.getElementById("window1"));
}


function dragElement(elmnt) {
  var index = elmnt.id.substring(6);
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("bar" + index)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("bar" + index).onmousedown = dragMouseDown;
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
    for (i = 0; i < windows.length; i++) {
        windows[i].style.zIndex = "1";
    }
    elmnt.style.zIndex = "2";
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

function openwindow(code) {
    var x=window.open();
    x.document.open();
    x.document.write(code);
    x.document.close();
    //window.open('data:text/html;charset=utf-8,' + encodeURIComponent("code"));
}
//openwindow("test");
  //var html = String(document.getElementById('html').value);
  
  var html = "";
  var css = "";
  var js = "";
  var code = "";

  
  function download(filename, text) {

    var element = document.createElement('a');

    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));

    element.setAttribute('download', filename);

    element.style.display = 'none';

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

  }
  
  function generateCode() {
    html = document.getElementById('html').value;
    css = document.getElementById('css').value;
    js = document.getElementById('js').value;
    code = html + "<st"+"yle>" + css + "</st"+"yle> <scr"+"ipt>" + js + "</scr"+"ipt>";
  }
  
  document.getElementById('openCode').onclick = function() {
    generateCode();
    openwindow(code);
  }
  document.getElementById('downloadCode').onclick = function() {
     generateCode();
     download(document.getElementById('htmlName').value + ".html", code);
  }
  
  document.getElementById('htmlSlider0').oninput = htmlSliderChange;
  document.getElementById('htmlSlider1').oninput = htmlSliderChange;
  function htmlSliderChange() {
  //alert('test');
      if(document.getElementById('htmlSlider0').value >= document.getElementById('htmlSlider1').value) {
     document.getElementById('htmlSlider0').value = document.getElementById('htmlSlider1').value - 1;
    }
    document.getElementById('html').style.width = document.getElementById('htmlSlider0').value + "%";
    
    document.getElementById('css').style.width = document.getElementById('htmlSlider1').value - document.getElementById('htmlSlider0').value + "%";
    
    document.getElementById('js').style.width = 90- document.getElementById('htmlSlider1').value + "%";
  }
  
  
  