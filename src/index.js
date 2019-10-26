import { startGame, resetGame, undoMove } from './gameInterface';

document.querySelector('.button-undo').addEventListener('click', undoMove);
document.querySelector('.button-reset').addEventListener('click', resetGame);
document.addEventListener('gameOver', e => e.detail.playAgain && resetGame());

startGame();
