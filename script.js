const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartbtn = document.querySelector("#restart");
const singlePlayerBtn = document.querySelector("#single-player");
let isSinglePlayer = false
singlePlayerBtn.addEventListener('click',function(){
    isSinglePlayer=!isSinglePlayer
    if(isSinglePlayer){
        singlePlayerBtn.textContent='Play Duo'
    }
    else{
        singlePlayerBtn.textContent='Play Solo'
    }
    restartGame()
})
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

    updateCell(cells[cellIndex], cellIndex)
    if (checkWinner()) return; 

    changePlayer()

    if(isSinglePlayer && currentPlayer=='O'){
        setTimeout(bestmove,500)
    }
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
        return true
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
        return true
    } 
        return false
    
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


function bestmove(){
    let bestscore=-Infinity
    let move=-1
    for( let i=0;i<options.length;i++){
        if(options[i]==''){
            options[i]='O'
            let score=minimax(options,0,false)
            options[i]=''
            if(score>bestscore){
                bestscore=score
                move=i
            }
        }
    }
    if(move!=-1){
        updateCell(cells[move],move)
    }
    if (!checkWinner()) {  
        changePlayer(); 
    }
}
function minimax(options,depth,isMaximizing){
    let result=getWinner()
    if(result!=null){
        return result/(depth+1)
    }
    if(isMaximizing){
        let bestscore=-Infinity
        let score
        for(let i=0;i<options.length;i++){
            if(options[i]==''){
                options[i]='O'
                score=minimax(options,depth+1,false)
                options[i]=''
                bestscore=Math.max(bestscore,score)
            }
        }
        return bestscore;
     
    }
    else{
        let bestscore=Infinity
        let score
        for(let j=0;j<options.length;j++){
            if(options[j]==''){
                options[j]='X'
                score=minimax(options,depth+1,true)
                options[j]=''
                bestscore=Math.min(bestscore,score)
            }
        }
        return bestscore;

    }
    
    
}
function getWinner() {
    let winner = false;
    let winningPlayer=null
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
            winningPlayer=cellA;
            break;
        }
    }

    if (winner) {
        if(winningPlayer=='O'){
            return 1;
        }
        else{
            return -1;
        }
    } else if (!options.includes("")) {
        return 0;
    } 
        return null
    
}