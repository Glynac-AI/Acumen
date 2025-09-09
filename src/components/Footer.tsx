import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight
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
    { name: "Our Team", link: "/about/team" },
    { name: "Careers", link: "/careers" },
    { name: "Contact", link: "/contact" }
  ];

  const resources = [
    { name: "Case Studies", link: "/case-studies" },
    { name: "Testimonials", link: "/testimonials" },
    { name: "FAQ", link: "/faq" }
  ];

  // Animation variants - fixed to use proper Framer Motion easing functions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const footerLinkVariants = {
    initial: { x: 0 },
    hover: { x: 3, transition: { duration: 0.2 } }
  };

  return (
    <footer className="relative overflow-hidden bg-white border-t border-gray-100">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-ph/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-ph/5 to-transparent blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-ph/5 to-transparent blur-3xl opacity-60"></div>

        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto">
        {/* Top section with newsletter */}
        <motion.div
          className="py-16 px-6 border-b border-gray-100 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-display font-light mb-4 text-foreground">Stay informed</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Subscribe to receive insights on wealth management recruiting trends and strategies.
              </p>

              <div className="flex items-stretch max-w-md">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-l-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-ph/30 focus:border-ph/30 transition-all bg-white"
                />
                <motion.button
                  className="px-4 py-3 bg-ph text-white rounded-r-md hover:bg-ph-dark transition-colors flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="hidden sm:inline mr-1">Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row md:justify-end gap-8"
              variants={itemVariants}
            >
              <div>
                <h4 className="text-foreground font-medium mb-4 flex items-center">
                  <span className="w-6 h-px bg-ph/30 mr-2"></span>
                  Contact us
                </h4>
                <div className="space-y-4">
                  <a
                    href="tel:+17734303534"
                    className="flex items-center text-muted-foreground hover:text-ph transition-colors group"
                  >
                    <Phone className="w-4 h-4 mr-3 text-ph/50 group-hover:text-ph transition-colors" />
                    (773) 430-3534
                  </a>
                  <a
                    href="mailto:info@acumenadvisoryconsulting.com"
                    className="flex items-center text-muted-foreground hover:text-ph transition-colors group"
                  >
                    <Mail className="w-4 h-4 mr-3 text-ph/50 group-hover:text-ph transition-colors" />
                    info@acumenrecruiting.com
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-foreground font-medium mb-4 flex items-center">
                  <span className="w-6 h-px bg-ph/30 mr-2"></span>
                  Follow us
                </h4>
                <div className="flex gap-3">
                  <motion.a
                    href="https://linkedin.com"
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-muted-foreground hover:bg-ph hover:text-white hover:border-ph transition-colors"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-muted-foreground hover:bg-ph hover:text-white hover:border-ph transition-colors"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com"
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-muted-foreground hover:bg-ph hover:text-white hover:border-ph transition-colors"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main footer section */}
        <motion.div
          className="py-16 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Logo and address */}
          <motion.div className="lg:col-span-4" variants={itemVariants}>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-display tracking-tight text-foreground">
                <span className="text-ph font-normal">Acumen</span> Recruiting
              </span>
            </Link>

            <p className="text-muted-foreground mb-6 max-w-md">
              Connecting elite wealth management talent with leading firms through a sophisticated, technology-enhanced approach.
            </p>

            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-ph mr-3 mt-0.5 shrink-0" />
              <span className="text-muted-foreground">
                4753 N. Broadway<br />
                Chicago IL 60640
              </span>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div className="lg:col-span-2 md:col-span-1" variants={itemVariants}>
            <h3 className="text-foreground font-medium mb-6 flex items-center">
              <span className="w-6 h-px bg-ph/30 mr-2"></span>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    className="flex items-center"
                  >
                    <motion.span variants={footerLinkVariants}>
                      <ChevronRight className="w-3 h-3 text-ph/0 group-hover:text-ph/100 mr-0 opacity-0 transition-all duration-200" />
                    </motion.span>
                    <Link
                      to={service.link}
                      className="text-muted-foreground hover:text-ph transition-colors group"
                    >
                      <motion.span variants={footerLinkVariants} className="inline-block">
                        {service.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div className="lg:col-span-2 md:col-span-1" variants={itemVariants}>
            <h3 className="text-foreground font-medium mb-6 flex items-center">
              <span className="w-6 h-px bg-ph/30 mr-2"></span>
              Company
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    className="flex items-center"
                  >
                    <motion.span variants={footerLinkVariants}>
                      <ChevronRight className="w-3 h-3 text-ph/0 group-hover:text-ph/100 mr-0 opacity-0 transition-all duration-200" />
                    </motion.span>
                    <Link
                      to={link.link}
                      className="text-muted-foreground hover:text-ph transition-colors group"
                    >
                      <motion.span variants={footerLinkVariants} className="inline-block">
                        {link.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div className="lg:col-span-2 md:col-span-1" variants={itemVariants}>
            <h3 className="text-foreground font-medium mb-6 flex items-center">
              <span className="w-6 h-px bg-ph/30 mr-2"></span>
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    className="flex items-center"
                  >
                    <motion.span variants={footerLinkVariants}>
                      <ChevronRight className="w-3 h-3 text-ph/0 group-hover:text-ph/100 mr-0 opacity-0 transition-all duration-200" />
                    </motion.span>
                    <Link
                      to={resource.link}
                      className="text-muted-foreground hover:text-ph transition-colors group"
                    >
                      <motion.span variants={footerLinkVariants} className="inline-block">
                        {resource.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div className="lg:col-span-2 md:col-span-1" variants={itemVariants}>
            <h3 className="text-foreground font-medium mb-6 flex items-center">
              <span className="w-6 h-px bg-ph/30 mr-2"></span>
              Get Started
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Ready to transform your talent acquisition?
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center px-5 py-2 rounded-md bg-ph text-white text-sm font-medium transition-colors hover:bg-ph-dark group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Request Consultation
                <motion.span
                  className="ml-1"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-3 h-3" />
                </motion.span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom copyright section */}
        <motion.div
          className="border-t border-gray-100 py-8 px-6 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Acumen Recruiting. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6 text-sm">
            <a href="/privacy" className="text-muted-foreground hover:text-ph transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-ph transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-muted-foreground hover:text-ph transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;