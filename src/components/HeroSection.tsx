import { Car, Wrench, MessageSquare, ShieldCheck, Truck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { NavigationPage } from '../types';
import { BUSINESS_CONFIG, generateWhatsAppLink, isWhatsAppActive } from '../config/business';

interface HeroSectionProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenGeneralEnquiry: () => void;
}

export default function HeroSection({ onNavigate, onOpenGeneralEnquiry }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#080d19] via-[#0e1424] to-[#0a0f1d] border-b border-[#1b2336] pt-8 pb-12 sm:pt-12 sm:pb-16">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#1e293b]/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Pill */}
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl sm:rounded-full bg-[#161d2f] border border-[#232d44] text-[11px] sm:text-xs text-slate-300 max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#ea580c] shrink-0" />
              <span className="font-semibold text-white shrink-0">{BUSINESS_CONFIG.location}</span>
              <span className="text-slate-500 shrink-0">•</span>
              <span>{BUSINESS_CONFIG.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Your Trusted Source for <span className="text-[#ea580c]">Vehicles &amp; Auto Parts</span> in Nigeria
            </h1>

            {/* Supporting Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Explore quality vehicles, source the right spare parts and get professional assistance with vehicle and parts enquiries. From physical inspections in Lagos to nationwide parts delivery, we support individual car owners, mechanics and corporate fleets.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              {/* All Inventory CTA */}
              <button
                id="hero-all-inventory-btn"
                onClick={() => onNavigate('all_inventory')}
                className="min-h-[44px] px-5 py-3 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#ea580c]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span>All Inventory (35)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Primary CTA: Browse Vehicles */}
              <button
                id="hero-browse-vehicles-btn"
                onClick={() => onNavigate('vehicles')}
                className="min-h-[44px] px-5 py-3 rounded-xl bg-[#141b2b] hover:bg-[#1d263c] text-white font-bold text-xs sm:text-sm tracking-wide border border-[#232f48] shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Car className="w-4 h-4 text-[#ea580c]" />
                <span>Vehicles (20)</span>
              </button>

              {/* Secondary CTA: Find Spare Parts */}
              <button
                id="hero-find-parts-btn"
                onClick={() => onNavigate('spare_parts')}
                className="min-h-[44px] px-5 py-3 rounded-xl bg-[#141b2b] hover:bg-[#1d263c] text-white font-bold text-xs sm:text-sm tracking-wide border border-[#232f48] shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Wrench className="w-4 h-4 text-[#4ade80]" />
                <span>Spare Parts (15)</span>
              </button>

              {/* WhatsApp CTA / Enquire Now */}
              {isWhatsAppActive() && generateWhatsAppLink('Hello VANGUARD Motors & Parts, I would like to enquire about vehicles and spare parts in Nigeria.') ? (
                <a
                  id="hero-whatsapp-btn"
                  href={generateWhatsAppLink('Hello VANGUARD Motors & Parts, I would like to enquire about vehicles and spare parts in Nigeria.')!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-3 rounded-xl bg-[#14532d]/50 hover:bg-[#166534]/70 text-[#4ade80] border border-[#166534] font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              ) : (
                <button
                  id="hero-enquiry-btn"
                  onClick={onOpenGeneralEnquiry}
                  className="min-h-[44px] px-4 py-3 rounded-xl bg-[#141b2b] hover:bg-[#1d263c] text-[#ea580c] border border-[#232f48] font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire Now</span>
                </button>
              )}
            </div>

            {/* Quick Factual Highlights */}
            <div className="pt-4 border-t border-[#1a2336] grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Lagos Hub</div>
                  <div className="text-[11px] text-slate-400">Inspections &amp; Dispatch</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Nationwide</div>
                  <div className="text-[11px] text-slate-400">Interstate Logistics</div>
                </div>
              </div>

              <div className="flex items-start gap-2 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Fitment Check</div>
                  <div className="text-[11px] text-slate-400">VIN &amp; Model Matching</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-[#121827] border border-[#20293d] shadow-2xl group">
              {/* Highlight Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
                  alt="Automotive Vehicles and Parts in Nigeria"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121827] via-transparent to-black/40" />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#ea580c] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                    Vanguard Fleet
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[#4ade80] border border-[#166534] text-[10px] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                    Lagos Showroom
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-base font-bold text-white">
                      Automobile &amp; Precision Parts Operations
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Toyota • Mercedes-Benz • BMW • Honda • Tesla • OEM Spares
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1c2438] flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400">
                    Need an immediate quote or part verification?
                  </span>
                  <button
                    onClick={onOpenGeneralEnquiry}
                    className="text-[#ea580c] hover:text-[#f97316] font-bold inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Enquire Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
