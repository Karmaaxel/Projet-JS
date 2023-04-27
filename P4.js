const ROWS = 6;
const COLS = 7;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// tableau de jeu
let board = [];

// joueur en cours
let currentPlayer = 0;

// jeu terminé ou non
let gameOver = false;

// largeur et hauteur d'une case
const pieceWidth = canvas.width / COLS;
const pieceHeight = canvas.height / ROWS;


// initialiser le tableau de jeu
function initBoard() {
    board = [];
    for (let i = 0; i < ROWS; i++) {
      board.push(Array(COLS).fill(0));
    }
}
  
// dessiner le tableau de jeu
function drawBoard() {
    ctx.fillStyle = '#006699';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(j * pieceWidth + pieceWidth / 2, i * pieceHeight + pieceHeight / 2, pieceWidth / 2 - 5, 0, 2 * Math.PI);
            ctx.fill();
            if (board[i][j] === 1) {
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(j * pieceWidth + pieceWidth / 2, i * pieceHeight + pieceHeight / 2, pieceWidth / 2 - 10, 0, 2 * Math.PI);
                ctx.fill();
            } else if (board[i][j] === 2) {
                ctx.fillStyle = '#ffff00';
                ctx.beginPath();
                ctx.arc(j * pieceWidth + pieceWidth / 2, i * pieceHeight + pieceHeight / 2, pieceWidth / 2 - 10, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
    document.getElementById('player-turn').innerHTML = 'Player ' + currentPlayer + ' turn';
}

// vérifier s'il y a un gagnant
function checkWin() {
    // vérifier les lignes
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS - 3; j++) {
            if (board[i][j] !== 0 && board[i][j] === board[i][j+1] && board[i][j] === board[i][j+2] && board[i][j] === board[i][j+3]) {
                return board[i][j];
            }
        }
    }
    
    // vérifier les colonnes
    for (let j = 0; j < COLS; j++) {
        for (let i = 0; i < ROWS - 3; i++) {
            if (board[i][j] !== 0 && board[i][j] === board[i+1][j] && board[i][j] === board[i+2][j] && board[i][j] === board[i+3][j]) {
                return board[i][j];
            }
        }
    }
    
    // vérifier les diagonales (haut-gauche -> bas-droite)
    for (let i = 0; i < ROWS - 3; i++) {
        for (let j = 0; j < COLS - 3; j++) {
            if (board[i][j] !== 0 && board[i][j] === board[i+1][j+1] && board[i][j] === board[i+2][j+2] && board[i][j] === board[i+3][j+3]) {
                return board[i][j];
            }
        }
    }
    
    // vérifier les diagonales (bas-gauche -> haut-droite)
    for (let i = ROWS - 1; i >= 3; i--) {
        for (let j = 0; j < COLS - 3; j++) {
            if (board[i][j] !== 0 && board[i][j] === board[i-1][j+1] && board[i][j] === board[i-2][j+2] && board[i][j] === board[i-3][j+3]) {
                return board[i][j];
            }
        }
    }
        
    // s'il n'y a pas de gagnant
    return 0;
}

// gérer le clic sur le canvas
function handleClick(e) {
    if (gameOver) {
        return;
    }
    
    const col = Math.floor(e.offsetX / pieceWidth);
        
    // vérifier si la colonne est valide
    if (col < 0 || col >= COLS || board[0][col] !== 0) {
        return;
    }
    
    // trouver la ligne où la pièce doit être placée
    let row = ROWS - 1;
    while (row >= 0 && board[row][col] !== 0) {
        row--;
    }
    
    // placer la pièce
    board[row][col] = currentPlayer + 1;
        
    // dessiner le tableau de jeu
    drawBoard();
        
    // vérifier s'il y a un gagnant
    const winner = checkWin();
    if (winner !== 0) {
        gameOver = true;
        setTimeout(() => {
            drawBoard();
            alert("Player " + ((currentPlayer+1)%2) + " win!");
            init();
            currentPlayer = 0;
            gameOver = false;
        }, 500);
        return;
    }
    // passer au joueur suivant
    currentPlayer = (currentPlayer + 1) % 2;
}
        
// initialiser le jeu
function init() {
    initBoard();
    drawBoard();
    canvas.addEventListener('click', handleClick);
}
        
// lancer le jeu
init();
