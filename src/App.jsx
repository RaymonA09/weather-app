import React from 'react';
import Header from "./components/Header";
import SearchBar from './components/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import StatsGrid from './components/StatsGrid';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecase';

function App() {

  const [location, setLocation] = React.useState({
    latitude: 37.7749,
    longitude: -122.4194,
    city: "San Francisco"
  });

  async function handleSearch(city) {
  if (city.latitude && city.longitude) {
    setLocation({
      latitude: city.latitude,
      longitude: city.longitude,
      city: city.name
    });
    return;
  }

  // fallback if user typed manually
  const geocoding = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );
  const geoData = await geocoding.json();

  if (geoData.results && geoData.results.length > 0) {
    const result = geoData.results[0];
    setLocation({
      latitude: result.latitude,
      longitude: result.longitude,
      city: result.name
    });
  } else {
    alert('City not found');
  }
}

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-[#1B1D29] via-[#23344D] to-[#41689B] text-white">
      <div className="max-w-[1440px]
      xl:w-[85%] lg:w-[80%] md:w-[95%]
      mx-auto 
      py-10 lg:py-20
      px-4">
        <Header />
        <SearchBar onSearch={handleSearch}/>

        {/* LEFT COLUMN (2/3 width) */}
        <div className="w-full mx-auto grid grid-cols-1 xl:grid-cols-[69%_30%] gap-[1%] mt-6">

          {/* Left column components */} 
          <div className="flex flex-col gap-8">
            <CurrentWeatherCard location={location} />
            <StatsGrid location={location} />
            <DailyForecast location={location} />
          </div>

          {/* RIGHT COLUMN (1/3 width) */}
          <div className="h-full flex flex-col mt-8 xl:mt-0">
            <HourlyForecast location={location} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
