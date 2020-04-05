import loggingController from '../controllers/loggingController';
import { getData } from '../services/storage';

export default async () => {
  const form = document.querySelector('.logging');
  const submit = form.querySelector('.logging__submit');
  const name = form.querySelector('.logging__name');

  submit.addEventListener('click', async (e) => {
    e.preventDefault();
    await loggingController(name.value);
    const guest = getData('currentGuest');
    const all = getData('allGuests');

    console.log(guest, all);
  });
 }
