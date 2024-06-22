import { observer } from "mobx-react";
import ClothingStore from "../../stores/ClothingStore/ClothingStore";
import { CLOTHING_ITEMS, CLOTHING_ITEMS_PROPERTIES } from "../../util/Enums";
import { imgSrc } from "../../util/Images";
import "./CompletedSets.scss";

const CompletedSets = () => {
	const { getSavedSets: savedSets, deletedSet } = ClothingStore;

	// const { id: _id, type: _type, ...clothingItemShow } = clothingItem;
	const categories = Object.values(CLOTHING_ITEMS);
	const properties = Object.values(CLOTHING_ITEMS_PROPERTIES);

	const deleteItem = (index: number) => {
		deletedSet(index);
	};
	return (
		<div id="completed-sets">
			{savedSets.map((savedSet, index) => {
				const { time, ...savedSetShow } = savedSet;
				console.log("Object.keys(savedSetShow)", Object.entries(savedSetShow));
				return (
					<div className={"completed-set"} key={index}>
						<table width="100%" className="table">
							<thead>
								<tr>
									<th>
										<button onClick={() => deleteItem(index)}>
											<img src={imgSrc.deleteBin} />
										</button>
									</th>
									{Object.values(properties).map((property, index) => (
										<th key={index}>{property}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{savedSetShow &&
									Object.values(savedSetShow).map((cloth, index) => (
										<tr key={index}>
											<td>{cloth?.type}</td>
											<td>{cloth?.size}</td>
											<td>{cloth?.color}</td>
											<td>{cloth?.brand}</td>
										</tr>
									))}
							</tbody>
						</table>
						<p>{"time to complete: " + savedSet.time} </p>
					</div>
				);
			})}
		</div>
	);
};

export default observer(CompletedSets);
