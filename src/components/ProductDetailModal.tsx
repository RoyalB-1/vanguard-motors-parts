import { useState } from 'react';
import { 
  X, 
  Wrench, 
  ArrowRight, 
  Layers, 
  Copy, 
  Check, 
  Printer, 
  Info, 
  Car, 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  Calendar,
  Truck
} from 'lucide-react';
import { CatalogueItem, VehicleRecord, SparePartRecord } from '../types';
import { DEFAULT_SPARE_PART_IMAGE, DEFAULT_VEHICLE_IMAGE } from '../data/mockCatalogue';
import { 
  generateWhatsAppLink, 
  buildVehicleWhatsAppMessage, 
  buildSparePartWhatsAppMessage, 
  BUSINESS_CONFIG,
  isWhatsAppActive
} from '../config/business';

interface ProductDetailModalProps {
  item: CatalogueItem | null;
  onClose: () => void;
  onEnquire: (item: CatalogueItem) => void;
  onRequestSourcing?: () => void;
}

export default function ProductDetailModal({
  item,
  onClose,
  onEnquire,
  onRequestSourcing
}: ProductDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!item) return null;

  const isVehicle = item.type === 'vehicle';
  const vehicle = isVehicle ? (item as VehicleRecord) : null;
  const part = !isVehicle ? (item as SparePartRecord) : null;

  const handleCopyCode = () => {
    const code = vehicle ? `${vehicle.manufacturer} ${vehicle.model}` : part?.partNumber || '';
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  const whatsAppMessage = isVehicle && vehicle
    ? buildVehicleWhatsAppMessage({ vehicle: vehicle.title })
    : part
    ? buildSparePartWhatsAppMessage({
        part: part.partName,
        partNumber: part.partNumber,
        compatibleVehicle: part.compatibleVehicles.join(', ')
      })
    : 'Hello VANGUARD Motors & Parts, I would like to make an enquiry about this item.';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#121826] border border-[#232c40] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 my-8 print:border-none print:shadow-none print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0e1422] border-b border-[#1f283d] print:hidden">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
              isVehicle ? 'bg-[#ea580c]/10 text-[#ea580c] border border-[#ea580c]/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
            }`}>
              {isVehicle ? 'Automobile Showroom' : 'Precision Spare Part'}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              REF: {item.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleCopyCode}
              title="Copy Reference"
              className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-[#161c2b] text-slate-300 hover:text-white hover:bg-[#1f273b] transition-colors flex items-center justify-center"
            >
              {copiedCode ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handlePrintDossier}
              title="Print Specs"
              className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-[#161c2b] text-slate-300 hover:text-white hover:bg-[#1f273b] transition-colors flex items-center justify-center hidden sm:flex"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-[#161c2b] text-slate-300 hover:text-white hover:bg-[#1f273b] transition-colors flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* Top Gallery & Quick Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Gallery (Left Column) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-[#21293c]">
                <img
                  src={item.images[activeImageIndex] || (isVehicle ? DEFAULT_VEHICLE_IMAGE : DEFAULT_SPARE_PART_IMAGE)}
                  alt={isVehicle ? vehicle?.title : part?.partName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = isVehicle ? DEFAULT_VEHICLE_IMAGE : DEFAULT_SPARE_PART_IMAGE;
                  }}
                />
                {/* Condition Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                  {item.condition}
                </div>
              </div>

              {/* Thumbnails */}
              {item.images.length > 1 && (
                <div className="flex gap-2">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#ea580c] scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing, Status & Identity (Right Column) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-[#0e1422] p-5 rounded-xl border border-[#1d263b]">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#ea580c]">
                  {isVehicle ? `${vehicle?.manufacturer} • Model Year ${vehicle?.year}` : `Category: ${part?.category}`}
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
                  {isVehicle ? vehicle?.title : part?.partName}
                </h2>
                
                {isVehicle ? (
                  <div className="text-xs text-slate-400 mt-1">
                    Body Style: <span className="text-slate-200 font-medium">{vehicle?.bodyStyle}</span>
                    <span className="mx-2">•</span>
                    Trim: <span className="text-slate-200 font-medium">{vehicle?.trim}</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 mt-1">
                    Part Number: <span className="text-[#ea580c] font-mono font-medium">{part?.partNumber}</span>
                  </div>
                )}

                {/* Price Display in Naira */}
                <div className="mt-4 p-3.5 bg-[#141a29] rounded-lg border border-[#212b40]">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">
                    Pricing (Lagos, Nigeria)
                  </div>
                  <div className="text-2xl font-bold text-white font-mono-spec mt-0.5">
                    {item.priceDisplay}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Status: <span className="text-[#ea580c] font-semibold">{item.availabilityStatus}</span>
                  </div>
                </div>

                {/* Nigerian Verification Trust Note */}
                <div className="mt-3 p-2.5 rounded-lg bg-[#141a29] border border-[#20293d] text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#ea580c]" />
                    <span>{isVehicle ? 'Inspection & Delivery Support' : 'Fitment & Compatibility Assurance'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {isVehicle 
                      ? 'Physical vehicle inspections can be arranged by appointment at our Lagos facility. Nationwide transport coordination available.'
                      : 'Provide your vehicle chassis / VIN or engine code to verify technical fitment before dispatch to your location in Nigeria.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  id="modal-direct-enquire-btn"
                  onClick={() => {
                    onClose();
                    onEnquire(item);
                  }}
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#ea580c]/25 transition-all hover:scale-[1.01]"
                >
                  <span>{isVehicle ? 'Enquire About This Vehicle' : 'Enquire About This Part'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {isWhatsAppActive() ? (
                  <a
                    href={generateWhatsAppLink(whatsAppMessage)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#14532d]/60 hover:bg-[#166534] text-[#4ade80] hover:text-white font-semibold text-xs border border-[#166534] transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Continue on WhatsApp</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onEnquire(item);
                    }}
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#161c2b] hover:bg-[#20283d] text-slate-300 hover:text-white font-semibold text-xs border border-[#232c40] transition-all"
                  >
                    <span>Contact VANGUARD</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Overview Description */}
          <div className="bg-[#0e1422] p-5 rounded-xl border border-[#1d263b]">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#ea580c]" />
              <span>Specification Overview</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Vehicle Specific Details or Spare Part Specific Details */}
          {isVehicle && vehicle && (
            <div className="bg-[#0e1422] p-5 rounded-xl border border-[#1d263b] space-y-4">
              <h3 className="font-heading text-sm uppercase font-bold tracking-wider text-[#ea580c] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ea580c]" />
                <span>Vehicle Powertrain &amp; Drivetrain Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#141a29] border border-[#20293d]">
                  <span className="text-slate-400 block text-[11px]">Engine / Powertrain</span>
                  <span className="text-white font-semibold mt-0.5 block">{vehicle.engine}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#141a29] border border-[#20293d]">
                  <span className="text-slate-400 block text-[11px]">Horsepower</span>
                  <span className="text-white font-semibold mt-0.5 block">{vehicle.horsepower}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#141a29] border border-[#20293d]">
                  <span className="text-slate-400 block text-[11px]">Transmission</span>
                  <span className="text-white font-semibold mt-0.5 block">{vehicle.transmission}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#141a29] border border-[#20293d]">
                  <span className="text-slate-400 block text-[11px]">Fuel / Energy Type</span>
                  <span className="text-white font-semibold mt-0.5 block">{vehicle.fuelType}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#141a29] border border-[#20293d]">
                  <span className="text-slate-400 block text-[11px]">Drivetrain</span>
                  <span className="text-white font-semibold mt-0.5 block">{vehicle.drivetrain}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#141a29] border border-[#20293d]">
                  <span className="text-slate-400 block text-[11px]">Odometer / Mileage</span>
                  <span className="text-white font-semibold mt-0.5 block">{vehicle.mileage}</span>
                </div>
              </div>
            </div>
          )}

          {/* Technical Specifications Table */}
          <div className="bg-[#0e1422] p-5 rounded-xl border border-[#1d263b]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-sm uppercase font-bold tracking-wider text-[#ea580c] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#ea580c]" />
                <span>Technical Specifications</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                {isVehicle ? `${vehicle?.manufacturer} ${vehicle?.model}` : `PART #${part?.partNumber}`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {isVehicle && vehicle
                ? vehicle.keySpecifications.map((spec, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#141a29] border border-[#20293d] text-xs"
                    >
                      <span className="text-slate-400 font-medium">{spec.label}</span>
                      <span className="text-white font-semibold text-right ml-3 font-mono-spec">
                        {spec.value}
                      </span>
                    </div>
                  ))
                : part?.specifications.map((spec, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#141a29] border border-[#20293d] text-xs"
                    >
                      <span className="text-slate-400 font-medium">{spec.label}</span>
                      <span className="text-white font-semibold text-right ml-3 font-mono-spec">
                        {spec.value}
                      </span>
                    </div>
                  ))}
            </div>
          </div>

          {/* Fitment Compatibility for Precision Spares */}
          {!isVehicle && part && part.compatibleVehicles.length > 0 && (
            <div className="bg-[#0e1422] p-5 rounded-xl border border-[#1d263b] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#ea580c] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#ea580c]" />
                  <span>Compatible Vehicles</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  {part.compatibleVehicles.length} Verified Applications
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {part.compatibleVehicles.map((model, idx) => {
                  const makes = ['Mercedes-Benz', 'Toyota', 'Honda', 'BMW', 'Tesla', 'Nissan', 'Ford', 'Lexus'];
                  let make = '';
                  let remainder = model;
                  for (const m of makes) {
                    if (model.startsWith(m)) {
                      make = m;
                      remainder = model.slice(m.length).trim();
                      break;
                    }
                  }

                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#141a29] text-xs border border-[#232c40] flex items-center gap-2"
                    >
                      {make ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-white">{make}</span>
                          <span className="text-[#ea580c] font-bold">→</span>
                          <span className="text-slate-300 font-medium">{remainder}</span>
                        </div>
                      ) : (
                        <span className="text-slate-300 font-medium">{model}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-400 bg-[#090e1a] p-2.5 rounded-lg border border-[#1a2336] leading-relaxed">
                <strong className="text-slate-300">Fitment Notice:</strong> Compatibility reflects existing records. Fitment verification is conducted per vehicle chassis/VIN prior to dispatch. We do not claim universal compatibility across unlisted models.
              </p>
            </div>
          )}

          {/* Enquiry Guidance Notice */}
          <div className="p-4 rounded-xl bg-[#141a29] border border-[#20293d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-white">Need fitment verification or an inspection appointment?</span>
              <p className="text-slate-400 mt-0.5">
                Our Lagos desk confirms exact compatibility with your vehicle model and provides delivery times.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onEnquire(item);
              }}
              className="px-4 py-2 rounded-lg bg-[#ea580c] hover:bg-[#f97316] text-white font-semibold shrink-0 transition-colors"
            >
              {isVehicle ? 'Enquire About This Vehicle' : 'Enquire About This Part'}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0e1422] border-t border-[#1f283d]">
          <span className="text-xs text-slate-400 text-center sm:text-left">
            {BUSINESS_CONFIG.businessName} • {BUSINESS_CONFIG.location}
          </span>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#1a2336] border border-[#222c42] sm:border-transparent transition-colors flex items-center justify-center"
            >
              Return to Catalogue
            </button>
            <button
              id="modal-footer-enquire-btn"
              onClick={() => {
                onClose();
                onEnquire(item);
              }}
              className="flex-1 sm:flex-none min-h-[44px] px-5 py-2 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center"
            >
              {isVehicle ? 'Enquire Now' : 'Enquire Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
