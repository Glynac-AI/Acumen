import React from 'react';
import { FaUserCheck, FaBriefcase, FaHandshake } from 'react-icons/fa';

const Recruiting = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Recruiting Services</h1>
        <img 
          src="/img/recruiting.png" // Ensure you have this image in the public/img directory
          alt="Recruiting" 
          className="w-1/2 h-auto object-cover rounded-lg mb-12 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-12">
          Our Recruiting Services are designed to help businesses find and hire the best talent. We specialize in identifying candidates who not only meet the qualifications but also fit the culture of your organization.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Components of Our Recruiting Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaUserCheck className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Candidate Sourcing</h3>
            <p className="text-gray-600">Utilizing various channels to find potential candidates.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaBriefcase className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Screening and Interviewing</h3>
            <p className="text-gray-600">Conducting thorough assessments to identify the best fits.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaHandshake className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Onboarding Support</h3>
            <p className="text-gray-600">Assisting with the integration of new hires into your team.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Effective Recruiting Matters</h2>
        <p className="text-lg text-gray-700 mb-12">
          Effective recruiting is essential for building a strong team. The right hires can drive your business forward, while poor hiring decisions can lead to costly turnover. Our expert team is dedicated to helping you find the right talent to achieve your business goals.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Our Recruiting Services</h2>
        <p className="text-lg text-gray-700 mb-12">
          Ready to enhance your team with top talent? Contact us today to learn more about our Recruiting Services and how we can assist you in finding the right candidates.
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

export default Recruiting;
