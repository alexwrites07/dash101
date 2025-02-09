import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TeacherImage from '../../assets/home/school-teacher-explaining-geography-lesson-pupil-tutor-showing-world-map-student-kid.png';
import TuitionCards from './DemoCatagory';
import Catagories from './Catagories';
import FeaturedJobs from './Jobs/Jobs';
import FeaturedReviews from './Jobs/FeaturedReviews';
import FrequentlyHiringCompanies from './Jobs/Frequently';
import HiringSection from './Jobs/HiringSection';
import TeachingSection from './Jobs/TeachingSection';
import TestimonialSection from './Testimonial';
import Footersection from './Footer';
import Newssection from './Recentnews';
import './Home.css';

function HomePage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/demo-form');
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16 w-full max-w-screen-xl mx-auto" >
      <div className="flex flex-col md:flex-row items-center w-full" data-aos="fade-up">
        <div className="md:w-3/5 lg:w-1/2 text-center md:text-left" data-aos="fade-right">
          <h1 className="text-2xl md:text-5xl text-[#041F96] font-bold mb-4">
            Find your perfect tutor now
          </h1>
          <p className="text-lg text-gray-700 mb-4" data-aos="zoom-in">
            7 Thousand+ tutors | 20 Thousand+ tuition/tutoring job postings | 100+ School/Coaching institutes
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <button
              className="py-2 px-4 bg-[#041F96] text-white rounded-lg hover:bg-[#041F96] focus:outline-none w-full md:w-auto"
              onClick={handleRedirect}
              data-aos="fade-left"
            >
              Book your tuition tutor
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 px-4" data-aos="zoom-in">
          <img src={TeacherImage} alt="Teacher" className="rounded-lg w-full max-w-[90%] md:max-w-sm lg:max-w-md" />
        </div>
      </div>

      {/* Sections */}
      <div className="w-full min-w-full" data-aos="fade-up"><TuitionCards /></div>
      <div className="w-full min-w-full" data-aos="fade-right"><Catagories /></div>
      <div className="w-full min-w-full" ><FeaturedJobs /></div>
      <div className="w-full min-w-full" data-aos="fade-up"><FrequentlyHiringCompanies /></div>
      <div className="w-full min-w-full" data-aos="zoom-in"><HiringSection /></div>
      <div className="w-full min-w-full" data-aos="fade-up"><FeaturedReviews /></div>
      <div className="w-full min-w-full" data-aos="fade-right"><TeachingSection /></div>
    </div>
  );
}

export default HomePage;
