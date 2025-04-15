import React, { useState } from 'react';


// Rename the component to SalaryRangeFilter
const SalaryRangeFilter = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(80);

  return (
    <div className="w-[248px] max-w-sm mb-6">
      <div className="flex justify-between mb-1">
        <div className="text-[16px] font-[600] ">Salary Per Month</div>
        <div className="text-[16px] font-[600]">₹50k - ₹80k</div>
      </div>
      
      <div className="relative h-1 mt-4">
        {/* Track line */}
        <div className="absolute w-full h-[2px] bg-[#CCC2C2]"></div>
        
        <div className={`absolute  w-[${maxValue}%]  h-[2px]  bg-[#000000]`}></div>

        {/* Min thumb */}
        <div
          className="absolute w-4 h-4 bg-black rounded-full -mt-2 -ml-2"
          style={{ left: `${minValue}%` }}
        >
          <div className='absolute h-[5px] w-[5px] border-amber-50 bg-white rounded-full  mt-[5px] ml-[5px]'></div>
        </div>
        

        {/* Max thumb */}
        <div
          className="absolute w-4 h-4 bg-black rounded-full -mt-2 -ml-2"
          style={{ left:  `${maxValue}%` }}
        >     <div className='absolute h-[5px] w-[5px] border-amber-50 bg-white rounded-full  mt-[5px] ml-[5px]'></div></div>
      </div>
    </div>
  );
};

// Export it as a named export
export { SalaryRangeFilter };

// You can also keep the default export if needed
export default SalaryRangeFilter;