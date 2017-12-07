var windows = document.getElementsByClassName('window');
var close = document.getElementsByClassName("close");
var open = document.getElementsByClassName("open");
var rawCode = "";
var name = "";
var str = "";
var css = "";
var js = "";
var html = "";
//Lockr.flush();
var doubleclick = false;
var selectedFile = -1;
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

function addFile(name, type, content, top, left) {
    files = Lockr.get('files');
    files.push({name: name, type: type, content: content, top: top, left: left});
    Lockr.set('files', files);
    drawFiles();
}
function saveHtmlFile() {
    rawCode = document.getElementById('name').value + ".html","<html>" + document.getElementById('code').value + "<style>" + document.getElementById('css').value + "</style> <script>" + document.getElementById('js').value + "</script>" + "</html>";
    name = document.getElementById('name').value;
    addFile(name, "zorb", rawCode, 500, 500);
    drawFiles();
}

function drawFiles() {
    files = Lockr.get('files');
    for (i = 0; i < files.length; i++) {
        if (document.getElementById('file_' + i) == null) {
            var file = document.createElement("div");
            var label = document.createElement("p");
            label.className = "fileLabel";
            label.innerHTML = files[i].name + "." + files[i].type;
            file.id = 'file_' + i;
            file.className = "file";
            file.style.top = files[i].top + "px";
            file.style.left = files[i].left + "px";
            document.getElementById('desktop').appendChild(file);
            file.appendChild(label);
            dragElement(file);
        }
    }
}
window.onload = function() {
    dragElement(document.getElementById("window0"));
    dragElement(document.getElementById("window1"));
    drawFiles();
}

function getRawCode(code) {
    str = code;
    css = str.match(/<style>(.*?)<\/style>/g).map(function(val){
     return val.replace(/<\/?style>/g,'');
    }).join("\n");
    js = str.match(/<script>(.*?)<\/script>/g).map(function(val){
     return val.replace(/<\/?script>/g,'');
    }).join("\n");
    html = str.split(css).join(" ").split(js).join(" ");
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
    if (elmnt.className == "file" || elmnt.className == "file selectedFile") {
        if (doubleclick == true) {
            document.getElementById('css').value = css;
            document.getElementById('js').value = js;
            document.getElementById('code').value = html;
            open1();
        }
        doubleclick = true;
        setTimeout(function() {doubleclick = false;}, 500)
        elmnt.style.zIndex = "-1";
        for (i = 0; i < document.getElementsByClassName('file').length; i++) {
            document.getElementsByClassName('file')[i].className = "file";
        }
        elmnt.className = "file selectedFile";
        selectedFile = Number(elmnt.id.substring(5));
    }
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
    if (elmnt.className == "file selectedFile") {
        files = Lockr.get('files');
        files[Number(elmnt.id.substring(5))].top = (elmnt.offsetTop - pos2);
        files[Number(elmnt.id.substring(5))].left = (elmnt.offsetLeft - pos1);
        Lockr.set("files", files);
    }
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

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  
  function getCode() {
    var name = document.getElementById('name').value;
    var code = document.getElementById('code').value;
    var css = document.getElementById('css').value;
    var js = document.getElementById('js').value;
  }
  
  function run() {
    getCode();
    document.getElementById('htmlBox').style.display = 'block';
    document.getElementById('htmlBox').innerHTML = document.getElementById('code').value + "<style>" + document.getElementById('css').value + "</style>";
    eval(document.getElementById('js').value);
    
  }
  
  document.addEventListener("keydown", function(event) {
        if (event.which == 27) {
            alert('drawing');
            drawFiles();
      }
  });
  
  // Start file download.
  function download() {
    getCode();
    download(name + ".html","<html>" + code + "<style>" + css + "</style> <script>" + js + "</script>" + "</html>");
    download(document.getElementById('name').value + ".html","<html>" + document.getElementById('code').value + "<style>" + document.getElementById('css').value + "</style> <script>" + document.getElementById('js').value + "</script>" + "</html>");
  }