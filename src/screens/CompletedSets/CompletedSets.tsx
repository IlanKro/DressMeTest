import { observer } from "mobx-react";
import ClothingStore from "../../stores/ClothingStore/ClothingStore";
import { imgSrc } from "../../util/Images";
import "./CompletedSets.scss";

const CompletedSets = () => {
	const { getSavedSets: savedSets } = ClothingStore;

	// const { id: _id, type: _type, ...clothingItemShow } = clothingItem;

	return (
		<div id="completed-sets">
			{savedSets.map((savedSet) => (
				<>
					<table width="100%" className="table">
						<thead>
							<tr>
								<th>
									<button>
										<img src={imgSrc.deleteBin} />
									</button>
								</th>

								<th>Header1</th>
								<th>Header2</th>
								<th>Header3</th>
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
				</>
			))}
		</div>
	);
};

export default observer(CompletedSets);
