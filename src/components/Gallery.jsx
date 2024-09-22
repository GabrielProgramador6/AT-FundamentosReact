import React from 'react';

export default function Gallery({ imagens }) {
	return (
		<div className="w-[768px] h-auto overflow-hidden flex gap-2">
			<div className="w-[608px] h-[608px] overflow-hidden">
				<img
					src={imagens?.at(0)}
					alt=""
					className="w-full h-full object-cover hover:scale-125 transition-all"
				/>
			</div>

			<div className="w-40 h-[608px] overflow-hidden flex items-center justify-between flex-col gap-2">
				<div className="overflow-hidden">
					<img
						src={imagens?.at(1)}
						alt=""
						className="w-40 h-[152px] object-cover hover:scale-125 transition-all"
					/>
				</div>
				<div className="overflow-hidden">
					<img
						src={imagens?.at(2)}
						alt=""
						className="w-40 h-[152px] object-cover hover:scale-125 transition-all"
					/>
				</div>
				<div className="overflow-hidden">
					<img
						src={imagens?.at(3)}
						alt=""
						className="w-40 h-[152px] object-cover hover:scale-125 transition-all"
					/>
				</div>
				<div className="overflow-hidden">
					<img
						src={imagens?.at(0)}
						alt=""
						className="w-40 h-[152px] object-cover hover:scale-125 transition-all"
					/>
				</div>
			</div>
		</div>
	);
}
