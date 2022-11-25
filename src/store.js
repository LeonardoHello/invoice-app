import { makeAutoObservable } from "mobx";

class Modal {
	display = false;

	constructor() {
		makeAutoObservable(this);
	}

	cancle() {
		this.dispaly = false;
	}

	appear() {
		this.dispaly = true;
	}
}
const modal = new Modal();

export default modal;
