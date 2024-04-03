const timerId = document.getElementById("timer");
const markList = document.getElementById("mark-list");
let intervalId = 0;
let timer = 0;
let marks = [];

const formatTimer = (time) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 100);
  const milliseconds = time % 100;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
    .toString()
    .padStart(2, "0")}`;
};

const toggleTimer = () => {
  const power = document.getElementById("power");
  const action = power.getAttribute("action");

  clearInterval(intervalId);

  if (action == "start" || action == "continue") {
    intervalId = setInterval(() => {
      timer += 1;
      setTimer(timer);
    }, 10);
    power.setAttribute("action", "pause");
    power.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else if (action == "pause") {
    power.setAttribute("action", "continue");
    power.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
};

const addMark = (markIndex, markTime) => {
  markList.innerHTML += `<p> Marca ${markIndex}: ${formatTimer(markTime)}</p>`;
};

const markTimer = () => {
  marks.push(timer);
  addMark(marks.length, timer);
};

const resetTimer = () => {
  clearInterval(intervalId);
  timer = 0;
  marks = [];
  setTimer(timer);
  markList.innerHTML = "";
  const power = document.getElementById("power");
  power.setAttribute("action", "start");
  power.innerHTML = `<i class="fa-solid fa-play"></i>`;
};

const setTimer = (time) => {
  timerId.innerHTML = formatTimer(time);
};

document.getElementById("power").addEventListener("click", toggleTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("mark").addEventListener("click", markTimer);
