import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
        <header className="bg-gray-600 text-white py-8">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-sm md:text-base">
            Effective Date: 01/01/2025
          </p>
        </div>
      </header>
      <div className="bg-white shadow-lg rounded-lg p-8">
      

        <p className="text-gray-700 mb-4">
          Avyudha Consultancy Services Pvt Ltd ("Avyudha," "we," "our," or "us") values your privacy and is committed
          to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard
          your data when you use our Edutech platform (the "Platform"). By accessing or using the Platform, you agree
          to the terms outlined in this Privacy Policy.
        </p>

        {/* Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Scope of This Privacy Policy</h2>
          <p className="text-gray-700">
            This Privacy Policy applies to all users of the Platform, including but not limited to students, tutors, and
            institutions (collectively referred to as "Users"). The Platform facilitates the creation of profiles for:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-700 space-y-2">
            <li>Students searching for tutoring services.</li>
            <li>Tutors seeking tutoring opportunities and conducting online classes.</li>
            <li>Institutions seeking tutoring candidates or offering educational opportunities.</li>
          </ul>
        </div>

        {/* Sections */}
        {[
          {
            title: "2. Information We Collect",
            content: `
              We collect the following types of information to provide and improve our services:
              a. Information You Provide to Us: Personal Information, Profile Information, Payment Information.
              b. Automatically Collected Information: Usage Data, Device Information.
            `,
          },
          {
            title: "3. How We Use Your Information",
            content: `
              We use your information for service delivery, personalization, communication, security, and compliance purposes.
            `,
          },
          {
            title: "4. Data Sharing and Disclosure",
            content: `
              We do not sell your personal information. We only share it with your consent, service providers, or when legally required.
            `,
          },
          {
            title: "5. Data Security",
            content: `
              We implement robust technical measures to protect your data. However, no online system is entirely secure.
            `,
          },
          {
            title: "6. User Responsibilities",
            content: `
              Users are prohibited from engaging in unlawful activities. Violations may result in account suspension or reporting to authorities.
            `,
          },
          {
            title: "7. Retention of Information",
            content: `
              We retain your data only as long as necessary for providing services or as required by law.
            `,
          },
          {
            title: "8. Your Rights",
            content: `
              Depending on your jurisdiction, you may have rights to access, correct, delete, or manage your personal data.
            `,
          },
          {
            title: "9. Cookies and Tracking Technologies",
            content: `
              We use cookies to enhance your experience. You can manage preferences through your browser settings.
            `,
          },
          {
            title: "10. Updates to This Privacy Policy",
            content: `
              We may update this policy periodically. Changes are effective upon posting to the Platform.
            `,
          },
        ].map((section, index) => (
          <div className="mb-8" key={index}>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{section.title}</h2>
            <p className="text-gray-700 ">{section.content}</p>
          </div>
        ))}

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <address className="mt-4 text-gray-700 space-y-1">
            <p>Avyudha Consultancy Services Pvt Ltd</p>
            <p>B HUB, 5th floor, Block A, Maurya Lok Complex, PATNA – 800001</p>
            <p>Email: <a href="mailto:mail@kridhatutor.com" className="text-blue-500 hover:underline">mail@kridhatutor.com</a></p>
            <p>Phone: <a href="tel:7003128993" className="text-blue-500 hover:underline">7003128993</a></p>
          </address>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
