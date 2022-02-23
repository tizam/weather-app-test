import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const api = {
	key: import.meta.env.VITE_MAPBOX_API_TOKEN,
	url: import.meta.env.VITE_MAPBOX_API_URL,
	params: '.json?types=place%2Cpostcode%2Caddress&limit=1',
};

export const PositionContext = createContext();

export const PositionContextProvider = ({ children }) => {
	const [position, setPosition] = useState({
		lng: 3.066514,
		lat: 36.7596531
	});
	const [address, setAddress] = useState('');

	useEffect(() => {
		try {
			const fetchData = async () => {
				const response = await axios.get(
					`${api.url}${position.lng},${position.lat}${api.params}&access_token=${api.key}`
				);
				const responseAddress = response.data.features[0].place_name;

				setAddress(responseAddress);
			};
			fetchData();
		}
		catch (error) {
			console.log(error);
		}

	}, [position]);


	return (
		<PositionContext.Provider value={{ position, setPosition, address }}>
			{children}
		</PositionContext.Provider>
	);
};

PositionContextProvider.propTypes = {
	children: PropTypes.object
};
