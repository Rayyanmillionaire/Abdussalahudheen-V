import "./Advisor.css";
import advisorImage from "../../assets/advisor.jpg";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

function Advisor() {
  return (
    <section className="advisor">

      <div className="advisor-left">

        <div className="advisor-image-card">

          <img
            src={advisorImage}
            alt="Abdussalahudheen v"
          />

          <div className="photo-info">
            <h3>Abdussalahudheen V</h3>
            <p>Certified Financial Advisor</p>
          </div>

          <div className="advisor-badge">
            NISM • AMFI • IRDAI Certified
          </div>

        </div>

      </div>

      <div className="advisor-content">

        <span className="advisor-tag">
          Meet Your Advisor
        </span>

        <h2>
          Abdussalahudheen V
        </h2>

        <h4>
          Certified Financial Advisor
        </h4>

        <p>
          Helping families protect their future,
          grow wealth through mutual funds,
          and achieve long-term financial security
          through expert insurance and retirement planning.
        </p>

        <div className="advisor-points">

          <div>✓ Term Insurance</div>

          <div>✓ Health Insurance</div>

          <div>✓ Mutual Funds</div>

          <div>✓ Retirement Planning</div>

        </div>

        <div className="advisor-contact">

          <div className="phone-box">
            <FaPhoneAlt />
            <span>+91 96456 22444</span>
          </div>

          <a
            href="https://wa.me/919645622444"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            <FaWhatsapp />
            Chat on WhatsApp
          </a>

        </div>

      </div>

      <div className="certifications">

        <h3>
          Professional Certifications
        </h3>

        <div className="cert-grid">

          <div className="cert-card">
            <span>NISM</span>
            <h4>Mutual Fund Advisor</h4>
            <p>NISM-202000054390</p>
          </div>

          <div className="cert-card">
            <span>AMFI</span>
            <h4>Registered Distributor</h4>
            <p>ARN-171667</p>
          </div>

          <div className="cert-card">
            <span>IRDAI</span>
            <h4>Health Insurance Advisor</h4>
            <p>SHABA0000520314</p>
          </div>

          <div className="cert-card">
            <span>IRDAI</span>
            <h4>Life Insurance Advisor</h4>
            <p>AIL9469408</p>
          </div>

          <div className="cert-card">
            <span>IRDAI</span>
            <h4>General Insurance Advisor</h4>
            <p>UII300701AGN1055032</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Advisor;