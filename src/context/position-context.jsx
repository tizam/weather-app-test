import { createContext, useState } from 'react'

export const PositionContext = createContext()

export const PositionContextProvider = ({ children }) => {
	const [position, setPosition] = useState({
		lng: 3.066514,
		lat: 36.7596531
	})

	return (
		<PositionContext.Provider value={{ position, setPosition }}>
			{children}
		</PositionContext.Provider>
	)
}
