import { fabric } from 'fabric';
import params from './params';

const { BOARD_WIDTH, BOARD_HEIGHT, BOX_SIZE } = params;

const drawCanvas = canvasDOMSelector => new fabric.Canvas(canvasDOMSelector, {
	height:	BOARD_HEIGHT,
	width: BOARD_WIDTH,
	selection: false,
});

const drawGridLines = (canvas) => {
	const lineOptions = {
		stroke: '#EEEEEE',
		strokeWidth: 1,
		selectable: false,
		hoverCursor: 'default',
	};

	for (let i = 1; i < (canvas.width / BOX_SIZE); i++) {
		canvas.add(new fabric.Line([BOX_SIZE * i, 0, BOX_SIZE * i, canvas.width], lineOptions));
		canvas.add(new fabric.Line([0, BOX_SIZE * i, canvas.height, BOX_SIZE * i], lineOptions));
	}
};

const canvas = drawCanvas('game-canvas');
drawGridLines(canvas);
