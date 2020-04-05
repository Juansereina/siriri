import { apiQuery } from './api';

const query = `mutation CreateGuest($guestInput: GuestInput!) {
  createGuest(guest: $guestInput) {
    id
  }
}`;

export default async (name) => {
  const guestInput = {
    name,
    state: "Ok"
  }
  try {
    const response = await apiQuery(query, { guestInput });
    const { data, errors } = await response.json();

    if (Array.isArray(errors) && errors.length > 0 ) {
      throw new Error(errors[0].message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
