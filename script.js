const holes = document.querySelectorAll('.hole');
const startButton = document.getElementById('startButton');
const scoreBoard = document.createElement('div');
scoreBoard.classList.add('score');
document.body.appendChild(scoreBoard);
let timeUp = false;
let score = 0;
let gameStarted = false;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole() {
  const idx = Math.floor(Math.random() * holes.length);
  return holes[idx];
}

function peep() {
  if (!timeUp && gameStarted) {
    const time = randomTime(200, 1000);
    const hole = randomHole();
    hole.classList.add('up');

    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }
}

function startGame() {
  score = 0;
  scoreBoard.textContent = 'Score: 0';
  timeUp = false;
  gameStarted = true;
  peep();
  setTimeout(() => {
    timeUp = true;
    gameStarted = false;
    scoreBoard.textContent = `Game Over! Your final score is: ${score}`;
  }, 10000); // 10 seconds
}

function bonk(e) {
  if (!e.isTrusted) return; 
  if (e.target.classList.contains('up')) {
    score++;
    e.target.classList.remove('up');
    scoreBoard.textContent = `Score: ${score}`;
  }
}

holes.forEach(hole => hole.addEventListener('click', bonk));
startButton.addEventListener('click', startGame);
