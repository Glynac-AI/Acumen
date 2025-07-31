import React from 'react';
import { FaHeart, FaUserMd, FaComments } from 'react-icons/fa';

const WellBeing = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Well-Being Services</h1>
        <img 
          src="/img/well-being.png" // Ensure you have this image in the public/img directory
          alt="Well-Being" 
          className="w-1/2 h-auto object-cover rounded-lg mb-12 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-12">
          Our Well-Being Services focus on enhancing the overall health and happiness of individuals and teams. We provide resources and support to promote mental, emotional, and physical well-being in the workplace.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Components of Our Well-Being Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaHeart className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Health Programs</h3>
            <p className="text-gray-600">Implementing health initiatives to promote physical wellness.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaUserMd className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Mental Health Support</h3>
            <p className="text-gray-600">Providing resources for mental health and stress management.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaComments className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Wellness Workshops</h3>
            <p className="text-gray-600">Conducting workshops to foster a supportive environment.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Well-Being is Important</h2>
        <p className="text-lg text-gray-700 mb-12">
          Promoting well-being in the workplace leads to increased productivity, reduced absenteeism, and a more positive work environment. Our services are designed to support the holistic health of your team.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Our Well-Being Services</h2>
        <p className="text-lg text-gray-700 mb-12">
          Ready to enhance the well-being of your team? Contact us today to learn more about our Well-Being Services and how we can support your organization.
        </p>
        
        <div className="text-center mb-16">
          <a 
            href="/contact" 
            className="bg-ph text-white font-medium px-8 py-3 rounded-md hover:bg-opacity-90 transition-all inline-block"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  );
};

export default WellBeing;
