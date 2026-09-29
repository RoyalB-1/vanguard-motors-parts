import { ShieldCheck, Target, HeartHandshake, Car, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { NavigationPage } from '../types';
import { BUSINESS_CONFIG } from '../config/business';

interface AboutSectionProps {
  onNavigate?: (page: NavigationPage) => void;
  onOpenEnquiry: () => void;
}

export default function AboutSection({ onNavigate, onOpenEnquiry }: AboutSectionProps) {
  return (
    <section id="about-section" className="py-16 bg-[#0a0f1d] border-b border-[#182133]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Brand Overview */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
            About Our Company
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-black text-white tracking-tight">
            About {BUSINESS_CONFIG.businessName}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {BUSINESS_CONFIG.businessName} provides automobile and spare-parts sourcing services for vehicle owners, businesses, mechanics and other automotive customers in Nigeria.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Operating from our central hub in {BUSINESS_CONFIG.location}, we address the common challenges in the Nigerian automotive market: locating verified components, avoiding counterfeit or mismatched parts, and ensuring safe vehicle acquisition with transparent pricing in Nigerian Naira.
          </p>
        </div>

        {/* 3 Pillars: Mission, Values, Customer Focus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission */}
          <div className="bg-[#101626] border border-[#1e273d] rounded-2xl p-6 space-y-4 shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#172136] border border-[#24314c] flex items-center justify-center text-[#ea580c]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">
              Our Mission
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              To provide Nigerian vehicle owners, corporate fleets, and repair professionals with dependable access to quality vehicles and precisely matched automotive replacement parts.
            </p>
          </div>

          {/* Values */}
          <div className="bg-[#101626] border border-[#1e273d] rounded-2xl p-6 space-y-4 shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#172136] border border-[#24314c] flex items-center justify-center text-[#ea580c]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">
              Our Values
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Technical honesty, strict verification before dispatch, transparent Nigerian Naira pricing, and responsive customer communication at every step.
            </p>
          </div>

          {/* Customer Focus */}
          <div className="bg-[#101626] border border-[#1e273d] rounded-2xl p-6 space-y-4 shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#172136] border border-[#24314c] flex items-center justify-center text-[#ea580c]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">
              Customer Focus
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We collaborate closely with vehicle owners, workshop mechanics, and corporate procurement managers to ensure fast turnaround times and fitment assurance.
            </p>
          </div>
        </div>

        {/* Operating Principles Bar */}
        <div className="bg-[#0e1424] border border-[#1d273d] rounded-2xl p-6 sm:p-8">
          <h3 className="font-heading text-lg font-bold text-white mb-4">
            How We Support Automotive Buyers in Nigeria
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
              <span>Inspection opportunities in Lagos before vehicle finalization.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
              <span>VIN and chassis verification to confirm spare part compatibility.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
              <span>Clear distinction between Brand New OEM, Tokunbo, and aftermarket options.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
              <span>Nationwide delivery coordination with trusted logistics waybills.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
              <span>Dedicated customer service via direct phone call and WhatsApp.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
              <span>Special order procurement for hard-to-find components and models.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
