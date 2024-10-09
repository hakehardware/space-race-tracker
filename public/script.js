// script.js

let heightPercent = 0;

function updateRocketPosition() {
  const rocket = document.querySelector('.rocket');
  
  // Convert the percentage into a pixel-based translation (rocket moves upwards)
  const translateY = -(heightPercent / 100) * window.innerHeight;
  rocket.style.transform = `translateY(${translateY}px)`;
}

function simulateRocketClimb() {
  if (heightPercent < 100) {
    heightPercent += 1;
    updateRocketPosition();
  } else {
    clearInterval(climbInterval);
  }
}

const climbInterval = setInterval(simulateRocketClimb, 1000);

// Add stars to the background, restricted to the top 20% of the viewport
const starsContainer = document.createElement('div');
starsContainer.classList.add('stars');
document.querySelector('.rocket-container').appendChild(starsContainer);

const numStars = 100; // Number of stars to generate

for (let i = 0; i < numStars; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = `${Math.random() * 20}vh`; // Restrict stars to the top 20% of the page
  star.style.left = `${Math.random() * 100}vw`; // Random horizontal position
  starsContainer.appendChild(star);
}
