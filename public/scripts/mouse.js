const graph = document.getElementById('graph');
const follower = document.getElementById('mouse');

graph.addEventListener('mousemove', (e) => {
  // Get mouse position relative to #graph
  const rect = graph.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  // Clamp x/y to stay inside #graph
  x = Math.max(0, Math.min(x, rect.width));
  y = Math.max(0, Math.min(y, rect.height));

  // Move the follower
  follower.style.left = x + 'px';
  follower.style.top = y + 'px';
});

const quad = [
  { x: 757.5, y: 475 },
  { x: 784.5, y: 475 },
  { x: 807.5, y: 524 },
  { x: 777.5, y: 542 },
];

// Function to check if point is inside polygon
function isPointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x,
      yi = polygon[i].y;
    const xj = polygon[j].x,
      yj = polygon[j].y;

    const intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

const message = document.getElementById('message');

graph.addEventListener('click', (e) => {
  const rect = graph.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (isPointInPolygon(x, y, quad)) {
    console.log('yes', { x, y });
    message.textContent = 'You found Waldo';

    const score = document.getElementById('counter').textContent;
    const name = 'Jin';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to send data');
        window.location.href = '/'; // You can still redirect afterward
      })
      .catch((err) => console.error(err));
  } else {
    console.log('no', { x, y });
    message.textContent = 'That is not Waldo';
    // fetch('/click', { method: 'POST', body: JSON.stringify({ result: "no", x, y }) });
  }
});
