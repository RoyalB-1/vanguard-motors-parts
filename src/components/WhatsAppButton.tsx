import { MessageSquare, PhoneCall } from 'lucide-react';
import { generateWhatsAppLink, isWhatsAppActive, BUSINESS_CONFIG } from '../config/business';

interface WhatsAppButtonProps {
  customMessage?: string;
  onOpenEnquiry?: () => void;
}

export default function WhatsAppButton({ customMessage, onOpenEnquiry }: WhatsAppButtonProps) {
  const isLive = isWhatsAppActive();
  const whatsAppLink = generateWhatsAppLink(customMessage || 'Hello VANGUARD Motors & Parts, I would like to make an automotive enquiry.');

  return (
    <aside aria-label="Customer communication quick link" className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40">
      {isLive && whatsAppLink ? (
        <a
          id="floating-whatsapp-btn"
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs shadow-2xl shadow-[#16a34a]/40 hover:scale-105 transition-all group border border-[#22c55e]/40"
          title="Chat with VANGUARD on WhatsApp"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>
          <MessageSquare className="w-4 h-4 fill-white text-white" />
          <span className="hidden sm:inline">WhatsApp Support</span>
        </a>
      ) : (
        <button
          id="floating-contact-btn"
          type="button"
          onClick={onOpenEnquiry}
          className="min-h-[44px] flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs shadow-2xl shadow-[#ea580c]/40 hover:scale-105 transition-all group border border-white/20"
          title="Contact VANGUARD Motors & Parts"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span>Contact VANGUARD</span>
        </button>
      )}
    </aside>
  );
}
