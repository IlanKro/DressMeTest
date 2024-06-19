import React from "react";

import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import { Home, ClothingSelect, SavedSets } from "./screens";

const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/clothing-select/:selected",
			element: <ClothingSelect />,
		},
		{
			path: "/saved-sets",
			element: <SavedSets />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default AppRouter;
