import React, { useState } from "react";

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqs = [
    {
      question: "How to search for tutors on the website?",
      answer:
        "You can search tutors on our website through two ways. You can post about the need of tutors through answering few question on the form available on the website like your tuitions/category, location on map, address, gender preference, short description about the needs, email, and contact so that any interested tutors can contact you. If they find matching with their teaching interest. Or you can visit our find tutors page, where you can see lots of good, experienced tutors listed with the platform and made the proper profiling so that you can select and contact them upfront if you find it a perfect match for your tutoring needs.",
    },
    {
      question: "Why my learning requirement gets rejected?",
      answer:
        "There can be few reasons like:\n\n" +
        "- **Phone Number**: If we are unable to contact you, or if the number provided is incorrect, then the requirement is rejected on the grounds of wrong Phone details being provided. We send you a mail asking you to share your correct phone number.\n" +
        "- **Customer Support Declined**: The support team at avyudha will sometimes call you to verify that you have a genuine requirement. If, during that call, our team ascertains that you no longer wish to have that requirement, or that you were not the person who posted that requirement, then we do not allow that need to be approved and mark it as ‘Declined by customer’. We also send you a mail to the registered email address with the details. If you have not declined the requirement, then you can email us at mail@kridhatutor.com",
    },
    {
      question: "What's next, after posting my requirement?",
      answer:
        "After submitting your requirement, Tutors/institutes will start contacting or messaging you, who are available to take up your requirement. What you do next is go to each tutor's page, check out their ratings and reviews they were given by previous students and their qualifications, experience etc. Now, compare those tutors against each other and start talking to those you shortlist. Decide whom you want to hire after talking to them!",
    },
    {
      question: "How to create my account?",
      answer:
        "You can create an account by just posting your requirement and during the process, we will ask for your email ID and other account details. Once we have received your account details like email ID, phone number etc, your account is created and ready to use. Just make sure that you remember your password and the email ID you had used to create the account.",
    },
    {
      question: "As a student, do I need to pay avyudha.com a commission?",
      answer:
        "No. avyudha does not charge commissions on successfully matching you with a Tutor. But we do expect you to submit a review of the tutor and the services you have availed of, to help us help you better the next time. However, if you find a few profiles better and want to contact them from your side onwards, in that case, you need to purchase contact details, which cost varies profile to profile.",
    },
    {
      question: "How do I pay the Tutor for his services?",
      answer:
        "This decision is completely up to you and the tutor. While negotiating, you can decide upon the best schedule, fee, and payment platform which are convenient for both of you. Please ensure that this is to be discussed before starting services, to avoid any misunderstandings later on.",
    },
  ];
  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">FAQs</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            {/* Question Button */}
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full text-left p-4 bg-gray-100 rounded-lg flex justify-between items-center transition-all duration-300 ease-in-out"
            >
              <span className="font-medium">{faq.question}</span>
              <span>{activeQuestion === index ? "-" : "+"}</span>
            </button>

            {/* Answer with Slow Animation */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeQuestion === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="p-4 bg-white">
                {faq.answer.split("\n").map((line, i) => (
                  <p key={i} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
