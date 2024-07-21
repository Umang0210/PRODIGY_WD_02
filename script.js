const timer = document.querySelector('.timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapCount = 0;

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime + elapsedTime;
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)));
  
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  timer.innerText = formattedTime;
}

function startTimer() {
  if (!isRunning) { // Check if not already running
    isRunning = true;
    startTime = Date.now();
    intervalId = setInterval(updateTime, 10); // Call updateTime every 10 milliseconds
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
}

function stopTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
  }
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  startTime = 0;
  timer.innerText = '00:00:00.000';
  lapsList.innerHTML = '';
  lapCount = 0;
}

function lap() {
  if (isRunning) {  // Only add lap if timer is running
    lapCount++;
    const lapTime = timer.innerText;
    const lapListItem = document.createElement('li');
    lapListItem.innerText = `Lap ${lapCount}: ${lapTime}`;
    lapsList.appendChild(lapListItem);
  }
}

// Add event listeners for buttons
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lap);
