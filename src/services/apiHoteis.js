const API_URL = 'http://localhost:9000/hotels';

export async function fetchHoteis() {
	const response = await fetch(API_URL);

	if (!response.ok) return new Error('Error fetching data...');

	return await response.json();
}

export async function fetchHotelById(id) {
	const response = await fetch(`${API_URL}/${id}`);

	if (!response.ok) return new Error('Error fetching data by id...');

	return await response.json();
}

export async function createHotel(newHotel) {
	try {
		const response = await fetch(`${API_URL}`, {
			method: 'POST',
			body: JSON.stringify(newHotel),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) return new Error('Error in creating hotel...');

		const { data } = await response.json();

		return data;
	} catch (e) {
		console.log(e);
	}
}

export async function deleteHotelById(id) {
	try {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) return new Error('Error in creating hotel...');

		const { data } = await response.json();

		return data;
	} catch (e) {
		console.log(e);
	}
}

export async function updatedHotelById(id, updatedHotel) {
	try {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updatedHotel),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) new Error('Error in updated hotel...');

		const data = await response.json();

		return data;
	} catch (e) {
		console.log(e);
	}
}
