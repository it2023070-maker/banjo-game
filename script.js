const gameArea = document.getElementById("gameArea");
const leaderboard = document.getElementById("leaderboard");
let players = [];
let score = 0;
let startTime = null;

function startGame(playerName) {
  score = 0;
  startTime = Date.now();
  spawnDot(playerName);
}

function spawnDot(playerName) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.style.top = Math.random() * (gameArea.clientHeight - 20) + "px";
  dot.style.left = Math.random() * (gameArea.clientWidth - 20) + "px";

  dot.addEventListener("click", () => {
    score++;
    dot.remove();
    if (score >= 5) endGame(playerName);
    else spawnDot(playerName);
  });

  gameArea.appendChild(dot);
}

function endGame(playerName) {
  const timeTaken = Math.floor((Date.now() - startTime) / 1000);
  players.push({ name: playerName, score, time: timeTaken });
  updateLeaderboard();
}

function updateLeaderboard() {
  leaderboard.innerHTML = "";
  players.sort((a, b) => b.score - a.score || a.time - b.time);

  players.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${p.name} → Score: ${p.score} | Time: ${p.time}s`;
    if (i === 0) li.classList.add("top-scorer");
    leaderboard.appendChild(li);
  });
}

// Start demo game with a default player
startGame("Player1");
