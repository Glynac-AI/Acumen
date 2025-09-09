import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, ArrowRight, CheckCircle } from "lucide-react";

const CTASection = () => {
  // Benefits list
  const benefits = [
    "Access to pre-screened wealth management talent",
    "Technology-enhanced candidate discovery",
    "Industry-specific expertise",
    "Accelerated hiring process"
  ];

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-ph/90 to-ph pointer-events-none"></div>
      
      {/* Abstract background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-white/5 rounded-bl-[100px]"></div>
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-white/5 rounded-tr-[200px]"></div>

        {/* Abstract circles */}
        <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full border border-white/10"></div>
        <div className="absolute bottom-[30%] right-[15%] w-24 h-24 rounded-full border border-white/10"></div>
        <div className="absolute top-[60%] left-[30%] w-16 h-16 rounded-full border border-white/10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-light tracking-wide text-white mb-6">
              Begin Your Talent Discovery Journey
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Schedule a consultation to explore how our approach can enhance your wealth management firm's talent acquisition strategy.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div>
              <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-light text-white mb-6">Schedule Your Consultation</h3>

                <form className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-white/90">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-md border-0 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-white/90">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-md border-0 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1.5 text-white/90">
                      Firm Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 rounded-md border-0 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                      placeholder="Your Wealth Management Firm"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-1.5 text-white/90">
                      Role You're Hiring For
                    </label>
                    <select
                      id="role"
                      className="w-full px-4 py-3 rounded-md border-0 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    >
                      <option value="" disabled selected className="text-gray-500">Select role type</option>
                      <option value="wealth-manager">Wealth Manager / Advisor</option>
                      <option value="financial-planner">Financial Planner</option>
                      <option value="tax-advisor">Tax Advisor</option>
                      <option value="estate-planning">Estate Planning Specialist</option>
                      <option value="compliance">Compliance Officer</option>
                      <option value="operations">Operations / Support</option>
                      <option value="other">Other (Specify in Discussion)</option>
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-4 bg-white text-ph font-medium rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Schedule Your Consultation
                    <PhoneCall className="w-4 h-4" />
                  </motion.button>
                </form>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-light text-white mb-8">Why Partner with Acumen</h3>

              <ul className="space-y-6 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                  >
                    <CheckCircle className="w-6 h-6 text-white shrink-0" />
                    <span className="text-white/90 text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <blockquote className="text-white/90 italic">
                  "Acumen helped us find our Senior Wealth Advisor in just 12 days - a position we had been struggling to fill for months."
                </blockquote>
                <div className="mt-3 text-white font-medium">
                  — Managing Director, Private Wealth Firm
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-white/80">
              Not ready to schedule? Explore our <a href="/solutions" className="underline hover:text-white transition-colors">talent solutions</a> or learn more <a href="/about" className="underline hover:text-white transition-colors">about our approach</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;