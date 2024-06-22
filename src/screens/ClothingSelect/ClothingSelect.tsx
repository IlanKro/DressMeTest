import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "../../components";
import { SavedSet, ClothingType } from "../../models/Clothing";
import { ClothingStore } from "../../stores";
import { imgSrc } from "../../util/Images";
import "./ClothingSelect.scss";

const ClothingSelect = () => {
	const location = useLocation();
	document.title = location.pathname;
	const params = useParams();
	const clothingType: ClothingType | undefined = params.selected as ClothingType;

	const { getClothingItems: clothingItems } = ClothingStore;
	console.log("clothingType", clothingType, clothingItems);
	const clothingAvaileable = clothingItems && clothingItems.filter(({ type }) => type === clothingType);
	const clothingImage = {
		shirt: imgSrc.shirt,
		pants: imgSrc.pants,
		shoes: imgSrc.shoes,
	};

	console.log("clothingAvaileable", clothingAvaileable);

	return (
		<div id={"clothing-select"}>
			<div id="clothing-items">
				{clothingAvaileable &&
					clothingAvaileable.map((clothingItem, index) => (
						<Card clothingItem={clothingItem} image={clothingType && clothingImage[clothingType]} key={index} />
					))}
			</div>
		</div>
	);
};

export default ClothingSelect;
