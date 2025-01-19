import React from 'react';
import hire from '../../../assets/home/happy-students-learning-math-college-school-isolated-flat-illustration.png';
import { Link } from 'react-router-dom'; 
const HiringSection = () => {
  return (
    <div className="max-w-full mx-auto my-16 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="flex-1 lg:pr-8 hidden lg:block">
          <img
            src={hire}
            alt="Hiring Image"
            className="rounded-lg mx-auto lg:mx-0"
            width={450}
            height={450}

          />
        </div>
        <div className="flex-1 lg:ml-12 text-left">
          <h2 className="text-3xl lg:text-4xl text-[#041F96] font-bold mb-4">
            Do You Need a Teacher?
          </h2>
          <p className="text-lg text-gray-800 mb-4">
          <br />  
  Avyudha.com is your one-stop solution. With more than 8,000+ tutors and fast increasing, our strong database can provide tutors with the best quality and affordability customized just for your needs. 
  <br /><br />  
          </p>
          <div className="text-left">
          <Link to="/login">
            <button className="bg-[#041F96] text-white py-2 px-4 rounded-lg hover:bg-[#041F96]  hover:bg-blue-700 focus:outline-none">
              Let's Connect
            </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 mt-8 lg:mt-0 lg:hidden">
          <img
            src={hire}
            alt="Hiring Image"
            className="rounded-lg mx-auto"
            width={350}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default HiringSection;
