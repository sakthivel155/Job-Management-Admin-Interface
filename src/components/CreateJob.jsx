import React, { useState, useEffect, useRef } from "react";
import LocationInput from "./LocationInput";
import { Icons } from "./icon";

export function CreateJob({ setCreateJobs }) {
  const sectionRef = useRef(null);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobType, setJobType] = useState("fulltime");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", message: "" });

  // Update the newJobPost state whenever any of the form fields change
  const [newJobPost, setNewJobPost] = useState({
    job_title: "",
    company_name: "",
    job_type: "fulltime",
    location: "",
    experience_level: "",
    job_description: "",
    min_salary: "",
    max_salary: "",
    brand_logo_img_url: "",
    application_deadline: "2025-05-29T18:30:00.000Z"
  });

  // Check for saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('jobPostDraft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setJobTitle(draftData.job_title || "");
        setCompanyName(draftData.company_name || "");
        setJobType(draftData.job_type || "fulltime");
        setLocation(draftData.location || "");
        setMinSalary(draftData.min_salary || "");
        setMaxSalary(draftData.max_salary || "");
        setJobDescription(draftData.job_description || "");
        setDeadline(draftData.application_deadline ? draftData.application_deadline.split('T')[0] : "");
        setStatusMessage({ type: "info", message: "Draft loaded successfully." });
        
        // Clear the message after 3 seconds
        setTimeout(() => {
          setStatusMessage({ type: "", message: "" });
        }, 3000);
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, []);

  // Update newJobPost whenever any form field changes
  useEffect(() => {
    setNewJobPost({
      job_title: jobTitle,
      company_name: companyName,
      job_type: jobType,
      experience_level: "1-3",
      location: location,
      max_salary: maxSalary,
      job_description: jobDescription,
      min_salary: minSalary,
      application_deadline: deadline || "2025-05-29T18:30:00.000Z"
    });
  }, [jobTitle, companyName, jobType, location, minSalary, maxSalary, jobDescription, deadline]);

  // Handle location selection from LocationInput component
  const handleLocationSelect = (city, stateName) => {
    setLocation(city);
  };

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setStatusMessage({ type: "info", message: "Submitting job posting..." });
      
      const response = await fetch('https://job-management-admin-backend-y40m.onrender.com/api/set-job-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJobPost)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create job');
      }
      
      const data = await response.json();
      console.log('Job created successfully:', data);
      setStatusMessage({ type: "success", message: "Job posted successfully!" });
      
      // Clear draft after successful submission
      localStorage.removeItem('jobPostDraft');
      
      // Wait for 1.5 seconds to show success message before closing and refreshing
      setTimeout(() => {
        setCreateJobs(false); // Close the modal on success
        window.location.reload(); // Refresh the page to show the new job
      }, 1500);
      
    } catch (error) {
      console.error('Error creating job:', error);
      setStatusMessage({ type: "error", message: "Error to creating job Post. Please fill out this field" });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle saving draft
  const handleSaveDraft = () => {
    try {
      setIsSavingDraft(true);
      setStatusMessage({ type: "info", message: "Saving draft..." });
      
      // Save to localStorage
      localStorage.setItem('jobPostDraft', JSON.stringify(newJobPost));
      
      setTimeout(() => {
        setStatusMessage({ type: "success", message: "Draft saved successfully!" });
        
        // Clear success message after 2 seconds
        setTimeout(() => {
          setStatusMessage({ type: "", message: "" });
        }, 2000);
        
        setIsSavingDraft(false);
      }, 500);
      
    } catch (error) {
      console.error('Error saving draft:', error);
      setStatusMessage({ type: "error", message: "Error saving draft. Please try again." });
      setIsSavingDraft(false);
    }
  };

  // Handle job type selection
  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div
        ref={sectionRef}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-4xl scale-[80%]"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Job Opening</h2>
        
        {/* Status Message */}
        {statusMessage.message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            statusMessage.type === "success" ? "bg-green-100 text-green-800" :
            statusMessage.type === "error" ? "bg-red-100 text-red-800" :
            "bg-blue-100 text-blue-800"
          }`}>
            {statusMessage.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="jobTitle" className="block text-gray-600 text-[20px] mb-2 font-[600]">Job Title</label>
                <input 
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  type="text" 
                  name="jobTitle" 
                  id="jobTitle" 
                  placeholder="Job Title, Role" 
                  className="w-full font-[600] text-[18px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-gray-600 text-[20px] mb-2 font-[600]">Location</label>
                <LocationInput 
                  placeholder="Choose Preferred Location" 
                  iconVisible={false} 
                  onCitySelect={handleLocationSelect}
                  customStyle="w-full text-[16px] text-[#656565] border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-700" 
                  initialValue={location}
                />
              </div>
              
              <div>
                <label htmlFor="salary" className="block text-gray-600 text-[20px] mb-2 font-[600]">Salary Range</label>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      name="salaryMin" 
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      placeholder="₹0" 
                      className="w-full placeholder:text-[16px] border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12L4 15M4 15L1 12M4 15V1M9 4L12 1M12 1L15 4M12 1V15" stroke="#BCBCBC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <input 
                      required
                      type="text" 
                      name="salaryMax" 
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      placeholder="₹12,00,000" 
                      className="w-full placeholder:text-[16px] border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12L4 15M4 15L1 12M4 15V1M9 4L12 1M12 1L15 4M12 1V15" stroke="#BCBCBC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
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
                    value={jobType}
                    onChange={handleJobTypeChange}
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
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)} 
                    className="text-[#848484] w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
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
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Please share a description to let the candidate know more about the job role"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
            ></textarea>
          </div>
          
          {/* Buttons */}
          <div className="flex justify-between mt-10">
            <button 
              type="button" 
              onClick={handleSaveDraft}
              disabled={isLoading || isSavingDraft}
              className="flex items-center gap-2 border-2 border-gray-600 bg-white text-gray-800 font-bold py-3 px-8 rounded-lg disabled:opacity-50"
            >
              {isSavingDraft ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  Save Draft
                  <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 7.5L5 11.5L1 7.5M9 1.5L5 5.5L1 1.5" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
            <button 
              type="submit"
              disabled={isLoading || isSavingDraft}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-[600] py-3 px-8 rounded-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  Publish
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1.5L11 5.5L7 9.5M1 1.5L5 5.5L1 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}