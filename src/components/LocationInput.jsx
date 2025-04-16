import React, { useState, useEffect } from 'react';
import { Icons } from './icon';
import { state } from '../data/cityStates'
const LocationInput = ({ onCitySelect ,customStyle ,iconVisible ,placeholder}) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (inputValue) {
      filterCities(inputValue);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [inputValue]);

  const filterCities = (text) => {
    // Create a flat array of all cities with their corresponding state
    const allCitiesWithState = Object.entries(state).flatMap(([stateName, cities]) => 
      cities.map(city => ({ city, stateName }))
    );
    
    // Filter cities based on input text
    const filtered = allCitiesWithState.filter(item => 
      item.city.toLowerCase().includes(text.toLowerCase())
    );
    
    if (filtered.length === 0) {
      setFilteredCities([{ city: 'City Not Found', stateName: '' }]);
    } else {
      setFilteredCities(filtered);
    }
  };

  const handleCitySelect = (city, stateName) => {
    // Only set the city name in the input
    setInputValue(city);
    setShowDropdown(false);
    if (onCitySelect) {
      onCitySelect(city, stateName);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown && !inputValue) {
      // Show some cities when dropdown is opened with empty input
      const firstState = Object.keys(state)[0];
      const initialCities = state[firstState].slice(0, 10).map(city => ({ 
        city, 
        stateName: firstState 
      }));
      setFilteredCities(initialCities);
    }
  };

  return (
    <div className={`${customStyle} relative`}>
      <div className="flex items-center justify-between relative h-12 rounded px-3 gap-5">
      
      {iconVisible && <img src={Icons.locationIcon} alt="location" className="w-[18px] mr-2" /> } 
        <input
          type="text"
          className="w-full placeholder:font-[500] outline-none"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <img 
          src={Icons.dropDownIcon} 
          alt="dropdown" 
          className="cursor-pointer"
          onClick={toggleDropdown}
        />
      </div>

      {showDropdown  && (
        <ul className="absolute z-10 bg-white w-full mt-1 border border-gray-300 rounded-lg max-h-60 overflow-auto">
          {  filteredCities.map((item, index) => (
            <li
              key={index}
              className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCitySelect(item.city)}
            >
              {item.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;