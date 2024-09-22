import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Home from './pages/Home';
import AppLayout from './pages/AppLayout';
import Main from './pages/Main';
import HotelPage from './pages/HotelPage';

export default function App() {
	const router = createBrowserRouter([
		{
			element: <AppLayout />,
			children: [
				{
					element: <Main />,
					path: '/',
				},
				{
					element: <HotelPage />,
					path: ':hotelId',
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}
