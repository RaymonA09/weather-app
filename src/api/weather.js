export async function fetchWeatherData(location) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&minutely_15=visibility&hourly=temperature_2m,relative_humidity_2m,wind_speed_80m,weather_code,visibility,uv_index&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index,visibility,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
    ;
    
    // hourly=temperature_2m,relative_humidity_2m,wind_speed_80m,weather_code,visibility,uv_index
    // current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index,visibility
    // daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto
    const res = await fetch(url);
    const data = await res.json();

    return data;

}

