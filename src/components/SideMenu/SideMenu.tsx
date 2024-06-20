import { SetStateAction, Dispatch } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SLUGS } from "../../util/Enums";

import "./SideMenu.scss";

const SideMenu = ({ setShow }: { setShow: Dispatch<SetStateAction<boolean>> }) => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div id={"side-menu"}>
			{Object.entries(SLUGS).map((routesName) => (
				<button
					onClick={() => {
						navigate(routesName[1]);
						setShow(false);
					}}
				>
					{routesName[0].replace("_", " ")}
				</button>
			))}
		</div>
	);
};

export default SideMenu;
