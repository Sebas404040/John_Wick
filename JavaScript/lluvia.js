const rainContainer = document.querySelector('.rain-container');

for (let i = 0; i < 150; i++) {
  const drop = document.createElement('div');
  drop.classList.add('drop');
  drop.style.left = Math.random() * 100 + 'vw';
  drop.style.animationDuration = 0.5 + Math.random() * 1.5 + 's';
  drop.style.animationDelay = Math.random() * 2 + 's';
  rainContainer.appendChild(drop);
}