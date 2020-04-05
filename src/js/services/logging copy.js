import api from './api';

export default async (user) => {
  try {
    await api('logging', user, 'POST');
  } catch (error) {
    console.error(error);
    throw error;
  }
}
