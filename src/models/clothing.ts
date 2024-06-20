export interface ClothingItem {
	id: number;
	type: string;
	color: string;
	size: string;
	brand: string;
}

export type ClothingItems = Array<ClothingItem>;

export type SavedSet = {
	shirt: ClothingItem;
	pants: ClothingItem;
	shoes: ClothingItem;
};
