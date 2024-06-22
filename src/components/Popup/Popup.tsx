import { observer } from "mobx-react-lite";
import { ClothingStore } from "../../stores";
import "./Popup.scss";

const Popup = () => {
	const { getPopupSettings: popupSettings } = ClothingStore;
	const { text, onAccept } = popupSettings;
	return (
		<div id="popup">
			<h2>{text}</h2>
			<button
				onClick={() => {
					ClothingStore.hidePopup();
					onAccept();
				}}
			>
				accept
			</button>
		</div>
	);
};

export default observer(Popup);
