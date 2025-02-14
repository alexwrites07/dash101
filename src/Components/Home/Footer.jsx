import React from 'react';
import PlayStoreImage from '../../assets/playstore.png'; // Add your play store logo image here

const Footer = () => {
  return (
    <footer className="bg-[#041F96] text-white py-8 max-w-[1850px] mx-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Contact Information */}
          <div className="w-full md:w-1/5 mb-6">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p>ACS pvt ltd.</p>
            <p>B HUB, 5th floor, Block A, Maurya Lok Complex</p>
            <p>PATNA, Bihar,India – 800001</p>
            
      {/* Download App Section */}
      <div className="flex  mt-12 mb-6">
        <a href="https://play.google.com/store/apps/details?id=com.avyudha.app" target="_blank" rel="noopener noreferrer">
          <img
            src={PlayStoreImage}
            alt="Download our app from Play Store"
            className="w-48"
            style={{ cursor: 'pointer' }}
          />
        </a>
      </div>
          </div>

          {/* For Tutors */}
          <div className="w-full md:w-1/5 mb-6">
            <h2 className="text-xl font-bold mb-4">For Tutors</h2>
            <ul>
              <li><a href="/jobpost" className="text-blue-400 hover:underline">Find jobs</a></li>
              <li><a href="/needpost" className="text-blue-400 hover:underline">Find tuitions</a></li>
              <li><a href="/organizationpost" className="text-blue-400 hover:underline">Find organisation</a></li>
              <li><a href="/signup" className="text-blue-400 hover:underline">Signup as tutor</a></li>
      
            </ul>
          </div>

          {/* For Institue */}
          <div className="w-full md:w-1/5 mb-6">
            <h2 className="text-xl font-bold mb-4">For Student/Parent</h2>
            <ul>
              <li><a href="/demoform" className="text-blue-400 hover:underline">Book your tuition tutor</a></li>
              <li><a href="/findtutor" className="text-blue-400 hover:underline">Find tutor</a></li>
              <li><a href="/organizationpost" className="text-blue-400 hover:underline">Find organisation</a></li>
              <li><a href="/signup" className="text-blue-400 hover:underline">Signup as student/ parent</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/5 mb-6">
            <h2 className="text-xl font-bold mb-4">For Institute</h2>
            <ul>
              <li><a href="/signup" className="text-blue-400 hover:underline">Signup as institute</a></li>
              <li><a href="/findtutor" className="text-blue-400 hover:underline">Find tutor for institute</a></li>
            </ul>
          </div>

          {/* Helpful Resources */}
          <div className="w-full md:w-1/5 mb-6">
            <h2 className="text-xl font-bold mb-4">Helpful Resources</h2>
            <ul>
              <li><a href="/about" className="text-blue-400 hover:underline">About Us</a></li>
              <li><a href="/contact" className="text-blue-400 hover:underline">Contact Us</a></li>
           
              <li><a href="/faqs" className="text-blue-400 hover:underline">FAQ</a></li>
              <li><a href="/terms" className="text-blue-400 hover:underline">Terms and Conditions</a></li>
              <li><a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a></li>
              <li><a href="/refund" className="text-blue-400 hover:underline">Refund Policy</a></li>
   
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
        <p>© 2025 Avyudha Consultancy Services Pvt Ltd. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
