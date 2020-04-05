export default async () => {
  const form = document.querySelector('.logging');
  const submit = form.querySelector('.logging__submit');
  const name = form.querySelector('.logging__name').value;

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('hey: ', name);
    /* logging(name); */
  });
 }
