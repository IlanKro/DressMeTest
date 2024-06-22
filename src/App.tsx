import React, { useEffect } from "react";
import "./App.scss";
import AppRouter from "./AppRouter";
import { ClothingStore } from "./stores";
import { persistStore } from "./util/Tools";

const App = () => {
	useEffect(() => {
		const hydrate = async () => {
			await persistStore(ClothingStore, ClothingStore.persist_data, "ClothingStore");
		};
		hydrate();
	}, [ClothingStore]);
	return (
		<>
			<AppRouter />
		</>
	);
};

export default App;
