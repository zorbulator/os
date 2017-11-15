var windows = document.getElementsByClassName('window');
var close = document.getElementsByClassName("close");
var open = document.getElementsByClassName("open");


function open0() {
    windows[0].style.top = '10%';
}

function close0() {
    windows[0].style.top = '-100%';
}

window.onkeypress = function(event) {
    var x = event.which || event.keyCode;
    if (x == 102) {
        alert(windows[0].id);
        open[i].style.color = 'black';
    }
}