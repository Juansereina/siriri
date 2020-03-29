const initApp = () => {
  console.log('hellow world');
};

const shareData = {
  title: 'MDN',
  text: 'Learn web development on MDN!',
  url: 'https://developer.mozilla.org'
};

const shareApiButton = document.querySelector('.shareBtn');
const resultPara = document.querySelector('.result');

shareApiButton.addEventListener('click', async () => {
  try {
    await navigator.share(shareData);
    resultPara.textContent = 'MDN shared successfully';
  } catch (err) {
    resultPara.textContent = `Error:${err}`;
  }
});
