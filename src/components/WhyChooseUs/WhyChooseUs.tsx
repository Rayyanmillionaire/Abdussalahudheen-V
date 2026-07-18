import { motion } from "framer-motion";
import { Target, CheckCircle2, RotateCcw, UserPlus } from "lucide-react";

const reasons = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Goal-Based Planning",
    text: "We map every investment strategy directly to your life's milestones—not arbitrary market benchmarks."
  },
  {
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: "Transparent Advice",
    text: "Absolute clarity on fees, risks, and potential returns. We only recommend what serves your best interest."
  },
  {
    icon: <RotateCcw className="w-8 h-8" />,
    title: "Regular Reviews",
    text: "Your life changes, and so should your financial plan. We conduct formal, comprehensive annual reviews."
  },
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: "Personalized Strategies",
    text: "No cookie-cutter templates. Your portfolio is custom-engineered for your unique risk tolerance and goals."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[var(--color-background)] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-[var(--font-heading)] text-[var(--color-primary)]">Why Choose Us</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Experience a new standard of wealth management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl soft-shadow hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-[var(--color-secondary)] mb-6 bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}