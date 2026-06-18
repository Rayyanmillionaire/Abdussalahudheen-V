import "./WhyChooseUs.css";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaShieldAlt,
  FaBullseye,
  FaHeadset,
  FaHandshake,
  FaChartPie,
} from "react-icons/fa";

function WhyChooseUs() {
  const reasons = [
    {
      icon: <FaUserTie />,
      title: "Expert Advisors",
      text: "Professional guidance tailored to your financial goals.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted Protection",
      text: "Helping families stay financially secure and protected.",
    },
    {
      icon: <FaBullseye />,
      title: "Goal Based Planning",
      text: "Investment strategies aligned with your future objectives.",
    },
    {
      icon: <FaHeadset />,
      title: "Dedicated Support",
      text: "Quick assistance whenever you need financial guidance.",
    },
    {
      icon: <FaHandshake />,
      title: "Transparent Advice",
      text: "Clear recommendations with complete transparency.",
    },
    {
      icon: <FaChartPie />,
      title: "Wealth Growth",
      text: "Balanced solutions for long-term wealth creation.",
    },
  ];

  return (
    <section id="why-us" className="why">

      <div className="why-header">

        <span>Why SecureLife Advisors</span>

        <h2>
          Helping Families Build
          Financial Confidence
        </h2>

        <p>
          We combine protection, planning,
          and wealth-building strategies to
          help you achieve financial peace of mind.
        </p>

      </div>

      <div className="why-grid">
        {reasons.map((item, index) => (
          <motion.div
            className="why-card"
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div className="why-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default WhyChooseUs;