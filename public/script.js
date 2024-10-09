// script.js

async function fetchSpacePledged() {
    try {
        const response = await fetch('/api/space-pledge');
        const data = await response.json();
        const bytes = BigInt(data.spacePledged);
        const pib = bytesToPiB(bytes);
        updateThermometer(pib);
      } catch (error) {
        console.error('Error fetching spacePledged:', error);
      }
}

function bytesToPiB(bytes) {
    const divisor = BigInt(1024 ** 5);
    const pib = Number(bytes) / Number(divisor);
    return pib.toFixed(3); // Ensure 3 decimal places for precision
}

function updateThermometer(pib) {
    const maxPiB = 20;
    const percentage = Math.min((pib / maxPiB) * 100, 100);

    const rocket = document.querySelector('.rocket');
    const translateY = -(percentage / 100) * window.innerHeight;

    rocket.style.transform = `translateY(${translateY}px)`;
}


climbInterval = setInterval(fetchSpacePledged, 1000);
fetchSpacePledged();

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


