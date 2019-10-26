import params from './params';

const { BOARD_WIDTH, BOARD_HEIGHT, BOX_SIZE } = params;

// Helper function which identifies the box by x and y canvas coordinates;
export const identifyBoxByCoordinates = (x, y) => {
	const col = parseInt(x / BOX_SIZE);
	const row = parseInt(y / BOX_SIZE);
	return `${col}-${row}`;
};

// Returning an array of all selectable boxes identifiers around center (selected) box
export const getSelectableBoxesIdentifiers = (centerBoxIdentifier) => {
	const centerBoxMapping = centerBoxIdentifier.split('-').map(coord => parseInt(coord));
	const selectableBoxesIdentifiers = [];
	const selectableBoxesTransform = [
		[-2, -2], [2, 2], [2, -2], [-2, 2], // corner boxes
		[-3, 0], [0, -3], [3, 0], [0, 3], // side boxes
	];

	const boundryX = BOARD_WIDTH / BOX_SIZE;
	const boundryY = BOARD_HEIGHT / BOX_SIZE;

	selectableBoxesTransform.forEach((boxTransform) => {
		const boxMapping = [boxTransform[0] + centerBoxMapping[0], boxTransform[1] + centerBoxMapping[1]];
		if ((boxMapping[0] >= 0 && boxMapping[0] < boundryX) && (boxMapping[1] >= 0 && boxMapping[1] < boundryY)) {
			selectableBoxesIdentifiers.push(boxMapping.join('-'));
		}
	});

	return selectableBoxesIdentifiers;
};
