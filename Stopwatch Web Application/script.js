let timer;
let isRunning = false;
let startTime;
let lapTimes = [];
let lapCounter = 1;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((acc, lap) => acc + lap, 0) : 0);
        timer = setInterval(updateTime, 1000);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    lapTimes = [];
    lapCounter = 1;
    displayTime(0);
    updateLapTimes();
}

function recordLap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        updateLapTimes();
        lapCounter++;
    }
}

function updateTime() {
    const elapsedMilliseconds = Date.now() - startTime;
    displayTime(elapsedMilliseconds);
}

function displayTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${padNumber(minutes)}:${padNumber(seconds)}`;
    document.getElementById('display').textContent = formattedTime;
}

function padNumber(number) {
    return number < 10 ? `0${number}` : number;
}

function updateLapTimes() {
    const lapTimesList = document.getElementById('lapTimes');
    lapTimesList.innerHTML = "";
    
    lapTimes.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${formatLapTime(lap)}`;
        lapTimesList.appendChild(lapItem);
    });
}

function formatLapTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${padNumber(minutes)}:${padNumber(seconds)}.${Math.floor((milliseconds % 1000) / 10)}`;
    return formattedTime;
}
