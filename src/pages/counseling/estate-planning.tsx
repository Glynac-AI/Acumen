import React from 'react';
import { FileText, Shield, Users } from 'lucide-react';

const EstatePlanning = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Estate Planning Services</h1>
        <div className="w-full max-w-2xl mx-auto mb-12 bg-gradient-to-br from-ph/10 to-ph/5 rounded-lg aspect-video flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-24 h-24 text-ph/30 mx-auto mb-4" />
            <p className="text-ph/50">Estate Planning Illustration</p>
          </div>
        </div>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          Our Estate Planning Services are designed to help you secure your legacy and ensure that your assets are distributed according to your wishes. We provide comprehensive strategies to protect your family and minimize tax implications.
        </p>
        
        <h2 className="text-3xl font-semibold mb-8">Key Components of Our Estate Planning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <FileText className="w-12 h-12 text-ph mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Will Creation</h3>
            <p className="text-gray-600">Drafting a legally binding will to outline your wishes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <Shield className="w-12 h-12 text-ph mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Trust Establishment</h3>
            <p className="text-gray-600">Setting up trusts to manage your assets effectively.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <Users className="w-12 h-12 text-ph mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Power of Attorney</h3>
            <p className="text-gray-600">Designating someone to make decisions on your behalf.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-8">Why Estate Planning is Essential</h2>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          Effective estate planning ensures that your wishes are honored and that your loved ones are taken care of after your passing. It helps avoid legal complications and provides peace of mind knowing that your affairs are in order.
        </p>

        <h2 className="text-3xl font-semibold mb-8">Get Started with Our Estate Planning Services</h2>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          Ready to secure your legacy? Contact us today to learn more about our Estate Planning Services and how we can assist you in preparing for the future.
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

export default EstatePlanning;
