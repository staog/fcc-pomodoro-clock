var main = document.getElementById('main');
var time = document.getElementById('time');
var bPlus = document.getElementsByClassName('btn')[0];
var breakNum = document.getElementsByClassName('breakNum')[0];
var bMinus = document.getElementsByClassName('btn')[1];
var sPlus = document.getElementsByClassName('btn')[2];
var sessionNum = document.getElementsByClassName('sessionNum')[0];
var sMinus = document.getElementsByClassName('btn')[3];
var audio = new Audio('alarm.mp3');
var bDefault = 6;
var sDefault = 26;

bPlus.addEventListener('click', breakUp);
bMinus.addEventListener('click', breakDown);
sPlus.addEventListener('click', sessionUp);
sMinus.addEventListener('click', sessionDown);
main.addEventListener('click', sessionCountDown);

function breakUp() {
  bDefault++;
  breakNum.innerHTML = bDefault;
}

function breakDown() {
  bDefault--;
  breakNum.innerHTML = bDefault;
}

function sessionUp() {
  sDefault++;
  sessionNum.innerHTML = sDefault;
}

function sessionDown() {
  sDefault--;
  sessionNum.innerHTML = sDefault;
}


function sessionCountDown() {
  main.removeEventListener('click', sessionCountDown);
  sDefault--;
  time.innerHTML = sDefault;
  if (sDefault >= 0) {
    setTimeout(sessionCountDown, 1000);
  } else {
    breakCountDown();
    audio.play();
  }
}

function breakCountDown() {
  bDefault--;
  time.innerHTML = bDefault;
  if (bDefault >= 0) {
    setTimeout(breakCountDown, 1000);
  } else {
    time.innerHTML = "Start";
    breakNum.innerHTML = 5;
    bDefault = 5;
    sessionNum.innerHTML = 25;
    sDefault = 25;
    main.addEventListener('click', sessionCountDown);
  }
}
