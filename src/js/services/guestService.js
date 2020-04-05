import { apiQuery } from './api';

export const getGuest = async () => {
  const query = `query getGuest($id: ID!) {
    getGuest(id: $id) {
      id
      name
      state
    }
  }`;
  try {
    const response = await apiQuery(query);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAll = async () => {
  const query = `{
    getGuests {
      id
      name
      state
    }
  }`;
  try {
    const response = await apiQuery(query);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
