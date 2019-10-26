import { fabric } from 'fabric';

import params from './params';
import Box from './Box';

class CanvasController {
	constructor({ gridHeight, gridWidth, gridSize }) {
		this.canvas = null;
		this.gridHeight = gridHeight;
		this.gridWidth = gridWidth;
		this.gridSize = gridSize;
	}

	initCanvasSetup(canvasDOMSelector) {
		this.drawCanvas(canvasDOMSelector);
		this.drawGridLines();
	}

	drawCanvas(canvasDOMSelector) {
		this.canvas = new fabric.Canvas(canvasDOMSelector, {
			height:	this.gridHeight,
			width: this.gridWidth,
			selection: false,
		});
	}

	drawGridLines() {
    	const lineOptions = {
    		stroke: '#EEEEEE',
    		strokeWidth: 1,
    		selectable: false,
    		hoverCursor: 'default',
    	};

    	for (let i = 1; i < (this.canvas.width / this.gridSize); i++) {
    		this.canvas.add(new fabric.Line([this.gridSize * i, 0, this.gridSize * i, this.canvas.width], lineOptions));
    		this.canvas.add(new fabric.Line([0, this.gridSize * i, this.canvas.height, this.gridSize * i], lineOptions));
    	}
	}

	generateGameBoxes(gameController) {
    	for (let i = 0; i < (this.canvas.width / this.gridSize); i++) {
        	for (let j = 0; j < (this.canvas.height / this.gridSize); j++) {
    			const rect = new Box({
    				width: this.gridSize,
    				height: this.gridSize,
    				fill: '#FFFFFF',
    				left: i * this.gridSize,
    				top: j * this.gridSize,
    				selectable: false,
    				hoverCursor: 'default',
    			});
    			// Using boxIdentifier as pointer to the box inside gameController helper object
    			// Identifier (5-5) means that box position is inside column 5, row 5
    			const boxIdentifier = `${rect.left / this.gridSize}-${rect.top / this.gridSize}`;
    			gameController.boxesData[boxIdentifier] = rect;

    			this.canvas.add(rect);
    		}
    	}
	}
}

const { BOX_SIZE, BOARD_WIDTH, BOARD_HEIGHT } = params;

const canvasController = new CanvasController({
	gridWidth: BOARD_WIDTH,
	gridHeight: BOARD_HEIGHT,
	gridSize: BOX_SIZE,
});
export default canvasController;
