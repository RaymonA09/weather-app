import React from 'react'
import { useEffect, useState } from 'react';
import { fetchWeatherData } from '@/api/weather';
import { useUnits } from '@/context/UnitsContext';
import { Skeleton } from './ui/skeleton';



export default function StatsGrid({ location }) {

  const [weatherData, setWeatherData] = useState(null);
  const { units } = useUnits()

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try { 
        const data = await fetchWeatherData(location);
        setWeatherData(data);
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          <Skeleton className="h-4 w-20 mb-3 bg-white/20" />
          <Skeleton className="h-6 w-24 bg-white/30" />
        </div>
      ))}
    </div>
  )
}


  const current = weatherData.current;
  const Humidity = current.relative_humidity_2m;
  const WindSpeed = current.wind_speed_10m;
  const UVIndex = current.uv_index;
  const Visibility = current.visibility; // convert to km

  const wind = units.wind === "kmh" ? `${WindSpeed} km/h` : `${Number(WindSpeed * 0.621371).toFixed(2)} mph`;
  const visibility = units.precipitation === "mm" ? `${Visibility/1000} km` : `${Number(Visibility * 0.0393701).toFixed(2)} in`


const stats = [
    {label: "Humidity", value: `${Humidity}%`},
    {label: "Wind Speed", value: wind},
    {label: "UV Index", value: `${UVIndex}`},
    {label: "Precipitation", value: visibility}
];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/5 transition text-white p-4 rounded-2xl flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                <h3 className="text-sm text-white/60 mb-2">{stat.label}</h3>
                <p className="text-xl font-semibold text-white">{stat.value}</p>
            </div>
        ))}
    </div>
  )
}
