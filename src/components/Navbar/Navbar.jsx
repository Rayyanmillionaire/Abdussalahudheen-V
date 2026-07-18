import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? "glass soft-shadow py-3" : "bg-transparent py-5"
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-[var(--color-secondary)]" />
            <span className="font-[var(--font-heading)] font-semibold text-2xl tracking-tight text-[var(--color-primary)]">
              SecureLife
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-gray-700 hover:text-[var(--color-secondary)] transition">Services</a>
            <a href="#why-us" className="text-sm font-medium text-gray-700 hover:text-[var(--color-secondary)] transition">Why Us</a>
            <Link to="/financial-health-review" className="text-sm font-medium text-[var(--color-secondary)] hover:text-[#b08f55] transition">Health Review</Link>
            
            <a href="#contact" className="bg-[var(--color-primary)] hover:bg-[#152e52] text-white px-5 py-2.5 rounded-full text-sm font-medium transition shadow-md">
              Consultation
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[var(--color-primary)]">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full border-t border-gray-100 py-4 px-4 flex flex-col gap-4 shadow-lg">
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-gray-800">Services</a>
          <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-gray-800">Why Us</a>
          <Link to="/financial-health-review" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-[var(--color-secondary)]">Health Review</Link>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-[var(--color-primary)]">Contact</a>
        </div>
      )}
    </nav>
  );
}