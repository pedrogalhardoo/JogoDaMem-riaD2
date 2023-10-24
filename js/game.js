const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'arc_hunter',
  'arc_titan',
    'arc_warlock',
    'solar_hunter',
    'solar_titan',
    'solar_warlock',
    'void_hunter',
    'void_titan',
    'void_warlock',
];

const restartGame = () => {
  firstCard = '';
  secondCard = '';
  score = 0;

  clearInterval(this.loop); // Pare o temporizador
  timer.innerHTML = '0';

  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.remove();
  });

  updateScore();
  gameStarted = false; // Reinicialize o estado do jogo
  setTimeout(() => {
    loadGame(); // Chame loadGame após um atraso de 2 segundos
  }, 2000);

  const endGameModal = document.getElementById('endGameModal');
  endGameModal.style.display = 'none'; // Oculta o modal de fim de jogo
};

const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', restartGame);

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';
let score = 0;
let gameStarted = false; // Variável para controlar se o jogo já começou

const updateScore = () => {
  const scoreElement = document.querySelector('.score');
  scoreElement.innerHTML = `Pontuação: ${score}`;
};

const revealCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.classList.remove('reveal-card');
  });
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character, index) => {
    const card = createCard(character);
    setTimeout(() => {
      card.classList.add('reveal-card');
    }, 200 * index);
    grid.appendChild(card);
  });

  setTimeout(() => {
    revealCards(); // Vire as cartas de volta após 2 segundos
  }, 800 * characters.length);
};

const startTimer = () => {
  if (!gameStarted) {
    gameStarted = true;
    this.loop = setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    }, 1000);
  }
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  updateScore();
  if (disabledCards.length === 18) {
    clearInterval(this.loop);
    const endGameMessage = document.getElementById('endGameMessage');
    const endGameModal = document.getElementById('endGameModal');
    endGameMessage.innerHTML = `Parabéns, ${spanPlayer.innerHTML}! Sua pontuação foi: ${score}`;
    endGameModal.style.display = 'block'; // Exibe o modal de fim de jogo
  }
};

const endGameClose = document.getElementById('endGameClose');
const endGameModal = document.getElementById('endGameModal');

endGameClose.addEventListener('click', () => {
  endGameModal.style.display = 'none';
});

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    // Pares corretos
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    score += 10;
    firstCard = '';
    secondCard = '';
    updateScore();
    checkEndGame();
  } else {
    // Tentativa sem fazer o par
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard.classList.remove('disabled-card');
      secondCard.classList.remove('disabled-card');
      score -= 5;
      updateScore();
      firstCard = '';
      secondCard = '';
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
    startTimer(); // Inicie o temporizador quando a primeira carta for clicada
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('imagens/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  loadGame();
};
