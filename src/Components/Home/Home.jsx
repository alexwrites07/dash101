// HomePage.js

import React from 'react';
import TeacherImage from '../../assets/home/WhatsApp Image 2024-06-29 at 11.51.36 (1).jpeg';
import Catagories from './Catagories';
import FeaturedJobs from './Jobs/Jobs';
import FrequentlyHiringCompanies from './Jobs/Frequently';
import HiringSection from './Jobs/HiringSection';
import TeachingSection from './Jobs/TeachingSection';
import TestimonialSection from './Testimonial';
const HomePage = () => {
  return (
    <div className=" mx-auto px-4 max-w-screen-xl" style={{ marginTop: '6%'}}>
      <div className="flex flex-col md:flex-row items-center ml-8">
        <div className="md:w-1/2 mr-12 ml-auto">
          <h1 className="text-4xl md:text-5xl text-blue-700 font-bold mb-4">
            Connect one to one with your tutors
          </h1>
          <p className="text-sm md:text-lg text-black mb-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            maxime commodi eum voluptatum fugiat rerum explicabo, velit officiis
            alias voluptatibus, facilis dolorem asperiores eaque! Eius, vero!
            Accusantium, quasi.
          </p>
          <div className="flex items-center mr-12">
            <input
              type="text"
              placeholder="Search job title"
              className="py-2 px-4 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Search location"
              className="py-2 px-4 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
              Search
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 ml-24">
          <img
            src={TeacherImage}
            alt="Teacher Image"
            className="rounded-lg"
            width={350}
            height={350}
          />
        </div>
      </div>
      <Catagories/>
      <FeaturedJobs/>
      
      <FrequentlyHiringCompanies/>
      <HiringSection/>
      <TeachingSection/>
      <TestimonialSection/>

    </div>
  );
};

export default HomePage;
