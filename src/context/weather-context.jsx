import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PositionContext } from './position-context';

const api = {
	key: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
	url: import.meta.env.VITE_OPEN_WEATHER_API_URL,
	params: 'units=metric&exclude=current,hourly,minutely,alerts',
};

export const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
	const [daily, setDaily] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { position } = useContext(PositionContext);

	useEffect(() => {
		try {
			const fetchData = async () => {
				setLoading(true);
				try {
					const response = await axios.get(
						`${api.url}/onecall?lat=${position.lat}&lon=${position.lng}&${api.params}&appid=${api.key}`
					);
					setDaily(response.data.daily);
					setLoading(false);

				} catch (e) {
					setError(true);
					console.log(e);
				}
			};

			fetchData();

		} catch (e) {
			setError(true);
			console.log(e);
		}
	}, [position]);

	return (
		<WeatherContext.Provider value={{ daily, loading, error }}>
			{children}
		</WeatherContext.Provider>
	);
};
