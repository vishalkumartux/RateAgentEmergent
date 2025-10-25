import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, TrendingUp, X } from 'lucide-react';
import { Input } from './ui/input';

const SearchWithAutocomplete = ({ 
  value, 
  onChange, 
  onSearch,
  placeholder = "Search location, suburb, or city...",
  suggestions = [],
  popularSearches = [],
  className = "",
  showIcon = true,
  size = "default" // "sm", "default", "lg"
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (value && value.length > 0) {
      const filtered = suggestions.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value, suggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion) => {
    onChange({ target: { value: suggestion } });
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  const handleInputChange = (e) => {
    onChange(e);
    if (e.target.value.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    onChange({ target: { value: '' } });
    setShowSuggestions(false);
  };

  const sizeClasses = {
    sm: 'h-10 text-sm',
    default: 'h-12 text-base',
    lg: 'h-14 text-lg'
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        {showIcon && (
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        )}
        <Input
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          className={`${showIcon ? 'pl-12' : 'pl-4'} pr-10 ${sizeClasses[size]} 
            border-2 border-gray-200 dark:border-gray-600 
            focus:border-primary focus:ring-2 focus:ring-primary/20
            transition-all duration-200
            dark:bg-gray-700 dark:text-white`}
        />
        {value && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (filteredSuggestions.length > 0 || popularSearches.length > 0) && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-xl overflow-hidden">
          {/* Filtered Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="border-b border-gray-100 dark:border-gray-700">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900">
                Suggestions
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-3 group"
                >
                  <MapPin className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors" />
                  <span className="text-gray-900 dark:text-white group-hover:text-black transition-colors">
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {popularSearches.length > 0 && !value && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900 flex items-center">
                <TrendingUp className="h-3 w-3 mr-2" />
                Popular Searches
              </div>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-3 group"
                >
                  <TrendingUp className="h-4 w-4 text-black group-hover:text-black transition-colors" />
                  <span className="text-gray-900 dark:text-white group-hover:text-black transition-colors">
                    {search}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWithAutocomplete;
