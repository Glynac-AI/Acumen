
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
  Cog,
  Heart,
  Home,
  UserPlus,
  UsersRound,
  Wallet,
  Search,
  Calculator
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

const Services = () => {
  const categories = [
    {
      title: "Practice Growth",
      services: [
        {
          icon: Briefcase,
          title: "Practice Management",
          description: "Comprehensive strategies to grow AUM and optimize your practice operations.",
          link: "/services/practice-management"
        },
        {
          icon: Target,
          title: "Lead Generation",
          description: "Targeted approaches to attract qualified prospects to your financial advisory practice.",
          link: "/services/lead-generation"
        },
        {
          icon: Presentation,
          title: "Sales Coaching",
          description: "Enhance your team's client acquisition skills through proven sales methodologies.",
          link: "/services/sales-coaching"
        },
        {
          icon: Wallet,
          title: "Increase Share of Wallet",
          description: "Strategies to deepen relationships and grow assets with existing clients.",
          link: "/services/share-of-wallet"
        }
      ]
    },
    {
      title: "Client Services",
      services: [
        {
          icon: Users,
          title: "Client Retention",
          description: "Develop and implement strategies to enhance client satisfaction and long-term loyalty.",
          link: "/services/client-retention"
        },
        {
          icon: FileText,
          title: "Tax Planning",
          description: "Implement tax-efficient investment strategies to optimize client outcomes.",
          link: "/services/tax-planning"
        },
        {
          icon: Home,
          title: "Estate Planning",
          description: "Guide clients through comprehensive estate planning to protect and transfer wealth.",
          link: "/services/estate-planning"
        },
        {
          icon: UsersRound,
          title: "Multi-Generational Planning",
          description: "Develop strategies to serve multiple generations of client families.",
          link: "/services/multi-generational-planning"
        }
      ]
    },
    {
      title: "Operational Excellence",
      services: [
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
        },
        {
          icon: Calculator,
          title: "Portfolio Evaluation",
          description: "Comprehensive analysis of client portfolios to optimize performance and fee structures.",
          link: "/services/portfolio-evaluation"
        }
      ]
    },
    {
      title: "Team Development",
      services: [
        {
          icon: UserPlus,
          title: "Recruiting",
          description: "Attract and retain top talent to grow your financial advisory practice.",
          link: "/services/recruiting"
        },
        {
          icon: Users,
          title: "Succession Planning",
          description: "Develop and implement comprehensive succession plans for practice continuity.",
          link: "/services/succession-planning"
        },
        {
          icon: Heart,
          title: "Well-being",
          description: "Foster a healthy work environment and promote team well-being for optimal performance.",
          link: "/services/well-being"
        },
        {
          icon: Search,
          title: "Product Solutions",
          description: "Find the right products and solutions to match your clients' specific needs and goals.",
          link: "/services/product-solutions"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-ph-light/30 to-white/0">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-block mb-4">
              Our Services
            </span>
            <h1 className="heading-1 mb-6">
              Comprehensive Consulting Solutions for Financial Advisors
            </h1>
            <p className="text-lg text-muted-foreground">
              We offer a full spectrum of specialized consulting services designed to 
              help financial advisory practices optimize operations, drive growth, 
              and enhance client experiences.
            </p>
          </div>
        </div>
      </section>
      
      {/* Service Categories */}
      {categories.map((category, categoryIndex) => (
        <section key={categoryIndex} className="section-padding">
          <div className="container mx-auto px-6">
            <h2 className="heading-2 mb-10 text-center">{category.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.services.map((service, serviceIndex) => (
                <Link 
                  key={serviceIndex}
                  to={service.link}
                  className="no-underline text-foreground"
                >
                  <ServiceCard 
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    className="h-full hover:shadow-lg"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      {/* Process Section */}
      <section className="section-padding bg-gradient-to-b from-white to-ph-light/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-block mb-4">
              Our Approach
            </span>
            <h2 className="heading-2 mb-6">
              How We Work With You
            </h2>
            <p className="text-lg text-muted-foreground">
              Our proven consulting process ensures we deliver measurable results 
              tailored to your specific practice needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We conduct a comprehensive assessment of your practice to identify opportunities and challenges."
              },
              {
                step: "02",
                title: "Strategy Development",
                description: "We create a tailored roadmap with specific recommendations to achieve your goals."
              },
              {
                step: "03",
                title: "Implementation",
                description: "We work alongside your team to execute the strategic plan with precise guidance."
              },
              {
                step: "04",
                title: "Ongoing Support",
                description: "We provide continuous monitoring and adjustments to ensure sustainable success."
              }
            ].map((step, index) => (
              <div key={index} className="relative animate-fade-up" style={{ animationDelay: `${0.1 + (index * 0.1)}s` }}>
                <div className="w-16 h-16 bg-ph/10 rounded-full flex items-center justify-center text-ph text-2xl font-bold mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-12 h-2 -ml-2 -mr-2">
                    <div className="h-0.5 bg-ph/30 w-full mt-3"></div>
                    <div className="absolute right-0 top-2 w-2 h-2 border-t-2 border-r-2 border-ph/30 transform rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-ph text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="heading-2 mb-6">
            Ready to Transform Your Financial Advisory Practice?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule a consultation today to discuss how our tailored consulting services
            can help you achieve your growth objectives.
          </p>
          <Link 
            to="/contact" 
            className="bg-white text-ph font-medium px-8 py-3 rounded-md hover:bg-opacity-90 transition-all inline-block"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
