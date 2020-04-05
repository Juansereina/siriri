import api from './api';

export default async (subscription) => {
  try {
    await api('subscribe', subscription, 'POST');
  } catch (error) {
    console.error(error);
    throw error;
  }
}
