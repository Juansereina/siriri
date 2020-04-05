import loggingController from '../controllers/loggingController';

export default () => {
  const form = document.querySelector('.logging');
  const submit = form.querySelector('.logging__submit');
  const name = form.querySelector('.logging__name');

  submit.addEventListener('click', (e) => {
    e.preventDefault();

    loggingController(name.value);
  });
 }
