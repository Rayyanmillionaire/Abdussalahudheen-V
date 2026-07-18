import { ShieldCheck, Award, Briefcase, TrendingUp } from "lucide-react";

export default function TrustBar() {
  return (
    <div className="bg-[#0f294d] text-white py-6 border-b border-[#1a365d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-medium text-gray-300">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--color-secondary)]" />
            <span>NISM Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[var(--color-secondary)]" />
            <span>AMFI Registered</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--color-secondary)]" />
            <span>IRDAI Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[var(--color-secondary)]" />
            <span>Professional Financial Planning</span>
          </div>
        </div>
      </div>
    </div>
  );
}
