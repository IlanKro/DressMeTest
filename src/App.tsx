import axios from "axios";
import React, { useEffect } from "react";
import "./App.scss";
import AppRouter from "./AppRouter";
import { ClothingStore } from "./stores";
import { API_URL } from "./util/Enums";

const App = () => {
	useEffect(() => {
		const fetch = async () => {
			try {
				const instance = axios.create({
					baseURL: API_URL,
					timeout: 5000,
				});
				ClothingStore.setClothingItems(await instance.get(""));
			} catch (e: any) {
				console.log("failed to fetch data");
				//add popup
				return ClothingStore.setClothingItems([]);
			}
		};
		fetch();
	}, []);

	return (
		<>
			<AppRouter />
		</>
	);
};

export default App;
