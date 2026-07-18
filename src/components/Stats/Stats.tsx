import "./Stats.css";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaChartLine,
  FaSmile,
  FaHeadset,
} from "react-icons/fa";

function Stats() {
  const stats = [
    {
      icon: <FaUsers />,
      number: "5000+",
      title: "Families Protected",
    },
    {
      icon: <FaChartLine />,
      number: "₹50Cr+",
      title: "Assets Guided",
    },
    {
      icon: <FaSmile />,
      number: "98%",
      title: "Client Satisfaction",
    },
    {
      icon: <FaHeadset />,
      number: "24/7",
      title: "Support Available",
    },
  ];

  return (
    <section id="stats" className="stats">

      <div className="stats-glow"></div>

      <div className="stats-header">

        <h2>Trusted By Thousands</h2>

        <p>
          Helping families and investors make smarter
          financial decisions every day.
        </p>

      </div>

      <div className="stats-container">
        {stats.map((item, index) => (
          <motion.div
            className="stat-card"
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div className="stat-icon">
              {item.icon}
            </div>

            <h2>{item.number}</h2>

            <p>{item.title}</p>

          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default Stats;