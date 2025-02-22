const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const counterElement = document.querySelector(".counter");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const playAgainButton = document.getElementById("play-again");

let xWins = 0;
let oWins = 0;
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;
  if (cell.textContent === "" && gameActive) {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin(currentPlayer)) {
      if (currentPlayer === "X") {
        xWins++;
      } else {
        oWins++;
      }
      counterElement.textContent = `X Wins: ${xWins} | O Wins: ${oWins}`;
      showModal(`${currentPlayer} Wins!`);
      resetBoard();
    } else if (checkDraw()) {
      showModal("It's a Draw!");
      resetBoard();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === player;
    });
  });
}

function checkDraw() {
  return [...cells].every((cell) => cell.textContent !== "");
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
  currentPlayer = "X";
  gameActive = true;
}

function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "flex";
  document.querySelector("main").classList.add("blur");
}

function hideModal() {
  modal.style.display = "none";
  document.querySelector("main").classList.remove("blur");
}

playAgainButton.addEventListener("click", () => {
  hideModal();
  resetBoard();
});

function goToHomePage() {
  window.location.href = "../index.html";
}