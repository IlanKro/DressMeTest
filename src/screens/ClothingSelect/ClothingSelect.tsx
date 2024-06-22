import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "../../components";
import { ClothingItems, ClothingType } from "../../models/Clothing";
import { ClothingStore } from "../../stores";
import { imgSrc } from "../../util/Images";
import "./ClothingSelect.scss";

const ClothingSelect = () => {
	const [sortType, setSortType] = useState("recommended");
	const [clothingItemsAvaileable, setClothingItemsAvaileable] = useState<ClothingItems>([]);

	const location = useLocation();
	const params = useParams();

	useEffect(() => {
		const { getClothingItems, getCurrentSet: currentSet, sortByRecommended, convertSize } = ClothingStore;
		let clothingItems = getClothingItems && getClothingItems.filter(({ type }) => type === clothingType);
		switch (sortType) {
			case "recommended":
				if (Object.entries(currentSet).length) {
					clothingItems = sortByRecommended(clothingItems);
				} else {
					// default ordering from api.
					clothingItems = getClothingItems && getClothingItems.filter(({ type }) => type === clothingType);
				}
				break;
			case "size":
				clothingItems = clothingItems.sort((a, b) => (convertSize(a.size) > convertSize(b.size) ? 1 : -1));
				break;
			case "color":
				clothingItems = clothingItems.sort((a, b) => (a.color > b.color ? 1 : -1));
				break;
			default:
				break;
		}
		setClothingItemsAvaileable(clothingItems);
	}, [ClothingStore, sortType]);

	document.title = location.pathname;

	const clothingType: ClothingType | undefined = params.selected as ClothingType;

	const clothingImage = {
		shirt: imgSrc.shirt,
		pants: imgSrc.pants,
		shoes: imgSrc.shoes,
	};

	return (
		<div id={"clothing-select"}>
			<div>
				<label htmlFor="sort">sort:</label>
				<select
					onChange={({ target }) => {
						setSortType(target.value);
					}}
					name="sort"
					id="sort"
				>
					<option value="recommended">Recommended</option>
					<option value="size">Size</option>
					<option value="color">Color</option>
				</select>
			</div>
			<div id="clothing-items">
				{clothingItemsAvaileable &&
					clothingItemsAvaileable.map((clothingItem, index) => (
						<Card clothingItem={clothingItem} image={clothingType && clothingImage[clothingType]} key={index} />
					))}
			</div>
		</div>
	);
};

export default observer(ClothingSelect);
