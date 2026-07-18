import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "[Placeholder - Replace with real client testimonial before production. Example: 'The financial review process was eye-opening. We now have a clear path for our retirement and our children's education. Highly recommended for transparent advice.']",
    author: "Client A",
    role: "IT Professional"
  },
  {
    id: 2,
    content: "[Placeholder - Replace with real client testimonial before production. Example: 'Incredible depth of knowledge and personalized strategy. My portfolio has never been this organized and aligned with my life goals.']",
    author: "Client B",
    role: "Business Owner"
  },
  {
    id: 3,
    content: "[Placeholder - Replace with real client testimonial before production. Example: 'Trust is paramount when it comes to finances, and SecureLife delivers that with every interaction. Outstanding wealth management service.']",
    author: "Client C",
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
