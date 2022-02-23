import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { PositionContextProvider } from './context/position-context'
import { WeatherContextProvider } from './context/weather-context'

ReactDOM.render(
  <React.StrictMode>
    <PositionContextProvider>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </PositionContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
