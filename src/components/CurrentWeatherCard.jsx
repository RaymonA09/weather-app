import React, { useEffect, useState } from 'react'
import BackgroundImage from "../assets/images/bg-today-large.svg";
import Sunny from "../assets/images/icon-sunny.webp";
import { fetchWeatherData } from '@/api/weather';

export default function CurrentWeatherCard({ location }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function loadWeather() {
      try { 
        const data = await fetchWeatherData(location);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    loadWeather();
  }, [location]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const current = weatherData.current;
  const temp = Math.round(current.temperature_2m);
  const weatherCode = current.weather_code;

  return (
    <div className="flex w-full rounded-3xl h-64 xl:h-3/4 p-6 bg-cover items-center" style={{backgroundImage: `url(${BackgroundImage})`}}>
      
        <div className='w-full sm:flex justify-between items-center px-5'>
            {/* Left Side - City & Date */}
            <div className='flex flex-col items-center'>
                <h2 className='text-4xl font-semibold'>{location.city}</h2>
                <p className='text-md text-gray-300'>{new Date().toDateString()}</p>
            </div>

            {/* Center: Weather Icon */}
            <div className="flex flex-row sm:gap-4 justify-center">
                <img src={Sunny} alt="weather" className='w-25 h-25'/>
                <h1 className="text-8xl font-bold text-white">{temp}°</h1>
            </div>

        </div>
    </div>
  )
}
