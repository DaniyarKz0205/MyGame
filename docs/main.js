const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const cells = Array.from(document.getElementsByClassName("cell"));
let currentPlayer = "X";
let gameBoard = Array(9).fill(null);
let gameOver = false;
cells.forEach((cell, index) => {
  cell.addEventListener("mouseenter", () => {
    if (!gameBoard[index]) {
      cell.textContent = currentPlayer;
      cell.style.opacity = "0.5";
    }
  });
  cell.addEventListener("mouseleave", () => {
    if (!gameBoard[index]) {
      cell.textContent = "";
      cell.style.opacity = "1";
    }
  });
  cell.addEventListener("click", () => {
    click(index);
    cell.style.opacity = "0.5";
  });
});
const click = (index) => {
  if (gameOver || gameBoard[index] !== null) return;
  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  const winner = playerWinner();
  if (winner === "X" || winner === "O") {
    statusText.textContent = `Player ${winner} wins!`;
    gameOver = true;
    alert(`Player ${winner} wins!`);
    saveGameState();
    return;
  } else if (winner === "Draw") {
    statusText.textContent = "Its a Draw!";
    gameOver = true;
    alert("It's a Draw!");
    saveGameState();
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer} Turn`;
  saveGameState();
};
resetButton.addEventListener("click", () => {
  gameBoard.fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.opacity = "1";
  });
  currentPlayer = "X";
  statusText.textContent = "Player X turn";
  gameOver = false;
  localStorage.removeItem("tictactoe_board");
  localStorage.removeItem("tictactoe_player");
  localStorage.removeItem("tictactoe_status");
  localStorage.removeItem("tictactoe_opacity");
});
const playerWinner = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  if (gameBoard.indexOf(null) === -1) {
    return "Draw";
  }
  return null;
};
const saveGameState = () => {
  localStorage.setItem("tictactoe_board", JSON.stringify(gameBoard));
  localStorage.setItem("tictactoe_player", currentPlayer);
  localStorage.setItem("tictactoe_status", statusText.textContent || "");
  const opacityState = cells.map((cell) => cell.style.opacity);
  localStorage.setItem("tictactoe_opacity", JSON.stringify(opacityState));
};
const loadGameState = () => {
  const savedBoard = localStorage.getItem("tictactoe_board");
  const savedPlayer = localStorage.getItem("tictactoe_player");
  const savedStatus = localStorage.getItem("tictactoe_status");
  const savedOpacity = localStorage.getItem("tictactoe_opacity");
  if (savedBoard) {
    gameBoard = JSON.parse(savedBoard);
    gameBoard.forEach((mark, index) => {
      cells[index].textContent = mark || "";
    });
  }
  if (savedPlayer) {
    currentPlayer = savedPlayer;
  }
  if (savedStatus) {
    statusText.textContent = savedStatus;
  }
  if (savedOpacity) {
    const opacityValues = JSON.parse(savedOpacity);
    cells.forEach((cell, index) => {
      cell.style.opacity = opacityValues[index];
    });
  }
};
loadGameState();
//# sourceMappingURL=main.js.map
