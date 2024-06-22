import { makeAutoObservable } from "mobx";
import { clearPersistedStore, stopPersisting, startPersisting, isPersisting } from "mobx-persist-store";
import { SavedSet, ClothingItems, ClothingItem } from "../../models/Clothing";

class ClothingStore {
	constructor() {
		makeAutoObservable(this);
	}

	persist_data = ["clothingItems", "startTime", "currentSet", "savedSets"];

	clothingItems: ClothingItems = [];

	currentSet: SavedSet = { shirt: null, pants: null, shoes: null };

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

	get getCurrentSet() {
		return this.currentSet;
	}

	setClothingItems = (items: ClothingItems) => {
		this.clothingItems = items;
	};

	addSavedSet = (set: SavedSet) => {
		this.savedSets.push(set);
	};

	setCurrentSetItem = (type: keyof SavedSet, item: ClothingItem) => {
		this.currentSet[type] = item;
	};

	resetCurrentSet = () => {
		this.currentSet = { shirt: null, pants: null, shoes: null };
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
