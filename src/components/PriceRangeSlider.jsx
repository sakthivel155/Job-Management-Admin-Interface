import React, { useState, useEffect } from 'react';

const PriceRangeSlider = ({
  min = 50,
  max = 80,
  title = "Salary Per Month",
  onChange,
  width = "300px",
  currencyText = "₹",
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  
  // Handle min value change
  const handleMinChange = (e) => {
    const newMinVal = Math.min(parseInt(e.target.value), maxVal - 1);
    setMinVal(newMinVal);
  };
  
  // Handle max value change
  const handleMaxChange = (e) => {
    const newMaxVal = Math.max(parseInt(e.target.value), minVal + 1);
    setMaxVal(newMaxVal);
  };
  
  // Calculate percentages for slider positioning
  const minPos = ((minVal - min) / (max - min)) * 100;
  const maxPos = ((maxVal - min) / (max - min)) * 100;
  const rangeWidth = maxPos - minPos;
  
  // Notify parent component when values change
  useEffect(() => {
    if (onChange) {
      onChange({ min: minVal, max: maxVal });
    }
  }, [minVal, maxVal, onChange]);

  return (
    <div style={{ width, position: 'relative' }}>
      {/* Title and range display */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{title}</span>
        <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
          {currencyText}{minVal}k - {currencyText}{maxVal}k
        </span>
      </div>
      
      {/* Slider container */}
      <div style={{ position: 'relative', height: '30px' }}>
        {/* Track background */}
        <div 
          style={{ 
            position: 'absolute', 
            height: '2px', 
            width: '100%', 
            backgroundColor: '#cecece', 
            top: '50%', 
            transform: 'translateY(-50%)'
          }}
        />
        
        {/* Selected range */}
        <div 
          style={{ 
            position: 'absolute', 
            height: '2px', 
            left: `${minPos}%`, 
            width: `${rangeWidth}%`, 
            backgroundColor: '#000', 
            top: '50%', 
            transform: 'translateY(-50%)'
          }}
        />
        
        {/* Min thumb */}
        <input 
          type="range" 
          min={min} 
          max={max} 
          value={minVal}
          onChange={handleMinChange}
          style={{
            position: 'absolute',
            width: '100%',
            appearance: 'none',
            background: 'transparent',
            pointerEvents: 'none',
            zIndex: 3,
            height: '20px',
            margin: 0
          }}
        />
        
        {/* Max thumb */}
        <input 
          type="range" 
          min={min} 
          max={max} 
          value={maxVal}
          onChange={handleMaxChange}
          style={{
            position: 'absolute',
            width: '100%',
            appearance: 'none',
            background: 'transparent',
            pointerEvents: 'none',
            zIndex: 3,
            height: '20px',
            margin: 0
          }}
        />
        
        {/* Visible min thumb */}
        <div 
          style={{ 
            position: 'absolute', 
            height: '12px', 
            width: '12px', 
            borderRadius: '50%', 
            backgroundColor: '#fff', 
            border: '4px solid #000', 
            top: '50%', 
            left: `${minPos}%`, 
            transform: 'translate(-50%, -50%)', 
            zIndex: 5,
            pointerEvents: 'none'
          }}
        />
        
        {/* Visible max thumb */}
        <div 
          style={{ 
            position: 'absolute', 
            height: '12px', 
            width: '12px', 
            borderRadius: '50%', 
            backgroundColor: '#fff', 
            border: '4px solid #000', 
            top: '50%', 
            left: `${maxPos}%`, 
            transform: 'translate(-50%, -50%)', 
            zIndex: 5,
            pointerEvents: 'none'
          }}
        />
      </div>
      
      {/* Custom style for range inputs */}
      <style jsx>{`
        input[type=range]::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
        }
        
        input[type=range]::-moz-range-thumb {
          pointer-events: auto;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default PriceRangeSlider;