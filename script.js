document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");
    const boxSize = 20;
    const canvasSize = 500;
    const snakeColor = "#00FF00";
    const snakeHeadColor = "#FFFF00"; // Color for the snake head
    const appleColor = "#FF0000";
    const gameOverColor = "#FFFFFF";
    const gameSpeed = 150;
    const gameArea = canvasSize / boxSize;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    let snake = [{ x: 4, y: 4 }];
    let apple = { x: 10, y: 10 };
    let score = 0;
    let direction = "right";

    const backgroundImage = new Image();
    backgroundImage.src = "background.jpg"; // Replace with the path to your background image

    const drawBackground = () => {
        context.drawImage(backgroundImage, 0, 0, canvasSize, canvasSize);
    };

    const draw = () => {
        context.clearRect(0, 0, canvasSize, canvasSize);

        drawBackground();

        snake.forEach((segment, index) => {
            if (index === 0) {
                drawSnakeHead(segment.x, segment.y);
            } else {
                context.fillStyle = snakeColor;
                context.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
            }
        });

        context.fillStyle = appleColor;
        context.beginPath();
        context.arc(
            (apple.x * boxSize) + (boxSize / 2),
            (apple.y * boxSize) + (boxSize / 2),
            boxSize / 2,
            0,
            Math.PI * 2
        );
        context.fill();

        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText("Score: " + score, boxSize, boxSize);
    };

    const drawSnakeHead = (x, y) => {
        context.fillStyle = snakeHeadColor;
        context.beginPath();
        context.moveTo(x * boxSize + boxSize, y * boxSize);
        context.lineTo(x * boxSize + boxSize, y * boxSize + boxSize);
        context.lineTo(x * boxSize, y * boxSize + boxSize);
        context.lineTo(x * boxSize, y * boxSize + boxSize - (boxSize / 2));
        context.lineTo(x * boxSize + (boxSize / 2), y * boxSize + boxSize - (boxSize / 2));
        context.lineTo(x * boxSize + (boxSize / 2), y * boxSize);
        context.closePath();
        context.fill();

        // Draw the "~" shape at the corner
        context.fillStyle = "black";
        context.font = "bold 12px Arial";
        context.fillText("~", x * boxSize + (boxSize / 2) - 4, y * boxSize + boxSize - (boxSize / 2) + 10);
    };

    const moveSnake = () => {
        const head = { x: snake[0].x, y: snake[0].y };

        switch (direction) {
            case "up":
                head.y -= 1;
                break;
            case "down":
                head.y += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "right":
                head.x += 1;
                break;
        }

        snake.unshift(head);

        if (head.x === apple.x && head.y === apple.y) {
            score++;
            generateApple();
        } else {
            snake.pop();
        }
    };

    const generateApple = () => {
        apple = {
            x: Math.floor(Math.random() * gameArea),
            y: Math.floor(Math.random() * gameArea),
        };

        if (snake.some((segment) => segment.x === apple.x && segment.y === apple.y)) {
            generateApple();
        }
    };

    const checkCollision = () => {
        const head = snake[0];

        if (head.x < 0 || head.x >= gameArea || head.y < 0 || head.y >= gameArea) {
            return true;
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }

        return false;
    };

    const gameOver = () => {
        clearInterval(gameLoop);
        context.fillStyle = gameOverColor;
        context.font = "bold 30px Arial";
        context.fillText("Game Over", canvasSize / 2 - 75, canvasSize / 2);
        context.font = "bold 20px Arial";
        context.fillText("Your Score: " + score, canvasSize / 2 - 60, canvasSize / 2 + 30);
    };

    const changeDirection = (event) => {
        const keyPressed = event.keyCode;

        if (keyPressed === 37 && direction !== "right") {
            direction = "left";
        } else if (keyPressed === 38 && direction !== "down") {
            direction = "up";
        } else if (keyPressed === 39 && direction !== "left") {
            direction = "right";
        } else if (keyPressed === 40 && direction !== "up") {
            direction = "down";
        }
    };

    generateApple();
    let gameLoop = setInterval(() => {
        draw();
        moveSnake();

        if (checkCollision()) {
            gameOver();
        }
    }, gameSpeed);

    document.addEventListener("keydown", changeDirection);
});
