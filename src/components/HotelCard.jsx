import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchHotelById from '../services/apiHoteis';

export default function Hotel({ hotel }) {
	const {
		id,
		nome_hotel,
		imagens,
		classificacao,
		cidade,
		estado,
		preco_diaria,
	} = hotel;

	return (
		<div className="relative w-72 h-auto overflow-hidden border-2 border-slate-400 rounded-md cursor-pointer">
			<div className="absolute z-10 top-2 right-2 rounded-full p-1">
				<Heart color="#f50000" />
			</div>

			<div className="w-full h-40 overflow-hidden ">
				<img
					src={imagens?.at(0)}
					alt=""
					className="w-full h-40 object-cover hover:scale-125 transition-all"
				/>
			</div>

			<div className="px-6 py-4">
				<p className="text-lg text-color-slate-700 text-semibold">
					{nome_hotel}
				</p>
				<div className="flex flex-col gap-2">
					<span className="text-sm text-color-slate-700">
						{cidade}, {estado}
					</span>
					<strong className="text-lg text-red-500">${preco_diaria}</strong>
				</div>
			</div>

			<div className="mx-6 my-4 bg-red-200 text-red-700 hover:bg-red-600 hover:text-red-200 py-1.5 px-4 w-24 rounded flex items-center justify-center mb-4">
				<Link to={id}>Alugar</Link>
			</div>
		</div>
	);
}
