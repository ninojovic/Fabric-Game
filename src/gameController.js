import { getSelectableBoxesIdentifiers } from './utilities';

class GameController {
	constructor() {
		this.gameStarted = false;
		this.boxesData = {};
		this.selectableBoxesGroup = [];
		this.currentlySelectedBox = null;
		this.points = 0;
	}

	handleBoxClicked(clickedBoxIdentifier) {
		const boxSelected = this.setCurrentlySelectedBox(clickedBoxIdentifier);
		if (boxSelected) {
			this.setSelectableBoxesGroup(clickedBoxIdentifier);
			this.points++;
			this.checkForGameOverCondition();
		}
	}

	clearSelectableBoxesGroup() {
		this.selectableBoxesGroup.forEach((box) => {
			if (box.status === 'SELECTABLE') {
				box.changeStatus('UNSELECTED');
			}
		});
		this.selectableBoxesGroup = [];
	}

	setCurrentlySelectedBox(boxIdentifier) {
		const clickedBox = this.boxesData[boxIdentifier];

		if (!this.gameStarted || clickedBox.status === 'SELECTABLE') {
		    // If there was already selected box, we are setting it's status as already selected
		    if (this.currentlySelectedBox) {
				this.currentlySelectedBox.changeStatus('ALREADY_SELECTED');
			}

			clickedBox.changeStatus('CURRENTLY_SELECTED');
			this.currentlySelectedBox = clickedBox;
			this.gameStarted = true;
			return true;
		}

		return false;
	}

	setSelectableBoxesGroup(clickedBoxIdentifier) {
		this.clearSelectableBoxesGroup();
		const selectableBoxesIdentifiers = getSelectableBoxesIdentifiers(clickedBoxIdentifier);

		selectableBoxesIdentifiers.forEach((identifier) => {
			const selectableBox = this.boxesData[identifier];
			if (selectableBox.status === 'UNSELECTED') {
				selectableBox.changeStatus('SELECTABLE');
				this.selectableBoxesGroup.push(selectableBox);
			}
		});
	}

	checkForGameOverCondition() {
		if (!this.selectableBoxesGroup.length && this.gameStarted) {
			console.log('GAME-OVER');
			console.log('POINTS:', this.points);
		}
	}

	resetGameController() {
	    this.gameStarted = false;
		this.boxesData = {};
		this.selectableBoxesGroup = [];
		this.currentlySelectedBox = null;
		this.points = 0;
	}
}

// Exporting just one instance of controller since we will never have multiple games running
// In case where we would have two players, board to board, we would have export GameController constructor
const gameController = new GameController();
export default gameController;
