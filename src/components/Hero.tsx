
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-ph-light/30 to-white/0">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[30vw] h-[30vw] bg-ph/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[20vw] h-[20vw] bg-ph/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 pt-20 z-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-flex items-center mb-6">
              Trusted by Leading Financial Advisors
            </span>
            <h1 className="heading-1 mb-6">
              Transform Your Financial Practice With <span className="text-ph">Expert Consulting</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Acumen Advisory Consulting partners with financial advisors to optimize operations, 
              drive growth, and deliver exceptional client experiences. Our tailored 
              solutions address your specific challenges and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="button-primary">
                Schedule a Consultation
              </Link>
              <Link to="/services" className="button-secondary flex items-center justify-center">
                Explore Our Services
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-xs font-medium">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">500+</span> Financial Advisors Trust Us
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8 bg-gradient-to-br from-ph/20 to-transparent">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-ph rounded-lg"></div>
                </div>
                <h3 className="text-xl font-medium mb-3">Comprehensive Consulting</h3>
                <p className="text-muted-foreground mb-6">
                  Our holistic approach addresses every aspect of your financial practice. 
                  From client acquisition to portfolio optimization.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Practice Growth",
                    "Client Experience Enhancement",
                    "Operational Efficiency",
                    "Strategic Planning"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-ph/20 text-ph flex items-center justify-center mr-3">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-ph/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
