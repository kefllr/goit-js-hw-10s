import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener('submit', popMessage);

function popMessage(event) {
  event.preventDefault();
  const delay = form.elements.delay.value;
  const state = form.elements.state.value;

  createPromise({ delay, state })
    .then(onFulfilled)
    .catch(onRejected);
}

function createPromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function showToast(title, backgroundColor, message, delay) {
  iziToast.show({
    title: title,
    titleColor: '#fff',
    titleSize: '16px',
    titleLineHeight: '150%',
    backgroundColor: backgroundColor,
    message: `${message} за ${delay} мс`,
    messageColor: '#fff',
    messageSize: '16px',
    messageLineHeight: '150%',
    position: 'topCenter',
    close: false
  });
}

function onFulfilled(delay) {
  showToast('OK', '#59a10d', 'Fulfilled promise', delay);
}

function onRejected(delay) {
  showToast('Error', '#ef4040', 'Rejected promise', delay);
}