export async function fetchWeatherData(location) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m&current=temperature_2m,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
    ;

    const res = await fetch(url);
    const data = await res.json();

    return data;

}

