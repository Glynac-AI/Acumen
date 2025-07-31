
import React from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Acumen Advisory Consulting transformed our practice. We've seen a 40% increase in AUM within just 12 months of implementing their recommendations.",
    author: "Sarah Johnson",
    title: "CFP®, Johnson Wealth Advisors",
    rating: 5
  },
  {
    quote: "Their approach to client retention strategies has dramatically improved our client satisfaction scores and referral rates.",
    author: "Michael Chen",
    title: "Managing Partner, Pacific Financial Group",
    rating: 5
  },
  {
    quote: "The tax planning strategies we learned have provided tremendous value to our high-net-worth clients. It's become a key differentiator for our practice.",
    author: "Jennifer Taylor",
    title: "CPA, Taylor Financial Solutions",
    rating: 5
  }
];

const TestimonialSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-ph-light/30 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-ph/10 text-ph-dark text-sm font-medium inline-block mb-4">
            Client Testimonials
          </span>
          <h2 className="heading-2 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear directly from financial advisors who have transformed their practices
            with our consulting services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={cn(
                "glass-card p-8 rounded-xl relative animate-fade-up",
                index === 0 ? "md:mt-0" : index === 1 ? "md:mt-8" : "md:mt-4"
              )}
              style={{ animationDelay: `${0.1 + (index * 0.1)}s` }}
            >
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={cn(
                      "inline-block mr-1", 
                      i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                    )}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99984 3.59169L11.9498 7.54169L16.2498 8.16669L13.1248 11.2084L13.8748 15.4917L9.99984 13.4584L6.1665 15.4917L6.9165 11.2084L3.7915 8.16669L8.0915 7.54169L9.99984 3.59169Z"/>
                    </svg>
                  </span>
                ))}
              </div>
              
              <p className="text-lg mb-6 text-foreground italic">"{testimonial.quote}"</p>
              
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
              </div>
              
              <div className="absolute -z-10 top-6 right-6 opacity-10">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.4 24H8V32H16V40H8C5.87827 40 3.84344 39.1571 2.34315 37.6569C0.842855 36.1566 0 34.1217 0 32V16L0.00800002 15.676C0.112933 13.6747 0.978437 11.7859 2.43054 10.3883C3.88265 8.99063 5.83049 8.2047 7.836 8.184L8 8.184H16V16H10.764C11.456 16.624 12 17.264 12 18.648V24H14.4ZM46.4 24H40V32H48V40H40C37.8783 40 35.8434 39.1571 34.3431 37.6569C32.8429 36.1566 32 34.1217 32 32V16L32.008 15.676C32.1129 13.6747 32.9784 11.7859 34.4305 10.3883C35.8826 8.99063 37.8305 8.2047 39.836 8.184L40 8.184H48V16H42.764C43.456 16.624 44 17.264 44 18.648V24H46.4Z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
