import React from 'react';
import { FaBullhorn, FaChartLine, FaUsers } from 'react-icons/fa';

const LeadGeneration = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Lead Generation Services</h1>
        <img 
          src="/img/lead-generation.png" // Ensure you have this image in the public/img directory
          alt="Lead Generation" 
          className="w-1/2 h-auto object-cover rounded-lg mb-12 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-12">
          Our Lead Generation Services are designed to help businesses attract and convert potential customers into leads. We utilize a variety of strategies to ensure a steady flow of qualified leads to your sales team.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Strategies We Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaBullhorn className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Content Marketing</h3>
            <p className="text-gray-600">Creating valuable content to attract and engage your target audience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaChartLine className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">SEO Optimization</h3>
            <p className="text-gray-600">Improving your website's visibility on search engines to drive organic traffic.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaUsers className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Social Media Marketing</h3>
            <p className="text-gray-600">Leveraging social platforms to reach and engage potential leads.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Lead Generation is Important</h2>
        <p className="text-lg text-gray-700 mb-12">
          Effective lead generation is crucial for business growth. It helps you build a pipeline of potential customers, ensuring that your sales team has a consistent flow of opportunities to pursue.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Our Lead Generation Services</h2>
        <p className="text-lg text-gray-700 mb-12">
          Ready to boost your sales pipeline? Contact us today to learn more about our Lead Generation Services and how we can help your business grow.
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

export default LeadGeneration;
