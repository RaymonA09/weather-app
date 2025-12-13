import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card';
import { getWeatherIcon } from '@/lib/weatherIcon';
import { fetchWeatherData } from '@/api/weather';
import { useUnits } from '@/context/UnitsContext';
import { Skeleton } from './ui/skeleton';


export default function HourlyForecast({ location }) {

    const [weatherData, setWeatherData] = useState(null);
    const [selectedDay, setselectedDay] = useState(null);

    const { units } = useUnits();
    


    useEffect(() => {
        async function loadWeather() {
            try {
                const data = await fetchWeatherData(location);
                setWeatherData(data);

                if (data?.hourly?.time?.length >0 ) {
                    const firstDate = new Date(data.hourly.time[0]);
                    const firstDay = firstDate.toLocaleDateString('en-US', { weekday: 'long' });
                    setselectedDay(firstDay);
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }
        loadWeather();
    }, [location]);

if (!weatherData) {
  return (
    <Card className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl py-4 text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      <CardContent>
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
          <Skeleton className="h-5 w-40 bg-white/20" />
          <Skeleton className="h-10 w-32 rounded-xl bg-white/20" />
        </div>

        {/* Hour Rows Skeleton */}
        <div className="flex flex-col gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-3 bg-white/5 border border-white/10 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-full bg-white/20" />
                <Skeleton className="h-4 w-16 bg-white/20" />
              </div>
              <Skeleton className="h-5 w-10 bg-white/30" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

    const hourly = weatherData.hourly;


    const hoursByDay = {};

    hourly.time.forEach((time, index) => {
        const date = new Date(time);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        if (!hoursByDay[dayName]) {
            hoursByDay[dayName] = [];
        }

        const tempCelsius = Math.round(hourly.temperature_2m[index]);
        const temp = units.temperature === "celsius" ? tempCelsius : Math.round((tempCelsius * 9/5) + 32);

        hoursByDay[dayName].push({
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            icon: getWeatherIcon(hourly.weather_code[index]),
            temp: temp,
        });
    });

    const availableDays = Object.keys(hoursByDay);
    const hourlyData = hoursByDay[selectedDay].slice(0, 8); // Get first 8 hours of the selected day

  return (
    <Card className="h-90% bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] rounded-3xl py-4 text-white">
        <CardContent>
            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                <h2 className="text-lg font-semibold tracking-wide text-white"> Hourly Forecast </h2>
                    <Select onValueChange={(value) => setselectedDay(value)} value={selectedDay}>
                    <SelectTrigger className="w-[130px] h-10 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white [&>span]:text-white [&_svg]:stroke-white [&_svg]:opacity-100">
                        <SelectValue placeholder={selectedDay || "Select a Day"} />
                    </SelectTrigger>
                    <SelectContent className='w-[150px] bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl shadow-md
                    -translate-x-7 md:-translate-x-7 lg:-translate-x-7.5 xl:-translate-x-3.5'  
                    position="popper" side="bottom" sideOffset={8}>

                        <SelectGroup>
                            {availableDays.map((day) => (
                                <SelectItem
                                    key={day}
                                    value={day}
                                    className="rounded-lg px-3 py-2 hover:bg-white/5 focus:bg-white/10 cursor-pointer text-white" 
                                    >
                                    {day}
                                </SelectItem>
                            ))}
                         </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='max-h-[650px] overflow-y-auto flex flex-col gap-3'>
                {hourlyData.map((hour, index) => (
                    <div key={index} className='flex justify-between items-center px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 transition rounded-2xl '>
                        <div className='flex items-center gap-3'>
                            <img src={hour.icon} alt="weather icon" className='w-9 h-9'/> <span className='text-sm font-medium text-white/80'> {hour.time} </span>
                        </div>
                        <span className='text-lg font-semibold text-white/80'> {hour.temp}° </span>

                    </div>
                ))}
            </div>



        </CardContent>
    </Card>
    )
}
