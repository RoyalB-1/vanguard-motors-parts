import { useState } from 'react';
import { 
  Code2, 
  Phone, 
  Mail, 
  MessageSquare, 
  Youtube, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Globe2,
  ZoomIn,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { 
  DEVELOPER_CONFIG, 
  generateRbcTelLink, 
  generateRbcWhatsAppLink 
} from '../config/developer';
import { RbcEmailCard } from './RbcEmailActions';

interface RbcAttributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RbcAttributionModal({ isOpen, onClose }: RbcAttributionModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const telLink = generateRbcTelLink();
  const whatsAppLink = generateRbcWhatsAppLink();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={() => {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }}
    >
      {/* Lightbox / Zoomed Full-Resolution View */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in zoom-in-95 duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(false);
          }}
        >
          <div 
            className="relative max-w-xl w-full bg-[#0a0f1d] border border-[#223354] rounded-2xl p-6 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-4 border-b border-[#1a253d] mb-5">
              <div>
                <h4 className="text-white font-bold text-base sm:text-lg">
                  {DEVELOPER_CONFIG.brandName}
                </h4>
                <p className="text-xs text-[#ea580c] font-mono mt-0.5">
                  {DEVELOPER_CONFIG.logo.version}
                </p>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-2 rounded-lg bg-[#141d30] text-slate-300 hover:text-white hover:bg-[#1e2a44] transition-colors"
                aria-label="Close high-res view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Resolution Artwork */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-xl bg-black border border-[#233555] overflow-hidden flex items-center justify-center shadow-2xl p-2">
              <img 
                src={DEVELOPER_CONFIG.logo.src} 
                alt={DEVELOPER_CONFIG.logo.alt}
                title={DEVELOPER_CONFIG.logo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain select-none"
              />
            </div>

            <div className="w-full mt-4 p-3 rounded-xl bg-[#0f172a] border border-[#1e293b] text-center">
              <p className="text-slate-300 text-xs font-medium">
                High-Resolution Master Asset ({DEVELOPER_CONFIG.logo.width} &times; {DEVELOPER_CONFIG.logo.height} px)
              </p>
              <p className="text-slate-400 text-[11px] mt-1">
                {DEVELOPER_CONFIG.logo.description}
              </p>
            </div>

            <button
              onClick={() => setIsZoomed(false)}
              className="mt-4 px-5 py-2 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-white text-xs font-semibold transition-colors"
            >
              Back to Developer Details
            </button>
          </div>
        </div>
      )}

      {/* Main Attribution Modal */}
      <div 
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#0a0f1d] border border-[#1e2a42] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#19243b] bg-[#0d1424] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#131b2e] border border-[#243556] flex items-center justify-center text-[#ea580c] shadow-sm">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight">
                  {DEVELOPER_CONFIG.brandName}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#ea580c]/15 text-[#ea580c] border border-[#ea580c]/30 text-[10px] font-bold tracking-wider uppercase">
                  {DEVELOPER_CONFIG.shortName}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Website Development &amp; Technical Agency
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#162035] transition-colors"
            aria-label="Close developer info"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body - Scrollable */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto text-xs text-slate-300">
          
          {/* RBC Developer Logo & Attribution Showcase Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1527] border border-[#1d2b48] shadow-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
              
              {/* Logo Frame with Clarity & Click-to-Zoom */}
              <div className="relative group shrink-0">
                <div 
                  onClick={() => setIsZoomed(true)}
                  className="cursor-pointer relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-black border-2 border-[#243557] group-hover:border-[#ea580c] p-1.5 shadow-xl transition-all duration-200 flex items-center justify-center overflow-hidden"
                  title="Click to view high-resolution logo"
                >
                  <img 
                    src={DEVELOPER_CONFIG.logo.src} 
                    alt={DEVELOPER_CONFIG.logo.alt}
                    title={DEVELOPER_CONFIG.logo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-105"
                  />
                  {/* Zoom Overlay Pill */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white">
                    <Maximize2 className="w-5 h-5 text-[#ea580c]" />
                    <span className="text-[10px] font-medium bg-black/70 px-2 py-0.5 rounded-full border border-white/20">
                      Click to Enlarge
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsZoomed(true)}
                  className="mt-2 w-full inline-flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-[#141e33] hover:bg-[#1c2944] border border-[#233352] text-[10px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>Enlarge Artwork</span>
                </button>
              </div>

              {/* Attribution Details & Clear Write-ups */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ea580c]/10 border border-[#ea580c]/25 text-[#ea580c] text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{DEVELOPER_CONFIG.attributionText}</span>
                </div>

                <h4 className="text-white text-sm sm:text-base font-bold tracking-tight">
                  {DEVELOPER_CONFIG.brandName} ({DEVELOPER_CONFIG.shortName})
                </h4>

                {/* Temporary Logo Version Badge & Explanatory Write-up */}
                <div className="mt-2 p-2.5 rounded-xl bg-[#090e1c] border border-[#172238] space-y-1.5">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                      Logo Status:
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#162035] border border-[#253556] text-[10px] text-[#f97316] font-mono font-semibold">
                      {DEVELOPER_CONFIG.logo.version}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {DEVELOPER_CONFIG.logo.description}
                  </p>
                </div>

                {/* Developer Scope Write-up */}
                <p className="text-slate-300 text-xs mt-2.5 leading-relaxed font-normal">
                  <strong className="text-white font-semibold">Scope of Work:</strong> Full-stack website architecture, responsive UI design, vehicle and spare-parts catalogue systems, custom parts sourcing pipeline, and digital infrastructure for <strong className="text-white font-semibold">VANGUARD Motors &amp; Parts</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Agency & Client Separation Notice */}
          <div className="p-3 rounded-xl bg-[#0a1122] border border-[#172642] flex items-start gap-2.5 text-[11px] text-slate-300">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-200">Agency &amp; Client Boundary:</strong> <strong className="text-white">{DEVELOPER_CONFIG.brandName} ({DEVELOPER_CONFIG.shortName})</strong> is the website developer and technology agency. <strong className="text-white">VANGUARD Motors &amp; Parts</strong> is the client, vehicle dealership, and spare-parts supplier. For vehicle sales, inspections, and parts sourcing, please contact VANGUARD directly.
            </p>
          </div>

          {/* Contact Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></span>
              Direct Developer Channels
            </h4>

            {/* WhatsApp */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#0e1628] border border-[#1b2742] hover:border-[#253659] transition-colors gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#14532d]/50 border border-[#166534] flex items-center justify-center text-[#22c55e] shrink-0 shadow-sm">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold tracking-wider">
                    WhatsApp (Technical Enquiries)
                  </span>
                  <span className="text-white font-mono font-bold text-sm">
                    {DEVELOPER_CONFIG.whatsapp}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleCopy(DEVELOPER_CONFIG.whatsapp, 'wa')}
                  className="px-2.5 py-1.5 rounded-lg bg-[#141e33] hover:bg-[#1d2a44] text-slate-300 hover:text-white border border-[#202e49] text-xs font-medium transition-colors flex items-center gap-1.5"
                  title="Copy WhatsApp Number"
                >
                  {copiedField === 'wa' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
                {whatsAppLink && (
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold transition-colors shadow-sm"
                  >
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#0e1628] border border-[#1b2742] hover:border-[#253659] transition-colors gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1a2336] border border-[#283856] flex items-center justify-center text-[#ea580c] shrink-0 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold tracking-wider">
                    Direct Phone Line
                  </span>
                  <span className="text-white font-mono font-bold text-sm">
                    {DEVELOPER_CONFIG.phone}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleCopy(DEVELOPER_CONFIG.phone, 'tel')}
                  className="px-2.5 py-1.5 rounded-lg bg-[#141e33] hover:bg-[#1d2a44] text-slate-300 hover:text-white border border-[#202e49] text-xs font-medium transition-colors flex items-center gap-1.5"
                  title="Copy Phone Number"
                >
                  {copiedField === 'tel' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
                {telLink && (
                  <a
                    href={telLink}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-semibold transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Developer</span>
                  </a>
                )}
              </div>
            </div>

            {/* Official RBC Email with Universal & Web Provider Actions */}
            <RbcEmailCard />
          </div>

          {/* Operational Model & Social Presence */}
          <div className="p-4 rounded-xl bg-[#0a0f1d] border border-[#162035] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-slate-400" />
                <span>Operating Model</span>
              </span>
              <span className="text-white font-semibold">{DEVELOPER_CONFIG.operatingModel}</span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#141d30]">
              <span className="text-slate-400 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube Media Channel</span>
              </span>
              <span className="text-white font-semibold">{DEVELOPER_CONFIG.youtubeName}</span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#141d30] text-slate-400">
              <span>Agency Website &amp; Socials</span>
              <span className="text-slate-400 italic text-[11px]">In Development (Not Configured)</span>
            </div>
          </div>

          {/* Bottom Clarification */}
          <div className="p-3 rounded-xl bg-[#070b14] border border-[#141b2b] text-[11px] text-slate-400 text-center leading-relaxed">
            Need automotive parts or buying a car? Visit <strong className="text-slate-200">VANGUARD Motors &amp; Parts</strong> catalogue directly on this website.
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#19243b] bg-[#0c1220] flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-400 font-mono">
            {DEVELOPER_CONFIG.shortName} • {DEVELOPER_CONFIG.logo.version}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#162035] hover:bg-[#202e4a] text-slate-200 hover:text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
