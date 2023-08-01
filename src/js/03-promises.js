import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const obj = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
};

obj.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  let delay = Number(obj.inputDelay.value);
  const step = Number(obj.inputStep.value);
  const amount = Number(obj.inputAmount.value);

  if (delay < 0 || step < 0 || amount <= 0) {
    Notify.warning(
      `❗ The 'first delay' and the 'delay step' must be a positive number, and the 'amount' must be greater than 0`
    );
  } else {
    for (let i = 0; i < amount; i++) {
      createPromise(i+1, delay)
        .then(({ position, delay }) => {
          Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
        delay += step;
    }
  }

  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
