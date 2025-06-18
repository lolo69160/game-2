const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreSpan = document.getElementById('score');

let score = 0;
let isGameOver = false;

// Déplacement (saut)
document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') jump();
});

function jump() {
  if (player.classList.contains('jump')) return;

  player.classList.add('jump');
  setTimeout(() => {
    player.classList.remove('jump');
  }, 500);
}

// Animation saut via CSS
const style = document.createElement('style');
style.textContent = `
  .jump {
    animation: jump 0.5s;
  }
  @keyframes jump {
    0%   { bottom: 0; }
    50%  { bottom: 80px; }
    100% { bottom: 0; }
  }
`;
document.head.appendChild(style);

// Bouger l'obstacle
function moveObstacle() {
  let obstacleLeft = 600;
  const interval = setInterval(() => {
    if (isGameOver) return clearInterval(interval);

    obstacleLeft -= 5;
    obstacle.style.right = (600 - obstacleLeft) + 'px';

    // Collision
    const playerBottom = parseInt(window.getComputedStyle(player).bottom);
    if (obstacleLeft < 80 && obstacleLeft > 50 && playerBottom < 30) {
      alert('Game Over ! Score : ' + score);
      isGameOver = true;
      location.reload();
    }

    // Réinitialiser obstacle
    if (obstacleLeft < -30) {
      obstacleLeft = 600;
      score++;
      scoreSpan.textContent = score;
    }
  }, 30);
}

moveObstacle();
