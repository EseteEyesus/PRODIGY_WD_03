const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.innerText = cell;
    cellElement.addEventListener("click", handleCellClick);
    board.appendChild(cellElement);
  });
}

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (cells[index] === "") {
    cells[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    if (checkWinner()) {
      status.innerText = `🎉 Player ${currentPlayer} Wins! 🎊`;
      board
        .querySelectorAll(".cell")
        .forEach((cell) => cell.removeEventListener("click", handleCellClick));
    } else if (cells.every((cell) => cell !== "")) {
      status.innerText = "It's a Draw! 🤝";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.innerText = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function checkWinner() {
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

  return winningCombinations.some((combination) => {
    return combination.every((index) => cells[index] === currentPlayer);
  });
}

function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  status.innerText = "Player X's Turn";
  createBoard();
}

createBoard();
