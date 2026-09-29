import { MessageSquare, ShieldCheck, CreditCard, PackageCheck, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenEnquiry: () => void;
}

const STEPS = [
  {
    num: '01',
    title: 'Tell Us What You Need',
    description: 'Submit an enquiry with your vehicle model, part number, or specific sourcing requirements through our website or WhatsApp.',
    icon: MessageSquare
  },
  {
    num: '02',
    title: 'We Confirm Availability & Fitment',
    description: 'Our technical specialists review compatibility using VIN/chassis specifications and confirm immediate stock or procurement timelines.',
    icon: ShieldCheck
  },
  {
    num: '03',
    title: 'We Confirm Price & Delivery',
    description: 'You receive a clear, upfront quote in Nigerian Naira (₦), along with delivery options for Lagos or interstate dispatch.',
    icon: CreditCard
  },
  {
    num: '04',
    title: 'Receive Your Vehicle or Part',
    description: 'Collect your order via Lagos showroom pickup, schedule an on-site physical vehicle inspection, or receive nationwide tracked delivery.',
    icon: PackageCheck
  }
];

export default function HowItWorksSection({ onOpenEnquiry }: HowItWorksSectionProps) {
  return (
    <section className="py-16 bg-[#080d19] border-b border-[#182133]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
            Simple 4-Step Process
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
            How It Works
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Whether you are ordering high-precision spare parts or enquiring about an automobile, our workflow is transparent and structured.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-[#0e1424] border border-[#1d273d] rounded-2xl p-6 shadow-md hover:border-[#ea580c]/40 transition-all flex flex-col justify-between"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-2xl font-black text-[#ea580c]/80">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#141b2d] border border-[#212c44] flex items-center justify-center text-[#ea580c]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <h3 className="font-heading text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-[#182136] border border-[#273450] flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="text-center pt-2">
          <button
            onClick={onOpenEnquiry}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs shadow-lg shadow-[#ea580c]/25 transition-all hover:scale-[1.02]"
          >
            <span>Start an Enquiry Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
