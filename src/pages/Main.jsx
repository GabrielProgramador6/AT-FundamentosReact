import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createHotel, fetchHoteis } from '../services/apiHoteis';
import Hotel from '../components/HotelCard';
import CreatingHotelModal from '../components/CreatingHotelModal';
import { useNavigate, useOutletContext } from 'react-router';

export default function Main() {
	const [hotels, setHotels] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [newHotel, setNewHotel] = useState({
		nome_hotel: '',
		classificacao: 0,
		cidade: '',
		estado: '',
		preco_diaria: 0,
		descricao_completa: '',
		itens_servicos: '',
		imagens: '',
	});

	const navigate = useNavigate();
	const [hotelFilters, setHotelFilters, search] = useOutletContext();

	function handleOpenModalPostHotel() {
		setIsOpen(true);
	}

	function handleCloseModalPostHotel() {
		setIsOpen(false);
	}

	async function fetchHotels() {
		const data = await fetchHoteis();
		setHotels(data);
	}

	useEffect(() => {
		fetchHotels();
	}, []);

	function handleSubmit(e) {
		e.preventDefault();

		const hotel = {
			id: uuidv4(),
			nome_hotel: newHotel.nome_hotel,
			classificacao: newHotel.classificacao,
			cidade: newHotel.cidade,
			estado: newHotel.estado,
			preco_diaria: newHotel.preco_diaria,
			descricao_completa: newHotel.descricao_completa,
			itens_servicos: newHotel.itens_servicos
				.split(',')
				.map((item) => item.trim()),
			imagens: newHotel.imagens.split(',').map((link) => link.trim()),
		};

		createHotel(hotel).then((createdHotel) => {
			setHotels((hotels) => [...hotels, createdHotel]); // Adiciona o novo hotel à lista
			fetchHotels();
		});

		setNewHotel({
			nome_hotel: '',
			classificacao: 0,
			cidade: '',
			estado: '',
			preco_diaria: 0,
			descricao_completa: '',
			itens_servicos: '',
			imagens: '',
		});

		setIsOpen(false);
		navigate(`/${hotel.id}`);
	}

	useEffect(() => {
		async function fetch() {
			const hotels = await fetchHoteis();

			const hotelFilter = hotels.filter((hotel) =>
				hotel.nome_hotel.toLowerCase().startsWith(search.toLowerCase())
			);

			setHotelFilters(hotelFilter);
		}

		fetch();
	}, [search, hotelFilters, setHotelFilters]);

	return (
		<>
			<div className="text-center mt-12">
				<h1 className="text-4xl font-bold text-slate-700">
					Encontre sua próxima estadia
				</h1>
				<span className="text-lg font-bold text-slate-700">
					Encontre ofertas em hotéis, casas, apartamentos e muito mais...
				</span>
			</div>

			<div className="flex items-center justify-center gap-4 flex-wrap mt-10">
				{search.length > 0 ? (
					<>
						{hotelFilters.map((hotel) =>
							hotel ? <Hotel key={hotel.id} hotel={hotel} /> : null
						)}
					</>
				) : (
					<>
						{hotels.map((hotel) =>
							hotel ? <Hotel key={hotel.id} hotel={hotel} /> : null
						)}
					</>
				)}
			</div>

			<button
				onClick={handleOpenModalPostHotel}
				className="fixed z-10 bottom-6 right-6 text-4xl bg-red-200 text-red-500 hover:bg-red-300 hover:text-200 rounded-full px-5 py-2.5">
				+
			</button>

			{isOpen && (
				<div className="">
					<CreatingHotelModal open={isOpen} onClose={handleCloseModalPostHotel}>
						<form action="" className="px-4 py-8 flex flex-col gap-4 w-full">
							<div className="flex items-center justify-center gap-1 sm:flex">
								<label htmlFor="" className="px-4 text-stone-700">
									Nome do Hotel:
								</label>
								<input
									type="text"
									placeholder="Digite o nome do Hotel..."
									className="w-3/5 rounded-full bg-red-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
									value={newHotel.nome_hotel}
									onChange={(e) =>
										setNewHotel({ ...newHotel, nome_hotel: e.target.value })
									}
								/>
							</div>

							<div className="flex justify-evenly">
								<div className="w-9/12 flex flex-col gap-1">
									<label htmlFor="" className="px-4 text-stone-700">
										Imagens do Hotel (separadas por vírgula):
									</label>
									<input
										type="text"
										placeholder="Adicione imagens do Hotel..."
										className="w-full rounded-full bg-red-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
										value={newHotel.imagens}
										onChange={(e) =>
											setNewHotel({ ...newHotel, imagens: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="flex justify-evenly">
								<div className="flex flex-col gap-1">
									<label htmlFor="" className="px-4 text-stone-700">
										Cidade do Hotel:
									</label>
									<input
										type="text"
										placeholder="Cidade do Hotel..."
										className="w-28 rounded-full bg-red-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
										value={newHotel.cidade}
										onChange={(e) =>
											setNewHotel({ ...newHotel, cidade: e.target.value })
										}
									/>
								</div>

								<div className="flex flex-col gap-1">
									<label htmlFor="" className="px-4 text-stone-700">
										Estado do Hotel:
									</label>
									<input
										type="text"
										placeholder="Estado do Hotel..."
										className="w-28 rounded-full bg-red-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
										value={newHotel.estado}
										onChange={(e) =>
											setNewHotel({ ...newHotel, estado: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="flex justify-evenly">
								<div className="flex flex-col gap-1">
									<label htmlFor="" className="px-4 text-stone-700">
										Classificação do Hotel:
									</label>
									<input
										type="text"
										placeholder="Classificação do Hotel..."
										className="w-28 rounded-full bg-red-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
										value={newHotel.classificacao}
										onChange={(e) =>
											setNewHotel({
												...newHotel,
												classificacao: e.target.value,
											})
										}
									/>
								</div>

								<div className="flex flex-col gap-1">
									<label htmlFor="" className="px-4 text-stone-700">
										Precificação do Hotel:
									</label>
									<input
										type="text"
										placeholder="Precificação do Hotel..."
										className="w-28 rounded-full bg-red-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
										value={newHotel.preco_diaria}
										onChange={(e) =>
											setNewHotel({ ...newHotel, preco_diaria: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="flex justify-evenly">
								<div className="flex items-center justify-center">
									<div className="w-full flex flex-col gap-1">
										<label htmlFor="" className="px-4 text-stone-700">
											Descrição do Hotel:
										</label>
										<textarea
											type="text"
											placeholder="Descrição do Hotel..."
											className="w-full h-24 resize-none rounded-md bg-red-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
											value={newHotel.descricao_completa}
											onChange={(e) =>
												setNewHotel({
													...newHotel,
													descricao_completa: e.target.value,
												})
											}
										/>
									</div>
								</div>

								<div className="flex items-center justify-center">
									<div className="w-full flex flex-col gap-1">
										<label htmlFor="" className="px-4 text-stone-700">
											Serviços do Hotel:
										</label>
										<textarea
											type="text"
											placeholder="Serviços do Hotel..."
											className="w-full h-24 resize-none rounded-md bg-red-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
											value={newHotel.itens_servicos}
											onChange={(e) =>
												setNewHotel({
													...newHotel,
													itens_servicos: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</div>

							<button
								onClick={handleSubmit}
								className="w-max mx-auto mt-4 py-2 px-8 text-lg bg-red-200 text-red-600 hover:bg-red-300 hover:text-red-700 rounded-md">
								Salvar
							</button>
						</form>
					</CreatingHotelModal>
				</div>
			)}
		</>
	);
}
