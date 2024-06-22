import { makeAutoObservable } from "mobx";
import { clearPersistedStore, stopPersisting, startPersisting, isPersisting } from "mobx-persist-store";
import { SavedSet, ClothingItems, ClothingItem } from "../../models/Clothing";
import { SIZE_CONVERTION } from "../../util/Enums";
import sortBy from "lodash/sortBy";
import { PopupSettings } from "../../models/Popup";

class ClothingStore {
	constructor() {
		makeAutoObservable(this);
	}

	persist_data = ["clothingItems", "startTime", "currentSet", "savedSets", "currentSet", "firstItem"];

	clothingItems: ClothingItems = [];

	currentSet: SavedSet = { shirt: null, pants: null, shoes: null };

	startTime = new Date();

	savedSets: SavedSet[] = [];

	firstItem: ClothingItem | null = null;

	popupSettings: PopupSettings = { show: false, text: "", onAccept: () => {} };

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

	get getFirstItem() {
		return this.firstItem;
	}

	get getPopupSettings() {
		return this.popupSettings;
	}

	showPopup = (settings: PopupSettings) => {
		this.popupSettings = { ...settings, show: true };
	};

	hidePopup = () => {
		this.popupSettings = { show: false, text: "", onAccept: () => {} };
	};

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
		console.log("???", type, item);
		this.currentSet[type] = item;
	};

	setFirstItem = (item: ClothingItem) => {
		this.firstItem = item;
	};

	sortByRecommended = (items: ClothingItems) => {
		let sortedItems = items;
		if (this.getFirstItem) {
			const sizeOfFirst = this.convertSize(this.getFirstItem.size);
			const colorOfFirst = this.getFirstItem.color;
			const sortByColor = (a: ClothingItem, b: ClothingItem) => (+(a?.color === colorOfFirst) - +(b?.color === colorOfFirst) ? 1 : -1);
			const distance = (a: number, t: number) => Math.abs(t - a);
			const sortBySize = (a: ClothingItem, b: ClothingItem) =>
				distance(this.convertSize(a?.size), sizeOfFirst) - distance(this.convertSize(b?.size), sizeOfFirst);

			sortedItems = sortBy(sortedItems, [sortByColor, sortBySize]) as ClothingItems;
		}
		return sortedItems;
	};

	convertSize = (size: string | number) => {
		if (/^-?\d+$/.test("" + size)) return +size;
		const conversionedSize = Object.entries(SIZE_CONVERTION).find((conversion) => conversion[0] === size);

		return conversionedSize ? conversionedSize[1] : +size;
	};

	removeCloth = (idToRemove: number) => {
		this.clothingItems = this.clothingItems.filter(({ id }) => id !== idToRemove);
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
