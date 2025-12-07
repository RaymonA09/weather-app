export async function fetchLocationData(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('No results found');
  }

  const result = data.results[0];
  return {
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    country: result.country
  };
}

