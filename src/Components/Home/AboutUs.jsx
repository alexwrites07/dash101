import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library
import CountUp from 'react-countup';
import './AboutUs.css';
import a1 from '../../assets/image-abt/1.jpg';
import a2 from '../../assets/image-abt/2.jpg';
import a3 from '../../assets/image-abt/3.jpg';
import a4 from '../../assets/image-abt/4.jpg';
import a5 from '../../assets/image-abt/5.jpg';
import a6 from '../../assets/image-abt/6.jpg';
import a7 from '../../assets/image-abt/7.jpg';
import a8 from '../../assets/image-abt/8.jpg';
import k1 from '../../assets/image-abt/k1 (1).jpeg';
import k2 from '../../assets/image-abt/k1 (2).jpeg';
import k3 from '../../assets/image-abt/k1 (3).jpeg';

const AboutUs = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a default animation duration
  }, []);

  const testimonials = [
    {
      text: "Great service! I found the perfect tutor thanks to Avyudha.com. The process was smooth and efficient.",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      text: "Their online tuition helped me improve my grades significantly! Highly recommend.",
      image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      text: "Avyudha's extracurricular trainers are excellent. My child loves the drawing classes.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
  ];

  const handleDotClick = (index) => {
    if (index !== currentTestimonial) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial(index);
        setAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="bg-white py-10 max-w-7xl mx-auto">
      {/* About Us Section */}
      <div data-aos="fade-up" className="bg-white p-10 rounded-lg mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-5">About Us</h1>
        <p>
          Avyudha.com is an educational service platform based in Patna, Bihar, India, specializing in personalized home and online tutoring and tutoring jobs.
          Operating under Avyudha Consultancy Services Pvt Ltd, it connects educators with learners nationwide.
        </p>
      </div>

      {/* Image Grid Section */}
      <div data-aos="zoom-in" className="flex justify-center items-center mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full h-auto max-w-6xl">
          {[a1, a2, a3, a4, a5, a6, a7, a8].map((image, index) => (
            <div key={index} className="col-span-1">
              <img src={image} alt={`Image ${index + 1}`} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div data-aos="fade-right" className="bg-white p-10 rounded-lg mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-5">Services Offered</h2>
        <ul className="text-left list-disc list-inside">
<li><strong>One-to-One Home Tuition:</strong> Avyudha.com provides personalized home tutoring for students from Kindergarten to Class 12 (K-12) across various boards, including CBSE, ICSE, ISC, and state boards also for competitive exams like IIT-JEE, NEET. Their tutors focus on building strong foundational concepts to enhance understanding.</li><br />
<li><strong>Online Tuition:</strong>Leveraging digital platforms, Avyudha.com offers online tutoring sessions, making education accessible regardless of location. This mode is cost-effective and convenient for both students and tutors.</li><br />
<li><strong>Trainers for Extracurricular Activities:</strong>  Beyond academic subjects, Avyudha.com provides trainers for various extracurricular activities, including music (instrumental and vocal), drawing, yoga, fitness, martial arts, and sports, promoting holistic development. </li><br />
<li><strong>Faculty Provision:</strong> They supply qualified and experienced tutors to educational institutions such as schools and coaching centers, ensuring quality education delivery.</li><br />
<li><strong>Professional Training:</strong> Tailored corporate training to enhance employee skills and productivity.</li>
</ul>
      </div>

      {/* Quality Assurance and Testimonials */}
      <div data-aos="fade-left" className="flex flex-wrap md:flex-nowrap space-y-5 md:space-y-0 md:space-x-5 max-w-7xl mx-auto">
        <div className="bg-white p-10 rounded-lg flex-1">
          <h2 className="text-3xl font-bold mb-5">Quality Assurance</h2>
          <p>
            Avyudha.com emphasizes the importance of quality education, offering both standard and premium tutoring services.
          </p>
        </div>
        <div className="bg-white p-10 rounded-lg flex-1">
          <h2 className="text-3xl font-bold mb-5">Client Testimonials</h2>
          <p>
            Avyudha.com has received positive feedback, with an average rating of 4.90 out of 5 stars based on over 150+ reviews.
          </p>
        </div>
      </div>

      {/* Recognitions and Achievements Section */}
      <div data-aos="flip-up" className="bg-white p-10 rounded-lg mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-5">Recognitions and Achievements</h2>
        <ul className="list-disc list-inside text-left">
          <li><strong>Startup Bihar Recognition (2022):</strong> A state-level initiative promoting entrepreneurship in Bihar.</li>
          <li><strong>Startup India Recognition (2023):</strong> Acknowledging innovative startups contributing to job creation and skill development.</li>
        </ul>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h2 className="text-4xl font-bold">
              <CountUp end={7000} duration={2} />
            </h2>
            <p>7 Thousand+ Tutors</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">
              <CountUp end={20000} duration={2} />
            </h2>
            <p>20 Thousand+ Tutoring Jobs</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">
              <CountUp end={500} duration={2} />
            </h2>
            <p>500+ Cities Served</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-lg mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-5">Contact Information</h2>
        <p>Address: B HUB, 5th floor, Block A, Maurya Lok Complex, Patna – 800001</p>
        <p>Phone: +91 7003128993</p>
        <p>Website: <a href="https://avyudha.com" target="_blank" rel="noopener noreferrer">avyudha.com</a></p>
      </div>
    </div>
  );
};

export default AboutUs;

   

