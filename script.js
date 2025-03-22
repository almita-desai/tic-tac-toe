const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartbtn = document.querySelector("#restart");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];
let options = ["", "", "", "", "", "", "", "", ""];
let running = false;
let currentPlayer = "X";

initializeGame();

function initializeGame() {
    console.log("Game initialized");
    cells.forEach(function (cell, index) {
        cell.addEventListener("click", function () {
            clickedCell(index);  
        });
    });
    restartbtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
    running = true;
}

function clickedCell(cellIndex) {
    console.log("Cell clicked!");
    console.log(`Cell index: ${cellIndex}`);  

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(cells[cellIndex], cellIndex);
    checkWinner();
}

function updateCell(cell, cellIndex) {
    console.log(`Updating cell at index ${cellIndex} to ${currentPlayer}`);  

    options[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
    let winner = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            winner = true;
            break;
        }
    }

    if (winner) {
        statusText.textContent = `${currentPlayer} Wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s Turn`;
    cells.forEach((cell) => (cell.textContent = ""));
    running = true;
}

const toggleThemeBtn = document.querySelector("#toggle-theme");
const body = document.body;

toggleThemeBtn.addEventListener("click", toggleTheme);

function toggleTheme() {
    body.classList.toggle("dark-mode");
    toggleThemeBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
}
toggleThemeBtn.addEventListener("click", toggleTheme);
