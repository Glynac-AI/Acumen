
import React from "react";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-ph-light/30 to-white/0">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-block mb-4">
              Get in Touch
            </span>
            <h1 className="heading-1 mb-6">
              Let's Discuss Your Practice Goals
            </h1>
            <p className="text-lg text-muted-foreground">
              Schedule a consultation with our team to explore how Acumen Advisory Consulting 
              can help transform your financial advisory practice.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <div className="animate-fade-up">
                <h2 className="heading-3 mb-6">Schedule a Consultation</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below, and one of our consultants will contact you 
                  within one business day to schedule your initial consultation.
                </p>
                
                <ContactForm />
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="glass-card p-8 rounded-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="heading-3 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-ph/10 text-ph flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office Location</h3>
                      <p className="text-muted-foreground">
                       4753 N. Broadway <br />
                       Chicago IL 60640
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-ph/10 text-ph flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+17734303534" className="hover:text-foreground transition-colors">
                          (773) 430-3534
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-ph/10 text-ph flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@acumenadvisoryconsulting" className="hover:text-foreground transition-colors">
                         info@acumenadvisoryconsulting
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-ph/10 text-ph flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9am - 6pm EST<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8 rounded-xl mt-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-ph/10 text-ph flex items-center justify-center mr-4 flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium">Need Immediate Assistance?</h3>
                </div>
                
                <p className="text-muted-foreground mt-4 mb-6">
                  For urgent matters or immediate assistance, please call our direct line.
                </p>
                
                <a 
                  href="tel:+12125551234" 
                  className="button-primary w-full text-center inline-block"
                >
                  Call Now: (212) 555-1234
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-md animate-fade-up">
            <div className="w-full h-full bg-ph/5 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-ph mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Our Location</h3>
                <p className="text-muted-foreground">
                4753 N. Broadway Chicago IL 60640
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
