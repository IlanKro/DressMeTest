import { makeAutoObservable } from "mobx";
import { clearPersistedStore, stopPersisting, startPersisting, isPersisting } from "mobx-persist-store";
import { SavedSet, ClothingItems, ClothingItem } from "../../models/Clothing";
import { SIZE_CONVERTION } from "../../util/Enums";

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
		this.clothingItems = this.removeSavedItems(items);
	};

	removeSavedItems = (clothingItems: ClothingItems) => {
		return clothingItems.filter(
			({ id }) => !this.savedSets.some((savedSet) => Object.values(savedSet).some((savedItem) => savedItem?.id === id))
		);
	};

	addSavedSet = (set: SavedSet) => {
		this.savedSets.push(set);
	};

	setCurrentSetItem = (type: keyof SavedSet, item: ClothingItem) => {
		this.currentSet[type] = item;
	};

	sortByRecommended = (items: ClothingItems) => {
		return items;
	};

	convertSize = (size: string | number) => {
		if (/^-?\d+$/.test("" + size)) return size;
		const conversionedSize = Object.entries(SIZE_CONVERTION).find((conversion) => conversion[0] === size);

		return conversionedSize ? conversionedSize[1] : size;
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
