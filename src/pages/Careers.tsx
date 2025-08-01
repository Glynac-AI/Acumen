import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Heart, 
  MapPin, 
  Clock, 
  DollarSign,
  Mail,
  ArrowRight
} from "lucide-react";

const Careers = () => {
  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Competitive Compensation",
      description: "Attractive salary packages with performance bonuses"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Professional Growth",
      description: "Continuous learning and career development opportunities"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Culture",
      description: "Work with passionate professionals in a supportive environment"
    }
  ];

  const openPositions = [
    {
      title: "Senior Financial Consultant",
      location: "Chicago, IL",
      type: "Full-time",
      department: "Consulting",
      description: "Join our team as a Senior Financial Consultant, helping financial advisors transform their practices and achieve sustainable growth.",
      requirements: [
        "5+ years of experience in financial advisory consulting",
        "Strong understanding of practice management and client retention",
        "Excellent communication and presentation skills",
        "CFP or similar certification preferred"
      ]
    },
    {
      title: "Business Development Manager",
      location: "Remote",
      type: "Full-time",
      department: "Sales",
      description: "Drive business growth by identifying and developing new client relationships in the financial advisory space.",
      requirements: [
        "3+ years of B2B sales experience in financial services",
        "Proven track record of meeting and exceeding sales targets",
        "Strong networking and relationship-building skills",
        "Knowledge of financial advisory industry preferred"
      ]
    },
    {
      title: "Marketing Specialist",
      location: "Chicago, IL",
      type: "Full-time",
      department: "Marketing",
      description: "Create compelling marketing content and campaigns to support our consulting services and thought leadership initiatives.",
      requirements: [
        "2+ years of marketing experience in professional services",
        "Strong writing and content creation skills",
        "Experience with digital marketing platforms",
        "Understanding of financial services industry"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ph/10 via-background to-secondary/20 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Join Our Growing Team
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of a dynamic team that's transforming the financial advisory industry 
              through innovative consulting solutions and strategic partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-ph hover:bg-ph/90">
                View Open Positions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Why Work With Us
            </h2>
            <p className="text-lg text-muted-foreground">
              We're building a team of passionate professionals who are committed to excellence 
              and making a real impact in the financial advisory industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-ph/10 rounded-full flex items-center justify-center mx-auto mb-4 text-ph">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Open Positions
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our current opportunities and find the perfect role for your career growth.
              </p>
            </div>
            
            <div className="space-y-8">
              {openPositions.map((position, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-2xl font-display font-bold text-foreground mb-2">
                          {position.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {position.type}
                          </div>
                          <Badge variant="secondary" className="bg-ph/10 text-ph border-ph/20">
                            {position.department}
                          </Badge>
                        </div>
                      </div>
                      <Button className="mt-4 md:mt-0 bg-ph hover:bg-ph/90">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {position.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((requirement, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-ph mr-2 mt-1">•</span>
                            <span className="text-muted-foreground">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Our Culture
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              We foster a collaborative, innovative, and growth-oriented environment where 
              every team member can thrive and make a meaningful impact.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-ph/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-ph" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Growth Mindset</h3>
                <p className="text-muted-foreground">
                  We encourage continuous learning and professional development at every level.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-ph/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-ph" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Success comes from working together and supporting each other's growth.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-ph/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-ph" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We embrace new ideas and creative solutions to drive industry transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ph text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              If you don't see a position that matches your skills, we'd still love to hear from you. 
              Send us your resume and let's explore opportunities together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-ph hover:bg-gray-100">
                <Mail className="w-4 h-4 mr-2" />
                Send Resume
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-ph">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers; 
