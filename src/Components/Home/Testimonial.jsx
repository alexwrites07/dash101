import React from 'react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Software Engineer',
      company: 'Tech Co.',
      avatar: 'https://tse4.mm.bing.net/th?id=OIP.aH7YP-JvSTVNg1UO2rAyBwHaLH&pid=Api&P=0&h=220',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor orci sed lacus mattis, nec auctor eros interdum.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'UX Designer',
      company: 'Design Studio',
      avatar: 'https://tse4.mm.bing.net/th?id=OIP.aH7YP-JvSTVNg1UO2rAyBwHaLH&pid=Api&P=0&h=220',
      comment:
        'Fusce ullamcorper arcu eu enim euismod, in sollicitudin quam dapibus. Quisque id nisl vestibulum, efficitur libero eget, sollicitudin sem.',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      position: 'Marketing Manager',
      company: 'Marketing Inc.',
      avatar: 'https://tse4.mm.bing.net/th?id=OIP.aH7YP-JvSTVNg1UO2rAyBwHaLH&pid=Api&P=0&h=220',
      comment:
        'Pellentesque ac tortor ac eros consectetur interdum. Sed vehicula justo ac fermentum molestie. Nulla nec felis eget arcu tincidunt rutrum.',
    },
  ];

  return (
    <div className="max-w-full mx-auto mt-12 bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl text-center text-[#041F96] font-bold mb-8">Client Testimonials</h2>
        <div className="flex flex-wrap justify-between">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col bg-white rounded-lg shadow-lg p-6 mb-8 w-full md:w-88">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
