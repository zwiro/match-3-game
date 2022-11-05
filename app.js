const gameboardSize = 64;
const sideSize = 8;

const tileColors = ['url("./images/burger-solid.svg")', 'url("images/cheese-solid.svg")', 'url("./images/fish-solid.svg")', 'url("images/lemon-solid.svg")', 'url("images/pepper-hot-solid.svg")', 'url("images/pizza-slice-solid.svg")'];
const tiles = [];

let tileDraggedColor;
let tileSwappedColor;
let tileDraggedId;
let tileSwappedId;
let score = 0;
let remainingMoves = 50;

createGameboard();
countScore();

function createGameboard() {
    const gameWrapper = document.querySelector('.game-wrapper');
    for (let i = 0; i < gameboardSize; i++) {
        const randomNumber = Math.floor(Math.random() * tileColors.length);
        const randomColor = tileColors[randomNumber];
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('id', i);
        tile.setAttribute('draggable', true);
        tile.style.backgroundImage = randomColor;
        gameWrapper.append(tile);
        tiles.push(tile);
    }
};

function countScore() {
    const scoreCounter = document.querySelector('.score-counter');
    const moveCounter = document.querySelector('.move-counter');
    scoreCounter.innerText = `Score: ${score}`;
    moveCounter.innerText = `Remaining moves: ${remainingMoves}`;
}

tiles.forEach(tile => {
    tile.addEventListener('dragstart', dragStart);
    tile.addEventListener('dragend', dragEnd);
    tile.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
    tile.addEventListener('drop', dropTile);
});

function dragStart() {
    if (remainingMoves < 1) {
        const gameOverMsg = document.createElement('div');
        gameOverMsg.innerText = 'Game Over!';
        gameOverMsg.classList.add('game-over-msg')
        document.body.append(gameOverMsg);
        document.body.style.pointerEvents = 'none'
        return;
    }
    tileDraggedColor = this.style.backgroundImage;
    tileDraggedId = parseInt(this.id);
}

function dropTile() {
    const validMoves = [tileDraggedId - 1, tileDraggedId + 1, tileDraggedId - 8, tileDraggedId + 8];
    tileSwappedColor = this.style.backgroundImage;
    tileSwappedId = parseInt(this.id);
    if (validMoves.includes(tileSwappedId)) {
        this.style.backgroundImage = tileDraggedColor;
    } else return;
    if (tileSwappedColor !== tileDraggedColor) {
        remainingMoves--;
    }
    countScore();
}

function dragEnd() {
    const validMoves = [tileDraggedId - 1, tileDraggedId + 1, tileDraggedId - 8, tileDraggedId + 8];
    if (validMoves.includes(tileSwappedId)) {
        this.style.backgroundImage = tileSwappedColor;
    }
    tileSwappedColor = undefined;
    tileDraggedColor = undefined;
}

function checkMatchFive() {
    const invalidTiles = ['4', '5', '6', '7', '12', '13', '14', '15', '20', '21', '22', '23', '28', '29', '30', '31', '36', '37', '38', '39', '44', '45', '46', '47', '52', '53', '54', '55', '60', '61', '62', '63'];
    for (let i = 0; i < 59; i++) {
        rowOfFive = [tiles[i], tiles[i + 1], tiles[i + 2], tiles[i + 3], tiles[i + 4]];
        if (!invalidTiles.includes(rowOfFive[0].id)) {
            if (rowOfFive.every(tile => tile.style.backgroundImage.includes(tiles[i].style.backgroundImage))) {
                rowOfFive.every(tile => tile.style.backgroundImage = 'url("./images/transparent.png")');
                score += 500;
                countScore();
            }
        }
    }
    for (let i = 0; i < 32; i++) {
        columnOfFive = [tiles[i], tiles[i + 8], tiles[i + 16], tiles[i + 24], tiles[i + 32]];
        if (columnOfFive.every(tile => tile.style.backgroundImage.includes(tiles[i].style.backgroundImage))) {
            columnOfFive.every(tile => tile.style.backgroundImage = 'url("./images/transparent.png")')
            score += 500;
            countScore();
        }
    }
}

function checkMatchFour() {
    const invalidTiles = ['5', '6', '7', '13', '14', '15', '21', '22', '23', '29', '30', '31', '37', '38', '39', '45', '46', '47', '53', '54', '55', '61', '62', '63'];
    for (let i = 0; i < 60; i++) {
        rowOfFour = [tiles[i], tiles[i + 1], tiles[i + 2], tiles[i + 3]];
        if (!invalidTiles.includes(rowOfFour[0].id)) {
            if (rowOfFour.every(tile => tile.style.backgroundImage.includes(tiles[i].style.backgroundImage))) {
                rowOfFour.every(tile => tile.style.backgroundImage = 'url("./images/transparent.png")');
                score += 250;
                countScore();
            }
        }
    }
    for (let i = 0; i < 40; i++) {
        columnOfFour = [tiles[i], tiles[i + 8], tiles[i + 16], tiles[i + 24]];
        if (columnOfFour.every(tile => tile.style.backgroundImage.includes(tiles[i].style.backgroundImage))) {
            columnOfFour.every(tile => tile.style.backgroundImage = 'url("./images/transparent.png")')
            score += 250;
            countScore();
        }
    }
}

function checkMatchThree() {
    const invalidTiles = ['6', '7', '14', '15', '22', '23', '30', '31', '38', '39', '46', '47', '54', '55', '62', '63'];
    for (let i = 0; i < 62; i++) {
        rowOfThree = [tiles[i], tiles[i + 1], tiles[i + 2]];
        if (!invalidTiles.includes(rowOfThree[0].id)) {
            if (rowOfThree.every(tile => tile.style.backgroundImage.includes(tiles[i].style.backgroundImage))) {
                rowOfThree.every(tile => tile.style.backgroundImage = 'url("./images/transparent.png")');
                score += 100;
                countScore();
            }
        }
    }
    for (let i = 0; i < 48; i++) {
        columnOfThree = [tiles[i], tiles[i + 8], tiles[i + 16]];
        if (columnOfThree.every(tile => tile.style.backgroundImage.includes(tiles[i].style.backgroundImage))) {
            columnOfThree.every(tile => tile.style.backgroundImage = 'url("./images/transparent.png")')
            score += 100;
            countScore();
        }
    }
}

function moveTilesDown() {
    const firstRow = ['0', '1', '2', '3', '4', '5', '6', '7'];
    for (let i = 0; i < 64; i++) {
        if (tiles[i].style.backgroundImage === 'url("./images/transparent.png")' && !firstRow.includes(tiles[i].id)) {
            tiles[i].style.backgroundImage = tiles[i - sideSize].style.backgroundImage;
            tiles[i - sideSize].style.backgroundImage = 'url("./images/transparent.png")';
        } else generateNewTiles();
    }
}

function generateNewTiles() {
    for (let i = 0; i < 8; i++) {
        const randomNumber = Math.floor(Math.random() * tileColors.length);
        const randomColor = tileColors[randomNumber];
        if (tiles[i].style.backgroundImage === 'url("./images/transparent.png")') {
            tiles[i].style.backgroundImage = randomColor;
        }
    }
}

window.setInterval(function () {
    checkMatchFive();
    checkMatchFour();
    checkMatchThree();
    setTimeout(() => moveTilesDown(), 300);
}, 100)