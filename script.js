var windows = document.getElementsByClassName('window');
var close = document.getElementsByClassName("close");
var rawCode = "";
var name = "";
var str = "";
var css = "";
var js = "";
var html = "";
var files = [];
//var elmnt;
//Lockr.flush();
var doubleclick = false;
var selectedFile = -1;
var mouseX = 0;
var mouseY = 0;

document.getElementById('open0').onclick = open0;

function open0() {
    windows[0].style.transition = 'top 0.5s';
    windows[0].style.top = '10%';
    setTimeout(function () { windows[0].style.transition = 'none'; }, 500);
}

function close0() {
    windows[0].style.transition = 'top 0.5s';
    windows[0].style.top = '-100%';
    setTimeout(function () { windows[0].style.transition = 'none'; }, 500);
}

function open1() {
    windows[1].style.transition = 'top 0.5s';
    windows[1].style.top = '10%';
    setTimeout(function () { windows[1].style.transition = 'none'; }, 500);
}

function close1() {
    windows[1].style.transition = 'top 0.5s';
    windows[1].style.top = '-100%';
    setTimeout(function () { windows[1].style.transition = 'none'; }, 500);
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

function openwindow(code) {
    var x = window.open();
    x.document.open();
    x.document.write(code);
    x.document.close();
    //window.open('data:text/html;charset=utf-8,' + encodeURIComponent("code"));
}

function rawCodeFromInput() {
    rawCode = "<html>" + document.getElementById('html').value + "<!-->ZORBULATOR HTML FILE DIVIDER<--><style>" + document.getElementById('css').value + "</style> <!-->ZORBULATOR HTML FILE DIVIDER<--> <script>" + document.getElementById('js').value + "</script>" + "</html>";
}

function splitZCode(code) {
    var splitCode = code.split("<!-->ZORBULATOR HTML FILE DIVIDER<-->");
    html = splitCode.join("\n").split(splitCode[1]).join("\n").split(splitCode[2]).join("\n").substring(6);
    css = splitCode[1].substring(7, splitCode[1].length - 9);
    js = splitCode[2].substring(9, splitCode[2].length - 16);
}

function addFile(name, type, content, top, left) {
    files = Lockr.get('files');
    files.push({ name: name, type: type, content: content, top: top, left: left });
    Lockr.set('files', files);
    drawFiles();
}
function saveHtmlFile() {
    rawCodeFromInput();
    name = document.getElementById('htmlName').value;
    console.log(rawCode);
    files = Lockr.get('files');
    var fileExists = false;
    for (i = 0; i < files.length; i++) {
        if (name == files[i].name) {
            files[i].content = rawCode;
            fileExists = true;
        }
    }
    if (!fileExists) {
        addFile(name, "zorb", rawCode, 500, 500);
    }
    addFile(name, "zorb", rawCode, 500, 500);
    drawFiles();
}

function drawFiles() {
    files = Lockr.get('files');
    for (i = 0; i < files.length; i++) {
        if (document.getElementById('file_' + i) == null) {
            var file = document.createElement("div");
            var fileImage = document.createElement("img");
            fileImage.src = "file.png";
            fileImage.className = "fileImage";
            var label = document.createElement("p");
            label.className = "fileLabel";
            label.innerHTML = files[i].name + "." + files[i].type;
            file.id = 'file_' + i;
            file.className = "file";
            file.style.top = files[i].top + "px";
            file.style.left = files[i].left + "px";
            document.getElementById('desktop').appendChild(file);
            file.appendChild(label);
            file.appendChild(fileImage);
            file.ondragstart = function () { return false; };
            dragElement(file);
        }
    }
}



window.onload = function () {
    dragElement(document.getElementById("window0"));
    dragElement(document.getElementById("window1"));
    if (Lockr.get('files') == undefined) {
        Lockr.set('files', [{}]);
    }
    drawFiles();
    //splitZCode("<html><p>HTML</p><!-->ZORBULATOR HTML FILE DIVIDER<--><style>CSS code here css css</style><!-->ZORBULATOR HTML FILE DIVIDER<--><script>JS This is JavaScript</script></html>");
    //console.log('html: ' + html + 'css: ' + css + 'js: ' + js);
}
/*
function getRawCode(code) {
    str = code;
    css = str.match(/<style>(.*?)<\/style>/g).map(function(val){
     return val.replace(/<\/?style>/g,'');
    }).join("\n");
    js = str.match(/<script>(.*?)<\/script>/g).map(function(val){
     return val.replace(/<\/?script>/g,'');
    }).join("\n");
    html = str.split(css).join(" ").split(js).join(" ");
}*/

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
        var fileIndex = Number(elmnt.id.substring(5));
        console.log(files[fileIndex].content);
        if (doubleclick == true) {
            files = Lockr.get('files');
            splitZCode(files[fileIndex].content);
            document.getElementById('css').value = css;
            document.getElementById('js').value = js;
            document.getElementById('html').value = html;
            open1();
        }
        doubleclick = true;
        setTimeout(function () { doubleclick = false; }, 500)
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

function generateCode() {
    html = document.getElementById('html').value;
    css = document.getElementById('css').value;
    js = document.getElementById('js').value;
    code = html + "<st" + "yle>" + css + "</st" + "yle> <scr" + "ipt>" + js + "</scr" + "ipt>";
}


document.getElementById('openCode').onclick = function () {
    generateCode();
    openwindow(code);
}
document.getElementById('downloadCode').onclick = function () {
    generateCode();
    download(document.getElementById('htmlName').value + ".html", code);
}

document.getElementById('htmlSlider0').oninput = htmlSliderChange;
document.getElementById('htmlSlider1').oninput = htmlSliderChange;
function htmlSliderChange() {
    //alert('test');
    if (document.getElementById('htmlSlider0').value >= document.getElementById('htmlSlider1').value) {
        document.getElementById('htmlSlider0').value = document.getElementById('htmlSlider1').value - 1;
    }
    document.getElementById('html').style.width = document.getElementById('htmlSlider0').value + "%";

    document.getElementById('css').style.width = document.getElementById('htmlSlider1').value - document.getElementById('htmlSlider0').value + "%";
    document.getElementById('js').style.width = 90 - document.getElementById('htmlSlider1').value + "%";
}

document.addEventListener("keydown", function (event) {
    if (event.which == 27) {
        alert('drawing');
        drawFiles();
    }
});

var item0 = document.getElementById('item0');
var item1 = document.getElementById('item1');
var menu = document.getElementById('menu0');
var selectedFile;
document.addEventListener('contextmenu', function(ev) {
 ev.preventDefault();
 menu.style.left = ev.clientX + 'px';
 menu.style.top = ev.clientY + 'px';
 files = Lockr.get('files');
 item0.innerHTML = "Reset OS";
 item1.innerHTML = "Change Background";
 item0.onclick = fileClear;
 item1.onclick = open0;

 for (i = 0; i < files.length; i++) {
  selectedFile = document.getElementById('files_' + i);
  if (ev.target == selectedFile) {
   item0.innerHTML = "Open";
   item1.innerHTML = "Delete";
   item0.onclick = function() {
       fileOpen(i);
   }
   //item1.onclick = fileDelete(i);
  }
 menu.style.display = "block";
 }
}, false);

document.addEventListener("click", function(event) {
 menu.style.display = "none";
}, false);

function fileClear() {
    if (confirm('Are you sure you want to clear all files?')) {
        Lockr.flush();
        window.location.reload(false); 
    }
}
function fileOpen(index) {
    files = Lockr.get('files');
    splitZCode(files[index].content);
    document.getElementById('css').value = css;
    document.getElementById('js').value = js;
    document.getElementById('html').value = html;
    open1();
}