import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';

const scoreElement = document.getElementById('score');

const getFoodPosition = () =>{
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition();
    };
    return newFoodPosition;
}

let food = getFoodPosition();
const GROWTH_RATE = 1;

const updateFood = () =>{
    if(onSnake(food)){
        scoreElement.textContent = parseInt(scoreElement.textContent) + 1;
        expandSnake(GROWTH_RATE);
        food = getFoodPosition();
    }
};

const drawFood = (gameBoard) =>{
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
};

export { updateFood, drawFood, scoreElement };