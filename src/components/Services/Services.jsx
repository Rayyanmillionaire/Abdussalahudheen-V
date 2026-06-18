import "./Services.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaShieldAlt,
  FaHeartbeat,
  FaChartLine,
  FaPiggyBank,
} from "react-icons/fa";

function Services() {

  const services = [
    {
      icon: <FaShieldAlt />,
      title: "Term Insurance",
      description:
        "Protect your family's future and ensure financial security even when life is unpredictable.",
      link: "/term-insurance",
    },

    {
      icon: <FaHeartbeat />,
      title: "Health Insurance",
      description:
        "Stay protected against rising medical expenses and unexpected emergencies.",
      link: "/health-insurance",
    },

    {
      icon: <FaChartLine />,
      title: "Mutual Funds",
      description:
        "Build long-term wealth through disciplined investing and professional fund management.",
      link: "/mutual-funds",
    },

    {
      icon: <FaPiggyBank />,
      title: "Retirement Planning",
      description:
        "Create financial freedom and enjoy a secure retirement without dependency.",
      link: "/retirement-planning",
    },
  ];

  return (
    <section
      id="services"
      className="services"
    >

      <div className="service-glow"></div>

      <div className="services-header">

        <h2>
          Our Financial Solutions
        </h2>

        <p>
          Comprehensive financial products designed
          to protect, preserve and grow your wealth.
        </p>

      </div>

      <div className="services-grid">

        {services.map((service, index) => (

          <motion.div
            key={index}
            className="service-card"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
            }}
            viewport={{ once: true }}
          >

            <div className="service-icon">
              {service.icon}
            </div>

            <h3>
              {service.title}
            </h3>

            <p>
              {service.description}
            </p>

            <Link
              to={service.link}
              className="service-btn"
            >
              Learn More →
            </Link>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default Services;