// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

// Service dropdown items organized by categories
const serviceItems = [
  {
    category: "Business Growth",
    items: [
      { name: "Practice Management", path: "/counseling/practice-management" },
      { name: "Lead Generation", path: "/counseling/lead-generation" },
      { name: "Sales Coaching", path: "/counseling/sales-coaching" },
    ]
  },
  {
    category: "Team Development",
    items: [
      { name: "Recruiting", path: "/counseling/recruiting" },
      { name: "Succession Planning", path: "/counseling/succession-planning" },
      { name: "Well-being", path: "/counseling/well-being" },
    ]
  },
  {
    category: "Client Services",
    items: [
      { name: "Client Retention", path: "/counseling/client-retention" },
      { name: "Holistic Planning", path: "/counseling/holistic-planning" },
      { name: "Estate Planning", path: "/counseling/estate-planning" },
      { name: "Tax Planning", path: "/counseling/tax-planning" },
    ]
  },
  {
    category: "Operations",
    items: [
      { name: "Task Automation", path: "/counseling/task-automation" },
      { name: "Portfolio Evaluation", path: "/counseling/portfolio-evaluation" },
    ]
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const location = useLocation();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (serviceDropdownOpen) setServiceDropdownOpen(false);
  };

  const toggleServiceDropdown = () => {
    setServiceDropdownOpen(!serviceDropdownOpen);
  };

  const closeMenus = () => {
    setIsOpen(false);
    setServiceDropdownOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="relative z-10 flex items-center"
            onClick={closeMenus}
          >
            <motion.span
              className={`text-2xl font-display font-light tracking-tight transition-colors duration-300 ${isScrolled ? 'text-[#0A2540]' : 'text-[#0A2540]'
                }`}
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
            >
              <span className={`font-normal text-[#4F6BFF]`}>Acumen</span> Recruiting
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink href="/" active={isActive("/")} isScrolled={isScrolled}>
              Home
            </NavLink>

            <div className="relative group">
              <button
                className={`px-5 py-2 transition-colors duration-300 rounded-full group flex items-center ${location.pathname.includes("/services")
                    ? `${isScrolled ? 'text-[#4F6BFF]' : 'text-[#4F6BFF]'}`
                    : `${isScrolled ? 'text-[#0A2540]' : 'text-[#0A2540]'} hover:text-[#4F6BFF]`
                  }`}
                onClick={toggleServiceDropdown}
                onMouseEnter={() => setServiceDropdownOpen(true)}
                onMouseLeave={() => setServiceDropdownOpen(false)}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
              </button>

              {/* Services Mega Menu */}
              <AnimatePresence>
                {serviceDropdownOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-[600px] rounded-xl overflow-hidden shadow-xl bg-white border border-gray-100"
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setServiceDropdownOpen(true)}
                    onMouseLeave={() => setServiceDropdownOpen(false)}
                  >
                    <div className="p-6 grid grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        {serviceItems.slice(0, 2).map((category, idx) => (
                          <div key={idx}>
                            <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">{category.category}</h3>
                            <ul className="space-y-2">
                              {category.items.map((item, index) => (
                                <li key={index}>
                                  <Link
                                    to={item.path}
                                    className="group flex items-center text-[#0A2540] hover:text-[#4F6BFF] transition-colors py-1"
                                    onClick={closeMenus}
                                  >
                                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:-translate-x-2 transition-all">
                                      <ChevronRight className="w-3 h-3" />
                                    </span>
                                    <span className="transform translate-x-0 group-hover:-translate-x-1 transition-transform">
                                      {item.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {serviceItems.slice(2).map((category, idx) => (
                          <div key={idx}>
                            <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">{category.category}</h3>
                            <ul className="space-y-2">
                              {category.items.map((item, index) => (
                                <li key={index}>
                                  <Link
                                    to={item.path}
                                    className="group flex items-center text-[#0A2540] hover:text-[#4F6BFF] transition-colors py-1"
                                    onClick={closeMenus}
                                  >
                                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:-translate-x-2 transition-all">
                                      <ChevronRight className="w-3 h-3" />
                                    </span>
                                    <span className="transform translate-x-0 group-hover:-translate-x-1 transition-transform">
                                      {item.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer with CTA */}
                    <div className="p-4 bg-gradient-to-r from-[#f5f8ff] to-white border-t border-gray-100">
                      <Link
                        to="/services"
                        className="text-sm text-[#4F6BFF] font-medium hover:underline flex items-center"
                        onClick={closeMenus}
                      >
                        <span>View all services</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/about" active={isActive("/about")} isScrolled={isScrolled}>
              About
            </NavLink>

            <NavLink href="/contact" active={isActive("/contact")} isScrolled={isScrolled}>
              Contact
            </NavLink>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contact"
                className="ml-3 inline-flex items-center justify-center px-6 py-2 bg-[#4F6BFF] text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-all"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-10"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className={`w-6 h-6 ${isScrolled ? 'text-[#0A2540]' : 'text-[#0A2540]'}`} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className={`w-6 h-6 ${isScrolled ? 'text-[#0A2540]' : 'text-[#0A2540]'}`} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 lg:hidden pt-24 overflow-y-auto flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="container px-6 py-6 flex flex-col h-full">
              <Link
                to="/"
                className="flex items-center py-4 text-xl font-medium text-[#0A2540]"
                onClick={closeMenus}
              >
                Home
              </Link>

              <button
                className="flex items-center justify-between w-full py-4 text-xl font-medium text-[#0A2540]"
                onClick={toggleServiceDropdown}
              >
                <span>Services</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${serviceDropdownOpen ? 'rotate-180' : ''
                  }`} />
              </button>

              {/* Mobile Services Dropdown */}
              <AnimatePresence>
                {serviceDropdownOpen && (
                  <motion.div
                    className="pl-4 mb-4 space-y-6"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {serviceItems.map((category, idx) => (
                      <div key={idx} className="mb-4">
                        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">{category.category}</h3>
                        <ul className="space-y-3">
                          {category.items.map((item, index) => (
                            <li key={index}>
                              <Link
                                to={item.path}
                                className="flex items-center py-2 text-[#0A2540]"
                                onClick={closeMenus}
                              >
                                <ChevronRight className="w-4 h-4 mr-2 text-[#4F6BFF]" />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                to="/about"
                className="flex items-center py-4 text-xl font-medium text-[#0A2540]"
                onClick={closeMenus}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="flex items-center py-4 text-xl font-medium text-[#0A2540]"
                onClick={closeMenus}
              >
                Contact
              </Link>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full py-4 bg-[#4F6BFF] text-white text-base font-medium rounded-full shadow-sm"
                  onClick={closeMenus}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// NavLink component for consistent styling
const NavLink = ({ href, active, isScrolled, children }) => {
  return (
    <Link
      to={href}
      className={`px-5 py-2 transition-colors duration-300 rounded-full ${active
          ? `${isScrolled ? 'text-[#4F6BFF]' : 'text-[#4F6BFF]'}`
          : `${isScrolled ? 'text-[#0A2540]' : 'text-[#0A2540]'} hover:text-[#4F6BFF]`
        }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;