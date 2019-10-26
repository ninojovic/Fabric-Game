import gameController from './gameController';
import canvasController from './canvasController';

export const startGame = () => {
	// Draw canvas and draw grid
	canvasController.initBoardView('game-canvas');

	// Generation of game boxes and sending them in helper object inside gameController state for faster manipulation
	// Setting up click event
	canvasController.initBoardLogic(gameController);
};

export const stopGame = () => {
	// Clears a canvas element and removes all event listeners
	canvasController.resetCanvasController();

	// Resets game status
	gameController.resetGameController();
};

export const resetGame = () => {
	stopGame();
	startGame();
};
