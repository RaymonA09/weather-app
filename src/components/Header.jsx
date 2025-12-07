import React from 'react'
import Logo from "../assets/images/logo.svg";
import UnitIcon from "../assets/images/icon-units.svg";
import DropIcon from "../assets/images/icon-dropdown.svg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center">
        {/* Logo */}
        <img src={Logo} alt="Weather App Logo" />

        {/* Settings Dropdown */}
        <DropdownMenu>
            <DropdownMenuTrigger  asChild>

                <Button className="bg-[#1E1F38]"> <img src={UnitIcon} alt="Units Icon"/> Units <img src={DropIcon} alt="Dropdown Icon"/></Button>
            </DropdownMenuTrigger>
    
            <DropdownMenuContent className='bg-[#25253f] border border-[#3a3a56] w-50 p-3 rounded-md shadow-md  -translate-x-3.5 md:-translate-x-8.5 lg:-translate-x-11.5' sideOffset={8}>
                <DropdownMenuItem className='mb-2 py-1 pl-1 hover:bg-[#2f2f49] rounded-md'> Switch to Imperial </DropdownMenuItem>

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-gray-400 mb-1 pl-1"> Temperature Units </DropdownMenuLabel>
                    <DropdownMenuItem className='p-1 hover:bg-[#2f2f49] rounded-md'> Celsius (°C) </DropdownMenuItem>
                    <DropdownMenuItem className='p-1 hover:bg-[#2f2f49] rounded-md'> Fahrenheit (°F) </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className='my-2 bg-gray-600 h-0.5' />

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-gray-400 mb-1 pl-1"> Wind Speed </DropdownMenuLabel>
                    <DropdownMenuItem className='p-1 hover:bg-[#2f2f49] rounded-md'>km/h </DropdownMenuItem>
                    <DropdownMenuItem className='p-1 hover:bg-[#2f2f49] rounded-md'>mph </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className='my-2 bg-gray-600 h-0.5' />

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-gray-400 mb-1 pl-1"> Precipitation </DropdownMenuLabel>
                    <DropdownMenuItem className='p-1 hover:bg-[#2f2f49] rounded-md'>Millimeters (mm) </DropdownMenuItem>
                    <DropdownMenuItem className='p-1 hover:bg-[#2f2f49] rounded-md'>Inches (in) </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>


        </DropdownMenu>



    </header>
  )
}