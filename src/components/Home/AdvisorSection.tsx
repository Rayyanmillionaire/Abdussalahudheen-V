import { motion } from "framer-motion";
import advisorImage from "../../assets/advisor.jpg";

export default function AdvisorSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <img 
              src={advisorImage} 
              alt="Financial Advisor" 
              className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h2 className="text-4xl font-[var(--font-heading)] text-[var(--color-primary)]">Meet Your Advisor</h2>
            <h3 className="text-xl text-[var(--color-secondary)] font-medium">Abdus Salahudheen V</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              With over a decade of experience in wealth management, I am dedicated to providing transparent, goal-based financial planning designed around your life—not products.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              My mission is to help individuals and families achieve absolute clarity and confidence in their financial future through disciplined investing and comprehensive risk management.
            </p>
            
            <div className="pt-6 border-t border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">Professional Credentials</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)]"></div>
                  <strong>NISM Mutual Fund Advisor:</strong> NISM-202000054390
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)]"></div>
                  <strong>AMFI Registered Distributor:</strong> ARN-171667
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)]"></div>
                  <strong>IRDAI Certified Advisor:</strong> SHABA0000520314 | AIL9469408
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
