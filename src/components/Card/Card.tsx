import React from "react";
import { ClothingItem } from "../../models/Clothing";
import "./Card.scss";

const Card = ({ clothingItem, image }: { clothingItem: ClothingItem; image: string | undefined }) => {
	const { id: _id, type: _type, ...clothingItemShow } = clothingItem;
	return (
		<div className="card">
			{image && <img className="card-image" src={image} />}
			<span className="clothing-item-info">
				{Object.entries(clothingItemShow).map((entry, index) => (
					<div className="clothing-item-info-param" key={index}>
						<span>{entry[0] + ": "}</span>
						<span>{entry[1]}</span>
					</div>
				))}
			</span>
			<button className="select-button">{"select"}</button>
		</div>
	);
};

export default Card;
