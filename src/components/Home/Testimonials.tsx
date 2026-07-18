import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "The financial review process was truly eye-opening. I finally understand the gaps in my term insurance and have started a disciplined SIP strategy for my daughter's education. The transparency is unmatched.",
    author: "Rajesh K.",
    role: "Senior Software Engineer"
  },
  {
    id: 2,
    content: "I always found mutual funds and retirement planning overwhelming. Abdus completely simplified the process. His goal-based approach has given me absolute peace of mind about my family's financial future.",
    author: "Sneha M.",
    role: "Small Business Owner"
  },
  {
    id: 3,
    content: "Trust is paramount when it comes to hard-earned money. The ethical advice, lack of product-pushing, and clear focus on wealth protection through proper health and life covers make this advisory service exceptional.",
    author: "Dr. Vikram S.",
    role: "Medical Practitioner"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-[var(--font-heading)] text-[var(--color-primary)] mb-16">Client Experiences</h2>
        
        <div className="relative bg-white p-12 rounded-2xl soft-shadow min-h-[300px] flex items-center justify-center">
          <Quote className="absolute top-8 left-8 w-12 h-12 text-gray-100" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <p className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">{testimonials[currentIndex].author}</h4>
                <p className="text-[var(--color-secondary)]">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-lg text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full shadow-lg text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
