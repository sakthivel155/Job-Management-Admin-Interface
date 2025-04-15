import React from 'react'
import './App.css'
import { Icons } from './components/icon'
import DropdownExample from './components/Dropdown'
import { SalaryRangeFilter } from './components/SimpleSalaryRangeSlider'

function App() {

  return (
    <>
       <header className='bg-[#C6BFBF40] shadow-[0px_0px_14px_0px_rgba(198,191,191,0.25)] flex flex-col items-center py-5 gap-5'>
       {/* Navbar Section */}
        <section className='flex items-center gap-10 font-[600] bg-[#FCFCFC] px-6 py-4 rounded-full shadow-[0px_0px_20px_0px_rgba(127,127,127,0.15)]'>

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
              <button className='bg-gradient-to-tr  from-[#A128FF] to-[#6100AD] text-white px-4 py-2 rounded-full'>Create Jobs</button>
          </section>
          {/* Search and Filter Section */}
          <section className='w-full '>
              <div className='flex items-center justify-around mx-30 '>
                <div className='flex gap-5'>
                    <img src={Icons.searchIcon} alt="search" className='w-[18px]' />
                    <input type="text" className='w-[179px] placeholder:font-[500] outline-none' placeholder='Search By Job Title, Role'  />
            </div>
            <div className='relative flex gap-5'>
            <div className=' absolute h-[48px] border-[1.5px] border-[#cbcbcb] left-[-40px] top-[-12px]'></div>
                    <img src={Icons.locationIcon} alt="location" className='w-[18px]' />
                    <input type="text"  className='w-[179px] placeholder:font-[500] outline-none' placeholder='Preferred Location'  />
                  <img src={Icons.dropDownIcon} alt="" />
                </div>
            <div className='relative flex gap-5'>
            <div className=' absolute h-[48px] border-[1.5px] border-[#cbcbcb] left-[-40px] top-[-12px]'></div>
                   <img src={Icons.jobTypeIcon} alt="jobType" className='w-[18px]' />
                    <DropdownExample/>
                </div>
            <div className='relative flex gap-5'>
            <div className=' absolute h-[48px] border-[1.5px] border-[#cbcbcb] left-[-40px] top-[5px]'></div>
                    <SalaryRangeFilter />
                </div>
              </div>
          </section>
       </header>
    </>
  )
}

export default App
