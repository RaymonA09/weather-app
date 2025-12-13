import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import { Search, MapPin, Loader2, Navigation } from "lucide-react";
import SearchIcon from "../assets/images/icon-search.svg";


export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);


  const wrapperRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsGettingSuggestions(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchTerm
        )}&count=5&language=en&format=json`
      );
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    } finally {
      setIsGettingSuggestions(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setShowSuggestions(true);
    debouncedFetch(val);
  };

  const handleSelect = (city) => {
    const parts = [city.name];
    if (city.admin1) parts.push(city.admin1);
    if (city.country) parts.push(city.country);
    const locationString = parts.join(", ");

    setQuery(locationString);
    setShowSuggestions(false);
    onSearch(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      onSearch(query);
    }
  };

  const handleKeyDown = (e) => {
  if (!showSuggestions || suggestions.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setHighlightedIndex((prev) =>
      prev < suggestions.length - 1 ? prev + 1 : 0
    );
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    setHighlightedIndex((prev) =>
      prev > 0 ? prev - 1 : suggestions.length - 1
    );
  }

  if (e.key === "Enter") {
    if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
      e.preventDefault();
      handleSelect(suggestions[highlightedIndex]);
    }
  }

  if (e.key === "Escape") {
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  }
};

  return (
    <div ref={wrapperRef} className="w-full flex gap-6 mt-10 mb-12 flex-col justify-center items-center">
          <h1 className="xl:text-6xl text-5xl text-white font-raleway font-semibold tracking-light text-center"> How's the sky looking today? </h1> 

      <form onSubmit={handleSubmit} className="w-full max-w-xl relative">
        <div className="relative w-full flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 gap-3 focus-within:border-white focus-within:bg-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition">
          <img src={SearchIcon} alt="Search Icon" />
          <Input
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={handleChange}
            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 h-10 text-lg flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading}
            className="bg-[#7B8CFF] hover:bg-[#6a7ae8] shadow-[0_0_20px_rgba(123,140,255,0.4)] transition text-white rounded-xl h-11 w-11 mr-1 flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && query.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl  border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-50"
            >
              {isGettingSuggestions ? (
                <div className="p-4 flex items-center justify-center text-white/50 gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Finding cities...</span>
                </div>
              ) : suggestions.length > 0 ? (
                <ul className="py-2">
                  {suggestions.map((city, index) => (
                    <li key={city.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(city)}
                        className={`w-full text-left px-4 py-3 transition-colors flex items-center gap-3 text-white
    ${highlightedIndex === index ? "bg-[#7B8CFF]/25" : "hover:bg-white/10"}`}
                      >
                        <div className="p-2 bg-white/5 rounded-full text-white/70 flex items-center justify-center">
                          <Navigation className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{city.name}</span>
                          <span className="text-xs text-white/40">
                            {[city.admin1, city.country].filter(Boolean).join(", ")}
                          </span>
                        </div>
                        {city.country_code && (
                          <span className="ml-auto text-xs font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/50 uppercase">
                            {city.country_code}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-white/40 text-sm">No cities found</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
