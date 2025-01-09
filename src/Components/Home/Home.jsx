import React from 'react';
import TeacherImage from '../../assets/home/school-teacher-explaining-geography-lesson-pupil-tutor-showing-world-map-student-kid.png';
import TuitionCards from './DemoCatagory';
import Catagories from './Catagories';
import FeaturedJobs from './Jobs/Jobs';
import FrequentlyHiringCompanies from './Jobs/Frequently';
import HiringSection from './Jobs/HiringSection';
import TeachingSection from './Jobs/TeachingSection';
import TestimonialSection from './Testimonial';
import Footersection from './Footer';
import Newssection from './Recentnews';
import './Home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [margin, setMargin] = useState({ margin: '2% 4% 0.5% 4%' });
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/demo-form');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1600) {
        setMargin({ margin: '2% 12% 0.5% 12%' });
      } else {
        setMargin({ margin: '2% 4% 0.5% 4%' });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16 max-w-full mb-2" style={margin}>
      <div className="flex flex-col md:flex-row items-center home2 max-w-full mb-2" style={{ margin: '2% 4% 0.5% 4%' }}>
        <div className="md:w-3/6 container mx-auto lg:w-full lg:ml-12 home1 md:w-4/5">
          <h1 className="text-2xl md:text-5xl text-[#041F96] font-bold mb-4">
          Find your perfect tutor now 
          </h1>
          <p className="text-xl  text-gray-700 mb-4">
  
  <br />  <em>
  7 Thousand+ tutors | 20 Thousand+ tuition/ tutoring jobs postings | 100+ School/ Coaching institutes  
  </em>
 
</p>

          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-1">
            <button
              className="py-2 px-4 bg-[#041F96] text-white rounded-lg hover:bg-[#041F96] focus:outline-none w-full md:w-auto"
              onClick={handleRedirect}>
              Book your tuition tutor
            </button>
          </div>
        </div>
        <div className="mt-8">
          <img
            src={TeacherImage}
            alt="Teacher"
            className="rounded-lg mx-auto"
            style={{ width: '80%', height: '80%' }}
          />
        </div>
      </div>
      <TuitionCards/>
      <Catagories />
      <FeaturedJobs />
      <FrequentlyHiringCompanies />
      <HiringSection />
      <TestimonialSection />
      <TeachingSection />
   

    </div>
  );
}

export default HomePage;
