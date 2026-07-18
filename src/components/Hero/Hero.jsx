import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[var(--color-background)]">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[var(--color-secondary)] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-[var(--color-primary)] opacity-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm font-medium text-[var(--color-primary)] border border-blue-100">
            <ShieldCheck className="w-4 h-4 text-[var(--color-secondary)]" /> Trusted Wealth Management
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-[var(--font-heading)] text-[var(--color-primary)] leading-tight mb-6">
            Protect Your Family. <br />
            <span className="text-[var(--color-secondary)]">Grow Your Wealth.</span> <br />
            Secure Your Future.
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            SecureLife Advisors provides elite financial guidance. We help you navigate Term Insurance, Health Insurance, Mutual Funds, and Retirement Planning with absolute clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link 
              to="/financial-health-review"
              className="bg-[var(--color-primary)] hover:bg-[#152e52] text-white px-8 py-4 rounded-lg font-medium transition flex items-center justify-center gap-2 shadow-lg"
            >
              Start Financial Review <ArrowRight className="w-5 h-5" />
            </Link>
            
            <a 
              href="#services"
              className="glass hover:bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-medium transition flex items-center justify-center text-center border border-gray-200"
            >
              Explore Services
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
            <div>
              <h3 className="text-3xl font-[var(--font-heading)] text-[var(--color-primary)] mb-1">5000+</h3>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Families Guided</p>
            </div>
            <div>
              <h3 className="text-3xl font-[var(--font-heading)] text-[var(--color-primary)] mb-1">₹50Cr+</h3>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Assets Guided</p>
            </div>
            <div>
              <h3 className="text-3xl font-[var(--font-heading)] text-[var(--color-primary)] mb-1">98%</h3>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Satisfaction</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl opacity-10 transform translate-x-4 translate-y-4"></div>
          <img 
            src={heroImage} 
            alt="Wealth Management" 
            className="rounded-2xl shadow-2xl relative z-10 object-cover w-full h-[600px] border border-white"
          />
        </motion.div>

      </div>
    </section>
  );
}