import { observer } from "mobx-react";
import ClothingStore from "../../stores/ClothingStore/ClothingStore";
import { CLOTHING_ITEMS } from "../../util/Enums";
import { imgSrc } from "../../util/Images";
import "./CompletedSets.scss";

const CompletedSets = () => {
	const { getSavedSets: savedSets, deletedSet } = ClothingStore;

	// const { id: _id, type: _type, ...clothingItemShow } = clothingItem;
	const headers = Object.values(CLOTHING_ITEMS);

	const deleteItem = (index: number) => {
		deletedSet(index);
	};
	return (
		<div id="completed-sets">
			{savedSets.map((savedSet, index) => (
				<div className={"completed-set"} key={index}>
					<table width="100%" className="table">
						<thead>
							<tr>
								<th>
									<button onClick={() => deleteItem(index)}>
										<img src={imgSrc.deleteBin} />
									</button>
								</th>
								{headers.map((header, index) => (
									<th key={index}>{header}</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>data1</td>
								<td>data2</td>
								<td>data3</td>
								<td>data4</td>
							</tr>
						</tbody>
					</table>
					<p>{"time to complete: " + savedSet.time} </p>
				</div>
			))}
		</div>
	);
};

export default observer(CompletedSets);
