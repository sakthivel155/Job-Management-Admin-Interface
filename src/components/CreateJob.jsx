import React, { useState, useEffect, useRef } from "react";
import LocationInput from "./LocationInput";
import { Icons } from "./icon";
export function CreateJob({ setCreateJobs }) {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (sectionRef.current && !sectionRef.current.contains(event.target)) {
        setCreateJobs(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCreateJobs]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div
        ref={sectionRef}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-4xl scale-[80%]"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Create Job Opening</h2>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="jobTitle" className="block text-gray-600 text-[20px] mb-2 font-[600]">Job Title</label>
              <input 
                type="text" 
                name="jobTitle" 
                id="jobTitle" 
                placeholder="Job Title, Role" 
                className="w-full font-[600] text-[18px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-gray-600 text-[20px]  mb-2 font-[600]">Location</label>
              {/* <div className="relative ">
                <select 
                  name="location" 
                  id="location"
                  className="w-full text-[16px] text-[#656565] border border-gray-300 rounded-lg p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-700"
                >
                  <option value="Choose Preferred Location">Choose Preferred Location</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9998 1L7.99976 8L0.999756 1" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </div>
              </div> */}
              <LocationInput placeholder={'Choose Preferred Location'} iconVisible={false} customStyle={'w-full text-[16px] text-[#656565] border border-gray-300 rounded-lg  appearance-none focus:outline-none focus:ring-2 focus:ring-gray-700'} />

            </div>
            
            <div>
              <label htmlFor="salary" className="block text-gray-600 text-[20px] mb-2 font-[600]">Salary Range</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    name="salaryMin" 
                    placeholder="₹0" 
                    className="w-full placeholder:text-[16px] border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 12L4 15M4 15L1 12M4 15V1M9 4L12 1M12 1L15 4M12 1V15" stroke="#BCBCBC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </div>
                </div>
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    name="salaryMax" 
                    placeholder="₹12,00,000" 
                    className="w-full placeholder:text-[16px] border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 12L4 15M4 15L1 12M4 15V1M9 4L12 1M12 1L15 4M12 1V15" stroke="#BCBCBC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-gray-600 text-[20px] mb-2 font-[600]">Company Name</label>
              <input 
                type="text" 
                name="companyName" 
                id="companyName" 
                placeholder="Amazon, Microsoft, Swiggy" 
                className="w-full font-[600] text-[18px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </div>
            
            <div>
              <label htmlFor="jobType" className="block text-gray-600 text-[20px] mb-2 font-[600]">Job Type</label>
              <div className="relative text-[#848484]">
                <select 
                  name="jobType" 
                  id="jobType"
                  className="w-full border border-gray-300 rounded-lg p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-700"
                >
                  <option value="fulltime">FullTime</option>
                  <option value="parttime">Part-Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <img src={Icons.dropDownIcon} alt="" />

                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="deadline" className="block text-gray-600 text-[20px] mb-2 font-[600]">Application Deadline</label>
              <div className="relative">
                <input 
                  type="date" 
                  name="deadline" 
                  id="deadline" 
                  className=" text-[#848484] w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
               
              </div>
            </div>
          </div>
        </div>
        
        {/* Job Description - Full Width */}
        <div className="mt-6">
          <label htmlFor="jobDescription" className="block text-gray-600 text-[20px] mb-2 font-[600]">Job Description</label>
          <textarea 
            name="jobDescription" 
            id="jobDescription" 
            rows="6"
            placeholder="Please share a description to let the candidate know more about the job role"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
          ></textarea>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-between mt-10">
          <button 
            type="button" 
            className="flex items-center gap-2 border-2 border-gray-600 bg-white text-gray-800 font-bold py-3 px-8 rounded-lg"
          >
            Save Draft
            <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 7.5L5 11.5L1 7.5M9 1.5L5 5.5L1 1.5" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </button>
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-[600] py-3 px-8 rounded-lg"
          >
            Publish
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1.5L11 5.5L7 9.5M1 1.5L5 5.5L1 9.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  
          </button>
        </div>
      </div>
    </div>
  );
}