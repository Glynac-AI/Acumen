import React from 'react';
import { FaChalkboardTeacher, FaBullseye, FaChartLine } from 'react-icons/fa';

const SalesCoaching = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Sales Coaching Services</h1>
        <img 
          src="/img/sales-coaching.png" // Ensure you have this image in the public/img directory
          alt="Sales Coaching" 
          className="w-1/2 h-auto object-cover rounded-lg mb-12 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-12">
          Our Sales Coaching Services are designed to empower sales teams to achieve their targets and maximize their potential. We provide tailored coaching sessions that focus on skill development, strategy enhancement, and performance improvement.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Components of Our Sales Coaching</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaChalkboardTeacher className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Personalized Coaching</h3>
            <p className="text-gray-600">One-on-one sessions tailored to individual needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaBullseye className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Sales Strategy Development</h3>
            <p className="text-gray-600">Crafting effective sales strategies that align with business goals.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaChartLine className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Performance Metrics</h3>
            <p className="text-gray-600">Setting and tracking performance metrics to ensure accountability.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Sales Coaching is Essential</h2>
        <p className="text-lg text-gray-700 mb-12">
          Effective sales coaching can significantly impact your team's performance. By investing in coaching, you empower your salespeople to overcome challenges, improve their skills, and ultimately drive more revenue for your business.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Our Sales Coaching Services</h2>
        <p className="text-lg text-gray-700 mb-12">
          Ready to elevate your sales team's performance? Contact us today to learn more about our Sales Coaching Services and how we can help you achieve your sales goals.
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

export default SalesCoaching;
