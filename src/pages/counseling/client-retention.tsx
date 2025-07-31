import React from 'react';
import { FaUsers, FaComments, FaStar } from 'react-icons/fa';

const ClientRetention = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-16">Client Retention Services</h1>
        <img 
          src="/img/client-retention.png"
          alt="Client Retention" 
          className="w-1/2 h-auto object-cover rounded-lg mb-16 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-16">
          Our Client Retention Services are designed to help businesses maintain strong relationships with their clients. We focus on strategies that enhance client satisfaction and loyalty, ensuring long-term success.
        </p>
        
        <h2 className="text-3xl font-semibold mb-12">Key Strategies for Client Retention</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaUsers className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Personalized Communication</h3>
            <p className="text-gray-600">Tailoring interactions to meet client needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaComments className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Feedback Mechanisms</h3>
            <p className="text-gray-600">Implementing systems to gather and act on client feedback.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaStar className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Loyalty Programs</h3>
            <p className="text-gray-600">Creating incentives for repeat business.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-12">Why Client Retention is Important</h2>
        <p className="text-lg text-gray-700 mb-16">
          Retaining clients is often more cost-effective than acquiring new ones. By focusing on client retention, businesses can increase profitability, enhance brand reputation, and foster a loyal customer base.
        </p>

        <h2 className="text-3xl font-semibold mb-12">Get Started with Our Client Retention Services</h2>
        <p className="text-lg text-gray-700 mb-16">
          Ready to improve your client retention strategies? Contact us today to learn more about our Client Retention Services and how we can help you build lasting relationships with your clients.
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

export default ClientRetention;
