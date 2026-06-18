import "./Hero.css";
import heroImage from "../../assets/hero.png";

function Hero() {
  return (
    <section id="home" className="hero">

      <div className="hero-blur hero-blur-1"></div>
      <div className="hero-blur hero-blur-2"></div>

      <div className="hero-content">

        <span className="hero-badge">
          Trusted Financial Planning Solutions
        </span>

        <h1>
          Protect Your Family.
          <br />
          Grow Your Wealth.
          <br />
          Secure Your Future.
        </h1>

        <p>
          SecureLife Advisors helps individuals and families with
          Term Insurance, Health Insurance, Mutual Funds, and
          Retirement Planning through personalized financial guidance.
        </p>

        <div className="hero-buttons">

          <a
            href="https://wa.me/919645622444"
            target="_blank"
            rel="noreferrer"
            className="primary-btn"
          >
            Get Free Consultation
          </a>

          <a
            href="#services"
            className="secondary-btn"
          >
            Explore Services
          </a>

        </div>

        <div className="hero-trust">

          <div className="trust-card">
            <h3>5000+</h3>
            <p>Families Guided</p>
          </div>

          <div className="trust-card">
            <h3>₹50Cr+</h3>
            <p>Assets Guided</p>
          </div>

          <div className="trust-card">
            <h3>98%</h3>
            <p>Client Satisfaction</p>
          </div>

        </div>

      </div>

      <div className="hero-image">
        <img
          src={heroImage}
          alt="Financial Planning and Wealth Management"
        />
      </div>

    </section>
  );
}

export default Hero;