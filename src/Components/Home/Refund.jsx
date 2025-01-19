import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Header Section */}
      <header className="bg-gray-600 text-white py-8">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-bold">Refund Policy</h1>
          <p className="mt-2 text-sm md:text-base">
            Effective Date: 01/01/2025
          </p>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-6 md:px-12 py-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          {/* Introduction */}
          <section className="mb-8">
            <p className="text-sm md:text-base text-gray-700">
              At Avyudha Consultancy Services Pvt Ltd ("Avyudha," "we," "our," or "us"), we strive to provide high-quality services through our Edutech platform. This Refund Policy outlines the terms and conditions under which refunds may be provided to our Users (students, tutors, and institutions). By using our Platform, you agree to this Refund Policy.
            </p>
          </section>

          {/* Policy Sections */}
          <PolicySection
            title="1. Eligibility for Refunds"
            content={[
              <p key="a">
                <strong>a. Subscription Plans:</strong> Users who have subscribed to a paid plan may request a refund within 3 days of purchase** if they are dissatisfied with the service and have not utilized the Platform’s key features (e.g., connecting with tutors, posting job opportunities, or attending classes).
              </p>,
              <p key="b">
                <strong>b. Classes and Sessions:</strong> Refunds for booked classes or sessions will only be considered if:
              </p>,
              <ul key="b-list" className="list-disc ml-5">
                <li>The class/session was canceled by the tutor.</li>
                <li>The tutor failed to deliver the class/session as scheduled.</li>
                <li>The class/session had technical issues that could not be resolved, rendering it unusable.</li>
              </ul>,
              <p key="c">
                <strong>c. Online Classes:</strong>
              </p>,
              <ul key="c-list" className="list-disc ml-5">
                <li>
                  <strong>Cancellation Before Commencement:</strong> If a user cancels enrollment in an online class before it begins, they may be eligible for a refund, minus any processing fees.
                </li>
                <li>
                  <strong>Cancellation After Commencement:</strong> Once an online class has started, refunds will be considered on a case-by-case basis. Factors include the duration of attendance and reasons for cancellation.
                </li>
              </ul>,
              <p key="d">
                <strong>d. Misleading or Fraudulent Transactions:</strong> If a User believes that they have been charged incorrectly or fraudulently, they must report the issue to our support team within 7 days of the transaction.
              </p>,
            ]}
          />
          <PolicySection
            title="2. Non-Refundable Scenarios"
            content={[
              <ul key="non-refundable" className="list-disc ml-5">
                <li>The User has fully utilized the services within the subscription period.</li>
                <li>The request is made after the stated refund eligibility period.</li>
                <li>
                  Dissatisfaction based on personal preferences without valid service-related issues.
                </li>
                <li>Violations of the Platform’s Terms of Service or Privacy Policy.</li>
                <li>
                  Inability to use the Platform due to factors outside our control, such as hardware/software issues on the User’s end or internet connectivity problems.
                </li>
              </ul>,
            ]}
          />
          <PolicySection
            title="3. Consultancy Fees"
            content={[
              "Non-Refundable: Fees charged by Avyudha Consultancy Services Pvt Ltd for consultancy services are non-refundable. These fees cover administrative costs and the resources utilized to match students with tutors or institutions.",
            ]}
          />
          <PolicySection
            title="4. Tutoring Services"
            content={[
              "Payments made directly to tutors are subject to the refund policies of the individual tutors or institutions. We recommend discussing refund terms with your selected tutor or institution prior to commencing services.",
            ]}
          />
          <PolicySection
            title="5. Exceptions"
            content={[
              <ul key="exceptions" className="list-disc ml-5">
                <li>
                  <strong>Violations:</strong> Users found violating our terms of service, including engaging in criminal activities, forfeit their right to any refunds.
                </li>
                <li>
                  <strong>Force Majeure:</strong> Refunds will not be issued for cancellations due to events beyond our control, such as natural disasters or technical issues.
                </li>
              </ul>,
            ]}
          />
          <PolicySection
            title="6. Process for Requesting Refunds"
            content={[
              <ol key="process" className="list-decimal ml-5">
                <li>
                  <strong>Contact Support:</strong> Submit a written request to our support team at{" "}
                  <a href="mailto:mail@kridhatutor.com" className="text-blue-600 underline">
                    mail@kridhatutor.com
                  </a>{" "}
                  with the following details:
                  <ul className="list-disc ml-5 mt-2">
                    <li>User Name</li>
                    <li>Account ID or Email Address</li>
                    <li>Transaction Details (e.g., payment date, amount, and method)</li>
                    <li>Reason for requesting a refund</li>
                  </ul>
                </li>
                <li>
                  <strong>Verification:</strong> Our support team will review your request, verify the transaction, and investigate the issue. Additional documentation or evidence may be requested to support your claim.
                </li>
                <li>
                  <strong>Resolution:</strong> Refund requests will be processed within 10 business days of approval. Approved refunds will be credited back to the original payment method.
                </li>
              </ol>,
            ]}
          />
          <PolicySection
            title="7. Refunds for Institutions and Bulk Services"
            content={[
              "For institutions or Users availing bulk services, refund policies may vary based on the terms outlined in the service agreement. Such Users are advised to refer to their individual agreements or contact our support team for assistance.",
            ]}
          />
          <PolicySection
            title="8. Changes to Refund Policy"
            content={[
              "We reserve the right to update or modify this Refund Policy at any time. Changes will be effective upon posting to the Platform. Users are encouraged to review this policy periodically.",
            ]}
          />
          <PolicySection
            title="9. Contact Us"
            content={[
              <>
                <p>For any questions or concerns regarding this Refund Policy, please contact us at:</p>
                <address className="mt-4">
                  <strong>Avyudha Consultancy Services Pvt Ltd</strong>
                  <br />
                  B HUB, 5th floor, Block A, Maurya Lok Complex, PATNA – 800001
                  <br />
                  <a href="mailto:mail@kridhatutor.com" className="text-blue-600 underline">
                    mail@kridhatutor.com
                  </a>
                  <br />
                  7003128993
                </address>
              </>,
            ]}
          />
        </div>
      </main>

      {/* Footer Section */}
      
    </div>
  );
};

const PolicySection = ({ title, content }) => (
  <section className="mt-8">
    <h2 className="text-lg md:text-xl font-semibold mb-4">{title}</h2>
    <div className="text-sm md:text-base space-y-2">
      {Array.isArray(content)
        ? content.map((item, index) => <div key={index}>{item}</div>)
        : content}
    </div>
  </section>
);

export default RefundPolicy;
