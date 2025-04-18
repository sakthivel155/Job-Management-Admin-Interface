import React, { useState, useEffect } from 'react'
import './App.css'
import { Icons } from './components/icon'
import DropdownExample from './components/Dropdown'
import PriceRangeSlider from './components/PriceRangeSlider'
import { CreateJob } from './components/CreateJob.jsx';
import LocationInput from './components/LocationInput.jsx';
import JobPostCard from './components/JobPostCard.jsx'

function App() {
  const [createJobs, setCreateJobs] = useState(false);

  const [displayJobs, setDisplayJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [options, onChange] = useState(null);

  const fetchJobPost = async () => {
    try {
      const response = await fetch('https://job-management-admin-backend-y40m.onrender.com/api/get-job-post');
      const data = await response.json();
      setDisplayJobs(data.data);
      setFilteredJobs(data.data); // Initialize filtered jobs with all jobs
    }
    catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobPost();
  }, []);

  // Apply filters whenever search criteria changes
  useEffect(() => {
    filterJobs();
  }, [jobTitle, location, displayJobs]);

  // Filter function that applies both location and job title filters
  const filterJobs = () => {
    let results = [...displayJobs];

    // Filter by job title
    if (jobTitle.trim()) {
      results = results.filter(job =>
        job.job_title.toLowerCase().includes(jobTitle.toLowerCase())
      );
    }

    // Filter by location
    if (location.trim()) {
      results = results.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Update filtered jobs
    setFilteredJobs(results);
  };

  const handleCitySelection = (city) => {
    setLocation(city);
  };

  return (
    <div>
      <header className='bg-[#ffffff] shadow-[0px_0px_14px_0px_rgba(198,191,191,0.25)] flex flex-col items-center py-4 gap-5'>
        {/* Navbar Section */}
        <section className='flex items-center gap-10 font-[600] bg-[#FCFCFC] px-6 border-[1px] border-[#FCFCFC] py-4 rounded-full shadow-[0px_0px_20px_0px_rgba(127,127,127,0.15)]'>
          <div>
            <img src="/logo.svg" alt="brand logo" />
          </div>
          <nav className='text-[16px] flex gap-10'>
            <a href="#">Home</a>
            <a href="#">Find Jobs</a>
            <a href="#">Find Talents</a>
            <a href="#">About Us</a>
            <a href="#">Testimonials</a>
          </nav>
          <button onClick={() => setCreateJobs(true)} className='bg-gradient-to-tr from-[#A128FF] to-[#6100AD] text-white px-4 py-2 rounded-full'>
            Create Jobs
          </button>
        </section>
        {/* Search and Filter Section */}
        <section className='w-full'>
          <div className='flex items-center justify-around'>
            <div className='flex gap-5'>
              <img src={Icons.searchIcon} alt="search" className='w-[18px]' />
              <input 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)} 
                type="text" 
                className='w-[179px] placeholder:font-[500] outline-none' 
                placeholder='Search By Job Title, Role' 
              />
            </div>
            <div className='relative flex gap-5'>
              <div className='absolute h-[48px] border-[1.5px] border-[#cbcbcb] left-[-10px]'></div>
              <LocationInput 
                placeholder={'Preferred Location'} 
                iconVisible={true} 
                onCitySelect={handleCitySelection}
                value={location}
              />
            </div>
            <div className='relative flex gap-5'>
              <div className='absolute h-[48px] border-[1.5px] border-[#cbcbcb] left-[-60px] top-[-12px]'></div>
              <DropdownExample options={options} onChange={onChange} />
            </div>
            <div className='relative flex gap-5'>
              <div className='absolute h-[48px] border-[1.5px] border-[#cbcbcb] left-[-40px] top-[5px]'></div>
              <PriceRangeSlider />
            </div>
          </div>
        </section>
      </header>
      <div className="grid gap-5 w-[92%] mx-auto my-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            return (
              <JobPostCard
                key={job.id}
                brand_logo_img_url={job.brand_logo_img_url}
                job_title={job.job_title}
                experience_level={job.experience_level}
                location={job.location}
                max_salary={job.max_salary}
                job_description={job.job_description}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">No jobs match your search criteria.</p>
            <p className="text-gray-500">Try adjusting your search terms or location.</p>
          </div>
        )}
      </div>
      {createJobs && <CreateJob createJobs={createJobs} setCreateJobs={(value) => setCreateJobs(value)} />}
    </div>
  )
}

export default App