import React from "react";
import Hero from "@/components/Hero";
import ServiceSection from "@/components/ServiceSection";
import TestimonialSection from "@/components/TestimonialSection";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Briefcase, 
  Users, 
  UserPlus 
} from "lucide-react";

const Index = () => {
  const stats = [
    { icon: BarChart3, value: "40%", label: "Average AUM Growth" },
    { icon: LineChart, value: "65%", label: "Efficiency Improvement" },
    { icon: PieChart, value: "85%", label: "Client Retention" },
    { icon: Briefcase, value: "500+", label: "Advisors Served" },
    { icon: Users, value: "$25B+", label: "Assets Influenced" },
    { icon: UserPlus, value: "90%", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen pt-20">
      <Hero />
      
      <ServiceSection />
      
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-block mb-4">
              Results That Matter
            </span>
            <h2 className="heading-2 mb-6">
              Measurable Impact for Financial Advisors
            </h2>
            <p className="text-lg text-muted-foreground">
              Our consulting services deliver quantifiable results that help financial
              advisory practices thrive in today's competitive landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="glass-card p-8 rounded-xl text-center animate-fade-up"
                  style={{ animationDelay: `${0.1 + (index * 0.1)}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-ph/10 text-ph flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <TestimonialSection />
      
      <section className="section-padding bg-ph text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="heading-2 mb-6">
            Ready to Transform Your Financial Advisory Practice?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule a consultation today to discuss how our tailored consulting services
            can help you achieve your growth objectives.
          </p>
          <a 
            href="/contact" 
            className="bg-white text-ph font-medium px-8 py-3 rounded-md hover:bg-opacity-90 transition-all inline-block"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
