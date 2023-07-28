const CHANGE_COLOR_INTERVAL = 1000;
let intervalId = null;
let isRunning = false;

const obj = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

obj.stopBtn.setAttribute('disabled', true);

obj.startBtn.addEventListener('click', onClickStartBtn);
obj.stopBtn.addEventListener('click', onClickStopBtn);

function onClickStartBtn(e) {
  isRunning = true;
  
  e.target.setAttribute('disabled', true);
  obj.stopBtn.removeAttribute('disabled');

  intervalId = setInterval(changeBodyColor, CHANGE_COLOR_INTERVAL);
}

function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onClickStopBtn(e) {
  isRunning = false;
  
  e.target.setAttribute('disabled', true);
  obj.startBtn.removeAttribute('disabled');

  clearInterval(intervalId);
}
