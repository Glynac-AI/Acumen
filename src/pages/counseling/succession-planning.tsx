import React from 'react';
import { FaUserShield, FaClipboardCheck, FaRegClock } from 'react-icons/fa';

const SuccessionPlanning = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Succession Planning Services</h1>
        <img 
          src="/img/succession-planning.png" // Ensure you have this image in the public/img directory
          alt="Succession Planning" 
          className="w-1/2 h-auto object-cover rounded-lg mb-12 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-12">
          Our Succession Planning Services are designed to help businesses prepare for the future by ensuring a smooth transition of leadership and key roles. We work with you to develop a comprehensive plan that secures the longevity and stability of your organization.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Components of Our Succession Planning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaUserShield className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Leadership Assessment</h3>
            <p className="text-gray-600">Identifying potential leaders within your organization.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaClipboardCheck className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Development Plans</h3>
            <p className="text-gray-600">Creating tailored development plans for future leaders.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaRegClock className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Knowledge Transfer</h3>
            <p className="text-gray-600">Ensuring critical knowledge and skills are passed on effectively.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Succession Planning is Important</h2>
        <p className="text-lg text-gray-700 mb-12">
          Effective succession planning is crucial for maintaining business continuity and minimizing disruption during leadership transitions. By proactively planning for the future, you can ensure that your organization remains resilient and capable of achieving its goals.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Our Succession Planning Services</h2>
        <p className="text-lg text-gray-700 mb-12">
          Ready to secure the future of your organization? Contact us today to learn more about our Succession Planning Services and how we can help you navigate leadership transitions smoothly.
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

export default SuccessionPlanning;
