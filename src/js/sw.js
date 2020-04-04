self.addEventListener("push", e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: "Notified by Siriri 19!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});
