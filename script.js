let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateTime() {
    const now = Date.now();
    const diff = now - startTime + elapsedTime;
    const milliseconds = parseInt((diff % 1000) / 10);
    const seconds = parseInt((diff / 1000) % 60);
    const minutes = parseInt((diff / (1000 * 60)) % 60);
    display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timer = setInterval(updateTime, 10);
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
});

resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
});
