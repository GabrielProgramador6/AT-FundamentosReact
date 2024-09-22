import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Home() {
	const [search, setSearch] = useState('');
	const [hotelFilters, setHotelFilters] = useState([]);

	return (
		<div className="min-h-screen flex flex-col bg-slate-50">
			<Header search={search} setSearch={setSearch} />
			<main className="relative flex-grow">
				<Outlet context={[hotelFilters, setHotelFilters, search]} />
			</main>
			<Footer />
		</div>
	);
}
