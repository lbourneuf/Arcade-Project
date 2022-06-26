// grab all the html elements
const tiles = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');
// declare the game state
let board = ['','','','','','','','',''];
let currentPlayer = 'X';
let isGameActive = true;
// declare the winning conditions
const playerXWon = 'Player X Won';
const playerOWon = 'Player O Won';
const draw = 'Draw';

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]



];
// if there is already an x or o printed don't let them place anything
const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === "O") {
        return false;
    }

    return true;
}
// print the current players sign
const updateBoard = (index) => {
    board[index] = currentPlayer;
}
// write a function that will change the players turns
const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}
// write a function that will give the result when the game ends
const announce = (type) => {
    switch(type) {
        case playerOWon:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
        case playerXWon:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        case draw: 
            announcer.innerText = 'Draw';
    }
    announcer.classList.remove('hide');
}
// evaluate if a player has actually won the game or not
function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <=7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if(a === "" || b === "" || c === "") {
            continue;
        }
        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        announce(currentPlayer === "X" ? playerXWon : playerOWon);
        isGameActive = false;
        return;
    }
    if(!board.includes("")) announce(draw);
}
// when a player clicks on a tile in a specific index, have a function that prints the players sign if it is true
const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}
// add event listeners for the tiles
tiles.forEach( (tile, index) => {
    tile.addEventListener(`click`, () => userAction(tile,index));

});
// write a function for reseting the game when the button is pressed
const resetBoard = () => {
    board = ['','','','','','','','',''];
    isGameActive = true;
    announcer.classList.add('hide');

    if(currentPlayer === 'O') {
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}
// add an event listener for the reset button
resetButton.addEventListener('click', resetBoard);