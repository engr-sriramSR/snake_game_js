import { updateSnake, drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js";
import { updateFood, drawFood, scoreElement } from "./food.js";
import { outsideGrid } from "./grid.js";

const gameBoard = document.getElementById('game-board');
let highScoreValue;
let lastRenderTime = 0;
let gameOver = false;
const highScoreElement = document.getElementById('high-score');
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreValue = 0;
    localStorage.setItem('highScore', JSON.stringify(highScoreValue))
}else{
    highScoreValue = JSON.parse(highScore);
    highScoreElement.textContent = highScoreValue;
}

const main = (currentTime) => {
    if (gameOver) {
        let score = parseInt(scoreElement.textContent);
        if(highScoreValue < score){
            localStorage.setItem('highScore', JSON.stringify(score));
        }
        if (confirm('You lost. Press ok to restart.')){
            window.location = '/'
         }
        return
    }
    window.requestAnimationFrame(main);
    const timeDifference = (currentTime - lastRenderTime) / 1000;
    if(timeDifference < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;
    updateSnake();
    updateFood();
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
};

window.requestAnimationFrame(main);