import React, { useEffect, useState } from 'react'
import BackgroundImage from "../assets/images/bg-today-large.svg";
import { fetchWeatherData } from '@/api/weather';
import { getWeatherIcon } from '@/lib/weatherIcon';
import { useUnits } from '@/context/UnitsContext';
import { Skeleton } from './ui/skeleton';

export default function CurrentWeatherCard({ location }) {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const { units } = useUnits();


  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try { 
        const data = await fetchWeatherData(location);
        setWeatherData(data);

        const icon = getWeatherIcon(data.current.weather_code);
        setWeatherIcon(icon);

      } catch (error) {
        if(error.name !== 'AbortError')
        console.error("Error fetching weather data:", error);
      }
    }
    
    loadWeather();
    return () => controller.abort();
  }, [location]);

if (!weatherData) {
  return (
    <div className="
      flex w-full rounded-3xl h-64 xl:h-3/4 p-8
      bg-white/10 backdrop-blur-2xl
      border border-white/20 shadow-xl
    ">
      <div className="w-full sm:flex justify-between items-center px-5">
        
        {/* Left: City + Date */}
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-8 w-40 rounded-lg bg-white/20" />
          <Skeleton className="h-4 w-28 rounded-md bg-white/10" />
        </div>

        {/* Center: Icon + Temp */}
        <div className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-full bg-white/20" />

          <div className="flex items-start gap-2">
            <Skeleton className="h-20 w-28 rounded-xl bg-white/20" />
            <Skeleton className="h-8 w-10 rounded-md bg-white/10 mt-3" />
          </div>
        </div>

      </div>
    </div>
  )
}

  const current = weatherData.current;
  const tempCelsius = Math.round(current.temperature_2m);

  const temp = units.temperature === "celsius" ? tempCelsius : Math.round((tempCelsius * 9/5) + 32);

  const tempSymbol = units.temperature === "celsius" ? `°C` : `°F`;


  return (
    <div className="flex w-full rounded-3xl h-64 xl:h-3/4 p-8 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl">
      
        <div className='w-full sm:flex justify-between items-center px-5'>
            {/* Left Side - City & Date */}
            <div className='flex flex-col items-center'>
                <h2 className='text-4xl font-raleway font-semibold text-white'>{location.city}</h2>
                <p className='text-white/70 text-md'>{new Date().toDateString()}</p>
            </div>

            {/* Center: Weather Icon */}
            <div className="flex flex-row sm:gap-4 justify-center">
                <img src={weatherIcon} alt="weather" className='w-25 h-25'/>
                <div className='flex'>
                  <h1 className="text-8xl font-raleway font-bold text-white">{temp}</h1>
                    <span className="text-2xl font-semibold text-white pt-3">{tempSymbol}</span>
                </div>
            </div>

        </div>
    </div>
  )
}
