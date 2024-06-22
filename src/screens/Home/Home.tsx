import React, { useEffect } from "react";
import { ClothingStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import { SLUGS, API_URL } from "../../util/Enums";
import axios from "axios";
import "./Home.scss";
import { observer } from "mobx-react";

const Home = () => {
	const { getSavedSets: savedSets, getClothingItems: clothingItems, getCurrentSet: currentSet } = ClothingStore;
	document.title = "Home";
	const navigate = useNavigate();

	useEffect(() => {
		const { setClothingItems, persist_data } = ClothingStore;
		const fetch = async () => {
			try {
				const instance = axios.create({
					baseURL: API_URL,
					timeout: 5000,
				});
				const response = await instance.get("");
				response.data?.length && setClothingItems(response.data);
			} catch (e: any) {
				console.log("failed to fetch data");
				//add popup
				return setClothingItems([]);
			}
		};

		fetch();
	}, []);

	const ClothSelectButton = ({ buttonText, slug, isSelected }: { buttonText: string; slug: string; isSelected: boolean }) => {
		return (
			<button onClick={() => navigate(slug)} className={`cloth-select-button ${isSelected ? "cloth-select-button-selected" : ""}`}>
				{buttonText}
			</button>
		);
	};

	return (
		<div id="home">
			<div id="homepage-navigation">
				<ClothSelectButton buttonText={"shirts"} slug={SLUGS.Shirts} isSelected={!!currentSet.shirt} />
				<ClothSelectButton buttonText={"pants"} slug={SLUGS.Pants} isSelected={!!currentSet.pants} />
				<ClothSelectButton buttonText={"shoes"} slug={SLUGS.Shoes} isSelected={!!currentSet.shoes} />

				<ClothSelectButton buttonText={"Completed sets: " + savedSets.length} slug={SLUGS.Completed_Sets} isSelected={false} />
			</div>
			<span className="home-statistics">
				<span> {"shirts: " + clothingItems.filter((item) => item.type === "shirt").length}</span>
				<span> {"pants: " + clothingItems.filter((item) => item.type === "pants").length}</span>
				<span> {"shoes: " + clothingItems.filter((item) => item.type === "shoes").length}</span>
			</span>
		</div>
	);
};

export default observer(Home);
