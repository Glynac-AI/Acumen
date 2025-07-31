import React from 'react';
import { FaChartBar, FaClipboardList, FaDollarSign } from 'react-icons/fa';

const PortfolioEvaluation = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Portfolio Evaluation Services</h1>
        <img 
          src="/img/portfolio-evaluation.png" // Ensure you have this image in the public/img directory
          alt="Portfolio Evaluation" 
          className="w-1/2 h-auto object-cover rounded-lg mb-12 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-12">
          Our Portfolio Evaluation Services are designed to help clients assess the performance and risk of their investment portfolios. We provide comprehensive analysis and actionable insights to optimize your investment strategy.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Components of Our Evaluation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaChartBar className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Performance Analysis</h3>
            <p className="text-gray-600">Review historical performance against benchmarks.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaClipboardList className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Risk Assessment</h3>
            <p className="text-gray-600">Evaluate the risk profile of your portfolio.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaDollarSign className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Cost Analysis</h3>
            <p className="text-gray-600">Identify fees and expenses that may impact returns.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Portfolio Evaluation Matters</h2>
        <p className="text-lg text-gray-700 mb-12">
          Regular portfolio evaluations are essential to ensure that your investments align with your financial goals and risk tolerance. Our expert team leverages industry best practices to provide you with a clear understanding of your portfolio's strengths and weaknesses.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Your Portfolio Evaluation</h2>
        <p className="text-lg text-gray-700 mb-12">
          Ready to optimize your investment strategy? Contact us today to schedule a portfolio evaluation and take the first step towards achieving your financial goals.
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

export default PortfolioEvaluation;
