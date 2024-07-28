var today = new Date();
var bg = document.getElementById("dark-mode-bg");
var words = document.getElementsByClassName("dark-mode-word");
var nav = document.getElementById("dark-mode-nav");


if (today.getHours() > 18) {
    bg.style.backgroundColor = "#4C6079";
    for (let word of  words ){
        word.style.color = "white";
    }
    nav.classList.remove("navbar-light");
    nav.classList.remove("bg-light");
    nav.classList.add("navbar-dark");
    nav.classList.add("bg-dark");
    
}
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
let gameLoop;
let isGameRunning = false;

// Bird
let birdY = canvas.height / 2;
let birdVelocity = 0;
const gravity = 0.5;
const jumpStrength = -10;

// Pipe
let pipeX = canvas.width;
const pipeWidth = 50;
let pipeGap = 150;
let topPipeBottomY = canvas.height / 2 - pipeGap / 2;

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(50, birdY, 20, 0, Math.PI * 2);
    ctx.fill();
}

function drawPipes() {
    ctx.fillStyle = 'green';
    ctx.fillRect(pipeX, 0, pipeWidth, topPipeBottomY);
    ctx.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvas.height);
}

function updateGame() {
    if (!isGameRunning) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update bird position
    birdVelocity += gravity;
    birdY += birdVelocity;

    // Move pipe
    pipeX -= 2;
    if (pipeX < -pipeWidth) {
        pipeX = canvas.width;
        topPipeBottomY = Math.random() * (canvas.height - pipeGap);
    }

    // Draw elements
    drawBird();
    drawPipes();

    // Check for collisions
    if (birdY > canvas.height || birdY < 0 ||
        (pipeX < 70 && pipeX + pipeWidth > 30 &&
        (birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap))) {
        // Game over
        stopGame();
        alert('Game Over! Click Start Game to play again.');
    }

    gameLoop = requestAnimationFrame(updateGame);
}

function resetGame() {
    birdY = canvas.height / 2;
    birdVelocity = 0;
    pipeX = canvas.width;
}

function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        resetGame();
        startButton.style.display = 'none';
        canvas.focus();
        updateGame();
    }
}

function stopGame() {
    isGameRunning = false;
    cancelAnimationFrame(gameLoop);
    startButton.style.display = 'block';
}

startButton.addEventListener('click', startGame);

canvas.addEventListener('click', () => {
    if (isGameRunning) {
        birdVelocity = jumpStrength;
    }
});

// Initial draw
drawBird();
drawPipes();

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Call this function when your dark mode toggle is clicked