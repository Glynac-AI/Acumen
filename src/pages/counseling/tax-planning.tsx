import React from 'react';
import { FaClipboardList, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const TaxPlanning = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Tax Planning Services</h1>
        <img 
          src="/img/tax-planning.png" // Ensure you have this image in the public/img directory
          alt="Tax Planning" 
          className="w-1/2 h-auto object-cover rounded-lg mb-12 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-12">
          Our Tax Planning Services are designed to help individuals and businesses minimize their tax liabilities while ensuring compliance with tax laws. We provide strategic advice to optimize your tax situation.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Components of Our Tax Planning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaClipboardList className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Tax Strategy Development</h3>
            <p className="text-gray-600">Creating tailored tax strategies to minimize liabilities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaCalendarAlt className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Compliance Assurance</h3>
            <p className="text-gray-600">Ensuring compliance with all relevant tax regulations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaChartLine className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Ongoing Support</h3>
            <p className="text-gray-600">Providing continuous support and updates on tax law changes.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Tax Planning is Important</h2>
        <p className="text-lg text-gray-700 mb-12">
          Effective tax planning can lead to significant savings and help you avoid penalties. Our expert team is dedicated to helping you navigate the complexities of tax regulations and optimize your financial outcomes.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Our Tax Planning Services</h2>
        <p className="text-lg text-gray-700 mb-12">
          Ready to take control of your tax situation? Contact us today to learn more about our Tax Planning Services and how we can assist you in achieving your financial goals.
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

export default TaxPlanning;
