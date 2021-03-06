//<--- Get Dom Elements --->//
// Const Definations
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const playBtn = document.getElementById('play-btn');
const welCome = document.getElementById('welCome');
const playAgain = document.getElementById('playAgain');
const againBtn = document.getElementById('again-btn');
const ctx = canvas.getContext('2d');
// initial Score
let score = 0;

//<---Basic Structure of Canvas--->//
// Rows and colums for bricks
const brickRowCount = 9;
const brickColumnCount = 5;
// Create ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 1.05,
  size: 10,
  speed: 4,
  dx: 2,
  dy: -2,
  visible: true
};
// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
  ctx.fill();
  ctx.closePath();
}
// Create paddle
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 100,
  h: 10,
  speed: 8,
  dx: 0,
  visible: true
};
// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
  ctx.fill();
  ctx.closePath();
}
// Create brick
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
};
// Create bricks layout
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}
// Draw bricks on canvas
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}
// Draw score on canvas
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//<---Game Paly--->//
// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;
  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
    }
}
// Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  // Wall collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  // Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }
  // Brick collision
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
  // Hit bottom wall - Lose
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}
// Increase score and check when game is over
function increaseScore() {
  score++;
  if (score % (brickRowCount * brickColumnCount) === 0) {
      canvas.classList.remove('showC')
      playAgain.classList.remove('playAgain')
  }
}
// Make all bricks appear
function showAllBricks() {
  bricks.forEach(column => {
    column.forEach(brick => (brick.visible = true));
  });
}
// Draw everything
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}
// Update canvas drawing and animation
function update() {
  movePaddle();
  moveBall();
  // Draw everything
  draw();
  requestAnimationFrame(update);
}

//<---Play Game--->//
// Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}
// Keyup event
function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}
// Keyboard event listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
// //delay to reset the game
const delay = 50; 

//<---Buttons Functionality--->//
function startPlay() {
  welCome.classList.add('removeWP')
  canvas.classList.add('showC')
  update();
}
function pAgain() {
  playAgain.classList.add('playAgain')
  canvas.classList.add('showC')
  showAllBricks();
  score = 0;
  paddle.x = canvas.width / 2 - 40;
  paddle.y = canvas.height - 20;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.visible = true;
  paddle.visible = true;
}
// Event Listeners
playBtn.addEventListener('click',  startPlay )
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
againBtn.addEventListener('click', pAgain );
