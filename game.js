const playerCar = document.getElementById("playerCar");
const enemyCar = document.getElementById("enemyCar");
const scoreDisplay = document.getElementById("scoreDisplay");

let enemyY = -100;
let score = 0;
let speed = 4; // Initial enemy speed

document.addEventListener("keydown", (e) => {
  let left = parseInt(window.getComputedStyle(playerCar).getPropertyValue("left"));
  if (e.key === "ArrowLeft" && left > 0) playerCar.style.left = `${left - 25}px`;
  if (e.key === "ArrowRight" && left < 250) playerCar.style.left = `${left + 25}px`;
});

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function moveEnemy() {
  enemyY += speed;
  enemyCar.style.top = `${enemyY}px`;

  const playerRect = playerCar.getBoundingClientRect();
  const enemyRect = enemyCar.getBoundingClientRect();

  const collision =
    enemyRect.top < playerRect.bottom &&
    enemyRect.bottom > playerRect.top &&
    enemyRect.left < playerRect.right &&
    enemyRect.right > playerRect.left;

  if (collision) {
    alert(`💥 Crash! Final Score: ${score}`);
    score = 0;
    speed = 4;
    enemyY = -100;
    updateScore();
  }

  if (enemyY > 500) {
    score++;
    speed *= 1.05; // Increase speed by 5%
    enemyY = -100;
    enemyCar.style.left = `${Math.floor(Math.random() * 251)}px`;
    updateScore();
  }

  requestAnimationFrame(moveEnemy);
}

moveEnemy();