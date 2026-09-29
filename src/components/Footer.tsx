import { useState } from 'react';
import { 
  Car, 
  Wrench, 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck, 
  Truck,
  MessageSquare,
  FileText,
  ExternalLink,
  Code2
} from 'lucide-react';
import { NavigationPage } from '../types';
import { 
  BUSINESS_CONFIG, 
  generateWhatsAppLink, 
  isWhatsAppActive, 
  isPhoneActive, 
  isEmailActive, 
  generateTelLink, 
  generateMailtoLink,
  isGoogleMapsActive,
  hasActiveSocialLinks
} from '../config/business';
import { DEVELOPER_CONFIG } from '../config/developer';
import { RbcAttributionModal } from './RbcAttributionModal';
import { RbcEmailFooterButton } from './RbcEmailActions';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenGeneralEnquiry: () => void;
  onOpenRequestPart: () => void;
}

export default function Footer({ 
  onNavigate, 
  onOpenGeneralEnquiry,
  onOpenRequestPart 
}: FooterProps) {
  const [isRbcModalOpen, setIsRbcModalOpen] = useState(false);

  const handleLinkClick = (page: NavigationPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 bg-[#060a14] border-t border-[#161f33] text-slate-400 text-xs">
      {/* Upper Operational Highlights */}
      <div className="border-b border-[#111827] py-8 px-4 sm:px-6 lg:px-8 bg-[#090e1b]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#14532d]/40 border border-[#166534] flex items-center justify-center shrink-0 text-[#22c55e]">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-xs sm:text-sm">Automobile Showroom</h4>
              <p className="text-slate-400 mt-1 leading-relaxed text-xs">
                Sample vehicle catalogue with technical specifications, pricing in ₦, and Lagos inspection options.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#161c28] border border-[#232d42] flex items-center justify-center shrink-0 text-[#ea580c]">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-xs sm:text-sm">Precision Spare Parts</h4>
              <p className="text-slate-400 mt-1 leading-relaxed text-xs">
                Categorized automotive replacement parts with OEM specifications and cross-model fitment verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#161c28] border border-[#232d42] flex items-center justify-center shrink-0 text-[#ea580c]">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-xs sm:text-sm">Nationwide Delivery</h4>
              <p className="text-slate-400 mt-1 leading-relaxed text-xs">
                Doorstep dispatch across Lagos and structured waybill delivery to all Nigerian states.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#14532d]/40 border border-[#166534] flex items-center justify-center shrink-0 text-[#4ade80]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-xs sm:text-sm">WhatsApp-First Support</h4>
              <p className="text-slate-400 mt-1 leading-relaxed text-xs">
                Immediate customer assistance, fitment confirmation, and quotation requests via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ea580c] to-[#9a3412] flex items-center justify-center text-white font-heading font-bold text-base shadow">
                V
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-white">
                {BUSINESS_CONFIG.businessName.toUpperCase()}
              </span>
            </div>

            <p className="text-[11px] tracking-wider uppercase font-semibold text-[#ea580c]">
              {BUSINESS_CONFIG.tagline.toUpperCase()}
            </p>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Providing dependable vehicle sales, precision spare parts procurement, and fitment verification for car owners, workshops, and business fleets across Nigeria.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={onOpenGeneralEnquiry}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-semibold shadow-md shadow-[#ea580c]/20 transition-all"
              >
                <span>Make an Enquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenRequestPart}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#131a29] hover:bg-[#1a2336] text-slate-200 text-xs font-semibold border border-[#222d42] transition-colors"
              >
                <span>Request a Part</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-xs uppercase font-bold tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-[#ea580c] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('all_inventory')}
                  className="hover:text-[#ea580c] transition-colors"
                >
                  All Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('vehicles')}
                  className="hover:text-[#ea580c] transition-colors"
                >
                  Vehicle Showroom
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('spare_parts')}
                  className="hover:text-[#ea580c] transition-colors"
                >
                  Spare Parts Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="hover:text-[#ea580c] transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-[#ea580c] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-[#ea580c] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-xs uppercase font-bold tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenGeneralEnquiry}
                  className="hover:text-[#ea580c] transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>Make an Enquiry</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRequestPart}
                  className="hover:text-[#ea580c] transition-colors flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>Request a Spare Part</span>
                </button>
              </li>
              <li>
                {isWhatsAppActive() && generateWhatsAppLink('Hello VANGUARD Motors & Parts, I need customer support.') ? (
                  <a
                    href={generateWhatsAppLink('Hello VANGUARD Motors & Parts, I need customer support.')!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#4ade80] transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span>WhatsApp Support ({BUSINESS_CONFIG.whatsapp})</span>
                  </a>
                ) : (
                  <button
                    onClick={onOpenGeneralEnquiry}
                    className="hover:text-[#ea580c] transition-colors flex items-center gap-1.5 text-left"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#ea580c]" />
                    <span>Contact VANGUARD</span>
                  </button>
                )}
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="hover:text-[#ea580c] transition-colors"
                >
                  Delivery Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="hover:text-[#ea580c] transition-colors"
                >
                  Chassis &amp; Fitment Assistance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hub */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-xs uppercase font-bold tracking-wider text-white">
              Contact &amp; Operations
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300">
                    <strong className="text-white">Location:</strong> {BUSINESS_CONFIG.location}
                  </span>
                  {isGoogleMapsActive() && (
                    <a
                      href={BUSINESS_CONFIG.googleMapsUrl!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[11px] text-[#ea580c] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <span className="block text-[11px] text-slate-400 mt-0.5">Physical inspection by appointment</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#ea580c] shrink-0" />
                <span>{BUSINESS_CONFIG.businessHours}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ea580c] shrink-0" />
                {isPhoneActive() ? (
                  <a 
                    href={generateTelLink()!} 
                    className="hover:text-white transition-colors font-mono font-medium"
                  >
                    {BUSINESS_CONFIG.phone}
                  </a>
                ) : (
                  <span className="text-slate-300 font-mono font-medium">
                    {BUSINESS_CONFIG.phone}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ea580c] shrink-0" />
                {isEmailActive() ? (
                  <a 
                    href={generateMailtoLink()!} 
                    className="hover:text-white transition-colors"
                  >
                    {BUSINESS_CONFIG.email}
                  </a>
                ) : (
                  <span className="text-slate-300">
                    {BUSINESS_CONFIG.email}
                  </span>
                )}
              </div>

              {/* Dynamic Social Links if configured */}
              {hasActiveSocialLinks() && (
                <div className="pt-2 flex items-center gap-2">
                  {BUSINESS_CONFIG.facebookUrl && (
                    <a href={BUSINESS_CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#161d2d] hover:bg-[#20293d] text-slate-300 hover:text-white text-xs">
                      Facebook
                    </a>
                  )}
                  {BUSINESS_CONFIG.instagramUrl && (
                    <a href={BUSINESS_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#161d2d] hover:bg-[#20293d] text-slate-300 hover:text-white text-xs">
                      Instagram
                    </a>
                  )}
                  {BUSINESS_CONFIG.tiktokUrl && (
                    <a href={BUSINESS_CONFIG.tiktokUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#161d2d] hover:bg-[#20293d] text-slate-300 hover:text-white text-xs">
                      TikTok
                    </a>
                  )}
                  {BUSINESS_CONFIG.youtubeUrl && (
                    <a href={BUSINESS_CONFIG.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#161d2d] hover:bg-[#20293d] text-slate-300 hover:text-white text-xs">
                      YouTube
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Agency Attribution Bar */}
      <div className="border-t border-[#131b2c] py-6 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()} <strong className="text-slate-300 font-semibold">{BUSINESS_CONFIG.businessName.toUpperCase()}</strong>. All rights reserved.
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-400">Automotive Sourcing in Nigeria</span>
          </div>

          {/* RBC Developer Attribution with Centralized Logo */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-slate-400">
            {/* Centralized RBC Developer Attribution */}
            <button 
              onClick={() => setIsRbcModalOpen(true)}
              className="group inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#080d19] hover:bg-[#0e1628] border border-[#1b263e] hover:border-[#2f4066] text-slate-300 hover:text-white transition-all text-xs shadow-sm cursor-pointer"
              title={`${DEVELOPER_CONFIG.brandName} (${DEVELOPER_CONFIG.shortName}) — Click to view developer profile & logo`}
              aria-label={`${DEVELOPER_CONFIG.attributionText} — ${DEVELOPER_CONFIG.brandName}`}
            >
              {/* Centralized RBC Developer Logo (Version 1) */}
              <img 
                src={DEVELOPER_CONFIG.logo.src} 
                alt={DEVELOPER_CONFIG.logo.alt}
                title={DEVELOPER_CONFIG.logo.title}
                referrerPolicy="no-referrer"
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded shrink-0 border border-[#2b3a58]/60 shadow-sm opacity-95 group-hover:opacity-100 transition-opacity bg-black/40"
              />
              <span className="font-medium text-[11px] sm:text-xs text-slate-300 group-hover:text-white tracking-normal whitespace-nowrap">
                {DEVELOPER_CONFIG.attributionText}
              </span>
            </button>

            {/* Email RBC Quick Action & Provider Choices */}
            <RbcEmailFooterButton />

            <span className="text-slate-600">•</span>
            <button onClick={() => handleLinkClick('about')} className="hover:text-slate-300">
              About
            </button>
            <span className="text-slate-600">•</span>
            <button onClick={() => handleLinkClick('contact')} className="hover:text-slate-300">
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Royal Brand Circuit Agency Attribution Modal */}
      <RbcAttributionModal 
        isOpen={isRbcModalOpen}
        onClose={() => setIsRbcModalOpen(false)}
      />
    </footer>
  );
}
