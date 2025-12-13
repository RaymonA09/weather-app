import sunnyIcon from "../assets/images/icon-sunny.webp";
import partlycloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import rainyIcon from "../assets/images/icon-rain.webp";
import stormyIcon from "../assets/images/icon-storm.webp";
import drizzelIcon from "../assets/images/icon-drizzle.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import cloudyIcon from "@/assets/images/icon-overcast.webp";

export function getWeatherIcon(code) {
  // Clear → Partly cloudy → Overcast
  if (code === 0 || code === 1) return sunnyIcon;
  if (code === 2) return partlycloudyIcon;
  if (code === 3) return cloudyIcon;

  // Fog
  if (code === 45 || code === 48) return fogIcon;
  // Drizzle
  if (code >= 51 && code <= 57) return drizzelIcon;

  // Rain + Showers
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))
    return rainyIcon;
  // Snow
  if (
    (code >= 71 && code <= 77) ||
    code === 85 ||
    code === 86
  ) return snowIcon;

  // Thunderstorms
  if (code === 95 || code === 96 || code === 99)
    return stormyIcon;
  // Fallback
  return sunnyIcon;
}