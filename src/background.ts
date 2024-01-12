let timer;
let seconds = 0;

function updateTimer() {
  seconds++;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

  console.log(formattedTime)
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

chrome.runtime.onInstalled.addListener(initializeTimer);

function initializeTimer() {
  chrome.storage.local.get(["timerStartedAt"], function (result) {
    const full_today = new Date()
    const today = full_today.toLocaleDateString();

    if (result.timerStartedAt !== today) {
      // If it's a new day, reset the timer
      stopTimer();
      seconds = 0;
      startTimer();

      // Update the date in storage
      chrome.storage.local.set({ "timerStartedAt": today });
    } else {
      // If it's the same day, resume the timer
      startTimer();
    }
  });
}

initializeTimer();
