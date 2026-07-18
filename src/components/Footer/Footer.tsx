import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white pt-16 pb-8 border-t border-[#1a365d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-[#1a365d] pb-12">
          
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-8 h-8 text-[var(--color-secondary)]" />
              <span className="font-[var(--font-heading)] font-semibold text-2xl tracking-tight text-white">
                SecureLife
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Helping individuals and families protect, grow, and secure their financial future with absolute clarity and trust.
            </p>
          </div>

          <div>
            <h3 className="text-[var(--color-secondary)] font-medium mb-4 uppercase tracking-wider text-sm">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/term-insurance" className="text-gray-400 hover:text-white transition text-sm">Term Insurance</Link></li>
              <li><Link to="/health-insurance" className="text-gray-400 hover:text-white transition text-sm">Health Insurance</Link></li>
              <li><Link to="/mutual-funds" className="text-gray-400 hover:text-white transition text-sm">Mutual Funds</Link></li>
              <li><Link to="/retirement-planning" className="text-gray-400 hover:text-white transition text-sm">Retirement Planning</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--color-secondary)] font-medium mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/financial-health-review" className="text-gray-400 hover:text-white transition text-sm">Financial Health Review</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-gray-400 hover:text-white transition text-sm">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--color-secondary)] font-medium mb-4 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>+91 9645622444</li>
              <li>mailtosalahuvt@gmail.com</li>
              <li>Kerala, India</li>
            </ul>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-500 mb-8 text-center md:text-left">
          <div className="bg-[#0f294d] p-4 rounded-lg">
            <p className="font-medium text-gray-400 mb-1">AMFI Registered Distributor</p>
            <p>ARN: ARN-171667</p>
          </div>
          <div className="bg-[#0f294d] p-4 rounded-lg">
            <p className="font-medium text-gray-400 mb-1">IRDAI Certified Advisor</p>
            <p>License: SHABA0000520314 | AIL9469408</p>
          </div>
          <div className="bg-[#0f294d] p-4 rounded-lg">
            <p className="font-medium text-gray-400 mb-1">NISM Mutual Fund Advisor</p>
            <p>Reg No: NISM-202000054390</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 space-y-4 mb-8 text-justify">
          <p><strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing. Past performance is not an indicator of future returns.</p>
          <p>Insurance is the subject matter of solicitation. The product information provided is for educational purposes only and is subject to policy terms and conditions.</p>
        </div>

        <div className="border-t border-[#1a365d] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SecureLife Advisors. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/disclaimer" className="hover:text-white transition">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}