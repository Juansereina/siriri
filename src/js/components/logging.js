import loggingService from '../services/loggingService';

export default async () => {
  const form = document.querySelector('.logging');
  const submit = form.querySelector('.logging__submit');
  const name = form.querySelector('.logging__name').value;

  submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const { createGuest: result } = await loggingService(name);

    console.log(result.id);
  });
 }
