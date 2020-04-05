import config from 'default';

export default async (path, body, method = 'GET') => {
  try {
    await fetch(`${config.endpoint}/${path}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json"
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
