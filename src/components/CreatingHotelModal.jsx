import Modal from 'react-responsive-modal';

export default function CreatingHotelModal({ children, open, onClose }) {
	return (
		<Modal
			open={open}
			onClose={onClose}
			center
			classNames={{
				overlay: 'customOverlay',
				modal: 'customModal',
				closeIcon: 'closeIcon',
			}}>
			{children}
		</Modal>
	);
}
