export type ClothingType = "shirt" | "pants" | "shoes";
export interface ClothingItem {
	id: number;
	type: ClothingType;
	color: string;
	size: string | number;
	brand: string;
}

export type ClothingItems = Array<ClothingItem>;

export type SavedSet = {
	shirt: ClothingItem | null;
	pants: ClothingItem | null;
	shoes: ClothingItem | null;
};

export type CompletedSet = {
	time: number;
	shirt: ClothingItem | null;
	pants: ClothingItem | null;
	shoes: ClothingItem | null;
};
