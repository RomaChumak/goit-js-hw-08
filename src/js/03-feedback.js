import throttle from "lodash.throttle";
// console.log(throttle)

const LOCAL_KEY = 'feedback-form-state';

let formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onInputData, 500));
formEl.addEventListener('submit', onFormSubmit);

let dataForm = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
const { email, message } = formEl.elements;
reloadPage();

function onInputData() {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
}

function reloadPage() {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log({ email: email.value, message: message.value });
  
    if (email.value === '' || message.value === '') {
      return alert('Please fill in all the fields!');
    }
  
    localStorage.removeItem(LOCAL_KEY);
    evt.currentTarget.reset();
    dataForm = {};
  }


