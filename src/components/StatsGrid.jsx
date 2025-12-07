import React from 'react'

export default function StatsGrid() {

const stats = [
    {label: "Humidity", value: "78%"},
    {label: "Wind Speed", value: "15 km/h" },
    {label: "UV Index", value: "5"},
    {label: "Visibility", value: "10 km"}
];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat) => (
            <div key={stat.label} className="bg-[#1E213A] border border-[#3a3a56] p-4 rounded-lg flex flex-col items-center">
                <h3 className="text-sm text-gray-400 mb-2">{stat.label}</h3>
                <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
        ))}
    </div>
  )
}
