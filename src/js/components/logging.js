import loggingController from '../controllers/loggingController';

export default (node) => {
    const submit = node.querySelector('.logging__submit');
    const name = node.querySelector('.logging__name');

    submit.addEventListener('click', (e) => {
      e.preventDefault();

      loggingController(name.value);
    });
 }
