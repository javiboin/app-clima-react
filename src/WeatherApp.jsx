import { useEffect, useRef, useState } from 'react'
import './WeatherApp.css'
const apiKey = import.meta.env.VITE_API_KEY

export const WeatherApp = () => {

  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = apiKey
  const difKelvin = 273.15 // Diferencia Grados kelvin a celsius

  const fetchWeatherData = async() => {
    try {
      const response = await fetch(`${urlBase}?appid=${API_KEY}&q=${city}&lang=es`)
      const data =  await response.json()
      data.cod == 200 ? setWeatherData(data) : setWeatherData(weatherData)
      console.log(data)
    } catch (error) {
      console.error('Ha ocurrido un error: ', error)
    }
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    fetchWeatherData()
  }

  const focusRef = useRef()

  useEffect(() => {
    focusRef.current.focus()
  }, [])
  

  return (
    <div className='container'>
      <h1>App de Clima</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Ingrese una ciudad' 
          value={city}  
          onChange={handleCityChange}
          ref={focusRef}
        />
        <button>Buscar</button>
      </form>

      {weatherData && 
        weatherData.cod === 200 && 
          (
            <div>
              <h2>{weatherData.name},{weatherData.sys.country}</h2>
              <p>La temperatura actual es: {Math.floor(weatherData.main.temp - difKelvin)} °C</p>
              <p>La sensación térmica es: {Math.floor(weatherData.main.feels_like - difKelvin)} °C</p>
              <p>La condición meteorológica actual: {weatherData.weather[0].description}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt={weatherData.weather[0].description} 
              />
            </div>
          )                  
      }
    </div>
  )
}
