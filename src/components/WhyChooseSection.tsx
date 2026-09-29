import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

const TRUST_POINTS = [
  {
    title: 'Vehicle & Parts Enquiries',
    description: 'Direct, transparent handling of all inventory and custom sourcing queries via online forms or direct WhatsApp consultation.',
    icon: CheckCircle2
  },
  {
    title: 'Precision Fitment Assistance',
    description: 'We cross-reference part numbers, chassis codes, and engine specs before purchase to help you avoid buying incompatible components.',
    icon: ShieldCheck
  },
  {
    title: 'Responsive Customer Support',
    description: 'Our Lagos-based desk operates Monday through Saturday to promptly answer compatibility, pricing, and status questions.',
    icon: Clock
  },
  {
    title: 'Flexible Sourcing Options',
    description: 'Whether you prefer Brand New OEM, original Tokunbo, or cost-effective aftermarket parts, we clearly communicate condition and origin.',
    icon: Layers
  },
  {
    title: 'Lagos-Based Operational Hub',
    description: 'Physical vehicle inspections, order verifications, and parts collections are organized directly from our central Lagos base.',
    icon: MapPin
  },
  {
    title: 'Nigeria-Wide Delivery Options',
    description: 'Reliable doorstep dispatch within Lagos and structured interstate logistics to Abuja, Port Harcourt, Ibadan, Kano, and other states.',
    icon: Truck
  }
];

export default function WhyChooseSection() {
  return (
    <section className="py-16 bg-[#0a0f1d] border-b border-[#182133]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
            Clear Standards
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
            Why Choose {BUSINESS_CONFIG.businessName}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            We focus on technical accuracy, straightforward pricing in Naira, and verified fitment so you receive the right automotive solution every time.
          </p>
        </div>

        {/* 6 Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="bg-[#101626] border border-[#1e273d] rounded-2xl p-5 sm:p-6 space-y-3 shadow-md hover:border-[#ea580c]/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#172033] border border-[#222e46] flex items-center justify-center text-[#ea580c]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">
                  {point.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
