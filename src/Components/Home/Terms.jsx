import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Header Section */}
      <header className="bg-gray-600 text-white py-8">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-bold">Terms and Conditions</h1>
          <p className="mt-2 text-sm md:text-base">
            Welcome to Avyudha Consultancy Services Pvt Ltd. Please read the terms carefully.
          </p>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-6 md:px-12 py-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <Section
            title="1. Definitions"
            content={[
              <p key="platform">
                <strong>Platform:</strong> Refers to the services provided by Avyudha Consultancy Services Pvt Ltd, including the website and any related applications.
              </p>,
              <p key="user">
                <strong>User:</strong> Refers to any individual or entity using our platform, including students, tutors, and institutions.
              </p>,
            ]}
          />
          <Section
            title="2. User Accounts"
            content={[
              "Users must provide accurate and complete information during registration.",
              "Users are responsible for maintaining the confidentiality of their account information.",
            ]}
          />
          <Section
            title="3. Services"
            content={[
              "Our platform connects students, tutors, and institutions for educational purposes.",
              "We do not guarantee the accuracy, quality, or legality of user-generated content.",
            ]}
          />
          <Section
            title="4. User Conduct"
            content={[
              "Users must not engage in any illegal activities, including but not limited to criminal acts, fraud, or harassment.",
              "Users must not post or transmit any content that is defamatory, obscene, or infringing on intellectual property rights.",
            ]}
          />
          <Section
            title="5. Payments and Fees"
            content={[
              "Tutors may be required to pay a commission or fee for services provided through the platform.",
              "All payments must be made in accordance with our payment policies.",
            ]}
          />
          <Section
            title="6. Refund Policy"
            content={["Please refer to our Refund Policy for information on refunds."]}
          />
          <Section
            title="7. Limitation of Liability"
            content={[
              "Avyudha Consultancy Services Pvt Ltd is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our platform.",
            ]}
          />
          <Section
            title="8. Termination"
            content={[
              "We reserve the right to suspend or terminate user accounts for violations of these terms.",
            ]}
          />
          <Section
            title="9. Changes to Terms"
            content={[
              "We may update these terms from time to time. Continued use of the platform constitutes acceptance of the updated terms.",
            ]}
          />
          <Section
            title="10. Governing Law"
            content={["These terms are governed by the laws of India."]}
          />
        </div>

        {/* Contact Section */}
        <div className="text-center mt-10">
          <p className="text-sm md:text-base">
            For any questions or concerns, please contact us at{" "}
            <a
              href="mailto:support@avyudha.com"
              className="text-blue-600 underline"
            >
              support@avyudha.com
            </a>
            .
          </p>
        </div>
      </main>

      {/* Footer Section */}
     
    </div>
  );
};

// Helper component for sections
const Section = ({ title, content }) => (
  <section className="mt-8">
    <h2 className="text-lg md:text-xl font-semibold mb-4">{title}</h2>
    <div className="text-sm md:text-base space-y-2">
      {Array.isArray(content)
        ? content.map((item, index) => <p key={index}>{item}</p>)
        : content}
    </div>
  </section>
);

export default TermsAndConditions;
