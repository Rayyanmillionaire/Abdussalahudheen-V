import "./WhyChooseUs.css";

function WhyChooseUs() {
  const reasons = [
    "Personalized Financial Guidance",
    "Trusted Insurance Partners",
    "Goal-Based Investment Planning",
    "Transparent Advice",
    "Quick Claim Assistance",
    "Long-Term Relationship Support"
  ];

  return (
    <section className="why">
      <div className="why-content">
        <span className="why-tag">
          Why Choose Us
        </span>

        <h2>
          Helping Families Build a Secure Financial Future
        </h2>

        <p>
          We provide expert financial guidance tailored to your
          goals, helping you protect your family, grow your wealth,
          and plan confidently for the future.
        </p>

        <div className="why-grid">
          {reasons.map((item, index) => (
            <div className="why-card" key={index}>
              ✓ {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;