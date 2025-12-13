// components/search/useSearchLogic.js

import { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";

export default function useSearchLogic(onSelectCallback) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch API
  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsGettingSuggestions(true);

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchTerm
        )}&count=5&language=en&format=json`
      );

      const data = await res.json();
      setSuggestions(data.results || []);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    } finally {
      setIsGettingSuggestions(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

  // Keyboard navigation logic
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;

      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          onSelectCallback(suggestions[highlightedIndex]);
        } else if (suggestions.length > 0) {
          onSelectCallback(suggestions[0]); // auto-select first
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;

      default:
        break;
    }
  };

  return {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    highlightedIndex,
    isGettingSuggestions,
    wrapperRef,
    handleKeyDown,
    handleChange: (e) => {
      const val = e.target.value;
      setQuery(val);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
      debouncedFetch(val);
    },
    setShowSuggestions,
    setHighlightedIndex,
  };
}
