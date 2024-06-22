import { observer } from "mobx-react-lite";
import { ClothingStore } from "../../stores";

const Popup = () => {
	const { getPopupSettings: popupSettings } = ClothingStore;
	const { text, onAccept } = popupSettings;

	return (
		<div>
			<h2>{text}</h2>
			<button onClick={onAccept}>accept</button>
		</div>
	);
};

export default observer(Popup);
