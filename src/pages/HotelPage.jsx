import { useNavigate, useParams } from 'react-router';
import {
	deleteHotelById,
	fetchHotelById,
	updatedHotelById,
} from '../services/apiHoteis';
import { useEffect, useState } from 'react';
import Gallery from '../components/Gallery';
import StarRating from '../components/StarRating';
import { FilePenLine, Trash2 } from 'lucide-react';
import CreatingHotelModal from '../components/CreatingHotelModal';

export default function HotelPage() {
	const [hotel, setHotel] = useState([]);
	const [isOpenModalUpdated, setIsOpenModalUpdated] = useState(false);

	const { hotelId } = useParams();
	const navigate = useNavigate();

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

	async function fecthHotels(hotelId) {
		const data = await fetchHotelById(hotelId);
		setHotel(data);
	}

	useEffect(() => {
		fecthHotels(hotelId);
	}, [hotelId]);

	const {
		id,
		nome_hotel,
		imagens,
		classificacao,
		cidade,
		estado,
		preco_diaria,
		descricao_completa,
		itens_servicos = [],
	} = hotel;

	async function handleDeleteHotel(id) {
		try {
			await deleteHotelById(id);
			setHotel((hotels) => hotels.filter((hotel) => hotel.id !== id));
			navigate('/');
		} catch (e) {
			console.log('ERROR AO DELETAR: ' + e);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();

		const updatedHotel = {
			id: hotelId,
			nome_hotel: newHotel.nome_hotel,
			classificacao: newHotel.classificacao,
			cidade: newHotel.cidade,
			estado: newHotel.estado,
			preco_diaria: newHotel.preco_diaria,
			descricao_completa: newHotel.descricao_completa,
			itens_servicos: newHotel?.itens_servicos
				.split(',')
				.map((item) => item.trim()),
			imagens: newHotel.imagens.split(',').map((link) => link.trim()),
		};

		updatedHotelById(hotelId, updatedHotel).then((updatedHotelData) => {
			setHotel(updatedHotelData);

			fecthHotels(hotelId);
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

		handleCloseModalUpdated();
	}

	function handleOpenModalUpdated() {
		setIsOpenModalUpdated(true);
	}

	function handleCloseModalUpdated() {
		setIsOpenModalUpdated(false);
	}

	return (
		<div className="flex flex-col my-4 mx-10 gap-10 overflow-hidden rounded-md">
			<div className="px-6 py-4 flex justify-between">
				<div>
					<p className="text-4xl text-color-slate-700 text-semibold">
						{nome_hotel}
					</p>
					<div className="flex flex-col gap-4">
						<span className="text-xl text-color-slate-700">
							{cidade}, {estado}
						</span>
						<div className="flex items-center gap-4">
							<strong className="text-2xl text-red-500 line-through">
								${(preco_diaria * 1.7).toFixed(2)}
							</strong>
							<span>De por:</span>
							<strong className="text-4xl text-red-500">${preco_diaria}</strong>
						</div>

						<StarRating
							size={32}
							color="blue"
							defaultRating={Number(classificacao)}
							onSetRating={() => Number(classificacao)}
						/>
					</div>
				</div>

				<div className="flex items-center gap-6">
					<Trash2
						onClick={() => handleDeleteHotel(id)}
						className="cursor-pointer"
						fontSize={32}
					/>
					<FilePenLine
						className="cursor-pointer"
						fontSize={32}
						onClick={handleOpenModalUpdated}
					/>
				</div>
			</div>

			<div>
				<Gallery imagens={imagens} />

				<div className="w-full max-w-[768px] text-stone-800 text-lg font-semibold mt-8">
					<p>{descricao_completa}</p>
				</div>

				<ul className="flex flex-col gap-2 text-lg font-light mt-4">
					{itens_servicos.length &&
						itens_servicos?.map((items, i) => (
							<li key={items.at(i)}>{items}</li>
						))}
				</ul>
			</div>

			{isOpenModalUpdated && (
				<CreatingHotelModal
					open={isOpenModalUpdated}
					onClose={handleCloseModalUpdated}>
					<form action="" className="px-4 py-8 flex flex-col gap-4 w-full">
						<div className="flex items-center justify-center gap-1 sm:flex">
							<label htmlFor="" className="px-4 text-stone-700">
								Nome do Hotel:
							</label>
							<input
								type="text"
								placeholder="Digite o nome do Hotel..."
								className="w-3/5 rounded-full bg-red-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
								defaultValue={nome_hotel}
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
			)}
		</div>
	);
}
