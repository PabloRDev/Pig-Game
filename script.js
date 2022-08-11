const diceEl = document.querySelector(".dice");
const score = [
  document.querySelector(`#score--0`),
  document.querySelector(`#score--1`),
];
score.forEach((x) => {
  x.textContent = 0;
});
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newGameBtn = document.querySelector(".btn--new");
let gameOver = false;

let activePlayer = 0;
let activePlayerEl = document.querySelector(`.player--${activePlayer}`);
let currentScore = document.querySelector(`#current--${activePlayer}`);
let totalScore = document.querySelector(`#score--${activePlayer}`);

const switchPlayers = () => {
  activePlayerEl.classList.remove("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayerEl = document.querySelector(`.player--${activePlayer}`);
  activePlayerEl.classList.add("player--active");

  currentScore.textContent = 0;
  currentScore = document.querySelector(`#current--${activePlayer}`);
  totalScore = document.querySelector(`#score--${activePlayer}`);
};

const winGame = () => {
  activePlayerEl.classList.add("player--winner");
  gameOver = true;
};

const resetGame = () => {
  if (gameOver) {
    score.forEach((x) => {
      x.textContent = 0;
    });
    activePlayerEl.classList.remove("player--active");
    activePlayerEl.classList.remove("player--winner");

    activePlayer = 0;
    activePlayerEl = document.querySelector(`.player--${activePlayer}`);
    activePlayerEl.classList.add("player--active");
    currentScore = document.querySelector(`#current--${activePlayer}`);
    totalScore = document.querySelector(`#score--${activePlayer}`);

    gameOver = false;
  }
};

const generateRollDice = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

const rollDice = () => {
  const rollDiceNumber = generateRollDice();

  if (!gameOver && totalScore.textContent <= 100) {
    diceEl.src = `dice-${rollDiceNumber}.png`;
    currentScore.textContent =
      rollDiceNumber + parseInt(currentScore.textContent);
  }

  if (rollDiceNumber === 1 && !gameOver) {
    switchPlayers();
  }
};

const holdScore = () => {
  totalScore.textContent =
    parseInt(totalScore.textContent) + parseInt(currentScore.textContent);
  currentScore.textContent = 0;

  if (totalScore.textContent > 100) {
    winGame();
  } else {
    switchPlayers();
  }
};

rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdScore);
newGameBtn.addEventListener("click", resetGame);
