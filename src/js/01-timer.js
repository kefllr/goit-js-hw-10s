import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const dateInput = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button");
const day = document.querySelector('.value[ data-days]');
const hour = document.querySelector('.value[ data-hours]');
const minute = document.querySelector('.value[ data-minutes]');
const second = document.querySelector('.value[ data-seconds]');
startBtn.disabled = true;

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
iziToast.show({
  title: 'Error',
  message: 'Please choose a date in the future',
  backgroundColor: '#EF4040',
  titleColor: '#FFF',
  titleSize: '16px',
  messageColor: '#FFF',
  messageSize: '16px',
  position: 'topCenter'
});
    } else {
      startBtn.disabled = false;
      startBtn.style.background = '#4E75FF';
      startBtn.style.color = '#FFF';
    }
  },
};
const flat = flatpickr(dateInput, options);

class Timer {
  constructor(tick) {
    this.tick = tick;    
  }
  start() {
  this.intervalld = setInterval(() => {
      this.diff = userSelectedDate - Date.now();
      const timeObj = this.#convertMs(this.diff);
    this.tick(timeObj);
    }
      , 1000);
  }
  stop() {
      clearInterval(this.intervalld);
    }
  
  #convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
}
const timer = new Timer(time);
startBtn.addEventListener("click", () => {
timer.start();
startBtn.disabled = true;
dateInput.disabled = true;
startBtn.style.background = '#CFCFCF';
startBtn.style.color = '#989898';
});
function time({days, hours, minutes, seconds }) {
  const timeStr = `${addZero(days)}:${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
  console.log(timeStr);
  day.textContent = addZero(days);
  hour.textContent = addZero(hours);
  minute.textContent = addZero(minutes);
  second.textContent = addZero(seconds);
  console.log(timeStr);
  if (days == '00' && hours == '00' && minutes == '00' && seconds == '00') {
    timer.stop();
  }
}
function addZero(num) {
 return num.toString().padStart(2, '0');
 }
 