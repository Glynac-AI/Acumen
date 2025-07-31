// src/components/Navbar.tsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ChevronDown, 
  Menu, 
  X,
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
  BookOpen,
  Info,
  Phone
} from "lucide-react";

// Service dropdown items organized by categories
const serviceItems = [
  {
    category: "Business Growth",
    items: [
      { name: "Practice Management", icon: <Briefcase className="w-4 h-4 mr-2" />, path: "/counseling/practice-management" },
      { name: "Lead Generation", icon: <Target className="w-4 h-4 mr-2" />, path: "/counseling/lead-generation" },
      { name: "Sales Coaching", icon: <Presentation className="w-4 h-4 mr-2" />, path: "/counseling/sales-coaching" },
    ]
  },
  {
    category: "Team Development",
    items: [
      { name: "Recruiting", icon: <Users className="w-4 h-4 mr-2" />, path: "/counseling/recruiting" },
      { name: "Succession Planning", icon: <Users className="w-4 h-4 mr-2" />, path: "/counseling/succession-planning" },
      { name: "Well-being", icon: <Heart className="w-4 h-4 mr-2" />, path: "/counseling/well-being" },
    ]
  },
  {
    category: "Client Services",
    items: [
      { name: "Client Retention", icon: <Users className="w-4 h-4 mr-2" />, path: "/counseling/client-retention" },
      { name: "Holistic Planning", icon: <BookOpen className="w-4 h-4 mr-2" />, path: "/counseling/holistic-planning" },
      { name: "Estate Planning", icon: <FileText className="w-4 h-4 mr-2" />, path: "/counseling/estate-planning" },
      { name: "Tax Planning", icon: <FileText className="w-4 h-4 mr-2" />, path: "/counseling/tax-planning" },
    ]
  },
  {
    category: "Operations",
    items: [
      { name: "Task Automation", icon: <Cog className="w-4 h-4 mr-2" />, path: "/counseling/task-automation" },
      { name: "Portfolio Evaluation", icon: <FileText className="w-4 h-4 mr-2" />, path: "/counseling/portfolio-evaluation" },
    ]
  }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const location = useLocation();

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center" 
          onClick={closeMenus}
        >
          <span className="text-2xl font-display font-bold text-foreground">
            <span className="text-ph">Acumen Advisory</span> Consulting
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn("navbar-link", isActive("/") && "active-link")}
          >
            <span className="flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </span>
          </Link>
          
          <div className="relative group">
            <button 
              className={cn(
                "navbar-link flex items-center", 
                location.pathname.includes("/services") && "active-link"
              )}
              onClick={toggleServiceDropdown}
            >
              <Briefcase className="w-4 h-4 mr-1" />
              Services
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            
            {/* Services Mega Menu */}
            <div className="absolute top-full left-0 mt-1 w-[600px] p-4 glass-card rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground">Business Growth</h3>
                <ul className="space-y-2">
                  {serviceItems[0].items.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.path} 
                        className="flex items-center py-1 text-foreground/80 hover:text-ph transition-colors duration-200"
                        onClick={closeMenus}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h3 className="font-medium text-sm text-muted-foreground">Team Development</h3>
                <ul className="space-y-2">
                  {serviceItems[1].items.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.path} 
                        className="flex items-center py-1 text-foreground/80 hover:text-ph transition-colors duration-200"
                        onClick={closeMenus}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground">Client Services</h3>
                <ul className="space-y-2">
                  {serviceItems[2].items.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.path} 
                        className="flex items-center py-1 text-foreground/80 hover:text-ph transition-colors duration-200"
                        onClick={closeMenus}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h3 className="font-medium text-sm text-muted-foreground">Operations</h3>
                <ul className="space-y-2">
                  {serviceItems[3].items.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.path} 
                        className="flex items-center py-1 text-foreground/80 hover:text-ph transition-colors duration-200"
                        onClick={closeMenus}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <Link 
            to="/about" 
            className={cn("navbar-link", isActive("/about") && "active-link")}
          >
            <span className="flex items-center">
              <Info className="w-4 h-4 mr-1" />
              About
            </span>
          </Link>
          
          <Link 
            to="/contact" 
            className={cn("navbar-link", isActive("/contact") && "active-link")}
          >
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              Contact
            </span>
          </Link>
          
          <Link 
            to="/contact" 
            className="button-primary ml-2"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-300 ease-in-out pt-20",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="container px-6 py-6 flex flex-col h-full overflow-y-auto">
          <Link 
            to="/" 
            className="flex items-center py-3 text-lg font-medium"
            onClick={closeMenus}
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          
          <button 
            className="flex items-center justify-between w-full py-3 text-lg font-medium"
            onClick={toggleServiceDropdown}
          >
            <span className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Services
            </span>
            <ChevronDown className={cn(
              "w-5 h-5 transition-transform duration-200",
              serviceDropdownOpen && "rotate-180"
            )} />
          </button>
          
          {/* Mobile Services Dropdown */}
          {serviceDropdownOpen && (
            <div className="pl-4 mb-4 space-y-4">
              {serviceItems.map((category, idx) => (
                <div key={idx} className="mb-3">
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.path} 
                          className="flex items-center py-2 text-foreground/80"
                          onClick={closeMenus}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          
          <Link 
            to="/about" 
            className="flex items-center py-3 text-lg font-medium"
            onClick={closeMenus}
          >
            <Info className="w-5 h-5 mr-2" />
            About
          </Link>
          
          <Link 
            to="/contact" 
            className="flex items-center py-3 text-lg font-medium"
            onClick={closeMenus}
          >
            <Phone className="w-5 h-5 mr-2" />
            Contact
          </Link>
          
          <div className="mt-auto">
            <Link 
              to="/contact" 
              className="button-primary w-full text-center mt-6"
              onClick={closeMenus}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;