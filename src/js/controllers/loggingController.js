import loggingService from '../services/loggingService';
import { getAll as getAllGuest } from '../services/guestService';
import { saveData } from '../services/storage';

export default async (name) => {
  const { createGuest } = await loggingService(name);
  const { getGuests } = await getAllGuest();

  saveData('currentGuest', createGuest);
  saveData('allGuests', getGuests);
}
