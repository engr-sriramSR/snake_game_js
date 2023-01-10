import { getInputDirection } from "./directions.js";

const SNAKE_SPEED = 5;
const snakeBody = [{ x:11,y:11 }];
let newSegments = 0;

const updateSnake = () =>{
    addSegments();

    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    };

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y; 
};

const drawSnake = (gameBoard) =>{
    snakeBody.forEach( (segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        index === 0 ? snakeElement.classList.add('head') : snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
};

const expandSnake = (amount) =>{
    newSegments += amount;
};

const onSnake = (position, {ignoreHead = false} = {}) =>{
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    });
};

const getSnakeHead = () =>{
    return snakeBody[0];
};

const snakeIntersection = () =>{
    return onSnake(snakeBody[0], {ignoreHead: true});
};

const equalPositions = (position1, position2) =>{
    return position1.x === position2.x && position1.y === position2.y;
};

const addSegments = () =>{
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }

    newSegments = 0;
};

export{ SNAKE_SPEED, updateSnake, drawSnake, expandSnake, onSnake, getSnakeHead, snakeIntersection };