const maze = document.querySelector(".maze");
const counterElement = document.querySelector(".counter");
const timerElement = document.querySelector(".timer");
const levelSelect = document.getElementById("level");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const playAgainButton = document.getElementById("play-again");

let wins = 0;
let playerPosition;
let goalPosition;
let time = 0;
let timerInterval;
let totalWins = 0;
let totalTime = 0;
let cellSize = 40; // Default cell size for Easy level

// Function to create the maze
function createMaze(size) {
  maze.innerHTML = "";
  maze.style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
  maze.style.gridTemplateRows = `repeat(${size}, ${cellSize}px)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (Math.random() < 0.3) {
      cell.classList.add("wall");
    }
    maze.appendChild(cell);
  }

  // Place the player in a random position
  do {
    playerPosition = Math.floor(Math.random() * size * size);
  } while (maze.children[playerPosition].classList.contains("wall"));
  maze.children[playerPosition].classList.add("player");

  // Place the goal in a random position
  do {
    goalPosition = Math.floor(Math.random() * size * size);
  } while (
    maze.children[goalPosition].classList.contains("wall") ||
    goalPosition === playerPosition
  );
  maze.children[goalPosition].classList.add("goal");
}

// Function to move the player
function movePlayer(newPosition, size) {
  if (
    newPosition >= 0 &&
    newPosition < size * size &&
    !maze.children[newPosition].classList.contains("wall")
  ) {
    maze.children[playerPosition].classList.remove("player");
    playerPosition = newPosition;
    maze.children[playerPosition].classList.add("player");

    // Check if the player reached the goal
    if (playerPosition === goalPosition) {
      clearInterval(timerInterval);
      wins++;
      totalWins++;
      totalTime += time;
      counterElement.textContent = `Wins: ${wins}`;
      if (totalWins === 3) {
        if (totalTime <= 30) {
          showModal("You Win!");
        } else {
          showModal("You Lose!");
        }
        resetGame();
      } else {
        startTimer();
        createMaze(size);
      }
    }
  }
}

// Function to start the timer
function startTimer() {
  time = 0;
  timerElement.textContent = `Time: ${time}s`;
  timerInterval = setInterval(() => {
    time++;
    timerElement.textContent = `Time: ${time}s`;
    if (time >= 30) {
      clearInterval(timerInterval);
      showModal("Time's up! You Lose!");
      resetGame();
    }
  }, 1000);
}

// Function to show the modal
function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "flex";
  document.querySelector("main").classList.add("blur");
}

// Function to hide the modal
function hideModal() {
  modal.style.display = "none";
  document.querySelector("main").classList.remove("blur");
}

// Function to reset the game
function resetGame() {
  wins = 0;
  totalWins = 0;
  totalTime = 0;
  counterElement.textContent = `Wins: ${wins}`;
  timerElement.textContent = `Time: 0s`;
}

// Event listener for level selection
levelSelect.addEventListener("change", () => {
  const level = levelSelect.value;
  let size;
  if (level === "easy") {
    size = 10;
    cellSize = 40; // Large cells for Easy level
  } else if (level === "medium") {
    size = 15;
    cellSize = 30; // Medium cells for Medium level
  } else if (level === "hard") {
    size = 20;
    cellSize = 20; // Small cells for Hard level
  }
  createMaze(size);
  startTimer();
});

// Event listener for keyboard input
document.addEventListener("keydown", (e) => {
  const level = levelSelect.value;
  let size;
  if (level === "easy") {
    size = 10;
  } else if (level === "medium") {
    size = 15;
  } else if (level === "hard") {
    size = 20;
  }

  switch (e.key) {
    case "ArrowUp":
      movePlayer(playerPosition - size, size);
      break;
    case "ArrowDown":
      movePlayer(playerPosition + size, size);
      break;
    case "ArrowLeft":
      movePlayer(playerPosition - 1, size);
      break;
    case "ArrowRight":
      movePlayer(playerPosition + 1, size);
      break;
  }
});

// Event listener for the Play Again button
playAgainButton.addEventListener("click", () => {
  hideModal();
  const level = levelSelect.value;
  let size;
  if (level === "easy") {
    size = 10;
  } else if (level === "medium") {
    size = 15;
  } else if (level === "hard") {
    size = 20;
  }
  createMaze(size);
  startTimer();
});

// Initialize the game
createMaze(10);
startTimer();

// Function to go to the home page
function goToHomePage() {
  window.location.href = "../index.html";
}