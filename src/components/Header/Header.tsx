import { useLocation, useNavigate } from "react-router-dom";

import "./Header.scss";
import { ROUTES } from "../../util/Enums";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isHome = location.pathname === "/";
	const pageTitle = isHome ? ROUTES.HOME : location.pathname.split("/").join(" ").split("-").join(" ");

	return (
		<div id={"header"}>
			{!isHome && <button onClick={() => navigate(-1)}>{"<"}</button>}
			<h1>{pageTitle}</h1>
			<button>
				<img></img>
			</button>
		</div>
	);
};

export default Header;
