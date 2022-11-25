import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home, {
	loader as homeLoader,
	action as homeAction,
} from "./components/pages/Home";
import Detail, { loader as detailLoader } from "./components/pages/Detail";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<AppLayout />}>
			<Route
				index
				element={<Home />}
				loader={homeLoader}
				action={homeAction}
			/>
			<Route
				path="/invoice/:id"
				element={<Detail />}
				loader={detailLoader}
			/>
		</Route>
	)
);

const App = () => <RouterProvider router={router} />;

export default App;
