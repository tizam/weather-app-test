import { useContext } from 'react'
import { WeatherContext } from '../../context/weather-context'
import Card from '../card/card'
import Loader from '../loader/loader'
import styles from './wrapper.module.css'

const Wrapper = () => {
	const { daily, error } = useContext(WeatherContext)

	if (error) {
		return (<div className={styles.error}>
			<p>An error has occured</p>
		</div>)
	}

	return (
		<div className={styles.wrapper}>
			{daily && daily.map(day => {
				return (
					<Card key={day.dt} day={day} />
				)
			})}
		</div>
	)
}

export default Wrapper