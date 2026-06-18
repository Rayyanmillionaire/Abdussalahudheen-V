import "./Importance.css";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaHeartbeat,
  FaChartLine,
  FaUserClock,
} from "react-icons/fa";

function Importance() {
  const cards = [
    {
      icon: <FaShieldAlt />,
      title: "Term Insurance",
      text: "Protect your family's financial future even when life is uncertain.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Health Insurance",
      text: "Stay prepared for medical emergencies without draining your savings.",
    },
    {
      icon: <FaChartLine />,
      title: "Mutual Funds",
      text: "Build wealth steadily and beat inflation through smart investing.",
    },
    {
      icon: <FaUserClock />,
      title: "Retirement Planning",
      text: "Create a secure and comfortable retirement with long-term planning.",
    },
  ];

  return (
    <section id="importance" className="importance">

      <div className="section-title">
        <h2>Why Financial Planning Matters</h2>

        <p>
          Financial security isn't about luck. It's about planning ahead.
        </p>
      </div>

      <div className="importance-grid">
        {cards.map((card, index) => (
          <motion.div
            className="importance-card"
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div className="card-icon">
              {card.icon}
            </div>

            <h3>{card.title}</h3>

            <p>{card.text}</p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default Importance;