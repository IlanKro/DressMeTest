import React from "react";
import { useLocation } from "react-router-dom";
import "./ClothingSelect.scss";

const ClothingSelect = () => {
	const location = useLocation();
	document.title = location.pathname;
	return <></>;
};

export default ClothingSelect;
