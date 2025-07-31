import React from 'react';
import { FaBalanceScale, FaHeart, FaChartLine } from 'react-icons/fa';

const HolisticPlanning = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Holistic Planning Services</h1>
        <img 
          src="/img/holistic-planning.png"
          alt="Holistic Planning" 
          className="w-1/2 h-auto object-cover rounded-lg mb-12 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-12">
          Our Holistic Planning Services take a comprehensive approach to financial planning, considering all aspects of your life and goals. We aim to create a balanced strategy that aligns your financial decisions with your personal values and aspirations.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Components of Our Holistic Planning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaBalanceScale className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Comprehensive Financial Assessment</h3>
            <p className="text-gray-600">Evaluating your current financial situation and future goals.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaHeart className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Goal Setting</h3>
            <p className="text-gray-600">Identifying short-term and long-term financial goals.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaChartLine className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Investment Strategy</h3>
            <p className="text-gray-600">Developing a tailored investment plan that reflects your risk tolerance.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Holistic Planning Matters</h2>
        <p className="text-lg text-gray-700 mb-12">
          Holistic planning ensures that all aspects of your financial life are considered, leading to more informed decisions and better outcomes. By integrating your financial, personal, and emotional goals, we help you achieve a fulfilling and secure future.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Our Holistic Planning Services</h2>
        <p className="text-lg text-gray-700 mb-12">
          Ready to take a comprehensive approach to your financial planning? Contact us today to learn more about our Holistic Planning Services and how we can help you achieve your goals.
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

export default HolisticPlanning;
