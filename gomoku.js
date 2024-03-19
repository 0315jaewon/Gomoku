let currPlayer = 1;
let gameEnd = false;

const occupiedPositions = [];
const occupiedBlack = [];
const occupiedWhite = [];

const table = document.getElementById('game-board');

for (let i = 0; i < 15; i++) {
    const initialBlackRows = Array(15).fill(0);
    const initialWhiteRows = Array(15).fill(0);
    const row = document.createElement('tr');
    for (let j = 0; j < 15; j++) {
        const cell = document.createElement('td');
        row.appendChild(cell);
    }
    occupiedBlack.push(initialBlackRows);
    occupiedWhite.push(initialWhiteRows);
    table.appendChild(row);
}

table.addEventListener('click', function(event) {
    // check if game is already over
    if (gameEnd) {
        alert("The game has ended");
        return;
    }

    // x and y coordinate of clicked location
    const dimension = 33; // TODO: change depending on dimensions
    x = event.clientX;
    y = event.clientY;
    // x_abs, y_abs refers to the coordinate plane coordinates
    x_abs = Math.round((x - table.getBoundingClientRect().left) / dimension);
    y_abs = Math.round((y - table.getBoundingClientRect().top) / dimension);

    // x_real, y_real refers to the registered coordinates on the page
    x_real = x_abs * dimension;
    y_real = y_abs * dimension;

    // call createstone function with x_real, y_real
    createStone(x_real, y_real, x_abs, y_abs);
});

function createStone(x, y, x_abs, y_abs) {
    console.log('createStone function called');

    // check if position is occupied
    if (isOccupied(x_abs,y_abs)) {
        console.log('This position is occupied');
        return;
    }

    // check if position is allowed (3-3 or 4-4 or connect 5+ for black)
    // if (currPlayer === 1) {

    // }
    // if current player is white, then just skip since this doesn't matter.

    occupiedPositions.push({x_abs, y_abs});
    console.log(occupiedPositions);

    // create circle at specified x and y coordinates (change color based on player turn)
    const circle = document.createElement("div");
    circle.className = "circle";
    circle.style.left = x + "px";
    circle.style.top = y + "px";

    // circle color based on player
    if (currPlayer === 1) {
        circle.style.backgroundColor = 'black';
        occupiedBlack[x_abs][y_abs] = 1;
    } else {
        circle.style.backgroundColor = 'white';
        occupiedWhite[x_abs][y_abs] = 1;
    }
    // check if game is over (this already assumes that the stone is placed)
    checkWin();

    document.getElementById("game-board").appendChild(circle);

    currPlayer = currPlayer === 1 ? 2 : 1;
};

function isOccupied(x,y) {
    return occupiedPositions.some(position => position.x_abs === x && position.y_abs === y);
}

function checkWin() {
    const board = currPlayer === 1 ? occupiedBlack : occupiedWhite;
    for (let i = 2; i < 13; i++) {
        for (let j = 2; j < 13; j++) {
            // vertical, horizontal, diagonal win checks
            if ((board[i][j-2] && board[i][j-1] && board[i][j] && board[i][j+1] && board[i][j+2]) ||
            board[i-2][j] && board[i-1][j] && board[i][j] && board[i+1][j] && board[i+2][j] ||
            board[i-2][j-2] && board[i-1][j-1] && board[i][j] && board[i+1][j+1] && board[i+2][j+2] ||
            board[i-2][j+2] && board[i-1][j+1] && board[i][j] && board[i+1][j-1] && board[i+2][j-2]) {
                const winText = currPlayer === 1 ? "Black wins!" : "White wins!";
                alert(winText);
                gameEnd = true;
            }
        }
    }
    console.log("No winner yet...");
}