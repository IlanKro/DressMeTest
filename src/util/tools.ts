import { makePersistable } from "mobx-persist-store";
import { ClothingStore } from "../stores";

export const persistStore = (target: typeof ClothingStore, properties: any, persistName: string) => {
	target.stopPersisting();
	return makePersistable(
		target,
		{
			name: persistName,
			properties,
			storage: localStorage,
		},
		{
			delay: 200,
			fireImmediately: true,
		}
	);
};
