export type ClothingType = "shirt" | "pants" | "shoes";
export interface ClothingItem {
	id: number;
	type: ClothingType;
	color: string;
	size: string;
	brand: string;
}

export type ClothingItems = Array<ClothingItem>;

export type SavedSet = {
	shirt: ClothingItem | null;
	pants: ClothingItem | null;
	shoes: ClothingItem | null;
};
