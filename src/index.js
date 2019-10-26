import { identifyBoxByCoordinates } from './utilities';

import gameController from './gameController';
import canvasController from './canvasController';

// Initiliazing canvas and setting up the grid
canvasController.initCanvasSetup('game-canvas');

// Generation of game boxes and placing them in helper object inside gameController state for faster manipulation
canvasController.generateGameBoxes(gameController);

const onBoxSelectedHandler = (e) => {
	const { x, y } = e.absolutePointer;
	const boxIdentifier = identifyBoxByCoordinates(x, y);

	gameController.handleBoxClicked(boxIdentifier);
};

canvasController.canvas.on('mouse:down', onBoxSelectedHandler);
