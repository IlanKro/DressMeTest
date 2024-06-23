import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "../../util/Enums";
import { imgSrc } from "../../util/Images2";
import SideMenu from "../SideMenu";
import "./Header.scss";

const Header = () => {
	const [show, setShow] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const isHome = location.pathname === "/";
	const pageTitle = isHome ? ROUTES.HOME : location.pathname.split("/").join(" ").split("-").join(" ").replace("clothing select", "");

	return (
		<>
			<div id={"header"}>
				{!isHome && (
					<button className={"back-button"} onClick={() => navigate(-1)}>
						{">"}
					</button>
				)}
				<h1 onClick={() => navigate("/")}>{pageTitle}</h1>
				<button className="header-side-menubar-button" onClick={() => setShow(!show)}>
					<img src={imgSrc.menuBars} className="header-side-menubar-img" />
				</button>
			</div>

			{show && <SideMenu setShow={setShow} />}
		</>
	);
};

export default Header;
