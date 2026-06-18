import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">
          <h2>Financial Service</h2>
          <p>
            Helping individuals and families protect,
            grow, and secure their financial future.
          </p>
        </div>

        <div className="footer-links">
          <h3>Services</h3>
          <a href="#">Term Insurance</a>
          <a href="#">Health Insurance</a>
          <a href="#">Mutual Funds</a>
          <a href="#">Pension Plans</a>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-links">
          <h3>Contact</h3>
          <p>+91 XXXXX XXXXX</p>
          <p>info@financialservice.com</p>
          <p>Kerala, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Financial Service. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;