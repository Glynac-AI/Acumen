import React from 'react';
import { FaClipboardCheck, FaUsersCog, FaChartPie } from 'react-icons/fa';

const PracticeManagement = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Practice Management Services</h1>
        <img 
          src="/img/practice-management.png" // Ensure you have this image in the public/img directory
          alt="Practice Management" 
          className="w-1/2 h-auto object-cover rounded-lg mb-12 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-12">
          Our Practice Management Services are designed to help financial advisors streamline their operations, enhance client relationships, and improve overall efficiency. We provide tailored solutions that address the unique challenges faced by advisory practices.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Offerings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaClipboardCheck className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Operational Efficiency Analysis</h3>
            <p className="text-gray-600">Identifying areas for improvement in your operations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaUsersCog className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Client Relationship Management</h3>
            <p className="text-gray-600">Strategies to enhance client satisfaction and loyalty.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaChartPie className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Performance Metrics</h3>
            <p className="text-gray-600">Setting and tracking key performance indicators.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Practice Management is Important</h2>
        <p className="text-lg text-gray-700 mb-12">
          Effective practice management is essential for financial advisors to thrive in a competitive environment. By optimizing operations and enhancing client relationships, you can drive growth and improve profitability.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Our Practice Management Services</h2>
        <p className="text-lg text-gray-700 mb-12">
          Ready to enhance your practice's efficiency? Contact us today to learn more about our Practice Management Services and how we can help you achieve your business goals.
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

export default PracticeManagement;
