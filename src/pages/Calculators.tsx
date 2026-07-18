import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SIPCalculator from "../components/Calculators/SIPCalculator";
import TermInsuranceCalculator from "../components/Calculators/TermInsuranceCalculator";
import RetirementCalculator from "../components/Calculators/RetirementCalculator";
import { Calculator, Shield, PiggyBank, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<"sip" | "term" | "retirement">("sip");

  const tabs = [
    { id: "sip", label: "SIP Calculator", icon: <Calculator className="w-5 h-5" /> },
    { id: "term", label: "Term Insurance", icon: <Shield className="w-5 h-5" /> },
    { id: "retirement", label: "Retirement", icon: <PiggyBank className="w-5 h-5" /> }
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--color-background)] font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-[#0A1F3D] to-[#152e52] text-white">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[#C9A567] opacity-10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-[var(--font-heading)] mb-6 leading-tight"
          >
            Plan Your Financial Future <br className="hidden md:block"/> with Powerful Calculators
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Use our professional financial planning calculators to estimate your investments, insurance requirements, and retirement goals within seconds.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#calculators-section" className="bg-[#C9A567] hover:bg-[#b08f55] text-white px-8 py-3 rounded-lg font-medium transition shadow-lg flex items-center justify-center gap-2">
              Calculate Now
            </a>
            <Link to="/#contact" className="glass hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition flex items-center justify-center border border-white/20">
              Book Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section id="calculators-section" className="py-8 sticky top-20 z-40 bg-[var(--color-background)]/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "bg-[var(--color-primary)] text-white shadow-md transform scale-105" 
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Content Area */}
      <section className="py-12 min-h-[800px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {activeTab === "sip" && (
              <motion.div
                key="sip"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SIPCalculator />
              </motion.div>
            )}
            
            {activeTab === "term" && (
              <motion.div
                key="term"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TermInsuranceCalculator />
              </motion.div>
            )}

            {activeTab === "retirement" && (
              <motion.div
                key="retirement"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RetirementCalculator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lead Generation CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-12 shadow-2xl relative overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] text-[var(--color-primary)] mb-4">Need Personalized Financial Advice?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Our certified financial advisor will help you build a customized investment, insurance, and retirement plan designed around your life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#contact" className="bg-[var(--color-primary)] hover:bg-[#152e52] text-white px-8 py-4 rounded-xl font-medium transition shadow-lg flex items-center justify-center gap-2">
                  Book Free Consultation <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="https://wa.me/919447475171" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#1ebd5a] text-white px-8 py-4 rounded-xl font-medium transition shadow-lg flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Contact on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
