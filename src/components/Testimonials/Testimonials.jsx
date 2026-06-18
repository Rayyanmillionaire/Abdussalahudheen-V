import "./Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      review:
        "Excellent guidance for my family's term insurance and investment planning."
    },
    {
      name: "Priya Nair",
      review:
        "Very professional service and helped me choose the right health insurance."
    },
    {
      name: "Amit Verma",
      review:
        "Their mutual fund recommendations aligned perfectly with my financial goals."
    }
  ];

  return (
    <section id="testimonials" className="testimonials">

      <div className="testimonial-header">
        <h2>What Our Clients Say</h2>

        <p>
          Trusted by families and investors for reliable financial guidance.
        </p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <p>"{item.review}"</p>
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Testimonials;