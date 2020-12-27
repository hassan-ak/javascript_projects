// Access DOM elements
const year = document.getElementById('year');
const countdown = document.getElementById('countdown');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const loading = document.getElementById('loading');

// Update BackGround for next year
// Find Current year
const currentYear = new Date().getFullYear();
// Set background year
year.innerText = currentYear + 1;

// Update countdown time
// new year time
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
// Function to update timer
function updateCountdown() {
  // Current time and time till next year
  const currentTime = new Date();
  const diff = newYearTime - currentTime;
  // Convert difference into dd:hh:mm:ss
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;
  // Add values to DOM
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}
// Run every second
setInterval(updateCountdown, 1000);

// Show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 2500);