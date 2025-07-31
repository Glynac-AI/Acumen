
import React from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Users, 
  FileText, 
  Target, 
  Presentation,
  ShieldCheck,
  TrendingUp,
  Cog
} from "lucide-react";
import ServiceCard from "./ServiceCard";

const ServiceSection = () => {
  const mainServices = [
    {
      icon: Briefcase,
      title: "Practice Management",
      description: "Optimize your practice operations and processes to maximize efficiency and growth potential.",
      link: "/services/practice-management"
    },
    {
      icon: Users,
      title: "Client Retention",
      description: "Develop and implement strategies to enhance client satisfaction and long-term loyalty.",
      link: "/services/client-retention"
    },
    {
      icon: FileText,
      title: "Tax Planning",
      description: "Implement tax-efficient investment strategies and approaches to optimize client outcomes.",
      link: "/services/tax-planning"
    },
    {
      icon: Target,
      title: "Lead Generation",
      description: "Create targeted marketing strategies to attract qualified prospects to your practice.",
      link: "/services/lead-generation"
    },
    {
      icon: Presentation,
      title: "Sales Coaching",
      description: "Enhance your team's client acquisition skills through proven sales methodologies.",
      link: "/services/sales-coaching"
    },
    {
      icon: ShieldCheck,
      title: "Compliance",
      description: "Ensure your practice meets all regulatory requirements while maintaining operational efficiency.",
      link: "/services/compliance"
    },
    {
      icon: Cog,
      title: "Task Automation",
      description: "Identify and implement automation opportunities to reduce manual work and increase productivity.",
      link: "/services/task-automation"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-block mb-4">
            Our Services
          </span>
          <h2 className="heading-2 mb-6">
            Comprehensive Consulting Services for Financial Advisors
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide end-to-end solutions designed to address the unique challenges and
            opportunities within financial advisory practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainServices.map((service, index) => (
            <Link 
              to={service.link} 
              key={index}
              className="no-underline text-foreground"
            >
              <ServiceCard 
                icon={service.icon}
                title={service.title}
                description={service.description}
                className="h-full"
              />
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/services" className="button-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
