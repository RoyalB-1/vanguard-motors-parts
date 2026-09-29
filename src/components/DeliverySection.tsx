import { Truck, MapPin, PackageCheck, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { generateWhatsAppLink, isWhatsAppActive, BUSINESS_CONFIG } from '../config/business';

interface DeliverySectionProps {
  onOpenEnquiry: () => void;
}

export default function DeliverySection({ onOpenEnquiry }: DeliverySectionProps) {
  return (
    <section className="py-16 bg-[#080d19] border-b border-[#182133]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
            Nationwide Logistics
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
            Delivery Across Nigeria
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Whether you are ordering small electronic sensors or heavy engine components, we coordinate safe transit from our Lagos dispatch center to your preferred location.
          </p>
        </div>

        {/* 3 Delivery Modes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Option 1: Lagos Delivery */}
          <div className="bg-[#0e1424] border border-[#1e273d] rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#141b2c] border border-[#232f48] flex items-center justify-center text-[#ea580c]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Lagos Intra-State Delivery
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Same-day and next-day dispatch across Lagos Mainland (Ikeja, Surulere, Yaba, Festac, etc.) and Island (Victoria Island, Ikoyi, Lekki, Ajah).
              </p>
            </div>
            <div className="pt-3 border-t border-[#182135] text-[11px] text-[#ea580c] font-semibold">
              Courier &amp; Express Rider Dispatch
            </div>
          </div>

          {/* Option 2: Interstate Delivery */}
          <div className="bg-[#0e1424] border border-[#1e273d] rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#141b2c] border border-[#232f48] flex items-center justify-center text-[#ea580c]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Interstate Delivery
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reliable freight forwarding to Abuja FCT, Port Harcourt, Ibadan, Kano, Kaduna, Benin, Enugu, Asaba, and all other 36 states.
              </p>
            </div>
            <div className="pt-3 border-t border-[#182135] text-[11px] text-[#ea580c] font-semibold">
              Waybill &amp; Interstate Logistics Partners
            </div>
          </div>

          {/* Option 3: Lagos Hub Pickup */}
          <div className="bg-[#0e1424] border border-[#1e273d] rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#141b2c] border border-[#232f48] flex items-center justify-center text-[#ea580c]">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                Lagos Showroom Pickup
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Order confirmation and direct collection at our Lagos location. Allows your mechanic or representative to physically inspect before collection.
              </p>
            </div>
            <div className="pt-3 border-t border-[#182135] text-[11px] text-[#ea580c] font-semibold">
              By Appointment • Inspection Ready
            </div>
          </div>
        </div>

        {/* Factual Disclaimer Card */}
        <div className="bg-[#121828] border border-[#222c42] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#ea580c] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong>Delivery policy notice:</strong> Delivery time and cost depend on destination, item size and availability. We confirm exact delivery arrangements, timelines, and waybill numbers before dispatch.
            </div>
          </div>

          {isWhatsAppActive() && generateWhatsAppLink(`Hello ${BUSINESS_CONFIG.businessName}, I would like to enquire about delivery fees and timelines to my location.`) ? (
            <a
              href={generateWhatsAppLink(`Hello ${BUSINESS_CONFIG.businessName}, I would like to enquire about delivery fees and timelines to my location.`)!}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#14532d]/40 text-[#4ade80] border border-[#166534] text-xs font-bold shrink-0 flex items-center justify-center gap-1.5 self-start sm:self-center"
            >
              <span>Ask Delivery Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={onOpenEnquiry}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold shrink-0 flex items-center justify-center gap-1.5 self-start sm:self-center transition-colors"
            >
              <span>Enquire About Delivery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
