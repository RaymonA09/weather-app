import React, { useEffect, useState } from 'react'
import { getWeatherIcon } from '@/lib/weatherIcon';
import { fetchWeatherData } from '@/api/weather';
import { useUnits } from '@/context/UnitsContext';
import { Skeleton } from './ui/skeleton';

export default function DailyForecast({ location }) {

    const [weatherData, setWeatherData] = useState(null);
    const { units } = useUnits();
    

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
    <div>
      <Skeleton className="h-6 w-40 mb-4 bg-white/20" />

      <div className="grid grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-lg border border-white/10 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] flex flex-col items-center"
          >
            <Skeleton className="h-4 w-10 mb-3 bg-white/20" />
            <Skeleton className="w-12 h-12 rounded-full mb-3 bg-white/30" />
            <div className="flex gap-4">
              <Skeleton className="h-5 w-8 bg-white/30" />
              <Skeleton className="h-5 w-8 bg-white/15" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


    const daily = weatherData.daily;

    const getDayName = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    }

    const dailyData = daily.time.map((date, index) => {

        const highC = daily.temperature_2m_max[index];
        const lowC = daily.temperature_2m_min[index];

        const high = units.temperature === "celsius" ? Math.round(highC) : Math.round((highC * 9/5) + 32);
        const low = units.temperature === "celsius" ? Math.round(lowC) : Math.round((lowC * 9/5) + 32);
        
        return {
            day: getDayName(date),
            high,
            low,
            icon: getWeatherIcon(daily.weather_code[index])
        }
    });



  return (
    <div className='text-xl font-semibold '>
        <h1>Daily Forecast</h1>
    <div className='grid grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 mt-2'>
        {dailyData.map((day) => (
            <div key={day.day} className="bg-white/10 backdrop-blur-lg border border-white/10 text-white hover:bg-white/5 transition p-4 rounded-2xl flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                <p className="text-sm text-white/70 mb-2">{day.day}</p>
                <img src={day.icon} alt={day.icon} className='w-12 h-12 mb-2'/>
                <div className='flex gap-5'>
                    <span className="text-lg font-semibold">{day.high}°</span>
                    <span className="text-lg font-semibold text-gray-400">{day.low}°</span>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}
