import { makeAutoObservable } from "mobx";
import { clearPersistedStore, stopPersisting, startPersisting, isPersisting } from "mobx-persist-store";

class ClothingStore {
	constructor() {
		makeAutoObservable(this);
	}

	startTime = new Date();

	restartTimer = () => {
		this.startTime = new Date();
	};

	getTimeSinceStart = () => {
		return new Date().getTime() - this.startTime.getTime();
	};

	async clearStore() {
		await clearPersistedStore(this);
	}

	stopPersisting() {
		stopPersisting(this);
	}

	startPersisting() {
		startPersisting(this);
	}

	get isPersisting() {
		return isPersisting(this);
	}
}

const clothingStore = new ClothingStore();
export default clothingStore;