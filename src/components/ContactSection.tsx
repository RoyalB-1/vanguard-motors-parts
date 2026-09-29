import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Navigation, 
  Building, 
  ArrowUpRight,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  FileText
} from 'lucide-react';
import { EnquiryType, EnquirySubmission } from '../types';
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
import { isValidNigerianPhone, buildEnquiryWhatsAppText } from './EnquiryModal';

interface ContactSectionProps {
  onSubmitEnquiry: (enquiry: EnquirySubmission) => void;
  onOpenEnquiryModal?: (type?: EnquiryType, subject?: string) => void;
}

const ENQUIRY_OPTIONS: EnquiryType[] = [
  'General Enquiry',
  'Vehicle Enquiry',
  'Spare Part Enquiry',
  'Custom Part Sourcing',
  'Delivery',
  'Service Enquiry'
];

export default function ContactSection({ onSubmitEnquiry, onOpenEnquiryModal }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState<EnquiryType>('General Enquiry');
  const [message, setMessage] = useState('');
  const [contactPref, setContactPref] = useState<'WhatsApp' | 'Phone Call' | 'Email'>('WhatsApp');
  
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  const [submittedData, setSubmittedData] = useState<{
    referenceNumber: string;
    whatsAppText: string;
    whatsAppLink: string | null;
    customerName: string;
  } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (!phone.trim()) {
      errors.phone = 'Please enter a phone or WhatsApp number.';
    } else if (!isValidNigerianPhone(phone)) {
      errors.phone = 'Please enter a valid Nigerian phone number (e.g. 080XXXXXXXX or +234XXXXXXXXXX).';
    }

    if (!message.trim()) {
      errors.message = 'Please tell us what you need assistance with.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setGeneralError("We couldn't prepare your enquiry. Please check your details and try again.");
      return;
    }

    setValidationErrors({});
    setGeneralError(null);

    const refNum = `VNG-CNT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const whatsAppText = buildEnquiryWhatsAppText({
      enquiryType,
      itemTitle: enquiryType === 'General Enquiry' ? 'General Customer Enquiry' : undefined,
      clientName: name.trim(),
      clientPhone: phone.trim(),
      message: message.trim()
    });

    const whatsAppLink = generateWhatsAppLink(whatsAppText);

    const newEnquiry: EnquirySubmission = {
      id: `cnt-${Date.now()}`,
      referenceNumber: refNum,
      createdAt: new Date().toISOString(),
      itemType: 'general',
      clientName: name.trim(),
      clientEmail: email.trim() || `${phone.replace(/\D/g, '')}@vanguardmotors.ng`,
      clientPhone: phone.trim(),
      contactPreference: contactPref,
      enquiryType,
      message: message.trim(),
      status: 'Submitted'
    };

    onSubmitEnquiry(newEnquiry);
    setSubmittedData({
      referenceNumber: refNum,
      whatsAppText,
      whatsAppLink,
      customerName: name.trim()
    });
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setValidationErrors({});
    setGeneralError(null);
  };

  const handleCopyRef = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(submittedData.referenceNumber);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  return (
    <section id="contact-section" className="py-16 bg-[#080d19] border-b border-[#182133]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
            Get In Touch
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-black text-white tracking-tight">
            Contact VANGUARD Motors &amp; Parts
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions about vehicle availability, spare parts compatibility, or delivery logistics to your state? Contact our team in Lagos today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Details & Interactive Map Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Details Cards */}
            <div className="bg-[#0e1424] border border-[#1d273d] rounded-2xl p-6 space-y-5 shadow-lg">
              <h3 className="font-heading text-base font-bold text-white border-b border-[#1b253b] pb-3">
                Lagos Operational Center
              </h3>

              <div className="space-y-4 text-xs">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#151c2d] border border-[#232f48] flex items-center justify-center text-[#ea580c] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Location</div>
                    <div className="text-slate-300 mt-0.5">{BUSINESS_CONFIG.location}</div>
                    {isGoogleMapsActive() && (
                      <a 
                        href={BUSINESS_CONFIG.googleMapsUrl!} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#ea580c] hover:underline mt-0.5"
                      >
                        <span>Open Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {BUSINESS_CONFIG.addressNotice}
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#151c2d] border border-[#232f48] flex items-center justify-center text-[#ea580c] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Business Hours</div>
                    <div className="text-slate-300 mt-0.5">{BUSINESS_CONFIG.businessHours}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Enquiries submitted outside hours are attended to the next business morning.
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#151c2d] border border-[#232f48] flex items-center justify-center text-[#ea580c] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Direct Phone Line</div>
                    {isPhoneActive() ? (
                      <a 
                        href={generateTelLink()!} 
                        className="text-slate-200 hover:text-white font-mono text-sm font-semibold mt-0.5 block transition-colors"
                      >
                        {BUSINESS_CONFIG.phone}
                      </a>
                    ) : (
                      <>
                        <div className="text-slate-200 font-mono text-sm font-semibold mt-0.5">
                          {BUSINESS_CONFIG.phone}
                        </div>
                        <div className="text-[10px] text-amber-400/80 mt-0.5">
                          Direct phone link will activate upon live client setup
                        </div>
                      </>
                    )}
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Standard voice calls during business hours
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#151c2d] border border-[#232f48] flex items-center justify-center text-[#4ade80] shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">WhatsApp Desk</div>
                    {isWhatsAppActive() ? (
                      <a 
                        href={generateWhatsAppLink('Hello VANGUARD Motors & Parts, I would like to make an enquiry.')!} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-200 hover:text-[#4ade80] font-mono text-sm font-semibold mt-0.5 block transition-colors"
                      >
                        {BUSINESS_CONFIG.whatsapp}
                      </a>
                    ) : (
                      <>
                        <div className="text-slate-200 font-mono text-sm font-semibold mt-0.5">
                          {BUSINESS_CONFIG.whatsapp}
                        </div>
                        <div className="text-[10px] text-amber-400/80 mt-0.5">
                          WhatsApp desk in staging (use enquiry form on right)
                        </div>
                      </>
                    )}
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Availability, inventory photos, and dispatch tracking
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#151c2d] border border-[#232f48] flex items-center justify-center text-[#ea580c] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Email Address</div>
                    {isEmailActive() ? (
                      <a 
                        href={generateMailtoLink()!} 
                        className="text-slate-200 hover:text-white mt-0.5 block transition-colors"
                      >
                        {BUSINESS_CONFIG.email}
                      </a>
                    ) : (
                      <div className="text-slate-200 mt-0.5">
                        {BUSINESS_CONFIG.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Media if active */}
                {hasActiveSocialLinks() && (
                  <div className="pt-2 border-t border-[#1a2336] flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-semibold mr-1">Social:</span>
                    {BUSINESS_CONFIG.facebookUrl && (
                      <a href={BUSINESS_CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-[#151c2d] hover:bg-[#1e273d] text-slate-300 hover:text-white text-xs">
                        Facebook
                      </a>
                    )}
                    {BUSINESS_CONFIG.instagramUrl && (
                      <a href={BUSINESS_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-[#151c2d] hover:bg-[#1e273d] text-slate-300 hover:text-white text-xs">
                        Instagram
                      </a>
                    )}
                    {BUSINESS_CONFIG.tiktokUrl && (
                      <a href={BUSINESS_CONFIG.tiktokUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-[#151c2d] hover:bg-[#1e273d] text-slate-300 hover:text-white text-xs">
                        TikTok
                      </a>
                    )}
                    {BUSINESS_CONFIG.youtubeUrl && (
                      <a href={BUSINESS_CONFIG.youtubeUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-[#151c2d] hover:bg-[#1e273d] text-slate-300 hover:text-white text-xs">
                        YouTube
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-2 border-t border-[#1b253b]">
                {isWhatsAppActive() ? (
                  <a
                    href={generateWhatsAppLink('Hello VANGUARD Motors & Parts, I would like to make an enquiry from your website.')!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#14532d] hover:bg-[#166534] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#14532d]/25 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-[#4ade80]" />
                    <span>Chat With Us on WhatsApp ({BUSINESS_CONFIG.whatsapp})</span>
                  </a>
                ) : (
                  <div className="p-3.5 rounded-xl bg-[#070b14] border border-[#1e273a] text-center space-y-1">
                    <div className="text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span>WhatsApp Channel In Staging</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Official number will be connected upon client deployment. Use the enquiry form to structure and submit your request.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Stylized Visual Map Card for Lagos, Nigeria */}
            <div className="bg-[#0e1424] border border-[#1d273d] rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Navigation className="w-4 h-4 text-[#ea580c]" />
                  <span>Lagos Coverage &amp; Logistics Hub</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#161f33] text-slate-300 font-mono">
                  6.5244° N, 3.3792° E
                </span>
              </div>

              {/* Visual Map Representation */}
              <div className="relative h-44 rounded-xl overflow-hidden bg-[#070b14] border border-[#192338] p-4 flex flex-col justify-between">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-[#121828]/90 backdrop-blur-sm border border-[#232f48] px-2.5 py-1 rounded text-[10px] text-slate-200">
                    Mainland Dispatch (Ikeja Hub)
                  </div>
                  <div className="bg-[#121828]/90 backdrop-blur-sm border border-[#232f48] px-2.5 py-1 rounded text-[10px] text-slate-200">
                    Island (VI / Lekki Express)
                  </div>
                </div>

                <div className="relative z-10 text-center py-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ea580c]/20 border border-[#ea580c]/50 text-white text-xs font-bold shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-ping" />
                    <span>VANGUARD Central Depot • Lagos, Nigeria</span>
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-end text-[10px] text-slate-400">
                  <span>Intra-Lagos Same Day Delivery</span>
                  <span>Interstate Waybill Dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0e1424] border border-[#1d273d] rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="border-b border-[#1c253b] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    Send Us a Direct Message
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill in your details below. Our team reviews all incoming enquiries and responds via your preferred contact channel.
                  </p>
                </div>

                {onOpenEnquiryModal && (
                  <button
                    type="button"
                    onClick={() => onOpenEnquiryModal('General Enquiry')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141b2b] hover:bg-[#1d263c] text-xs font-semibold text-[#ea580c] border border-[#25324d] transition-colors shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Open Enquiry Modal</span>
                  </button>
                )}
              </div>

              {submittedData ? (
                /* Honest Success State (Requirement 9, 10, 11) */
                <div className="text-center py-8 space-y-4 animate-fade-in">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#14532d]/40 border-2 border-[#22c55e]/60 flex items-center justify-center text-[#4ade80]">
                    <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#14532d]/50 text-[#4ade80] border border-[#166534]">
                    Enquiry Ready
                  </span>
                  <h4 className="font-heading text-xl font-bold text-white">
                    Reference: <span className="text-[#ea580c] font-mono">{submittedData.referenceNumber}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{submittedData.customerName}</strong>. Your enquiry has been prepared successfully. Please use WhatsApp or the contact details provided to send your request to VANGUARD Motors &amp; Parts.
                  </p>

                  <div className="pt-4 max-w-sm mx-auto space-y-3">
                    {submittedData.whatsAppLink ? (
                      <a
                        href={submittedData.whatsAppLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-[#14532d] hover:bg-[#166534] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#14532d]/30 transition-all hover:scale-[1.01]"
                      >
                        <MessageSquare className="w-4 h-4 text-[#4ade80]" />
                        <span>Continue on WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                      </a>
                    ) : (
                      <div className="p-3 rounded-xl bg-[#121828] border border-[#232f48] text-xs text-slate-300 space-y-1">
                        <div className="text-[11px] font-semibold text-amber-400 flex items-center justify-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                          <span>WhatsApp Channel In Pre-Launch Staging</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Direct WhatsApp links will activate on live launch. Please copy your reference code below for fast follow-up.
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyRef}
                        className="px-4 py-2 rounded-xl bg-[#141a29] hover:bg-[#1f283d] text-xs font-semibold text-slate-300 border border-[#242f47] flex items-center gap-1.5 transition-colors"
                      >
                        {copiedRef ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedRef ? 'Reference Copied' : 'Copy Reference'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
                  {generalError && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-700/80 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{generalError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Full Name <span className="text-[#ea580c]">*</span>
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (validationErrors.name) setValidationErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="e.g. Babatunde Lawal"
                        className={`w-full px-3.5 py-2.5 bg-[#070b14] border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] ${
                          validationErrors.name ? 'border-red-500' : 'border-[#222c42]'
                        }`}
                      />
                      {validationErrors.name && (
                        <span className="text-[10px] text-red-400 mt-1 block">{validationErrors.name}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Phone / WhatsApp <span className="text-[#ea580c]">*</span>
                      </label>
                      <input
                        id="contact-phone-input"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (validationErrors.phone) setValidationErrors((prev) => ({ ...prev, phone: '' }));
                        }}
                        placeholder="e.g. 0803 123 4567 or +234 803 123 4567"
                        className={`w-full px-3.5 py-2.5 bg-[#070b14] border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] ${
                          validationErrors.phone ? 'border-red-500' : 'border-[#222c42]'
                        }`}
                      />
                      {validationErrors.phone ? (
                        <span className="text-[10px] text-red-400 mt-1 block">{validationErrors.phone}</span>
                      ) : (
                        <span className="text-[10px] text-slate-400 mt-1 block">Nigerian mobile format accepted</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-slate-300 font-semibold">
                          Email Address
                        </label>
                        <span className="text-[10px] text-slate-500">Optional</span>
                      </div>
                      <input
                        id="contact-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. lawal@example.ng"
                        className="w-full px-3.5 py-2.5 bg-[#070b14] border border-[#222c42] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Enquiry Type
                      </label>
                      <select
                        id="contact-enquiry-type-select"
                        value={enquiryType}
                        onChange={(e: any) => setEnquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#070b14] border border-[#222c42] rounded-xl text-white focus:outline-none focus:border-[#ea580c]"
                      >
                        {ENQUIRY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      Preferred Contact Method <span className="text-[#ea580c]">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['WhatsApp', 'Phone Call', 'Email'] as const).map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setContactPref(pref)}
                          className={`min-h-[44px] py-2 px-3 rounded-xl border text-center font-semibold transition-all flex items-center justify-center ${
                            contactPref === pref
                              ? 'bg-[#ea580c] text-white border-[#ea580c]'
                              : 'bg-[#070b14] text-slate-300 border-[#222c42] hover:border-[#33415e]'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      Message / Request Details <span className="text-[#ea580c]">*</span>
                    </label>
                    <textarea
                      id="contact-message-input"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (validationErrors.message) setValidationErrors((prev) => ({ ...prev, message: '' }));
                      }}
                      placeholder="Specify your vehicle make, model, year, part requirements, or any questions regarding pricing and delivery..."
                      className={`w-full px-3.5 py-2.5 bg-[#070b14] border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] ${
                        validationErrors.message ? 'border-red-500' : 'border-[#222c42]'
                      }`}
                    />
                    {validationErrors.message && (
                      <span className="text-[10px] text-red-400 mt-1 block">{validationErrors.message}</span>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-400">
                      We respect your privacy. Details are used solely to respond to your automotive request.
                    </p>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold shadow-md shadow-[#ea580c]/25 transition-all flex items-center justify-center gap-2 shrink-0 hover:scale-[1.02]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Prepare &amp; Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
