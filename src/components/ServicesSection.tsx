import { 
  Car, 
  Wrench, 
  ShieldCheck, 
  Search, 
  Cpu, 
  SlidersHorizontal, 
  Briefcase, 
  Sparkles, 
  Truck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { EnquiryType } from '../types';
import { BUSINESS_CONFIG } from '../config/business';

interface ServicesSectionProps {
  onSelectServiceEnquiry: (serviceName: string, type: EnquiryType) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  enquiryType: EnquiryType;
  icon: any;
  highlight?: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'veh-sales',
    title: '1. Vehicle Sales & Import Allocation',
    description: 'Procurement and sales of verified brand new and foreign-used (Tokunbo) automobiles with physical inspection available in Lagos.',
    enquiryType: 'Vehicle Enquiry',
    icon: Car,
    highlight: 'Inspections in Lagos'
  },
  {
    id: 'spares-sourcing',
    title: '2. Spare Parts Sourcing',
    description: 'Rapid identification and supply of OEM, original factory replacement, and quality aftermarket parts across automotive brands.',
    enquiryType: 'Spare Parts Enquiry',
    icon: Wrench,
    highlight: 'OEM & Aftermarket'
  },
  {
    id: 'fitment-assist',
    title: '3. Parts Fitment Assistance',
    description: 'Expert compatibility verification using VIN, chassis numbers, engine codes and trim variants before purchasing.',
    enquiryType: 'Compatibility / Fitment Enquiry',
    icon: ShieldCheck,
    highlight: 'Chassis / VIN Matching'
  },
  {
    id: 'veh-inspection',
    title: '4. Vehicle Inspection Coordination',
    description: 'Structured pre-purchase multi-point physical inspections and body/mechanical checks arranged by appointment in Lagos.',
    enquiryType: 'Vehicle Enquiry',
    icon: Search,
    highlight: 'By Appointment in Lagos'
  },
  {
    id: 'veh-diagnostics',
    title: '5. Vehicle Diagnostics Consultation',
    description: 'Support with diagnostic error codes, sensor readings, and specialized component troubleshooting for modern vehicles.',
    enquiryType: 'Service Enquiry',
    icon: Cpu,
    highlight: 'Troubleshooting Guidance'
  },
  {
    id: 'maintenance-support',
    title: '6. Maintenance Support & Coordination',
    description: 'Routine servicing parts packages (fluids, filters, brake pads, plugs) coordinated with trusted technician networks.',
    enquiryType: 'Service Enquiry',
    icon: SlidersHorizontal,
    highlight: 'Servicing Kits'
  },
  {
    id: 'fleet-corporate',
    title: '7. Fleet & Corporate Vehicle Support',
    description: 'Tailored scheduled parts replenishment and bulk procurement agreements for logistics companies and corporate fleets.',
    enquiryType: 'Parts Sourcing',
    icon: Briefcase,
    highlight: 'B2B & Fleet Terms'
  },
  {
    id: 'special-parts',
    title: '8. Special & Rare Parts Procurement',
    description: 'Targeted sourcing for hard-to-find European, electric vehicle, hybrid and luxury automobile mechanical components.',
    enquiryType: 'Parts Sourcing',
    icon: Sparkles,
    highlight: 'European & Hybrid Focus'
  },
  {
    id: 'nationwide-delivery',
    title: '9. Nationwide Parts Delivery',
    description: 'Fast, secure dispatch from our Lagos hub to all 36 states and the Federal Capital Territory (Abuja) via trusted logistics partners.',
    enquiryType: 'Delivery',
    icon: Truck,
    highlight: 'Lagos & Interstate Delivery'
  }
];

export default function ServicesSection({ onSelectServiceEnquiry }: ServicesSectionProps) {
  return (
    <section id="services-section" className="py-16 bg-[#0a0f1d] border-b border-[#182133]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#ea580c] uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>Automotive Solutions</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
            Our Automotive Services in Nigeria
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            From vehicle acquisition and verification to genuine spare parts sourcing and nationwide delivery, {BUSINESS_CONFIG.businessName} supports private car owners, workshops, and business fleets.
          </p>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((srv) => {
            const IconComp = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-[#111726] border border-[#1f283d] hover:border-[#ea580c]/40 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#172033] border border-[#232f48] flex items-center justify-center text-[#ea580c] group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    {srv.highlight && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#1c2438] text-slate-300 border border-[#27324b]">
                        {srv.highlight}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-base font-bold text-white group-hover:text-[#ea580c] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1a2336] flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Need this service?
                  </span>
                  <button
                    onClick={() => onSelectServiceEnquiry(srv.title, srv.enquiryType)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141a29] hover:bg-[#1a2336] text-xs font-bold text-[#ea580c] hover:text-[#f97316] border border-[#232c40] transition-colors"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Factual Disclaimer */}
        <div className="bg-[#0e1424] border border-[#1b253b] rounded-xl p-4 text-xs text-slate-400 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0" />
          <p>
            <strong>Operational note:</strong> Sourcing, inspection, and diagnostics support are coordinated through our verified technical specialists and automotive partner network in Lagos and key commercial hubs.
          </p>
        </div>
      </div>
    </section>
  );
}
