import "./Navbar.css";
import { FaShieldAlt } from "react-icons/fa";

function Navbar() {
  const scrollToTop = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <FaShieldAlt className="logo-icon" />
        <span>SecureLife Advisors</span>
      </div>

      <ul className="nav-links">

        <li>
          <a
            href="#home"
            onClick={scrollToTop}
          >
            Home
          </a>
        </li>

        <li>
          <a href="#importance">
            Why Planning
          </a>
        </li>

        <li>
          <a href="#services">
            Services
          </a>
        </li>

        <li>
          <a href="#why-us">
            Why Us
          </a>
        </li>

        <li>
          <a href="#stats">
            Stats
          </a>
        </li>

        <li>
          <a href="#testimonials">
            Reviews
          </a>
        </li>

        <li>
          <a href="#contact">
            Contact
          </a>
        </li>

      </ul>

      <a
        href="#contact"
        className="consult-btn"
      >
        Get Consultation
      </a>

    </nav>
  );
}

export default Navbar;