import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { Header } from "./components";
import AppRouter from "./AppRouter";

const App = () => {
	const [count, setCount] = useState(0);

	return (
		<>
			<Header />
			<AppRouter />
		</>
	);
};

export default App;
