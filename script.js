// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Viewport Setup
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game States
const GAME_STATE = {
    INSTRUCTIONS: 'instructions',
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver',
    WIN: 'win'
};

// Game Configuration
const GAME_CONFIG = {
    lanes: 3,
    laneWidth: 0,
    playerSize: 0,
    initialSpeed: 2.5,
    maxSpeed: 8,
    speedIncrement: 0.0005,
    obstacleWidth: 0,
    obstacleHeight: 0,
    coinRadius: 0,
    jumpPower: 15,
    jumpGravity: 0.6,
    slideGravity: 0.8,
    slideSpeed: 15
};

// Initialize sizes after canvas is ready
function initializeGameConfig() {
    const minDimension = Math.min(canvas.width, canvas.height);
    GAME_CONFIG.laneWidth = canvas.width / GAME_CONFIG.lanes;
    GAME_CONFIG.playerSize = minDimension * 0.06;
    GAME_CONFIG.obstacleWidth = GAME_CONFIG.laneWidth * 0.8;
    GAME_CONFIG.obstacleHeight = minDimension * 0.12;
    GAME_CONFIG.coinRadius = minDimension * 0.03;
    
    // Update player dimensions
    player.width = GAME_CONFIG.playerSize;
    player.height = GAME_CONFIG.playerSize;
    
    // Update ground level after config is initialized
    setGroundLevel();
}
initializeGameConfig();
window.addEventListener('resize', initializeGameConfig);

// Game State
let gameState = {
    currentState: GAME_STATE.INSTRUCTIONS,
    score: 0,
    finalScore: 0,
    speed: GAME_CONFIG.initialSpeed,
    distance: 0,
    time: 0,
    paused: false,
    lives: 1,
    hasBooster: false,
    groundLevel: 0,  // Will be set based on canvas height
    catTouched: false
};

// Set ground level after canvas is ready
function setGroundLevel() {
    gameState.groundLevel = canvas.height * 0.80; // 80% down the screen (even lower)
}

// Player Object
const player = {
    lane: 1, // 0, 1, 2
    x: 0,
    y: 0,
    width: GAME_CONFIG.playerSize,
    height: GAME_CONFIG.playerSize,
    velocityY: 0,
    isJumping: false,
    isSliding: false,
    slidingTime: 0,
    color: '#00ff00'
};

// Obstacles Array
let obstacles = [];
let coins = [];
let lastObstacleTime = 0;
let lastCoinTime = 0;

// Input Handling
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const MIN_SWIPE_DISTANCE = 30;

document.addEventListener('touchstart', (e) => {
    if (gameState.currentState !== GAME_STATE.RUNNING) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, false);

document.addEventListener('touchend', (e) => {
    if (gameState.currentState !== GAME_STATE.RUNNING) return;
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
}, false);

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchStartY - touchEndY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Horizontal swipes (left/right)
    if (absDeltaX > absDeltaY && absDeltaX > MIN_SWIPE_DISTANCE) {
        if (deltaX > 0) {
            // Swipe right
            if (player.lane < GAME_CONFIG.lanes - 1) {
                player.lane++;
            }
        } else {
            // Swipe left
            if (player.lane > 0) {
                player.lane--;
            }
        }
    }
    // Vertical swipes
    else if (absDeltaY > absDeltaX && absDeltaY > MIN_SWIPE_DISTANCE) {
        if (deltaY > 0) {
            // Swipe up (jump)
            if (!player.isJumping && !player.isSliding) {
                player.isJumping = true;
                player.velocityY = -GAME_CONFIG.jumpPower;
            }
        } else {
            // Swipe down (slide)
            if (!player.isSliding && !player.isJumping) {
                player.isSliding = true;
                player.slidingTime = 0.5;
            }
        }
    }
}

// Keyboard Support (for testing)
document.addEventListener('keydown', (e) => {
    if (gameState.currentState !== GAME_STATE.RUNNING) return;
    
    if (e.key === 'ArrowLeft' && player.lane > 0) {
        player.lane--;
    } else if (e.key === 'ArrowRight' && player.lane < GAME_CONFIG.lanes - 1) {
        player.lane++;
    } else if (e.key === ' ') {
        if (!player.isJumping && !player.isSliding) {
            player.isJumping = true;
            player.velocityY = -GAME_CONFIG.jumpPower;
        }
    }
});

// UI Button Handlers
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('resumeBtn').addEventListener('click', togglePause);
document.getElementById('restartBtn').addEventListener('click', restartGame);
document.getElementById('winRestartBtn').addEventListener('click', restartGame);

// Cat interaction handler
const cat = document.getElementById('catImage');
if (cat) {
    cat.addEventListener('click', () => {
        gameState.catTouched = true;
        document.getElementById('catMessage').textContent = 'Meow, Sami7oda';
        cat.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cat.style.transform = 'scale(1)';
        }, 200);
    });
    cat.addEventListener('touchend', () => {
        gameState.catTouched = true;
        document.getElementById('catMessage').textContent = 'Meow, Sami7oda';
        cat.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cat.style.transform = 'scale(1)';
        }, 200);
    });
}

function startGame() {
    // Ask for easter egg code
    const code = prompt('Enter a number for a possible surprise! 🎁');
    if (code === '2013') {
        gameState.lives = 3;
        gameState.hasBooster = true;
        alert('🎉 EASTER EGG UNLOCKED! You have 3 lives and a booster!');
    } else {
        gameState.lives = 1;
        gameState.hasBooster = false;
    }
    
    document.getElementById('instructionsScreen').classList.add('hidden');
    gameState.currentState = GAME_STATE.RUNNING;
    gameState.score = 0;
    gameState.speed = GAME_CONFIG.initialSpeed;
    gameState.distance = 0;
    gameState.time = 0;
    player.lane = 1;
    player.y = gameState.groundLevel;
    player.velocityY = 0;
    obstacles = [];
    coins = [];
    lastObstacleTime = 0;
    lastCoinTime = 0;
}

function togglePause() {
    if (gameState.currentState === GAME_STATE.PAUSED) {
        gameState.currentState = GAME_STATE.RUNNING;
        document.getElementById('pauseScreen').classList.add('hidden');
    } else if (gameState.currentState === GAME_STATE.RUNNING) {
        gameState.currentState = GAME_STATE.PAUSED;
        document.getElementById('pauseScreen').classList.remove('hidden');
    }
}

function gameOver() {
    gameState.lives--;
    if (gameState.lives <= 0) {
        gameState.currentState = GAME_STATE.GAME_OVER;
        gameState.finalScore = gameState.score;
        document.getElementById('finalScore').textContent = gameState.finalScore;
        document.getElementById('gameOverScreen').classList.remove('hidden');
    } else {
        // Reset player position and continue
        player.y = gameState.groundLevel;
        player.velocityY = 0;
        player.isJumping = false;
        player.isSliding = false;
        player.lane = 1;
    }
}

function restartGame() {
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('winScreen').classList.add('hidden');
    document.getElementById('instructionsScreen').classList.remove('hidden');
    gameState.currentState = GAME_STATE.INSTRUCTIONS;
    gameState.score = 0;
    gameState.speed = GAME_CONFIG.initialSpeed;
    gameState.distance = 0;
    gameState.time = 0;
    gameState.lives = 1;
    gameState.hasBooster = false;
    gameState.catTouched = false;
    player.lane = 1;
    player.y = gameState.groundLevel;
    player.velocityY = 0;
    player.isJumping = false;
    player.isSliding = false;
    obstacles = [];
    coins = [];
    lastObstacleTime = 0;
    lastCoinTime = 0;
}

// Update Functions
function updatePlayer() {
    // Update player position based on lane
    player.x = player.lane * GAME_CONFIG.laneWidth + (GAME_CONFIG.laneWidth - player.width) / 2;

    // Handle jumping
    if (player.isJumping) {
        player.velocityY += GAME_CONFIG.jumpGravity;
        player.y += player.velocityY;

        if (player.y >= gameState.groundLevel) {
            player.y = gameState.groundLevel;
            player.isJumping = false;
            player.velocityY = 0;
        }
    } else {
        // Keep player at ground level when not jumping
        player.y = gameState.groundLevel;
    }

    // Handle sliding
    if (player.isSliding) {
        player.slidingTime -= 1 / 60;
        if (player.slidingTime <= 0) {
            player.isSliding = false;
        }
    }
}

function updateObstacles() {
    // Spawn new obstacles
    const currentTime = gameState.time;
    const spawnInterval = Math.max(1, 2 - gameState.time * 0.02); // Speeds up over time

    if (currentTime - lastObstacleTime > spawnInterval) {
        const lane = Math.floor(Math.random() * GAME_CONFIG.lanes);
        obstacles.push({
            lane: lane,
            x: lane * GAME_CONFIG.laneWidth + (GAME_CONFIG.laneWidth - GAME_CONFIG.obstacleWidth) / 2,
            y: -GAME_CONFIG.obstacleHeight,
            width: GAME_CONFIG.obstacleWidth,
            height: GAME_CONFIG.obstacleHeight
        });
        lastObstacleTime = currentTime;
    }

    // Update obstacle positions
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += gameState.speed;

        // Remove obstacles that are off screen
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            gameState.score += 10; // Point for dodging obstacle
        } else {
            // Check collision
            if (checkCollision(player, obstacles[i])) {
                gameOver();
            }
        }
    }
}

function updateCoins() {
    // Spawn new coins
    const currentTime = gameState.time;
    const spawnInterval = 1.5;

    if (currentTime - lastCoinTime > spawnInterval) {
        const lane = Math.floor(Math.random() * GAME_CONFIG.lanes);
        coins.push({
            lane: lane,
            x: lane * GAME_CONFIG.laneWidth + GAME_CONFIG.laneWidth / 2,
            y: -GAME_CONFIG.coinRadius * 2,
            radius: GAME_CONFIG.coinRadius,
            rotation: 0
        });
        lastCoinTime = currentTime;
    }

    // Update coin positions
    for (let i = coins.length - 1; i >= 0; i--) {
        coins[i].y += gameState.speed;
        coins[i].rotation += 0.1;

        // Check collection
        if (checkCoinCollision(player, coins[i])) {
            coins.splice(i, 1);
            gameState.score += 50;
        } else if (coins[i].y > canvas.height) {
            coins.splice(i, 1);
        }
    }
}

function checkCollision(rect1, rect2) {
    // If player is sliding, reduce collision height
    const playerHeight = player.isSliding ? rect1.height * 0.5 : rect1.height;
    const playerY = player.isSliding ? rect1.y + rect1.height * 0.5 : rect1.y;

    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        playerY < rect2.y + rect2.height &&
        playerY + playerHeight > rect2.y;
}

function checkCoinCollision(player, coin) {
    const dx = (player.x + player.width / 2) - coin.x;
    const dy = (player.y + player.height / 2) - coin.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < player.width + coin.radius;
}

function updateGameState() {
    if (gameState.currentState !== GAME_STATE.RUNNING) return;

    gameState.distance += gameState.speed;
    gameState.time += 1 / 60; // Assuming 60 FPS

    // Gradually increase speed
    if (gameState.speed < GAME_CONFIG.maxSpeed) {
        gameState.speed += GAME_CONFIG.speedIncrement;
    }

    // Score increases with time
    gameState.score = Math.floor(gameState.score + 0.1);

    // Check for win condition
    if (gameState.score >= 2000) {
        gameState.finalScore = gameState.score;
        gameState.currentState = GAME_STATE.WIN;
        gameState.catTouched = false;
        document.getElementById('winScreen').classList.remove('hidden');
    }

    updatePlayer();
    updateObstacles();
    updateCoins();
}

// Render Functions
function drawBackground() {
    // Dark gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f1621');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw lane lines (tunnel effect)
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.lineWidth = 2;

    // Animated lane dividers
    const offset = (gameState.distance * 0.5) % 40;
    for (let i = -40; i < canvas.height + 40; i += 40) {
        ctx.beginPath();
        ctx.moveTo(GAME_CONFIG.laneWidth, i - offset);
        ctx.lineTo(GAME_CONFIG.laneWidth, i - offset + 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(GAME_CONFIG.laneWidth * 2, i - offset);
        ctx.lineTo(GAME_CONFIG.laneWidth * 2, i - offset + 20);
        ctx.stroke();
    }

    // Tunnel perspective
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
}

function drawPlayer() {
    // Player body
    ctx.fillStyle = player.color;
    ctx.shadowColor = 'rgba(0, 255, 0, 0.8)';
    ctx.shadowBlur = 10;

    if (player.isSliding) {
        // Sliding animation
        ctx.fillRect(player.x, player.y + player.height * 0.5, player.width, player.height * 0.5);
    } else {
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    // Player eyes/details
    ctx.fillStyle = '#000';
    if (!player.isSliding) {
        ctx.fillRect(player.x + player.width * 0.2, player.y + player.height * 0.2, player.width * 0.15, player.width * 0.15);
        ctx.fillRect(player.x + player.width * 0.65, player.y + player.height * 0.2, player.width * 0.15, player.width * 0.15);
    }

    ctx.shadowColor = 'transparent';
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        // Obstacle body (red barrier)
        ctx.fillStyle = '#ff0055';
        ctx.shadowColor = 'rgba(255, 0, 85, 0.6)';
        ctx.shadowBlur = 10;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Obstacle pattern
        ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
        for (let i = 0; i < 3; i++) {
            ctx.fillRect(
                obstacle.x + (obstacle.width / 3) * i,
                obstacle.y,
                obstacle.width / 6,
                obstacle.height
            );
        }

        ctx.shadowColor = 'transparent';
    });
}

function drawCoins() {
    coins.forEach(coin => {
        ctx.save();
        ctx.translate(coin.x, coin.y);
        ctx.rotate(coin.rotation);

        // Coin glow
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(0, 0, coin.radius + 5, 0, Math.PI * 2);
        ctx.fill();

        // Coin body
        ctx.fillStyle = '#ffd700';
        ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(0, 0, coin.radius, 0, Math.PI * 2);
        ctx.fill();

        // Coin shine
        ctx.fillStyle = 'rgba(255, 255, 200, 0.6)';
        ctx.beginPath();
        ctx.arc(-coin.radius * 0.3, -coin.radius * 0.3, coin.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        ctx.shadowColor = 'transparent';
    });
}

function drawUI() {
    // Draw lives and booster status
    if (gameState.currentState === GAME_STATE.RUNNING) {
        // Lives display
        ctx.fillStyle = '#ff6b6b';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`Lives: ${gameState.lives}`, canvas.width - 20, 50);
        
        // Booster indicator
        if (gameState.hasBooster) {
            ctx.fillStyle = '#ffd700';
            ctx.fillText('⭐ BOOSTER ACTIVE', canvas.width - 20, 80);
        }
    }
}

function drawGameScene() {
    drawBackground();
    drawCoins();
    drawObstacles();
    drawPlayer();
    drawUI();
}

// Game Loop
let lastTime = 0;
function gameLoop(currentTime) {
    // Calculate delta time
    if (lastTime === 0) lastTime = currentTime;
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // Update
    updateGameState();

    // Render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGameScene();

    // Update HUD
    if (gameState.currentState === GAME_STATE.RUNNING) {
        document.getElementById('score').textContent = `Score: ${Math.floor(gameState.score)}`;
    } else if (gameState.currentState === GAME_STATE.WIN) {
        document.getElementById('winScore').textContent = Math.floor(gameState.finalScore);
    }

    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Prevent default touch behaviors
document.addEventListener('touchmove', (e) => {
    if (gameState.currentState === GAME_STATE.RUNNING) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('wheel', (e) => {
    e.preventDefault();
}, { passive: false });

// Prevent zoom on double tap
document.addEventListener('dblclick', (e) => {
    e.preventDefault();
});

// Prevent context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Initial setup message in console
console.log('🎮 Trainway - Endless Runner Game Loaded!');
console.log('📱 Use touch swipes or arrow keys to play');
