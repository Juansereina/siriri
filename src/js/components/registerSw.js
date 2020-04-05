import urlBase64 from '../helpers/url-base-64';

async function register() {
  if ("serviceWorker" in navigator) {
    try {
      return await navigator.serviceWorker.register("/sw.js", {
        scope: "/"
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

async function registerPush(register) {
  const publicVapidKey =
  "BIGYiFyAjhUPYaOQGDL0TceMiA9AvKHFd4E2DpksHJtZ1K1uJfVi0jabQXCBGtKjjeNgvhG0BV0xvFvorjFnOwk";

  try {
    return await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64(publicVapidKey)
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function sendPush(subscription) {
  const endpoint = 'http://localhost:3000';

  try {
    console.log("Sending Push...");
    await fetch(`${endpoint}/subscribe`, {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json"
      }
    });
    console.log("Push Sent...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function askPermission() {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((result) => {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}


export default async () => {
  try {
    const regis = await register();
    await askPermission();
    const subscription = await registerPush(regis);
    await sendPush(subscription)
  } catch (error) {
    console.error(error);
    throw error;
  }
}
