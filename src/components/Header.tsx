import { useState } from 'react';
import { 
  Car, 
  Wrench, 
  Phone, 
  Clock, 
  FileText, 
  MessageSquare, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { NavigationPage } from '../types';
import { 
  BUSINESS_CONFIG, 
  generateWhatsAppLink, 
  isWhatsAppActive, 
  isPhoneActive, 
  generateTelLink 
} from '../config/business';

interface HeaderProps {
  activePage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  enquiriesCount: number;
  onOpenEnquiries: () => void;
  onOpenGeneralEnquiry: () => void;
  onOpenRequestPart?: () => void;
}

export default function Header({
  activePage,
  onNavigate,
  enquiriesCount,
  onOpenEnquiries,
  onOpenGeneralEnquiry,
  onOpenRequestPart
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: NavigationPage; label: string; icon?: any }[] = [
    { id: 'home', label: 'Home' },
    { id: 'all_inventory', label: 'All Inventory' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'spare_parts', label: 'Spare Parts' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0f1d]/95 backdrop-blur-md border-b border-[#1c2436] shadow-xl">
      {/* Top Information Bar */}
      <div className="bg-[#080d19] border-b border-[#161f31] px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          {/* Location & Hours */}
          <div className="flex items-center flex-wrap gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
              <span className="font-medium text-white">{BUSINESS_CONFIG.location}</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
              <span>{BUSINESS_CONFIG.businessHours}</span>
            </div>
          </div>

          {/* Direct Contact & WhatsApp */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            {isPhoneActive() ? (
              <a 
                href={generateTelLink()!}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>Call: <strong className="text-white font-mono">{BUSINESS_CONFIG.phone}</strong></span>
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>Call: <span className="text-slate-300 font-mono">{BUSINESS_CONFIG.phone}</span></span>
              </span>
            )}

            <span className="text-slate-600">•</span>

            {isWhatsAppActive() && generateWhatsAppLink('Hello VANGUARD Motors & Parts, I would like to make an enquiry.') ? (
              <a 
                href={generateWhatsAppLink('Hello VANGUARD Motors & Parts, I would like to make an enquiry.')!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#4ade80] hover:text-[#86efac] font-medium transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span>WhatsApp: <strong className="font-mono">{BUSINESS_CONFIG.whatsapp}</strong></span>
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span>WhatsApp: <span className="text-slate-300 font-mono">{BUSINESS_CONFIG.whatsapp}</span></span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#9a3412] flex items-center justify-center shadow-lg shadow-[#ea580c]/25 border border-[#f97316]/40 group-hover:scale-105 transition-transform">
              <span className="font-heading font-black text-xl text-white tracking-wider">V</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-heading text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-slate-100 transition-colors">
                  VANGUARD
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded bg-[#1c2438] text-[#ea580c] border border-[#ea580c]/30">
                  MOTORS &amp; PARTS
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-slate-400">
                AUTOMOTIVE VEHICLES &amp; SPARE PARTS • NIGERIA
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#101626] p-1.5 rounded-xl border border-[#1e273c]">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#ea580c] text-white shadow-md shadow-[#ea580c]/30'
                      : 'text-slate-300 hover:text-white hover:bg-[#192236]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* WhatsApp CTA / Enquire Now */}
            {isWhatsAppActive() && generateWhatsAppLink('Hello VANGUARD Motors & Parts, I would like to make an automotive enquiry.') ? (
              <a
                href={generateWhatsAppLink('Hello VANGUARD Motors & Parts, I would like to make an automotive enquiry.')!}
                target="_blank"
                rel="noopener noreferrer"
                id="header-whatsapp-cta"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#14532d]/50 hover:bg-[#166534]/70 text-[#4ade80] border border-[#166534] text-xs font-bold transition-all shadow-sm"
                title="Chat with our sales & parts team on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            ) : (
              <button
                onClick={onOpenGeneralEnquiry}
                id="header-whatsapp-cta"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#151d2f] hover:bg-[#1f2a42] text-slate-200 border border-[#273550] text-xs font-semibold transition-all shadow-sm"
                title="Enquire with VANGUARD"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>Enquire Now</span>
              </button>
            )}

            {/* My Enquiries Drawer Button */}
            <button
              id="header-enquiries-counter-btn"
              onClick={onOpenEnquiries}
              className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#131929] hover:bg-[#1c2438] text-slate-200 border border-[#222c42] text-xs font-semibold transition-colors"
              title="Track submitted enquiries"
            >
              <FileText className="w-3.5 h-3.5 text-[#ea580c]" />
              <span className="hidden md:inline">Enquiries</span>
              {enquiriesCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-[#ea580c] text-white shadow-sm">
                  {enquiriesCount}
                </span>
              )}
            </button>

            {/* Make Enquiry Action */}
            <button
              id="header-make-enquiry-btn"
              onClick={onOpenGeneralEnquiry}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs tracking-wide shadow-md shadow-[#ea580c]/25 transition-all hover:scale-[1.02]"
            >
              <span>Make an Enquiry</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenEnquiries}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl bg-[#131929] text-slate-300 border border-[#222c42] active:scale-95 transition-all"
              aria-label="View Enquiries"
            >
              <FileText className="w-5 h-5 text-[#ea580c]" />
              {enquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-[#ea580c] text-white shadow-md">
                  {enquiriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl bg-[#141a29] border border-[#222c42] text-slate-200 hover:text-white active:scale-95 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d1322] border-b border-[#1c2438] px-4 py-5 shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const isLastOdd = item.id === 'contact';
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isLastOdd ? 'col-span-2' : ''
                  } ${
                    isActive
                      ? 'bg-[#ea580c] text-white shadow-md shadow-[#ea580c]/20'
                      : 'bg-[#141b2a] text-slate-200 hover:bg-[#1d273d] border border-[#202a3f]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-75" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#1c2538] space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGeneralEnquiry();
              }}
              className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <span>Make an Enquiry</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {onOpenRequestPart && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRequestPart();
                }}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#141b2c] hover:bg-[#1d263d] text-slate-200 border border-[#243048] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <span>Request a Spare Part</span>
              </button>
            )}

            {isWhatsAppActive() && generateWhatsAppLink('Hello VANGUARD Motors & Parts, I would like to make an automotive enquiry.') ? (
              <a
                href={generateWhatsAppLink('Hello VANGUARD Motors & Parts, I would like to make an automotive enquiry.')!}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#14532d]/40 text-[#4ade80] border border-[#166534] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us: {BUSINESS_CONFIG.whatsapp}</span>
              </a>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGeneralEnquiry();
                }}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors active:scale-98"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire with VANGUARD</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
