import { fabric } from 'fabric';
import { loadPawImg } from './utilities';

export default class Box extends fabric.Rect {
	constructor(config) {
		super(config);
		this.status = 'UNSELECTED';
		this.pawImg = null;

		loadPawImg().then((img) => {
			this.pawImg = img;
		});
	}

	changeStatus(status) {
		const possibleStatuses = ['UNSELECTED', 'SELECTABLE', 'ALREADY_SELECTED', 'CURRENTLY_SELECTED'];
		if (possibleStatuses.indexOf(status) === -1) {
			throw new Error('WRONG STATUS');
		}
		this.status = status;
		this.alignColorWithStatus();
	}

	alignColorWithStatus() {
		switch (this.status) {
		case 'SELECTABLE':
			this.fill = '#c3baff';
			break;
		case 'CURRENTLY_SELECTED':
			this.fill = this.pawImg || '#908cff';
			break;
		case 'ALREADY_SELECTED':
			this.fill = '#908cff';
			break;
		default:
			this.fill = '#FFFFFF';
		}

		this.dirty = true;
	}
}
