import api from './api';

export default async (body) => {
  try {
    await api('subscribe', body);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
