import React from 'react'
import { useState } from 'react';
import { Icons } from './icon';

const Dropdown = ({ label, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="dropdown-container" style={{ position: 'relative', width: '200px' }}>
      <div 
        className="dropdown-header" 
        onClick={toggleDropdown}
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>{selectedOption ? selectedOption.label : label}</span>
        <img src={ Icons.dropDownIcon} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} alt="" />
        
      </div>
      
      {isOpen && (
        <div 
          className="dropdown-options"
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            marginTop: '4px',
            zIndex: 10,
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          {options.map((option) => (
            <div 
              key={option.value}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example Usage
const DropdownExample = () => {
  const options = [ 
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: ' Contract', label: ' Contract' },
    { value: 'Internship', label: 'Internship' },
  ];

  const handleChange = (option) => {
    console.log('Selected option:', option);
  };

  return (
  
      <Dropdown 
        label="Job type" 
        options={options} 
        onChange={handleChange}
      />
  );
};

export default DropdownExample;