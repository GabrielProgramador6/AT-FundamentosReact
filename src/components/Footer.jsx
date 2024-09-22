import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<div className="flex items-center justify-between mt-12 px-4 py-6 bg-blue-50">
			<Link to="/" className="text-xl px-4">
				Back to Home &rarr;
			</Link>
		</div>
	);
}
