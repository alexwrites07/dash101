import React from 'react';
import TeacherImage from '../../assets/home/WhatsApp Image 2024-06-29 at 11.51.36 (1).jpeg';
import Catagories from './Catagories';
import FeaturedJobs from './Jobs/Jobs';
import FrequentlyHiringCompanies from './Jobs/Frequently';
import HiringSection from './Jobs/HiringSection';
import TeachingSection from './Jobs/TeachingSection';
import TestimonialSection from './Testimonial';
import Footersection from './Footer';
import Newssection from './Recentnews';
import './Home.css';

function HomePage() {
  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row items-center home2">
        <div className="md:w-3/6 container  mx-auto lg:w-full lg:ml-12 home1 md:w-4/5">
          <h1 className="text-2xl md:text-5xl text-[#041F96] font-bold mb-4">
            Connect one to one with your tutors
          </h1>
          <p className="text-sm md:text-lg text-black mb-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            maxime commodi eum voluptatum fugiat rerum explicabo, velit officiis
            alias voluptatibus, facilis dolorem asperiores eaque! Eius, vero!
            Accusantium, quasi.
          </p>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="text"
              placeholder="Search job title"
              className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full md:w-auto" />
            <input
              type="text"
              placeholder="Search location"
              className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full md:w-auto" />
            <button className="py-2 px-4 bg-[#041F96] text-white rounded-lg hover:bg-[#041F96] focus:outline-none w-full md:w-auto">
              Search
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-0  md:ml-36 lg:ml-48">
          <img
            src={TeacherImage}
            alt="Teacher Image"
            className="rounded-lg mx-auto md:w-4/5 lg:e-4/5"
            width={350}
            height={350} />
        </div>
      </div>
      <Catagories />
      <FeaturedJobs />
      <FrequentlyHiringCompanies />
      <HiringSection />
      <TestimonialSection />
      <TeachingSection />
      <Newssection />
      
    </div>
  );
}

export default HomePage;
