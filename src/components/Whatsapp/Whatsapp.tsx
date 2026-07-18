import "./Whatsapp.css";
import { FaWhatsapp } from "react-icons/fa";

function Whatsapp() {
  return (
    <a
      href="https://wa.me/919645622444"
      target="_blank"
      rel="noreferrer"
      className="whatsapp"
    >
      <FaWhatsapp />
    </a>
  );
}

export default Whatsapp;