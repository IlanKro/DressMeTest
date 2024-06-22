import { observer } from "mobx-react";
import React from "react";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./components";
import { Home, ClothingSelect, CompletedSets } from "./screens";
import { ClothingStore } from "./stores";

const AppRouter = () => {
	const Layout = () => (
		<div id="layout">
			<Header />
			<Outlet />
		</div>
	);

	const router = createBrowserRouter([
		{
			element: <Layout />,
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

export default observer(AppRouter);
