import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  FileText, 
  Send, 
  Phone, 
  Mail, 
  MessageSquare, 
  Car, 
  Wrench, 
  Building2, 
  Copy, 
  Check, 
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { 
  CatalogueItem, 
  VehicleRecord, 
  SparePartRecord, 
  EnquiryContactPref, 
  EnquiryType, 
  EnquirySubmission 
} from '../types';
import { DEFAULT_SPARE_PART_IMAGE, DEFAULT_VEHICLE_IMAGE } from '../data/mockCatalogue';
import { 
  BUSINESS_CONFIG, 
  generateWhatsAppLink,
  isWhatsAppActive,
  buildVehicleWhatsAppMessage,
  buildSparePartWhatsAppMessage,
  buildCustomSourcingWhatsAppMessage,
  buildGeneralWhatsAppMessage
} from '../config/business';

interface EnquiryModalProps {
  isOpen: boolean;
  item: CatalogueItem | null;
  onClose: () => void;
  onSubmitEnquiry: (enquiry: EnquirySubmission) => void;
  initialEnquiryType?: EnquiryType;
  initialSubject?: string;
  onNavigateToContact?: () => void;
}

/**
 * Validates Nigerian phone numbers in standard formats:
 * - Local formats: 080XXXXXXXX, 081XXXXXXXX, 090XXXXXXXX, 070XXXXXXXX, 091XXXXXXXX (11 digits)
 * - International formats: +234XXXXXXXXXX, 234XXXXXXXXXX
 * - Allows common spacing, dashes, and parentheses
 */
export function isValidNigerianPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const clean = phone.replace(/[\s\-\(\)\.]/g, '');
  
  // 11-digit Nigerian local mobile format
  if (/^0[789][01]\d{8}$/.test(clean)) return true;
  
  // International with +234
  if (/^\+234[789][01]\d{8}$/.test(clean)) return true;
  
  // International without +
  if (/^234[789][01]\d{8}$/.test(clean)) return true;
  
  // Also accept reasonable numbers between 10 and 14 digits
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length >= 10 && digitsOnly.length <= 14) return true;
  
  return false;
}

/**
 * Generates pre-filled WhatsApp message following exact specified structure:
 * Hello VANGUARD Motors & Parts,
 * I would like to make a [Vehicle/Spare Part/Custom Sourcing] enquiry.
 * Item: ...
 * Part Number: ...
 * Vehicle: ...
 * My name: ...
 * Phone: ...
 * Request: ...
 */
export function buildEnquiryWhatsAppText({
  enquiryType,
  itemTitle,
  itemSkuOrPartNum,
  vehicleInfo,
  clientName,
  clientPhone,
  message
}: {
  enquiryType: string;
  itemTitle?: string;
  itemSkuOrPartNum?: string;
  vehicleInfo?: string;
  clientName: string;
  clientPhone: string;
  message: string;
}): string {
  const lines: string[] = [
    `Hello ${BUSINESS_CONFIG.businessName},`,
    '',
    `I would like to make a ${enquiryType}.`,
    ''
  ];

  if (itemTitle) {
    lines.push(`Item:\n${itemTitle}`);
  }
  if (itemSkuOrPartNum) {
    lines.push(`Part Number:\n${itemSkuOrPartNum}`);
  }
  if (vehicleInfo) {
    lines.push(`Vehicle:\n${vehicleInfo}`);
  }

  lines.push('');
  lines.push(`My name:\n${clientName}`);
  lines.push(`Phone:\n${clientPhone}`);
  lines.push('');
  lines.push(`Request:\n${message}`);

  return lines.join('\n');
}

export default function EnquiryModal({
  isOpen,
  item,
  onClose,
  onSubmitEnquiry,
  initialEnquiryType,
  initialSubject,
  onNavigateToContact
}: EnquiryModalProps) {
  const isVehicle = item?.type === 'vehicle';
  const vehicle = isVehicle ? (item as VehicleRecord) : null;
  const part = !isVehicle && item ? (item as SparePartRecord) : null;

  // Form State: Customer Info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [contactPref, setContactPref] = useState<EnquiryContactPref>('WhatsApp');

  // Form State: Enquiry Type (Vehicle Enquiry | Spare Part Enquiry | Custom Part Sourcing | General Enquiry)
  const [enquiryType, setEnquiryType] = useState<EnquiryType>('General Enquiry');

  // Form State: Subject / Item description
  const [interestSubject, setInterestSubject] = useState('');

  // Form State: Custom Sourcing specific fields
  const [sourcingMake, setSourcingMake] = useState('');
  const [sourcingModel, setSourcingModel] = useState('');
  const [sourcingYear, setSourcingYear] = useState('');
  const [sourcingVinOrChassis, setSourcingVinOrChassis] = useState('');
  const [sourcingPartNumber, setSourcingPartNumber] = useState('');
  const [sourcingPartRequired, setSourcingPartRequired] = useState('');
  const [sourcingCondition, setSourcingCondition] = useState<string>('Brand New (OEM)');

  // Form State: Quick options
  const [confirmPriceAvailability, setConfirmPriceAvailability] = useState(true);
  const [requestInspectionOrFitment, setRequestInspectionOrFitment] = useState(false);

  // Form State: Message Details *
  const [message, setMessage] = useState('');

  // Submission & Validation States
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    referenceNumber: string;
    whatsAppText: string;
    whatsAppLink: string | null;
  } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Synchronize initial state when modal opens or item changes
  useEffect(() => {
    if (!isOpen) return;

    // Reset error & submission states
    setValidationErrors({});
    setGeneralError(null);
    setSubmittedData(null);
    setCopiedRef(false);
    setCopiedMessage(false);

    // Determine default Enquiry Type
    if (initialEnquiryType) {
      setEnquiryType(initialEnquiryType);
    } else if (item) {
      if (item.type === 'vehicle') {
        setEnquiryType('Vehicle Enquiry');
      } else {
        setEnquiryType('Spare Part Enquiry');
      }
    } else {
      setEnquiryType('General Enquiry');
    }

    // Determine initial subject
    if (initialSubject) {
      setInterestSubject(initialSubject);
    } else if (item) {
      if (item.type === 'vehicle') {
        const v = item as VehicleRecord;
        setInterestSubject(`${v.manufacturer} ${v.model} (${v.year}) - ${v.trim || v.bodyStyle}`);
      } else {
        const p = item as SparePartRecord;
        setInterestSubject(`${p.partName} (Part #: ${p.partNumber})`);
      }
    } else {
      setInterestSubject('');
    }
  }, [isOpen, item, initialEnquiryType, initialSubject]);

  if (!isOpen) return null;

  // Handle Enquiry Type Switch
  const handleTypeChange = (newType: EnquiryType) => {
    setEnquiryType(newType);
    setValidationErrors({});
    setGeneralError(null);

    // If switching to Custom Part Sourcing, ensure proper subject line
    if (newType === 'Custom Part Sourcing' && !interestSubject) {
      setInterestSubject('Custom Spare Part Sourcing');
    }
  };

  // Form Submission & Validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    // 1. Full Name *
    if (!clientName.trim()) {
      errors.clientName = 'Please enter your name.';
    }

    // 2. Phone / WhatsApp Number *
    if (!clientPhone.trim()) {
      errors.clientPhone = 'Please enter a phone or WhatsApp number.';
    } else if (!isValidNigerianPhone(clientPhone)) {
      errors.clientPhone = 'Please enter a valid Nigerian phone number (e.g. 080XXXXXXXX or +234XXXXXXXXXX).';
    }

    // 3. Message / Request Details *
    if (!message.trim()) {
      errors.message = 'Please tell us what you need assistance with.';
    }

    // 4. Custom Part Sourcing specific validations
    if (enquiryType === 'Custom Part Sourcing') {
      if (!sourcingPartRequired.trim()) {
        errors.sourcingPartRequired = 'Please specify the spare part needed.';
      }
      if (!sourcingMake.trim()) {
        errors.sourcingMake = 'Please enter the vehicle manufacturer (e.g. Toyota, BMW).';
      }
      if (!sourcingModel.trim()) {
        errors.sourcingModel = 'Please enter the vehicle model (e.g. Camry, 3 Series).';
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setGeneralError("We couldn't prepare your enquiry. Please check your details and try again.");
      return;
    }

    setValidationErrors({});
    setGeneralError(null);

    try {
      // Build comprehensive message body
      const messageBlocks: string[] = [];

      if (confirmPriceAvailability) {
        messageBlocks.push('[Requested: Confirm Current Lagos Price & Availability]');
      }
      if (requestInspectionOrFitment) {
        if (enquiryType === 'Vehicle Enquiry') {
          messageBlocks.push('[Requested: Arrange Physical Vehicle Inspection in Lagos]');
        } else {
          messageBlocks.push('[Requested: Fitment Verification with VIN/Chassis]');
        }
      }

      if (enquiryType === 'Custom Part Sourcing') {
        messageBlocks.push(`[Vehicle Sourcing: ${sourcingMake} ${sourcingModel} ${sourcingYear ? `(${sourcingYear})` : ''}]`);
        if (sourcingVinOrChassis.trim()) {
          messageBlocks.push(`[Chassis/VIN: ${sourcingVinOrChassis.trim()} (For fitment verification only)]`);
        }
        if (sourcingPartNumber.trim()) {
          messageBlocks.push(`[Part #: ${sourcingPartNumber.trim()}]`);
        }
        if (sourcingPartRequired.trim()) {
          messageBlocks.push(`[Part Required: ${sourcingPartRequired.trim()} | Condition: ${sourcingCondition}]`);
        }
      }

      messageBlocks.push(message.trim());

      const finalMessage = messageBlocks.join('\n');

      // Generate Reference Code
      const currentYear = new Date().getFullYear();
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const prefix = enquiryType === 'Custom Part Sourcing' ? 'VNG-SRC' : 'VNG-ENQ';
      const referenceNumber = `${prefix}-${currentYear}-${randomCode}`;

      // Vehicle or Part identification string
      let itemTitleDisplay = interestSubject;
      let partNumberDisplay: string | undefined = undefined;
      let vehicleInfoDisplay: string | undefined = undefined;

      if (item) {
        if (isVehicle && vehicle) {
          itemTitleDisplay = `${vehicle.title} (${vehicle.year})`;
          vehicleInfoDisplay = `${vehicle.manufacturer} ${vehicle.model} - ${vehicle.engine}`;
        } else if (part) {
          itemTitleDisplay = part.partName;
          partNumberDisplay = part.partNumber;
          vehicleInfoDisplay = part.compatibleVehicles.join(', ');
        }
      } else if (enquiryType === 'Custom Part Sourcing') {
        itemTitleDisplay = sourcingPartRequired || 'Custom Spare Part Sourcing';
        partNumberDisplay = sourcingPartNumber || undefined;
        vehicleInfoDisplay = `${sourcingMake} ${sourcingModel} ${sourcingYear}`.trim();
      }

      // Generate exact structured pre-filled WhatsApp message based on item category
      let whatsAppText = '';
      if (item && isVehicle && vehicle) {
        whatsAppText = buildVehicleWhatsAppMessage({
          vehicle: `${vehicle.year} ${vehicle.manufacturer} ${vehicle.model}`,
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          clientMessage: finalMessage
        });
      } else if (item && part) {
        whatsAppText = buildSparePartWhatsAppMessage({
          part: part.partName,
          partNumber: part.partNumber,
          compatibleVehicle: part.compatibleVehicles.join(', '),
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          clientMessage: finalMessage
        });
      } else if (enquiryType === 'Custom Part Sourcing') {
        whatsAppText = buildCustomSourcingWhatsAppMessage({
          vehicle: `${sourcingMake} ${sourcingModel} ${sourcingYear}`.trim(),
          partNumber: sourcingPartNumber || undefined,
          partDescription: sourcingPartRequired || 'Automotive precision spare part',
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          clientMessage: finalMessage
        });
      } else {
        whatsAppText = buildGeneralWhatsAppMessage({
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          clientMessage: finalMessage,
          subject: interestSubject || enquiryType
        });
      }

      const whatsAppLink = generateWhatsAppLink(whatsAppText);

      // Create typed EnquirySubmission record
      const newEnquiry: EnquirySubmission = {
        id: `enq-${Date.now()}`,
        referenceNumber,
        createdAt: new Date().toISOString(),
        itemType: item ? item.type : 'general',
        itemId: item ? item.id : undefined,
        itemTitle: itemTitleDisplay,
        itemSkuOrPartNum: partNumberDisplay,
        vehicleMake: sourcingMake || (vehicle ? vehicle.manufacturer : undefined),
        vehicleModel: sourcingModel || (vehicle ? vehicle.model : undefined),
        vehicleYear: sourcingYear || (vehicle ? vehicle.year.toString() : undefined),
        vinOrChassis: sourcingVinOrChassis || undefined,
        partRequired: sourcingPartRequired || (part ? part.partName : undefined),
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim() || `${clientPhone.replace(/\D/g, '')}@vanguardmotors.ng`,
        clientPhone: clientPhone.trim(),
        contactPreference: contactPref,
        enquiryType,
        message: finalMessage,
        status: 'Submitted'
      };

      // Call orchestrator submission
      onSubmitEnquiry(newEnquiry);

      // Set honest success state
      setSubmittedData({
        referenceNumber,
        whatsAppText,
        whatsAppLink
      });
    } catch (err) {
      setGeneralError("We couldn't prepare your enquiry. Please check your details and try again.");
    }
  };

  const handleCopyReference = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(submittedData.referenceNumber);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleCopyWhatsAppMessage = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(submittedData.whatsAppText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleApplyQuickPrompt = (promptText: string) => {
    setMessage((prev) => (prev ? `${prev}\n${promptText}` : promptText));
    if (validationErrors.message) {
      setValidationErrors((prev) => ({ ...prev, message: '' }));
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-dialog-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#121826] border border-[#232c40] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 my-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#0e1422] border-b border-[#1f283d]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ea580c]/15 border border-[#ea580c]/30 flex items-center justify-center text-[#ea580c]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 id="enquiry-dialog-title" className="font-heading text-base sm:text-lg font-bold text-white">
                VANGUARD Customer Enquiry
              </h2>
              <p className="text-[11px] text-slate-400">
                Direct vehicle &amp; precision parts consultation • Lagos, Nigeria
              </p>
            </div>
          </div>

          <button
            id="close-enquiry-modal-btn"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a2336] transition-colors flex items-center justify-center"
            aria-label="Close Enquiry Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ============================================================== */}
        {/* SUCCESS CONFIRMATION VIEW (Requirement 9, 10, 11)             */}
        {/* ============================================================== */}
        {submittedData ? (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-fade-in">
            {/* Status Icon */}
            <div className="w-16 h-16 rounded-full bg-[#14532d]/40 border-2 border-[#22c55e]/60 flex items-center justify-center mx-auto text-[#4ade80]">
              <CheckCircle2 className="w-9 h-9 text-[#22c55e]" />
            </div>

            {/* Headline */}
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#14532d]/50 text-[#4ade80] border border-[#166534]">
                Enquiry Ready
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-white mt-3">
                Reference Code: <span className="text-[#ea580c] font-mono">{submittedData.referenceNumber}</span>
              </h3>
              
              {/* Honest Confirmation Text (Requirement 9) */}
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
                Thank you, <strong className="text-white">{clientName}</strong>. Your enquiry has been prepared successfully. Please use WhatsApp or the contact details provided to send your request to {BUSINESS_CONFIG.businessName}.
              </p>
            </div>

            {/* Pre-filled Details Summary Box */}
            <div className="max-w-lg mx-auto bg-[#0a0f1d] border border-[#1e273b] rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#182133]">
                <span className="text-slate-400 font-medium">Enquiry Type:</span>
                <span className="text-[#ea580c] font-bold">{enquiryType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Customer Name:</span>
                <span className="text-white font-medium">{clientName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Phone / WhatsApp:</span>
                <span className="text-white font-mono">{clientPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Preferred Contact:</span>
                <span className="text-[#4ade80] font-semibold">{contactPref}</span>
              </div>
              {interestSubject && (
                <div className="pt-2 border-t border-[#182133]">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Subject / Item:</span>
                  <span className="text-slate-200 font-semibold">{interestSubject}</span>
                </div>
              )}
            </div>

            {/* Action Buttons (Requirement 10 & 11) */}
            <div className="max-w-lg mx-auto space-y-3 pt-2">
              {/* WhatsApp Action with Pre-filled Message if active, or Contact VANGUARD button */}
              {submittedData.whatsAppLink ? (
                <a
                  id="enquiry-success-whatsapp-btn"
                  href={submittedData.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#14532d] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#14532d]/30 transition-all hover:scale-[1.01]"
                >
                  <MessageSquare className="w-4 h-4 text-[#4ade80]" />
                  <span>Continue on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              ) : (
                <div className="space-y-2">
                  <button
                    id="enquiry-success-contact-btn"
                    type="button"
                    onClick={() => {
                      if (onNavigateToContact) {
                        onClose();
                        onNavigateToContact();
                      }
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#ea580c]/30 transition-all hover:scale-[1.01]"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Contact {BUSINESS_CONFIG.businessName}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="p-3 rounded-xl bg-[#080d19] border border-[#1e273b] text-left text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span>WhatsApp Direct Channel In Staging</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Official client WhatsApp details will be activated upon live deployment. Your enquiry has been prepared with reference <strong className="text-white font-mono">{submittedData.referenceNumber}</strong>. Please use the copy buttons below to retain your pre-formatted enquiry text.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="py-2.5 px-3 rounded-xl bg-[#141a29] hover:bg-[#1c2438] text-slate-200 font-semibold border border-[#232d42] flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedRef ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                      <span className="text-[#4ade80]">Copied Reference</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Reference Code</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyWhatsAppMessage}
                  className="py-2.5 px-3 rounded-xl bg-[#141a29] hover:bg-[#1c2438] text-slate-200 font-semibold border border-[#232d42] flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                      <span className="text-[#4ade80]">Copied Message</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Pre-filled Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Navigation Back Buttons */}
              <div className="pt-2 flex items-center justify-center gap-3">
                {onNavigateToContact && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToContact();
                    }}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Contact VANGUARD Office
                  </button>
                )}

                <span className="text-slate-600">•</span>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs transition-colors shadow-md"
                >
                  Back to Catalogue / Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* PRIMARY ENQUIRY FORM VIEW                                      */
          /* ============================================================== */
          <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Global Error Banner (Requirement 12) */}
            {generalError && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-700/80 text-red-200 text-xs flex items-start gap-2.5 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold">{generalError}</div>
                  {Object.values(validationErrors).length > 0 && (
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-red-300">
                      {Object.values(validationErrors).map((msg, i) => (
                        <li key={i}>{msg}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* SECTION 1: ENQUIRY TYPE SELECTION (Requirement 3) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Enquiry Type <span className="text-[#ea580c]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'Vehicle Enquiry', label: 'Vehicle Enquiry', icon: Car },
                  { id: 'Spare Part Enquiry', label: 'Spare Part Enquiry', icon: Wrench },
                  { id: 'Custom Part Sourcing', label: 'Custom Sourcing', icon: Building2 },
                  { id: 'General Enquiry', label: 'General Enquiry', icon: FileText }
                ].map((typeOption) => {
                  const Icon = typeOption.icon;
                  const isSelected = enquiryType === typeOption.id || 
                    (typeOption.id === 'Spare Part Enquiry' && enquiryType === 'Spare Parts Enquiry');

                  return (
                    <button
                      key={typeOption.id}
                      type="button"
                      onClick={() => handleTypeChange(typeOption.id as EnquiryType)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                        isSelected
                          ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-md shadow-[#ea580c]/20'
                          : 'bg-[#0d1322] text-slate-300 border-[#1f293f] hover:bg-[#151e33] hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] leading-tight">{typeOption.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: CONTEXTUAL ITEM DISPLAY (Requirement 4, 5, 6) */}
            {/* If from Vehicle */}
            {enquiryType === 'Vehicle Enquiry' && item && isVehicle && vehicle && (
              <div className="p-3.5 bg-[#0a0f1d] border border-[#20293d] rounded-xl flex items-start gap-3.5">
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.title}
                  className="w-16 h-16 rounded-lg object-cover bg-[#050811] shrink-0 border border-[#1f283d]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_VEHICLE_IMAGE;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#ea580c] mb-0.5">
                    <Car className="w-3 h-3" />
                    <span>Selected Vehicle</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 font-mono">{vehicle.year}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate">
                    {vehicle.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {vehicle.manufacturer} {vehicle.model} • {vehicle.engine} • {vehicle.bodyStyle}
                  </div>
                  <div className="text-[11px] text-[#4ade80] font-semibold mt-1">
                    {vehicle.priceDisplay} • {vehicle.availabilityStatus}
                  </div>
                </div>
              </div>
            )}

            {/* If from Spare Part */}
            {(enquiryType === 'Spare Part Enquiry' || enquiryType === 'Spare Parts Enquiry') && item && !isVehicle && part && (
              <div className="p-3.5 bg-[#0a0f1d] border border-[#20293d] rounded-xl flex items-start gap-3.5">
                <img
                  src={part.images[0]}
                  alt={part.partName}
                  className="w-16 h-16 rounded-lg object-cover bg-[#050811] shrink-0 border border-[#1f283d]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_SPARE_PART_IMAGE;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#ea580c] mb-0.5">
                    <Wrench className="w-3 h-3 text-[#4ade80]" />
                    <span>Selected Spare Part</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 font-mono">#{part.partNumber}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate">
                    {part.partName}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    Category: {part.category} • Fits: {part.compatibleVehicles.slice(0, 2).join(', ')}
                  </div>
                  <div className="text-[11px] text-[#4ade80] font-semibold mt-1">
                    {part.priceDisplay} • {part.availabilityStatus}
                  </div>
                </div>
              </div>
            )}

            {/* If Custom Part Sourcing Form Fields (Requirement 6) */}
            {enquiryType === 'Custom Part Sourcing' && (
              <div className="p-3.5 bg-[#0a0f1d] border border-[#20293d] rounded-xl space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#ea580c] uppercase">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Custom Sourcing Vehicle &amp; Component Info</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Vehicle Manufacturer <span className="text-[#ea580c]">*</span>
                    </label>
                    <input
                      id="sourcing-make-input"
                      type="text"
                      value={sourcingMake}
                      onChange={(e) => setSourcingMake(e.target.value)}
                      placeholder="e.g. Toyota, BMW, Honda"
                      className={`w-full px-2.5 py-1.5 bg-[#141a29] border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] ${
                        validationErrors.sourcingMake ? 'border-red-500' : 'border-[#222c40]'
                      }`}
                    />
                    {validationErrors.sourcingMake && (
                      <span className="text-[10px] text-red-400">{validationErrors.sourcingMake}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Vehicle Model <span className="text-[#ea580c]">*</span>
                    </label>
                    <input
                      id="sourcing-model-input"
                      type="text"
                      value={sourcingModel}
                      onChange={(e) => setSourcingModel(e.target.value)}
                      placeholder="e.g. Camry, 3 Series, Civic"
                      className={`w-full px-2.5 py-1.5 bg-[#141a29] border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] ${
                        validationErrors.sourcingModel ? 'border-red-500' : 'border-[#222c40]'
                      }`}
                    />
                    {validationErrors.sourcingModel && (
                      <span className="text-[10px] text-red-400">{validationErrors.sourcingModel}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Model Year (Optional)
                    </label>
                    <input
                      id="sourcing-year-input"
                      type="text"
                      value={sourcingYear}
                      onChange={(e) => setSourcingYear(e.target.value)}
                      placeholder="e.g. 2018, 2022"
                      className="w-full px-2.5 py-1.5 bg-[#141a29] border border-[#222c40] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Part Description / Part Required <span className="text-[#ea580c]">*</span>
                    </label>
                    <input
                      id="sourcing-part-input"
                      type="text"
                      value={sourcingPartRequired}
                      onChange={(e) => setSourcingPartRequired(e.target.value)}
                      placeholder="e.g. Front Shock Absorbers, Alternator"
                      className={`w-full px-2.5 py-1.5 bg-[#141a29] border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] ${
                        validationErrors.sourcingPartRequired ? 'border-red-500' : 'border-[#222c40]'
                      }`}
                    />
                    {validationErrors.sourcingPartRequired && (
                      <span className="text-[10px] text-red-400">{validationErrors.sourcingPartRequired}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Part Number (Optional)
                    </label>
                    <input
                      id="sourcing-partnum-input"
                      type="text"
                      value={sourcingPartNumber}
                      onChange={(e) => setSourcingPartNumber(e.target.value)}
                      placeholder="e.g. BP-8842-CER, 04465-33470"
                      className="w-full px-2.5 py-1.5 bg-[#141a29] border border-[#222c40] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>
                </div>

                {/* Chassis/VIN Field (Requirement 6 - no automated decoding) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-slate-300">
                        Chassis / VIN (Optional)
                      </label>
                      <span className="text-[10px] text-slate-500">Fitment check only</span>
                    </div>
                    <input
                      id="sourcing-vin-input"
                      type="text"
                      value={sourcingVinOrChassis}
                      onChange={(e) => setSourcingVinOrChassis(e.target.value)}
                      placeholder="Enter 17-digit VIN or Chassis code..."
                      className="w-full px-2.5 py-1.5 bg-[#141a29] border border-[#222c40] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] font-mono uppercase"
                    />
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Provided solely for fitment confirmation by our sourcing specialists. No automated decoding.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Preferred Condition
                    </label>
                    <select
                      value={sourcingCondition}
                      onChange={(e) => setSourcingCondition(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-[#141a29] border border-[#222c40] rounded-lg text-white focus:outline-none focus:border-[#ea580c]"
                    >
                      <option value="Brand New (OEM)">Brand New (OEM)</option>
                      <option value="Foreign Used (Tokunbo)">Foreign Used (Tokunbo)</option>
                      <option value="Certified Aftermarket">Certified Aftermarket</option>
                      <option value="Any Available">Any Available (Fastest)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Subject field for General Enquiry or when no item was attached */}
            {!item && enquiryType !== 'Custom Part Sourcing' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topic or Item of Interest <span className="text-[#ea580c]">*</span>
                </label>
                <input
                  id="enquiry-general-subject"
                  type="text"
                  value={interestSubject}
                  onChange={(e) => setInterestSubject(e.target.value)}
                  placeholder="e.g. 2024 Toyota Land Cruiser, Transmission Filter, or Showroom Appointment"
                  className="w-full px-3 py-2 bg-[#0a0f1d] border border-[#232c40] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c]"
                />
              </div>
            )}

            {/* SECTION 3: CUSTOMER INFORMATION (Requirement 2 & 7) */}
            <div className="p-3.5 bg-[#0a0f1d] border border-[#20293d] rounded-xl space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 uppercase">
                <span>Customer Contact Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Full Name * */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Full Name <span className="text-[#ea580c]">*</span>
                  </label>
                  <input
                    id="enquiry-name-input"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (validationErrors.clientName) {
                        setValidationErrors((prev) => ({ ...prev, clientName: '' }));
                      }
                    }}
                    placeholder="e.g. Babajide Adeleke"
                    className={`w-full px-3 py-2 bg-[#141a29] border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] ${
                      validationErrors.clientName ? 'border-red-500' : 'border-[#222c40]'
                    }`}
                  />
                  {validationErrors.clientName && (
                    <span className="text-[10px] text-red-400 mt-0.5 block">{validationErrors.clientName}</span>
                  )}
                </div>

                {/* Phone / WhatsApp * (Requirement 8) */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Phone / WhatsApp Number <span className="text-[#ea580c]">*</span>
                  </label>
                  <input
                    id="enquiry-phone-input"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => {
                      setClientPhone(e.target.value);
                      if (validationErrors.clientPhone) {
                        setValidationErrors((prev) => ({ ...prev, clientPhone: '' }));
                      }
                    }}
                    placeholder="e.g. 0803 123 4567 or +234 803 123 4567"
                    className={`w-full px-3 py-2 bg-[#141a29] border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] ${
                      validationErrors.clientPhone ? 'border-red-500' : 'border-[#222c40]'
                    }`}
                  />
                  {validationErrors.clientPhone ? (
                    <span className="text-[10px] text-red-400 mt-0.5 block">{validationErrors.clientPhone}</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Nigerian mobile format accepted</span>
                  )}
                </div>

                {/* Email Address (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-300">
                      Email Address
                    </label>
                    <span className="text-[10px] text-slate-500">Optional</span>
                  </div>
                  <input
                    id="enquiry-email-input"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. adeleke@example.ng"
                    className="w-full px-3 py-2 bg-[#141a29] border border-[#222c40] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c]"
                  />
                </div>

                {/* Preferred Contact Method * (Requirement 2) */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Preferred Contact Method <span className="text-[#ea580c]">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['WhatsApp', 'Phone Call', 'Email'] as EnquiryContactPref[]).map((pref) => (
                      <button
                        type="button"
                        key={pref}
                        onClick={() => setContactPref(pref)}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold border text-center transition-all ${
                          contactPref === pref
                            ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-sm'
                            : 'bg-[#141a29] text-slate-300 border-[#222c40] hover:bg-[#1d263a] hover:text-white'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="p-3 bg-[#0a0f1d] border border-[#20293d] rounded-xl space-y-2 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmPriceAvailability}
                  onChange={(e) => setConfirmPriceAvailability(e.target.checked)}
                  className="mt-0.5 rounded border-[#2a364f] text-[#ea580c] focus:ring-[#ea580c]"
                />
                <div>
                  <span className="font-semibold text-white">Confirm Current Lagos Price &amp; Stock Availability</span>
                  <p className="text-[11px] text-slate-400">
                    Request our desk to confirm warehouse status and provide pricing in Nigerian Naira.
                  </p>
                </div>
              </label>

              {enquiryType === 'Vehicle Enquiry' ? (
                <label className="flex items-start gap-2.5 cursor-pointer pt-2 border-t border-[#182133]">
                  <input
                    type="checkbox"
                    checked={requestInspectionOrFitment}
                    onChange={(e) => setRequestInspectionOrFitment(e.target.checked)}
                    className="mt-0.5 rounded border-[#2a364f] text-[#ea580c] focus:ring-[#ea580c]"
                  />
                  <div>
                    <span className="font-semibold text-slate-200">Request Physical Vehicle Inspection in Lagos</span>
                    <p className="text-[11px] text-slate-400">
                      Arrange on-site viewing and pre-purchase vehicle examination with our operations team.
                    </p>
                  </div>
                </label>
              ) : (
                <label className="flex items-start gap-2.5 cursor-pointer pt-2 border-t border-[#182133]">
                  <input
                    type="checkbox"
                    checked={requestInspectionOrFitment}
                    onChange={(e) => setRequestInspectionOrFitment(e.target.checked)}
                    className="mt-0.5 rounded border-[#2a364f] text-[#ea580c] focus:ring-[#ea580c]"
                  />
                  <div>
                    <span className="font-semibold text-slate-200">Request Fitment Verification with Chassis/VIN</span>
                    <p className="text-[11px] text-slate-400">
                      Our parts desk will cross-reference the part specification against your vehicle chassis.
                    </p>
                  </div>
                </label>
              )}
            </div>

            {/* SECTION 4: MESSAGE / REQUEST DETAILS * (Requirement 2 & 7) */}
            <div>
              <div className="flex items-center justify-between mb-1 text-xs">
                <label className="font-bold text-slate-300">
                  Message / Request Details <span className="text-[#ea580c]">*</span>
                </label>
                <span className="text-[10px] text-slate-400">Quick options below:</span>
              </div>

              {/* Quick Prompt Buttons */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                <button
                  type="button"
                  onClick={() => handleApplyQuickPrompt('Please confirm current Lagos availability and pricing.')}
                  className="text-[10px] px-2 py-1 rounded-lg bg-[#141a29] hover:bg-[#1d263b] text-slate-300 hover:text-white border border-[#20293d] transition-colors"
                >
                  + Price &amp; availability
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyQuickPrompt('Please verify fitment with my vehicle chassis number.')}
                  className="text-[10px] px-2 py-1 rounded-lg bg-[#141a29] hover:bg-[#1d263b] text-slate-300 hover:text-white border border-[#20293d] transition-colors"
                >
                  + Fitment verification
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyQuickPrompt('I would like to schedule an inspection at the Lagos hub.')}
                  className="text-[10px] px-2 py-1 rounded-lg bg-[#141a29] hover:bg-[#1d263b] text-slate-300 hover:text-white border border-[#20293d] transition-colors"
                >
                  + Lagos inspection
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyQuickPrompt('What are the interstate delivery timelines to my location?')}
                  className="text-[10px] px-2 py-1 rounded-lg bg-[#141a29] hover:bg-[#1d263b] text-slate-300 hover:text-white border border-[#20293d] transition-colors"
                >
                  + Interstate delivery
                </button>
              </div>

              <textarea
                id="enquiry-message-input"
                rows={3}
                required
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (validationErrors.message) {
                    setValidationErrors((prev) => ({ ...prev, message: '' }));
                  }
                }}
                placeholder="Describe your request, delivery city, vehicle year, or any specific questions..."
                className={`w-full px-3 py-2 bg-[#0a0f1d] border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] ${
                  validationErrors.message ? 'border-red-500' : 'border-[#232c40]'
                }`}
              />
              {validationErrors.message && (
                <span className="text-[10px] text-red-400 mt-0.5 block">{validationErrors.message}</span>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1d263b] gap-3">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#1a2336] transition-colors flex items-center justify-center"
              >
                Cancel
              </button>

              <button
                id="submit-enquiry-btn"
                type="submit"
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#ea580c]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit &amp; Prepare Enquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
