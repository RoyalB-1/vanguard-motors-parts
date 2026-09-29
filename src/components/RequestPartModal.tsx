import { useState, useRef } from 'react';
import { 
  X, 
  Wrench, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Upload, 
  Car, 
  FileText,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { PartRequestSubmission } from '../types';
import { 
  BUSINESS_CONFIG, 
  generateWhatsAppLink, 
  generateRequestPartWhatsAppMessage,
  isWhatsAppActive
} from '../config/business';

interface RequestPartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (request: PartRequestSubmission) => void;
}

export default function RequestPartModal({
  isOpen,
  onClose,
  onSubmitRequest
}: RequestPartModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientWhatsApp, setClientWhatsApp] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [engineVariant, setEngineVariant] = useState('');
  const [vinOrChassis, setVinOrChassis] = useState('');
  const [partRequired, setPartRequired] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [conditionPreference, setConditionPreference] = useState<'Brand New (OEM)' | 'Foreign Used (Tokunbo)' | 'Aftermarket Replacement' | 'Certified Aftermarket' | 'Any Available'>('Brand New (OEM)');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [photoFileName, setPhotoFileName] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<PartRequestSubmission | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !vehicleMake || !vehicleModel || !partRequired) return;

    setIsSubmitting(true);

    const refNum = `VNG-PRQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: PartRequestSubmission = {
      id: `prq-${Date.now()}`,
      referenceNumber: refNum,
      createdAt: new Date().toISOString(),
      clientName,
      clientPhone,
      clientWhatsApp: clientWhatsApp || clientPhone,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      vinOrChassis: vinOrChassis.trim() || undefined,
      engineVariant,
      partRequired,
      partNumber,
      conditionPreference,
      additionalInfo,
      photoUrl: photoFileName ? `Uploaded: ${photoFileName}` : undefined,
      status: 'Submitted'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRequest(newRequest);
      onSubmitRequest(newRequest);
    }, 600);
  };

  const handleCopyRef = () => {
    if (!submittedRequest) return;
    navigator.clipboard.writeText(submittedRequest.referenceNumber);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleResetAndClose = () => {
    setSubmittedRequest(null);
    setClientName('');
    setClientPhone('');
    setClientWhatsApp('');
    setVehicleMake('');
    setVehicleModel('');
    setVehicleYear('');
    setVinOrChassis('');
    setEngineVariant('');
    setPartRequired('');
    setPartNumber('');
    setAdditionalInfo('');
    setPhotoFileName(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#111726] border border-[#232f48] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1c2538] bg-[#0c111e]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ea580c]/10 border border-[#ea580c]/30 flex items-center justify-center text-[#ea580c]">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading text-base sm:text-lg font-bold text-white">
                Request a Spare Part
              </h2>
              <p className="text-xs text-slate-400">
                Can't find the part you need? Let our team source and verify fitment.
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#182133] transition-colors flex items-center justify-center"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {submittedRequest ? (
            /* Success State */
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#14532d]/40 border border-[#166534] flex items-center justify-center text-[#4ade80]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Part Request Ready!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                  Your part request has been prepared successfully. Please use WhatsApp or the contact options below to send your request directly to {BUSINESS_CONFIG.businessName}.
                </p>
              </div>

              {/* Reference Code Box */}
              <div className="max-w-md mx-auto bg-[#0a0f1d] border border-[#222c42] rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="text-left">
                  <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                    Your Sourcing Reference Code
                  </div>
                  <div className="font-mono text-base font-bold text-[#ea580c]">
                    {submittedRequest.referenceNumber}
                  </div>
                </div>

                <button
                  onClick={handleCopyRef}
                  className="px-3 py-1.5 rounded-lg bg-[#141b2c] hover:bg-[#1f2a42] text-xs font-semibold text-slate-200 border border-[#29364f] flex items-center gap-1.5 transition-colors"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Direct WhatsApp follow-up */}
              <div className="pt-2 max-w-md mx-auto space-y-2">
                {isWhatsAppActive() && generateWhatsAppLink(
                  `Hello ${BUSINESS_CONFIG.businessName}, I just submitted Part Request [${submittedRequest.referenceNumber}] for: ${submittedRequest.vehicleMake} ${submittedRequest.vehicleModel} - ${submittedRequest.partRequired}. Please check availability.`
                ) ? (
                  <a
                    href={generateWhatsAppLink(
                      `Hello ${BUSINESS_CONFIG.businessName}, I just submitted Part Request [${submittedRequest.referenceNumber}] for: ${submittedRequest.vehicleMake} ${submittedRequest.vehicleModel} - ${submittedRequest.partRequired}. Please check availability.`
                    )!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#14532d] hover:bg-[#166534] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#14532d]/30 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-[#4ade80]" />
                    <span>Send Reference Directly via WhatsApp</span>
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-[#121828] border border-[#232f48] text-center text-xs text-slate-300">
                    <span className="text-amber-400 font-semibold">Staging notice:</span> WhatsApp live channel activates upon client deployment. Your request reference has been recorded.
                  </div>
                )}

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#141a29] hover:bg-[#1a2336] text-slate-300 text-xs font-semibold border border-[#222d42] transition-colors"
                >
                  <span>Close Window</span>
                </button>
              </div>
            </div>
          ) : (
            /* Request Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-[#0d1322] border border-[#1d273d] rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                <p>
                  Our parts desk searches across local and import networks for OEM and quality aftermarket replacements. Send your vehicle details to confirm compatibility.
                </p>
              </div>

              {/* Section 1: Customer Contact */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Your Full Name <span className="text-[#ea580c]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Babajide Adeleke"
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Phone Number <span className="text-[#ea580c]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g. +234 803 XXX XXXX"
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-300 mb-1">
                      WhatsApp Number (if different from Phone)
                    </label>
                    <input
                      type="tel"
                      value={clientWhatsApp}
                      onChange={(e) => setClientWhatsApp(e.target.value)}
                      placeholder="e.g. +234 802 XXX XXXX"
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Vehicle Details */}
              <div className="space-y-3 pt-3 border-t border-[#1c2538]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  2. Vehicle Identification
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Vehicle Make <span className="text-[#ea580c]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={vehicleMake}
                      onChange={(e) => setVehicleMake(e.target.value)}
                      placeholder="e.g. Toyota, Lexus, BMW"
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Vehicle Model <span className="text-[#ea580c]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="e.g. Camry, RX350, 328i"
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Model Year
                    </label>
                    <input
                      type="text"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      placeholder="e.g. 2018"
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Engine / Trim Variant (Optional)
                    </label>
                    <input
                      type="text"
                      value={engineVariant}
                      onChange={(e) => setEngineVariant(e.target.value)}
                      placeholder="e.g. 2.0L Turbo, V6, XLE"
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs text-slate-300">
                        Chassis / VIN (Optional)
                      </label>
                      <span className="text-[10px] text-slate-500">For fitment assistance</span>
                    </div>
                    <input
                      type="text"
                      value={vinOrChassis}
                      onChange={(e) => setVinOrChassis(e.target.value)}
                      placeholder="e.g. WBA3... or JT2... (Optional)"
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      The VIN/chassis field is provided purely for sourcing and fitment assistance. No automated decoding is performed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Part Required */}
              <div className="space-y-3 pt-3 border-t border-[#1c2538]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  3. Part Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-300 mb-1">
                      Part Description / Part Required <span className="text-[#ea580c]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={partRequired}
                      onChange={(e) => setPartRequired(e.target.value)}
                      placeholder="e.g. Front Shock Absorber Pair, Steering Rack, Alternator..."
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Part Number / OEM # (if known)
                    </label>
                    <input
                      type="text"
                      value={partNumber}
                      onChange={(e) => setPartNumber(e.target.value)}
                      placeholder="e.g. 48510-09P50"
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Condition Preference
                    </label>
                    <select
                      value={conditionPreference}
                      onChange={(e: any) => setConditionPreference(e.target.value)}
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                    >
                      <option value="Brand New (OEM)">Brand New (OEM Original)</option>
                      <option value="Foreign Used (Tokunbo)">Foreign Used (Tokunbo)</option>
                      <option value="Aftermarket Replacement">Aftermarket Replacement</option>
                      <option value="Any Available">Any Available Option</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-300 mb-1">
                      Additional Notes or Specific Failure Symptoms
                    </label>
                    <textarea
                      rows={2}
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Mention any specific variant, side (left/right), or destination city for delivery."
                      className="w-full px-3 py-2 bg-[#090e1a] border border-[#212b40] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  {/* Photo Upload Attachment */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-300 mb-1">
                      Upload Sample Photo or Old Part Image (Optional)
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-[#29354e] hover:border-[#ea580c] rounded-xl p-3 text-center cursor-pointer bg-[#090e1a] transition-colors"
                    >
                      <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                      <div className="text-xs text-slate-300 font-medium">
                        {photoFileName ? (
                          <span className="text-[#ea580c] font-semibold">{photoFileName} (Selected)</span>
                        ) : (
                          <span>Click to attach a picture of the part or vehicle label</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        JPG, PNG or WEBP up to 10MB
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#1c2538] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#141a29] hover:bg-[#1a2336] text-slate-300 text-xs font-semibold border border-[#222d42] transition-colors flex items-center justify-center"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  {isWhatsAppActive() && generateWhatsAppLink(
                    `Hello ${BUSINESS_CONFIG.businessName}, I would like to source a part for ${vehicleMake || 'my vehicle'} ${vehicleModel}: ${partRequired || 'spare part'}.`
                  ) && (
                    <a
                      href={generateWhatsAppLink(
                        `Hello ${BUSINESS_CONFIG.businessName}, I would like to source a part for ${vehicleMake || 'my vehicle'} ${vehicleModel}: ${partRequired || 'spare part'}.`
                      )!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#14532d]/50 hover:bg-[#166534] text-[#4ade80] border border-[#166534] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Ask on WhatsApp</span>
                    </a>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs shadow-md shadow-[#ea580c]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Part Request'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
