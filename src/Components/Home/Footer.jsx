import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Contact Information */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p>Call us: 123 456 7890</p>
            <p>Darbhanga, Bihar, India.</p>
            <p>Email: kridha@kridha.com</p>
          </div>

          {/* For Tutors */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-xl font-bold mb-4">For Tutors</h2>
            <ul>
              <li><a href="#" className="text-blue-400 hover:underline">Browse Jobs</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Browse Tutors</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Tutors Dashboard</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Job Alerts</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">My Bookmarks</a></li>
            </ul>
          </div>

          {/* For Institue */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-xl font-bold mb-4">For Institue</h2>
            <ul>
              <li><a href="#" className="text-blue-400 hover:underline">All Institue</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Institue Dashboard</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Submit Job</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Job Packages</a></li>
            </ul>
          </div>

          {/* Helpful Resources */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-xl font-bold mb-4">Helpful Resources</h2>
            <ul>
              <li><a href="#" className="text-blue-400 hover:underline">About Us</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Contact Us</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Terms</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Packages</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">FAQ</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Site Map</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Terms of Use</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Privacy Center</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Security Center</a></li>
              <li><a href="#" className="text-blue-400 hover:underline">Accessibility Center</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <p>© 2021 Kridha-Tutor. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
