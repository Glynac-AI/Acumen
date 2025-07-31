import React from 'react';
import { FaCog, FaRobot, FaTasks } from 'react-icons/fa';

const TaskAutomation = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Task Automation Services</h1>
        <img 
          src="/img/task-automation.png" // Ensure you have this image in the public/img directory
          alt="Task Automation" 
          className="w-1/2 h-auto object-cover rounded-lg mb-12 transition-transform transform hover:scale-95 mx-auto"
        />
        <p className="text-lg text-gray-700 mb-12">
          Our Task Automation Services help businesses streamline their operations by automating repetitive tasks. This allows your team to focus on more strategic initiatives while improving efficiency and accuracy.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Components of Our Task Automation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaCog className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Process Automation</h3>
            <p className="text-gray-600">Automating workflows to reduce manual effort.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaRobot className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">AI Integration</h3>
            <p className="text-gray-600">Leveraging AI to enhance task efficiency.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FaTasks className="text-4xl text-ph mb-2" />
            <h3 className="text-xl font-semibold">Task Management</h3>
            <p className="text-gray-600">Streamlining task assignments and tracking.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Task Automation is Essential</h2>
        <p className="text-lg text-gray-700 mb-12">
          Automating tasks can significantly reduce errors and save time, allowing your team to focus on high-value activities. Our services ensure that your operations run smoothly and efficiently.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Our Task Automation Services</h2>
        <p className="text-lg text-gray-700 mb-12">
          Ready to enhance your operational efficiency? Contact us today to learn more about our Task Automation Services and how we can help you streamline your processes.
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

export default TaskAutomation;
