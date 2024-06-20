import axios from "axios";
import React, { useEffect } from "react";
import { hydrate } from "react-dom";
import "./App.scss";
import AppRouter from "./AppRouter";
import { ClothingStore } from "./stores";
import { API_URL } from "./util/Enums";
import { persistStore } from "./util/tools";

const App = () => {
	useEffect(() => {
		const fetch = async () => {
			try {
				const instance = axios.create({
					baseURL: API_URL,
					timeout: 5000,
				});
				const response = await instance.get("");
				ClothingStore.setClothingItems(response.data);
			} catch (e: any) {
				console.log("failed to fetch data");
				//add popup
				return ClothingStore.setClothingItems([]);
			}
		};
		const hydrate = async () => {
			await persistStore(ClothingStore, ClothingStore.persist_data, "ClothingStore");
		};
		fetch();
		hydrate();

		console.log("ClothingStore", ClothingStore);
	}, []);

	return (
		<>
			<AppRouter />
		</>
	);
};

export default App;
