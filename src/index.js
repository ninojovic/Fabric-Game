import { startGame, resetGame } from './gameInterface';

document.querySelector('.button-reset').addEventListener('click', resetGame);
document.addEventListener('gameOver', e => e.detail.playAgain && resetGame());

startGame();
