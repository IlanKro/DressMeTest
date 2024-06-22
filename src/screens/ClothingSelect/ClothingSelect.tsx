import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Popup } from "../../components";
import { ClothingItem, ClothingItems, ClothingType } from "../../models/Clothing";
import { ClothingStore } from "../../stores";
import { imgSrc } from "../../util/Images";
import { SLUGS } from "../../util/Enums";
import "./ClothingSelect.scss";

const ClothingSelect = () => {
	const [sortType, setSortType] = useState("recommended");
	const [clothingItemsAvaileable, setClothingItemsAvaileable] = useState<ClothingItems>([]);
	const shouldShowPopup = ClothingStore.getPopupSettings.show;

	const location = useLocation();
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const { getClothingItems, getCurrentSet: currentSet, sortByRecommended, convertSize, restartTimer } = ClothingStore;
		if (Object.values(currentSet).every((cloth) => cloth === null)) restartTimer();

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
	}, [ClothingStore, sortType, location]);

	document.title = location.pathname;

	const clothingType: ClothingType | undefined = params.selected as ClothingType;

	const clothingImage = {
		shirt: imgSrc.shirt,
		pants: imgSrc.pants,
		shoes: imgSrc.shoes,
	};

	const addItem = (clothingItem: ClothingItem) => {
		const {
			getFirstItem: firstItem,
			getCurrentSet: currentSet,
			setCurrentSetItem,
			setFirstItem,
			showPopup,
			removeCloth,
			addSavedSet,
			resetCurrentSet,
		} = ClothingStore;
		if (!firstItem || firstItem?.type === clothingItem.type) {
			setFirstItem(clothingItem);
		}
		setCurrentSetItem(clothingItem.type, clothingItem);

		const nextItem = Object.entries(currentSet).find((set) => !set[1]);
		if (nextItem) navigate("/clothing-select/" + nextItem[0]);
		else {
			showPopup({
				text: "successfully added set!",
				onAccept: () => {
					addSavedSet(currentSet);
					Object.entries(currentSet).forEach((entry) => {
						removeCloth(entry[1]?.id || 0);
					});
					resetCurrentSet();
					navigate("/" + SLUGS.Completed_Sets);
				},
			});
		}
	};

	return (
		<div id={"clothing-select"}>
			<div>
				{shouldShowPopup && <Popup />}
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
						<Card clothingItem={clothingItem} image={clothingType && clothingImage[clothingType]} key={index} addItem={addItem} />
					))}
			</div>
		</div>
	);
};

export default observer(ClothingSelect);
