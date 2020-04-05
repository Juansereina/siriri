import registerSw from './components/registerSw';
import logging from './components/logging';
import room from './components/room';

window.addEventListener('load', () => {
  registerSw();

  const form = document.querySelector('.logging');
  if (form) {
    logging(form);
  }

  const roomNode = document.querySelector('.room');
  if (roomNode) {
    room(roomNode);
  }
});
