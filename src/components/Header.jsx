import React from 'react'
import Logo from "../assets/images/logo.svg";
import UnitIcon from "../assets/images/icon-units.svg";
import DropIcon from "../assets/images/icon-dropdown.svg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';
import { useUnits } from '@/context/UnitsContext';

export default function Header() {

    const {units, updateUnit, setMetric, setImperial} = useUnits();

    const isMetric = units.temperature === "celsius";

  return (
    <header className="w-full flex justify-between items-center">
        {/* Logo */}
        <img src={Logo} alt="Weather App Logo" />

        {/* Settings Dropdown */}
        <DropdownMenu>
            <DropdownMenuTrigger  asChild>

                <Button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm text-white"> <img src={UnitIcon} alt="Units Icon"/> Units <img src={DropIcon} alt="Dropdown Icon"/></Button>
            </DropdownMenuTrigger>
    
            <DropdownMenuContent className='bg-white/10 backdrop-blur-xl border border-white/20 w-50 p-3 rounded-xl shadow-md  -translate-x-3.5 md:-translate-x-8.5 lg:-translate-x-11.5 z-50' sideOffset={8}>
                <DropdownMenuItem className='mb-2 py-1 pl-1 hover:bg-white/20 rounded-md' onClick={() => {
                    isMetric ? setImperial() : setMetric();
                }}> {isMetric ? "Switch to Imperial" : "Switch to Metric"} </DropdownMenuItem>

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-gray-400 mb-1 pl-1"> Temperature Units </DropdownMenuLabel>
                    <DropdownMenuItem className='p-1 hover:bg-white/20 rounded-md' onClick={() => updateUnit("temperature", "celsius")}> Celsius (°C) {units.temperature === "celsius" && "✓"}</DropdownMenuItem>
                    <DropdownMenuItem className='p-1 hover:bg-white/20 rounded-md' onClick={() => updateUnit("temperature", "fahrenheit")}> Fahrenheit (°F) {units.temperature === "fahrenheit" && "✓"} </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className='my-2 bg-gray-600 h-0.5' />

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-gray-400 mb-1 pl-1"> Wind Speed </DropdownMenuLabel>
                    <DropdownMenuItem className='p-1 hover:bg-white/20 rounded-md' onClick={() => updateUnit("wind", "kmh")}>km/h {units.wind === "kmh" && "✓"} </DropdownMenuItem>
                    <DropdownMenuItem className='p-1 hover:bg-white/20 rounded-md' onClick={() => updateUnit("wind", "mph")}>mph {units.wind === "mph" && "✓"} </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className='my-2 bg-gray-600 h-0.5' />

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-gray-400 mb-1 pl-1" > Precipitation </DropdownMenuLabel>
                    <DropdownMenuItem className='p-1 hover:bg-white/20 rounded-md' onClick={() => updateUnit("precipitation", "mm")}>Millimeters (mm) {units.precipitation === "mm" && "✓"}</DropdownMenuItem>
                    <DropdownMenuItem className='p-1 hover:bg-white/20 rounded-md' onClick={() => updateUnit("precipitation", "in")}>Inches (in) {units.precipitation === "in" && "✓"}</DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>


        </DropdownMenu>



    </header>
  )
}