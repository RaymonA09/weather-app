import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { useState } from 'react'
import { Card, CardContent } from './ui/card';
import sunnyIcon from "../assets/images/icon-sunny.webp";
import cloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import rainyIcon from "../assets/images/icon-rain.webp";
import stormyIcon from "../assets/images/icon-storm.webp";
import drizzelIcon from "../assets/images/icon-drizzle.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import dropDownIcon from "../assets/images/icon-dropdown.svg";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function HourlyForecast() {

    // const [selectedDay, setselectedDay] = useState(days[0]);

    const hourlyData = [
        {time: "1 AM", icon: sunnyIcon, temp: 16},
        {time: "2 AM", icon: cloudyIcon, temp: 15},
        {time: "3 AM", icon: rainyIcon, temp: 15},
        {time: "4 AM", icon: stormyIcon, temp: 14},
        {time: "5 AM", icon: drizzelIcon, temp: 14},
        {time: "6 AM", icon: fogIcon, temp: 13},
        {time: "7 AM", icon: snowIcon, temp: 13},
        {time: "8 AM", icon: fogIcon, temp: 14},
    ];

  return (
    <Card className="h-full bg-[#25253f] border-transparent rounded-3xl py-4">
        <CardContent>
            {/* Header */}
            <div className="flex justify-between items-center mb-2 py-2">
                <h2 className="text-lg font-medium text-white"> Hourly Forecast </h2>
                <Select>
                    <SelectTrigger className="w-[120px] h-10 bg-[#3c3b5d] text-white rounded-md flex items-center justify-center">
                        <SelectValue placeholder={days[0]} /> <img src={dropDownIcon} alt="dropdown icon" className='ml-2' />
                    </SelectTrigger>
                    <SelectContent className='w-[150px] p-2 bg-[#25253f] border border-[#3a3a56] text-white rounded-md 
                    -translate-x-7 md:-translate-x-7 lg:-translate-x-7.5 xl:-translate-x-7'  
                    position="popper" side="bottom" sideOffset={5}>

                        <SelectGroup sideOffset={8}>
                            {days.map((day) => (
                                <SelectItem key={day} value={day.toLowerCase()} className='p-2 hover:bg-[#2f2f49] rounded-md'> {day} </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='h-full flex flex-col gap-3'>
                {hourlyData.map((hour, index) => (
                    <div key={index} className='flex justify-between items-center p-2 bg-[#2f2f49] border border-[#3a3a56] rounded-md '>
                        <div className='flex items-center gap-2'>
                            <img src={hour.icon} alt="weather icon" className='w-10 h-10'/> <span className='text-l font-semibold text-white/80'> {hour.time} </span>
                        </div>
                        <span className='text-l font-light text-white/80'> {hour.temp}° </span>

                    </div>
                ))}
            </div>



        </CardContent>
    </Card>
    )
}
