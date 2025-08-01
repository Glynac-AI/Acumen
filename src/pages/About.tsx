import React from "react";
import { Link } from "react-router-dom";
import { 
  Award, 
  Users, 
  TrendingUp, 
  Lightbulb, 
  ClipboardCheck,
  Clock,
  Compass
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "We are committed to delivering exceptional quality in every aspect of our consulting services."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "We continuously explore new approaches and technologies to drive better outcomes for our clients."
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "Integrity",
      description: "We conduct ourselves with the highest ethical standards and transparency in all client interactions."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Partnership",
      description: "We build collaborative relationships focused on mutual growth and success."
    }
  ];
  
  const team = [
    {
      name: "Alisa Kolodizner",
      title: "Founder | Operator | CFP®",
      bio: (
        <>
          <p>Alisa is an entrepreneur, investor, and former top-ranked institutional sales leader with deep expertise in financial services, private equity, and real estate. She was ranked #1 in institutional sales nationally and recognized among the top 1% of financial advisors at a Fortune 500 financial institution.</p>
          
          <p>With a background in financial services and emerging technology, Alisa led enterprise partnerships with 300 of the most successful investment firms in the U.S, managing over $3 trillion in assets. She has built sales and product teams from the ground up, supported dozens of strategic mergers and acquisitions, and coached hundreds of financial advisors nationwide.</p>
          
          <p>As Co-Owner and Managing Director of Prairie Hill Holdings, she leads business development, investor relations, and client success for a private real estate fund with over $68M in commercial acquisitions. She also serves as Managing Partner of LCW, a leading cultural competence training firm, which she acquired through a complex private equity transaction involving $15M+ in equity, debt, and seller financing.</p>
          
          <p>Alisa also co-founded Local Up, a multi-billion-dollar revenue stream aimed at closing the $25T market gap in small and medium-sized business lending. She is a Certified Financial Planner™, a board member of Genesys Works Chicago, and holds a B.S. in Environmental Science from the University of Illinois and Executive Education credentials from the University of Chicago Booth School of Business</p>
        </>
      ),
      image: "/img/alisa-kolodizner.png"
    },
    {
      name: "Bavu Vilane",
      title: "Chief Strategy Officer",
      bio: "Bavukile (Bavu) Vilane is an operations and startup specialist with a passion for building systems that drive growth and efficiency. Over the past five years, he has led operations across multiple startups, consulted for early-stage companies, and developed a reputation for problem-solving and strategic execution. His journey—from startup founder to operations lead—has uniquely positioned him to thrive in high-stakes environments. Today, his expertise has naturally evolved into the world of financial services, where he brings structure, relationship-building, and a performance mindset to his work in a dynamic, results-driven setting.",
      image: "/img/bavu-vilane.png"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-ph-light/30 to-white/0">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-block mb-4">
              About Acumen Advisory Consulting
            </span>
            <h1 className="heading-1 mb-6">
              Transforming Financial Advisory Practices Through Expert Guidance
            </h1>
            <p className="text-lg text-muted-foreground">
              Founded on the principles of excellence and innovation, Acumen Advisory Consulting 
              partners with financial advisors to optimize their practices and achieve 
              sustainable growth.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-block mb-4">
                Our Story
              </span>
              <h2 className="heading-2 mb-6">
                From Industry Insight to Transformative Consulting
              </h2>
              <p className="text-muted-foreground mb-6">
                Acumen Advisory Consulting was founded by Patricia Hernandez, a veteran of the financial 
                advisory industry who identified a critical gap in practice management resources 
                for independent advisors and small to mid-sized firms.
              </p>
              <p className="text-muted-foreground mb-6">
                After 20 years of leading advisory teams and witnessing the challenges that 
                prevented capable advisors from reaching their full potential, Patricia assembled 
                a team of industry experts to create a consulting firm that addresses the complete 
                spectrum of practice management needs.
              </p>
              <p className="text-muted-foreground">
                Today, Acumen Advisory Consulting works with financial advisors across the country, delivering 
                tailored solutions that drive growth, enhance client experiences, and optimize 
                operational efficiency.
              </p>
            </div>
            
            <div className="relative">
              <div className="glass-card rounded-2xl overflow-hidden shadow-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="bg-gradient-to-br from-ph/20 to-transparent p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="glass-card rounded-xl p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-ph mx-auto mb-3" />
                      <h3 className="text-2xl font-bold mb-1">500+</h3>
                      <p className="text-sm text-muted-foreground">Advisors Served</p>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                      <Clock className="w-8 h-8 text-ph mx-auto mb-3" />
                      <h3 className="text-2xl font-bold mb-1">15+</h3>
                      <p className="text-sm text-muted-foreground">Years Experience</p>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                      <Compass className="w-8 h-8 text-ph mx-auto mb-3" />
                      <h3 className="text-2xl font-bold mb-1">50</h3>
                      <p className="text-sm text-muted-foreground">States Covered</p>
                    </div>
                    <div className="glass-card rounded-xl p-6 text-center">
                      <Users className="w-8 h-8 text-ph mx-auto mb-3" />
                      <h3 className="text-2xl font-bold mb-1">25</h3>
                      <p className="text-sm text-muted-foreground">Team Members</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-ph/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="section-padding bg-gradient-to-b from-white to-ph-light/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-block mb-4">
              Our Values
            </span>
            <h2 className="heading-2 mb-6">
              Principles That Guide Our Work
            </h2>
            <p className="text-lg text-muted-foreground">
              At Acumen Advisory Consulting, our core values shape how we approach every client 
              engagement and inform the solutions we develop.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="glass-card p-8 rounded-xl text-center animate-fade-up"
                style={{ animationDelay: `${0.1 + (index * 0.1)}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-ph/10 text-ph flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section id="team" className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-block mb-4">
              Our Team
            </span>
            <h2 className="heading-2 mb-6">
              Meet the Experts Behind Acumen Advisory Consulting
            </h2>
            <p className="text-lg text-muted-foreground">
              Our team brings decades of combined experience in financial advisory 
              practice management, client service, and business optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="glass-card rounded-xl overflow-hidden animate-fade-up"
                style={{ animationDelay: `${0.1 + (index * 0.1)}s` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-sm text-ph mb-3">{member.title}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-ph text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="heading-2 mb-6">
            Ready to Work With Our Team?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Take the first step toward transforming your financial advisory practice.
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

export default About;
