import ContactUsForm from "./ContactUsForm";import React, { useState, useEffect } from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineOfficeBuilding } from "react-icons/hi";

export default function ContactUs() {
  const [apiKey, setApiKey] = useState('AIzaSyAK5qSOh-x80wTOpdKP_KkoDomw0C8s4Dw');
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col mt-6 items-center mx-auto">
      <div className="lg:p-10 p-2 -mt-8 lg:mt-8 md:h-[500px] h-[200px] w-full">
        <div className="h-full w-full">
        <iframe
  className="h-full w-full rounded-lg shadow-2xl max-w-7xl mx-auto"
  src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=25.610273,85.134448`}
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
></iframe>





        </div>
      </div>
      <title>24x7 Support for Your Machines | Contact Us</title>
      <meta
        name="description"
        content="Experience 24x7 support for machines with Reifenhauser India. Contact us for reliable assistance and service, optimal performance for equipment"
      />
      <link rel="canonical" href="https://reifenhauserindia.com/#/contactUs" />

      <div className="flex flex-col items-center -mt-48 bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeIn animate__delay-0s">
        <div className="flex flex-col items-center mb-10">
          <div className="font-semibold flex flex-row gap-1 lg:text-[30px] text-[24px] mb-4">
            <p className="text-black">Get in Touch</p>
            <p className="text-[#285196]">With Us</p>
          </div>
          <div className="lg:w-[80%] text-center">
            <p className="text-[18px]">Contact us right away if you want to embrace technology</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between w-full">
          <div className="lg:w-[30%] w-full text-center">
            <div className="flex items-center justify-center gap-2">
              <HiOutlineOfficeBuilding className="text-primary lg:text-3xl text-2xl" />
              <p className="text-primary lg:text-2xl font-semibold text-xl mb-2">Head Office</p>
            </div>
            <p className="text-[12px] lg:text-[16px]">ACS pvt ltd.</p>
            <p className="text-[12px] lg:text-[16px]">B HUB, 5th floor, Block A, Maurya Lok Complex</p>
            <p className="text-[12px] lg:text-[16px]">PATNA, Bihar, India – 800001</p>
          </div>

          <div className="lg:w-[30%] w-full text-center">
            <div className="flex items-center justify-center gap-2">
              <HiOutlinePhone className="text-primary lg:text-3xl text-2xl" />
              <p className="text-primary lg:text-2xl font-semibold text-xl mb-2">Contact</p>
            </div>
            <p>+91 700 312 89 93</p>
          </div>

          <div className="lg:w-[30%] w-full text-center">
            <div className="flex items-center justify-center gap-2">
              <HiOutlineMail className="text-primary lg:text-3xl text-2xl" />
              <p className="text-primary lg:text-2xl font-semibold text-xl mb-2">Email</p>
            </div>
            <p>mail@kridhatutor.com</p>
          </div>
        </div>

        <div className="w-full lg:w-[90%] mt-10 mx-auto">
          <ContactUsForm />
        </div>
      </div>

      <br />
    </div>
  );
}
