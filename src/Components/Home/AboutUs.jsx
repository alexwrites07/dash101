import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import CountUp from 'react-countup';
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
  

  const handleDotClick = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="bg-white py-10 ">
      {/* About Us Box */}
      <div className="bg-white p-10 rounded-lg  mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-5">About Us</h1>
        <p>Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy...</p>
      </div>

      {/* Image Section */}
      <div className="mb-10 text-center">
        <img src="https://apusthemes.com/wp-demo/superio/wp-content/uploads/2021/03/g1.jpg" alt="About Us" className="mx-auto w-full sm:w-2/3 md:h-96 sm:h-24 rounded-lg"  />
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
<br></br><br></br>
      {/* About Jobio Section */}
      <div className="bg-white py-15 rounded-lg  mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-5">About Jobio</h2>
        <p>Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow...</p>
      </div>

      {/* Testimonial Section */}
      <div className="bg-white p-10 rounded-lg  mb-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-5">Testimonials</h2>
        <div className="mb-5">
          <img 
            src={testimonials[currentTestimonial].image} 
            alt="Testimonial" 
            className="mx-auto rounded-full w-24 h-24 object-cover" 
          />
        </div>
        <p>{testimonials[currentTestimonial].text}</p>
        <div className="flex justify-center mt-5">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 mx-2 rounded-full ${index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'}`}
            ></button>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white p-10 rounded-lg  text-center max-w-8xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className='shadow-lg lg:h-48'>
            <h3 className="text-2xl font-bold mb-2 ">Free Resume Boxes</h3>
            <p>Get help with creating a professional resume.</p>
          </div>
          <div className='shadow-lg lg:h-48'>
            <h3 className="text-2xl font-bold mb-2 ">Online Assessment</h3>
            <p>Take online assessments to showcase your skills.</p>
          </div>
          <div className='shadow-lg lg:h-48'>
            <h3 className="text-2xl font-bold mb-2 ">Help Every Step</h3>
            <p>Receive support and guidance throughout your job search.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
