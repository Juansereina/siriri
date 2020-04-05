import { apiQuery } from './api';

const query = `{
  getGuests {
    id
  }
}`;

export default async () => {
  try {
    const response = await apiQuery(query);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
