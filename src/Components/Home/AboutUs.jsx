import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import CountUp from 'react-countup';
import './AboutUs.css';

const AboutUs = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Great service! I found the perfect job thanks to their platform. The entire process was smooth and efficient.",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBvcnRyYWl0fGVufDB8fHx8MTYxOTYxODUzNw&ixlib=rb-1.2.1&q=80&w=400"
    },
    {
      text: "Found my dream job! The resume building tool was a game changer for me.",
      image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE2fHxwYXJ0cmlvfGVufDB8fHx8MTYxOTYxODUzNw&ixlib=rb-1.2.1&q=80&w=400"
    },
    {
      text: "Highly recommend! Their customer service was top-notch and helped me every step of the way.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDM0fHxwb3J0cmFpdHxlbnwwfHx8fDE2MTk2MTg1Mzc&ixlib=rb-1.2.1&q=80&w=400"
    },
  ];

  const [animating, setAnimating] = useState(false);

  const handleDotClick = (index) => {
    if (index !== currentTestimonial) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial(index);
        setAnimating(false);
      }, 500); // Match the duration of the animation
    }
  };

  return (
    <div className="bg-white py-10 max-w-3xl mx-auto">
      {/* About Us Box */}
      <div className="bg-white p-10 rounded-lg mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-5">About Us</h1>
        <p>Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy...</p>
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full h-auto max-w-6xl">
          {/* Section 1 */}
          <div className="col-span-1">
            <img src="https://apusthemes.com/wp-demo/superio/wp-content/uploads/2021/03/g1.jpg" alt="Image 1" className="w-full h-auto object-cover" />
          </div>

          {/* Section 2 */}
          <div className="col-span-1 flex flex-col space-y-2 sm:block">
            <div>
              <img src="https://apusthemes.com/wp-demo/superio/wp-content/uploads/2021/03/g5.jpg" alt="Image 2" className="w-full h-auto object-cover" />
            </div>
            <div>
              <img src="https://avyudha.com/wp-content/uploads/2021/03/g3.jpg" alt="Image 3" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* Section 3 */}
          <div className="col-span-1 flex flex-col space-y-2 sm:block">
            <div>
              <img src="https://apusthemes.com/wp-demo/superio/wp-content/uploads/2021/03/g4.jpg" alt="Image 4" className="w-full h-auto object-cover" />
            </div>
            <div>
              <img src="https://avyudha.com/wp-content/uploads/2021/03/g6.jpg" alt="Image 5" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* Section 4 */}
          <div className="col-span-1">
            <img src="https://avyudha.com/wp-content/uploads/2021/03/g2.jpg" alt="Image 6" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mb-10 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold">
              <CountUp end={4000000} duration={2} />
            </h2>
            <p>4 million daily active users</p>
          </div>
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold">
              <CountUp end={12000} duration={2} />
            </h2>
            <p>Over 12k open job positions</p>
          </div>
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold">
              <CountUp end={20000000} duration={2} />
            </h2>
            <p>Over 20 million stories shared</p>
          </div>
        </div>
      </div>

      {/* About Jobio Section */}
      <div className="bg-white p-10 rounded-lg mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-5">About KridhaTutor</h2>
        <p>Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow...</p>
      </div>

      {/* Testimonial Section */}
      <div className="relative p-10 rounded-lg mb-10 text-center max-w-3xl mx-auto testimonial-container">
        <div className="absolute inset-0 z-0 bg-[#1967D212]"></div>
        <h2 className="text-3xl font-bold mb-5 relative z-10">Testimonials</h2>
        <div className={`mb-5 relative z-10 ${animating ? 'slide-in' : ''}`}>
          <img
            src={testimonials[currentTestimonial].image}
            alt="Testimonial"
            className="mx-auto rounded-full w-24 h-24 object-cover transition-transform duration-500 ease-in-out transform-gpu"
          />
        </div>
        <p className={`mb-5 relative z-10 ${animating ? 'slide-in' : ''}`}>{testimonials[currentTestimonial].text}</p>
        <div className="flex justify-center mt-5 relative z-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 mx-2 rounded-full transition-colors duration-500 ${index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'}`}
            ></button>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white p-10 rounded-lg text-center max-w-8xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="shadow-lg lg:h-64">
            <img loading="lazy" decoding="async" width="90" height="90" src="https://avyudha.com/wp-content/uploads/2021/05/f1.png" className="mx-auto mb-4" alt="" /><br></br>
            <h3 className="text-2xl font-bold mb-2">Free Resume Boxes</h3>
            <p>Get help with creating a professional resume.</p>
          </div>
          <div className="shadow-lg lg:h-64">
            <img loading="lazy" decoding="async" width="90" height="90" src="https://avyudha.com/wp-content/uploads/2021/05/f2.png" className="mx-auto mb-4" alt="" /><br></br>
            <h3 className="text-2xl font-bold mb-2">Online Assessment</h3>
            <p>Take assessments to showcase your skills to employers.</p>
          </div>
          <div className="shadow-lg lg:h-64">
            <img loading="lazy" decoding="async" width="90" height="60" src="https://avyudha.com/wp-content/uploads/2021/05/f3.png" className="mx-auto mb-4" alt="" />
            <h3 className="text-2xl font-bold mb-2">Job Recommendations</h3>
            <p>Get job recommendations based on your profile.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
