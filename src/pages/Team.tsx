import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail, Phone } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Alisa Kolodizner",
      role: "Founder & CEO",
      image: "/img/alisa-kolodizner.png",
      bio: "With over 15 years of experience in financial advisory consulting, Alisa has helped hundreds of advisors transform their practices and achieve sustainable growth.",
      email: "alisa@acumenadvisoryconsulting.com",
      phone: "(773) 430-3534",
      linkedin: "https://linkedin.com/in/alisa-kolodizner",
      specialties: ["Practice Management", "Succession Planning", "Strategic Growth"]
    },
    {
      name: "Bavu Vilane",
      role: "Senior Consultant",
      image: "/img/bavu-vilane.png",
      bio: "Bavu brings deep expertise in client retention strategies and operational efficiency, helping advisors build lasting relationships and streamline their processes.",
      email: "bavu@acumenadvisoryconsulting.com",
      phone: "(773) 430-3534",
      linkedin: "https://linkedin.com/in/bavu-vilane",
      specialties: ["Client Retention", "Operations", "Process Optimization"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ph/10 via-background to-secondary/20 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Meet Our Expert Team
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Dedicated professionals committed to transforming financial advisory practices 
              through strategic consulting and personalized solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-ph/5 to-secondary/5">
                    <div className="flex items-start space-x-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="text-2xl font-bold bg-ph text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-display font-bold text-foreground mb-2">
                          {member.name}
                        </CardTitle>
                        <p className="text-lg text-ph font-medium mb-3">{member.role}</p>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-ph/10 text-ph border-ph/20">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-ph" />
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-ph" />
                        <a 
                          href={`tel:${member.phone}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {member.phone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Linkedin className="w-5 h-5 text-ph" />
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Connect on LinkedIn
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-ph/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-ph">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in everything we do, delivering exceptional results for our clients.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-ph/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-ph">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Partnership</h3>
                <p className="text-muted-foreground">
                  We work collaboratively with our clients, building long-term relationships based on trust and mutual success.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-ph/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-ph">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We stay ahead of industry trends and leverage cutting-edge strategies to drive growth and efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team; 