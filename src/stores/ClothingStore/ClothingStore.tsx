import { makeAutoObservable } from "mobx";
import { clearPersistedStore, stopPersisting, startPersisting, isPersisting } from "mobx-persist-store";
import { SavedSet, ClothingItems } from "../../models/clothing";

class ClothingStore {
	constructor() {
		makeAutoObservable(this);
	}

	persist_data = ["clothingItems", "startTime"];

	clothingItems: ClothingItems = [];

	startTime = new Date();

	savedSets: SavedSet[] = [];

	restartTimer = () => {
		this.startTime = new Date();
	};

	getTimeSinceStart = () => {
		return new Date().getTime() - this.startTime.getTime();
	};

	get getClothingItems() {
		return this.clothingItems;
	}

	get getSavedSets() {
		return this.savedSets;
	}

	setClothingItems = (items: ClothingItems) => {
		this.clothingItems = items;
	};

	addSavedSet = (set: SavedSet) => {
		this.savedSets.push(set);
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
