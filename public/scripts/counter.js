let count = 0;
const counter = document.getElementById('counter');

setInterval(() => {
  count++;
  counter.textContent = count;
}, 1000);
