import React from 'react'
import sunnyIcon from "../assets/images/icon-sunny.webp";
import cloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import rainyIcon from "../assets/images/icon-rain.webp";
import stormyIcon from "../assets/images/icon-storm.webp";
import drizzelIcon from "../assets/images/icon-drizzle.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import snowIcon from "../assets/images/icon-snow.webp";

export default function DailyForecast() {

    const dailyData = [
        {day: "Tue", icon: sunnyIcon, high: 25, low: 15},
        {day: "Wed", icon: cloudyIcon, high: 22, low: 14},
        {day: "Thu", icon: rainyIcon, high: 20, low: 13},
        {day: "Fri", icon: stormyIcon, high: 18, low: 12},
        {day: "Sat", icon: drizzelIcon, high: 24, low: 16},
        {day: "Sun", icon: fogIcon, high: 23, low: 15},
        {day: "Mon", icon: snowIcon, high: 21, low: 14}
    ]

  return (
    <div className='text-xl font-semibold'>
        <h1>Daily Forecast</h1>
    <div className='grid grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 mt-2'>
        {dailyData.map((day) => (
            <div key={day.day} className="bg-[#1E213A] border border-[#3a3a56] p-4 rounded-lg flex flex-col items-center">
                <h3 className="text-sm text-gray-400 mb-2">{day.day}</h3>
                <img src={day.icon} alt={day.icon} className='w-12 h-12 mb-2'/>
                <div>
                    <span className="text-lg font-semibold mr-2">{day.high}°</span>
                    <span className="text-lg text-gray-400">{day.low}°</span>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}
