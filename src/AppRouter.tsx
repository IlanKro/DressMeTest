import React from "react";

import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import { Header } from "./components";
import { Home, ClothingSelect, CompletedSets } from "./screens";

const AppRouter = () => {
	const router = createBrowserRouter([
		{
			element: <Header />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/clothing-select/:selected",
					element: <ClothingSelect />,
				},
				{
					path: "/completed-sets",
					element: <CompletedSets />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default AppRouter;
