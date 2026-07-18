import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you sell financial products or provide advice?",
    answer: "We are focused on providing transparent, goal-based financial advice. While we facilitate the execution of investments and insurance, our primary objective is to align every decision with your life goals."
  },
  {
    question: "How is the Financial Health Review different from a standard consultation?",
    answer: "The Financial Health Review is a comprehensive diagnostic tool that evaluates your entire financial lifecycle—income protection, emergency reserves, investments, and retirement—giving you a quantifiable score and actionable gaps before we even meet."
  },
  {
    question: "What is your investment philosophy?",
    answer: "We believe in disciplined, long-term wealth creation. We do not chase short-term market trends. Instead, we focus on asset allocation, risk management, and compounding to secure your financial future."
  },
  {
    question: "How often do we review the financial plan?",
    answer: "We conduct formal comprehensive reviews annually, with semi-annual check-ins to ensure your portfolio remains aligned with any changes in your life circumstances or financial goals."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-[var(--font-heading)] text-center text-[var(--color-primary)] mb-16">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-100 transition"
              >
                <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 pt-2 text-gray-600 leading-relaxed border-t border-gray-200">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
