gitURL = "https://github.com/JamieWells1?tab=repositories";

const numberElement = document.getElementById("generated-number");
const generateButton = document.getElementById("generate");
const resetButton = document.getElementById("reset");
const bingoBall = document.getElementById("bingo-ball");
const usedBingoNumbersContainer = document.getElementById(
  "used-numbers-container"
);

const generateRaffle = document.getElementById("generate-raffle");
const raffleNumber = document.getElementById("raffle-number");
const resetRaffle = document.getElementById("reset-raffle");
const usedRaffleContainer = document.getElementById("used-raffle-container");
let sliderValue = document.getElementById("range-slider").value;

generateButton.addEventListener("click", generate);
resetButton.addEventListener("click", reset);

generateRaffle.addEventListener("click", generateR);
resetRaffle.addEventListener("click", resetR);

function openTab(evt, game) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(game).style.display = "block";
  evt.currentTarget.className += " active";
}

// ------------------- Bingo ---------------------

let usedBingoNumbers = [];

function generate() {
  let n = Math.ceil(Math.random() * 90);
  while (usedBingoNumbers.includes(n)) {
    n = Math.ceil(Math.random() * 90);
  }

  usedBingoNumbers.push(n);
  numberElement.innerText = n;
  numberElement.classList.add("scale");

  setTimeout(function () {
    numberElement.classList.remove("scale");
  }, 500);

  var usedBall = document.createElement("div");
  usedBall.classList.add("used-ball");
  usedBingoNumbersContainer.appendChild(usedBall);

  var usedNumber = document.createElement("p");
  usedNumber.classList.add("used-number");
  usedNumber.textContent = usedBingoNumbers[usedBingoNumbers.length - 1];
  usedBall.appendChild(usedNumber);
}

function reset() {
  var result = window.confirm("Are you sure you want to reset?");
  if (result) {
    numberElement.innerText = ".";
    usedBingoNumbers.length = 0;

    for (let i = 0; i <= usedBingoNumbersContainer.children.length; i) {
      usedBingoNumbersContainer.removeChild(
        usedBingoNumbersContainer.firstChild
      );
    }
  }
}

// ------------------- Raffle ---------------------

let usedRaffleNumbers = [];

function generateR() {
  let pause = 100;
  let shuffleLength = 10;
  let promises = [];

  for (let i = 0; i < shuffleLength; i++) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        let n = Math.ceil(Math.random() * sliderValue);
        while (usedRaffleNumbers.includes(n)) {
          n = Math.ceil(Math.random() * sliderValue);
        }
        if (n < 100 && n >= 10) {
          raffleNumber.innerText = `0${n}`;
        } else if (n < 10) {
          raffleNumber.innerText = `00${n}`;
        } else {
          raffleNumber.innerText = n;
        }
        usedRaffleNumbers.push(n);
        resolve();
      }, pause);
    });
    promises.push(promise);
    pause += 100;
  }

  Promise.all(promises).then(() => {
    raffleNumber.classList.add("scale");
    setTimeout(function () {
      raffleNumber.classList.remove("scale");
    }, 500);

    var usedRaffle = document.createElement("div");
    usedRaffle.classList.add("used-raffle");
    usedRaffleContainer.appendChild(usedRaffle);

    var usedNumber = document.createElement("p");
    usedNumber.classList.add("used-number");
    usedNumber.textContent = raffleNumber.innerText;
    usedRaffle.appendChild(usedNumber);
  });
}

function resetR() {
  var result = window.confirm("Are you sure you want to reset?");
  if (result) {
    raffleNumber.innerText = ".";
    usedRaffleNumbers.length = 0;

    for (let i = 0; i <= usedRaffleContainer.children.length; i) {
      usedRaffleContainer.removeChild(usedRaffleContainer.firstChild);
    }
  }
}

function github() {
  window.open(gitURL, "_blank");
}

function updateRange() {
  document.getElementById("range-value").innerHTML = `<b>${sliderValue}</b>`;
}

// end of code
