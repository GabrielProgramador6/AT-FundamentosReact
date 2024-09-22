import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

export default function Header({ search, setSearch }) {
	return (
		<header className="flex items-center justify-between px-4 py-6 bg-white border-b shadow-lg">
			<Link to="/">
				<div className="w-40 cursor-pointer">
					<img
						className="w-full h-auto object-cover"
						src={Logo}
						alt="Booking Logo"
					/>
				</div>
			</Link>

			<input
				type="text"
				placeholder="Digite o nome do Hotel..."
				className="w-28 sm:w-96 rounded-full bg-red-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</header>
	);
}
