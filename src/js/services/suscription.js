import config from 'default';

export default async (subscription) => {
  try {
    await fetch(`${config.endpoint}/subscribe`, {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json"
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
