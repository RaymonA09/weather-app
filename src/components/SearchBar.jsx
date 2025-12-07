import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import SearchIcon from "../assets/images/icon-search.svg";
import { Popover, PopoverContent } from '@radix-ui/react-popover';
import { Command, CommandEmpty, CommandItem, CommandList } from './ui/command';

export default function SearchBar({ onSearch }) {

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
        )
        const data = await res.json();

        const results = data?.results?.slice(0, 5) || []
        setSuggestions(results)
        setOpen(true)

      } catch (error) { 
        console.error("Error fetching location data:", error);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);




  function handleSearch() {
    if (!query.trim()) return
    onSearch(query)
    setOpen(false);
  }

  function handleSelect(city) {
    setQuery(city);
    onSearch(city);
    setOpen(false);
  }
  

return ( 
  <div className='w-full flex gap-15 mt-15 mb-10 flex-col justify-center items-center'> 
    <h1 className="xl:text-6xl text-5xl font-semibold text-center"> How's the sky looking today? </h1> 

      <div className='flex flex-col sm:flex-row w-full max-w-xl xl:max-w-2xl items-center gap-2 rounded-md sm:h-12'>
          <div className="group flex bg-[#1E1F38] rounded-md items-center w-full h-12 sm:h-full pl-5 gap-2 border border-transparent transition-all focus-within:border-[#6b6e90]">
            <img src={SearchIcon} alt="Search Icon" />
            <Input
              placeholder="Search for a city..."
              className="bg-transparent border-0 text-white"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <Button className='bg-[#4657d9] hover:bg-[#2c1b9d] h-12 w-full sm:h-full sm:w-24'> Search </Button> 
      </div> 
    </div>
  )
}