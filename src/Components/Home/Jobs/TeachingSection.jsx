import React from 'react';
import { Link } from 'react-router-dom'; 
import teach from '../../../assets/home/teacherab.png';
const ab="https://res.cloudinary.com/dr9iwqqv7/image/upload/v1719392884/vector-male-teacher-with-pointer-on-lesson-at-blackboard-in-classroom-removebg-preview_zhf9xe.png";
const TeachingSection = () => {
  return (
    <div className="max-w-full mx-auto my-16 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl text-[#041F96] font-bold mb-4">Want to Teach?</h2>
          <p className="text-lg text-gray-800 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget neque non
            ligula interdum venenatis.
          </p>
          <Link to="/login">
            <button className="bg-[#041F96] text-white py-2 px-4 rounded-lg hover:bg-[#041F96] focus:outline-none">
              Upload Your CV
            </button>
          </Link>
        </div>
        <div className="flex-1 md:ml-24">
          <img
            src={ab}
            alt="Teaching Image"
            className="rounded-lg mx-auto md:mx-0"
            width={350}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default TeachingSection;
