
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const services = [
    { name: "Practice Management", link: "/services/practice-management" },
    { name: "Client Retention", link: "/services/client-retention" },
    { name: "Tax Planning", link: "/services/tax-planning" },
    { name: "Lead Generation", link: "/services/lead-generation" },
  ];
  
  const aboutLinks = [
    { name: "About Us", link: "/about" },
    { name: "Our Team", link: "/about#team" },
    { name: "Careers", link: "/careers" },
    { name: "Contact", link: "/contact" }
  ];
  
  const resources = [
    { name: "Blog", link: "/blog" },
    { name: "Case Studies", link: "/case-studies" },
    { name: "Testimonials", link: "/testimonials" },
    { name: "FAQ", link: "/faq" }
  ];

  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center mb-6">
              <span className="text-2xl font-display font-bold text-foreground">
                <span className="text-ph">Acumen Advisory</span> Consulting
              </span>
            </Link>
            
            <p className="text-muted-foreground mb-6">
              Transforming financial advisory practices through expert consulting and tailored solutions.
            </p>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-ph hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-ph hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-ph hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-ph hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.link}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Company</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.link}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-ph mr-3 mt-0.5" />
                <span className="text-muted-foreground">
                4753 N. Broadway<br />
                Chicago IL 60640
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-ph mr-3" />
                <a 
                  href="tel:+17734303534"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  (773) 430-3534
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-ph mr-3" />
                <a 
                  href="mailto:info@acumenadvisoryconsulting"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@acumenadvisoryconsulting
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Acumen Advisory Consulting. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
