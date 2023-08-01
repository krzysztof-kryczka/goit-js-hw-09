import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const obj = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
  spans: document.querySelectorAll('.value'),
};

let timerId = 0;
const MLS_PER_SECOND = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: selectedDates => {
    console.log(selectedDates[0].getTime());
    console.log(Date.now());
    onFlatPicker(selectedDates);
  },
};

obj.startBtn.disabled = true;

flatpickr(obj.dateTimePicker, { ...options });

function onFlatPicker(selectedDates) {
  if (selectedDates[0].getTime() <= Date.now()) {
    Notify.failure('Please choose a date in the future', {
      position: 'center-top',
      clickToClose: true,
      timeout: 10000,
    });
    obj.startBtn.disabled = true;
  } else {
    obj.startBtn.disabled = false;
    Notify.success('Lets go?', {
      position: 'center-top',
      clickToClose: true,
      timeout: 10000,
    });
  }
}

obj.startBtn.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  obj.startBtn.disabled = true;
  obj.dateTimePicker.disabled = true;
  timerId = setInterval(() => {
    const chooseDate = new Date(obj.dateTimePicker.value);
    const timeToFinish = chooseDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeToFinish);

    obj.timer.days.textContent = addLeadingZero(days);
    obj.timer.hours.textContent = addLeadingZero(hours);
    obj.timer.minutes.textContent = addLeadingZero(minutes);
    obj.timer.seconds.textContent = addLeadingZero(seconds);

    if (timeToFinish <= MLS_PER_SECOND) {
      clearInterval(timerId);
      obj.dateTimePicker.disabled = false;
    }
  }, MLS_PER_SECOND);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
