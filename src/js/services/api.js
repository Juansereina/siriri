import config from 'default';

export default async (path, body, method = 'GET') => {
  try {
    await fetch(`${config.endpoint}/${path}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiQuery = async (query, variables) => {
  try {
    return await fetch(`${config.endpoint}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
