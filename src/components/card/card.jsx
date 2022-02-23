import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './card.module.css';
import Loader from '../loader/loader';
import { WeatherContext } from '../../context/weather-context';

const Card = ({ day }) => {
	const { loading } = useContext(WeatherContext);

	const dayName = new Date(day.dt * 1000).toLocaleDateString("en", {
		weekday: "long",
	});
	const icon = day.weather[0].icon;
	const temp = day.temp.day.toFixed(0);

	if (loading) {
		return (
			<div className={styles.card}>
				<Loader />
			</div>
		);
	}

	return (
		<div className={styles.card}>
			<p className={styles.dayName}>{dayName}</p>
			<p><img src={`http://openweathermap.org/img/w/${icon}.png`} alt="icon" /></p>
			<p className={styles.temp}>{temp}</p>
		</div>
	);
};

Card.propTypes = {
	day: PropTypes.object
};

export default Card;