// Get DOM elements
const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode');

// Timer variables
let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;
let currentMode = 'Work Mode'; // Track current mode

// Update the time display and document title
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeDisplay.textContent = timeString;
    document.title = `${timeString} - ${currentMode} - Pomodoro Timer`;
}

// Start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                isRunning = false;
                // Play a sound or show a notification when timer ends
                alert('Time is up!');
                document.title = `Pomodoro Timer - ${currentMode}`; // Keep mode in title when timer ends
            }
        }, 1000);
    }
}

// Pause the timer
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
    }
}

// Reset the timer
function resetTimer() {
    pauseTimer();
    const activeMode = document.querySelector('.mode.active');
    timeLeft = parseInt(activeMode.dataset.time) * 60;
    currentMode = activeMode.textContent; // Update current mode
    updateDisplay();
}

// Change timer mode
function changeMode(e) {
    const selectedMode = e.target;
    if (!selectedMode.classList.contains('active')) {
        // Remove active class from all modes
        modeButtons.forEach(button => button.classList.remove('active'));
        // Add active class to selected mode
        selectedMode.classList.add('active');
        // Reset timer with new time
        timeLeft = parseInt(selectedMode.dataset.time) * 60;
        currentMode = selectedMode.textContent; // Update current mode
        updateDisplay();
    }
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeButtons.forEach(button => button.addEventListener('click', changeMode));

// Initialize display
updateDisplay(); 