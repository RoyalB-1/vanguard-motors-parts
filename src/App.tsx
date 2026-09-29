import React, { useState, useMemo } from 'react';
import { SAMPLE_VEHICLES, SAMPLE_SPARE_PARTS, INITIAL_SAMPLE_ENQUIRIES, DEFAULT_SPARE_PART_IMAGE, DEFAULT_VEHICLE_IMAGE } from './data/mockCatalogue';
import { CatalogueItem, VehicleRecord, SparePartRecord, EnquirySubmission, PartRequestSubmission, NavigationPage, EnquiryType } from './types';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VehiclePartFinder from './components/VehiclePartFinder';
import ServicesSection from './components/ServicesSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhyChooseSection from './components/WhyChooseSection';
import DeliverySection from './components/DeliverySection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import VehicleShowroom from './components/VehicleShowroom';
import SparePartsCatalogue from './components/SparePartsCatalogue';
import AllInventoryCatalogue from './components/AllInventoryCatalogue';
import ProductDetailModal from './components/ProductDetailModal';
import EnquiryModal from './components/EnquiryModal';
import RequestPartModal from './components/RequestPartModal';
import EnquiryDrawer from './components/EnquiryDrawer';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import { 
  BUSINESS_CONFIG, 
  generateWhatsAppLink, 
  isWhatsAppActive, 
  isPhoneActive, 
  generateTelLink 
} from './config/business';
import { 
  Car, 
  Wrench, 
  ArrowRight, 
  Eye, 
  CheckCircle2, 
  Phone, 
  MessageSquare
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(INITIAL_SAMPLE_ENQUIRIES);
  const [partRequests, setPartRequests] = useState<PartRequestSubmission[]>([]);

  // Modals & Drawers
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<CatalogueItem | null>(null);
  const [selectedItemForEnquiry, setSelectedItemForEnquiry] = useState<CatalogueItem | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isRequestPartModalOpen, setIsRequestPartModalOpen] = useState(false);
  const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] = useState(false);

  // Pre-filled modal options
  const [initialEnquiryType, setInitialEnquiryType] = useState<EnquiryType | undefined>(undefined);
  const [initialEnquirySubject, setInitialEnquirySubject] = useState<string | undefined>(undefined);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Navigation handler
  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modals handlers
  const handleOpenInspect = (item: CatalogueItem) => {
    setSelectedItemForDetail(item);
  };

  const handleOpenEnquire = (item: CatalogueItem) => {
    setSelectedItemForEnquiry(item);
    setInitialEnquiryType(item.type === 'vehicle' ? 'Vehicle Enquiry' : 'Spare Part Enquiry');
    setInitialEnquirySubject(undefined);
    setIsEnquiryModalOpen(true);
  };

  const handleOpenGeneralEnquiry = (type?: EnquiryType, subject?: string) => {
    setSelectedItemForEnquiry(null);
    setInitialEnquiryType(type || 'General Enquiry');
    setInitialEnquirySubject(subject || 'General Automotive Enquiry');
    setIsEnquiryModalOpen(true);
  };

  const handleOpenCustomSourcing = (initialSubject?: string) => {
    setSelectedItemForEnquiry(null);
    setInitialEnquiryType('Custom Part Sourcing');
    setInitialEnquirySubject(initialSubject || 'Custom Spare Part Sourcing');
    setIsEnquiryModalOpen(true);
  };

  const handleSubmitEnquiry = (newEnquiry: EnquirySubmission) => {
    setEnquiries((prev) => [newEnquiry, ...prev]);
    showToast(`Enquiry prepared successfully! Reference: ${newEnquiry.referenceNumber}`);
  };

  const handleSubmitPartRequest = (request: PartRequestSubmission) => {
    setPartRequests((prev) => [request, ...prev]);
    showToast(`Part sourcing request submitted! Reference: ${request.referenceNumber}`);
  };

  // Featured items for Homepage preview
  const featuredVehicles = useMemo(() => {
    return SAMPLE_VEHICLES.slice(0, 3);
  }, []);

  const featuredParts = useMemo(() => {
    return SAMPLE_SPARE_PARTS.slice(0, 4);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white flex flex-col selection:bg-[#ea580c] selection:text-white font-sans antialiased">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm p-4 bg-[#121826] border border-[#ea580c] rounded-xl shadow-2xl shadow-black/80 flex items-center gap-3 animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-[#14532d] text-[#4ade80] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-200">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Main Header with Navigation */}
      <Header
        activePage={currentPage}
        onNavigate={handleNavigate}
        enquiriesCount={enquiries.length}
        onOpenEnquiries={() => setIsEnquiryDrawerOpen(true)}
        onOpenGeneralEnquiry={() => handleOpenGeneralEnquiry('General Enquiry')}
        onOpenRequestPart={() => handleOpenCustomSourcing()}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* ========================================================= */}
        {/* PAGE 1: HOME PAGE                                         */}
        {/* ========================================================= */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onNavigate={handleNavigate}
              onOpenGeneralEnquiry={() => handleOpenGeneralEnquiry('General Enquiry')}
            />

            {/* Quick Vehicle & Parts Finder Bar */}
            <section className="relative -mt-8 sm:-mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <VehiclePartFinder
                vehicles={SAMPLE_VEHICLES}
                parts={SAMPLE_SPARE_PARTS}
                onSearchVehicles={(_filters) => {
                  handleNavigate('vehicles');
                }}
                onSearchParts={(_filters) => {
                  handleNavigate('spare_parts');
                }}
                onRequestPart={() => handleOpenCustomSourcing()}
              />
            </section>

            {/* FEATURED VEHICLES SHOWCASE */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-2">
                    <Car className="w-4 h-4 text-[#ea580c]" />
                    <span>Sample Vehicle Inventory</span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                    Featured Premium &amp; Reliable Vehicles
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                    Explore vehicle specifications, pricing in Nigerian Naira, and inspection coordination in Lagos.
                  </p>
                </div>

                <button
                  id="home-view-all-vehicles"
                  onClick={() => handleNavigate('vehicles')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#141a29] hover:bg-[#1a2336] text-[#ea580c] hover:text-white border border-[#222c42] hover:border-[#ea580c] text-xs font-bold transition-all self-start md:self-auto shadow-md"
                >
                  <span>Explore All {SAMPLE_VEHICLES.length} Vehicles</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Featured Vehicles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {featuredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="group bg-[#121826] hover:bg-[#151c2d] border border-[#20293d] hover:border-[#ea580c]/60 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div 
                      className="relative h-56 bg-[#090d18] overflow-hidden cursor-pointer"
                      onClick={() => handleOpenInspect(vehicle)}
                    >
                      <img
                        src={vehicle.images[0]}
                        alt={vehicle.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_VEHICLE_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-transparent to-black/40" />

                      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                        <span className="px-2.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase shadow-md bg-[#ea580c] text-white">
                          {vehicle.manufacturer}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/70 backdrop-blur-md text-slate-200 border border-white/10">
                          {vehicle.year}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
                        <div className="bg-[#0f1422]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#242e44]">
                          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                            Price (Lagos, ₦)
                          </div>
                          <div className="text-base font-bold text-white font-mono-spec">
                            {vehicle.priceDisplay}
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-md bg-[#14532d]/90 text-[#4ade80] text-[10px] font-bold border border-[#166534]">
                          {vehicle.availabilityStatus}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          onClick={() => handleOpenInspect(vehicle)}
                          className="font-heading text-lg font-bold text-white hover:text-[#ea580c] transition-colors cursor-pointer line-clamp-1"
                        >
                          {vehicle.title}
                        </h3>

                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {vehicle.description}
                        </p>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded bg-[#0b101d] border border-[#1a2336]">
                            <span className="text-slate-400 block text-[10px]">Powertrain</span>
                            <span className="text-white font-medium truncate block">{vehicle.engine}</span>
                          </div>
                          <div className="p-2 rounded bg-[#0b101d] border border-[#1a2336]">
                            <span className="text-slate-400 block text-[10px]">Transmission</span>
                            <span className="text-white font-medium truncate block">{vehicle.transmission}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-[#1d263b] grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOpenInspect(vehicle)}
                          className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#182133] hover:bg-[#202b40] text-slate-200 text-xs font-semibold border border-[#2a3650] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          <span>Specs</span>
                        </button>

                        <button
                          onClick={() => handleOpenEnquire(vehicle)}
                          className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold shadow-md shadow-[#ea580c]/20 transition-all hover:scale-[1.02]"
                        >
                          <span>Enquire</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FEATURED PRECISION SPARE PARTS */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#0d1220]/60 rounded-3xl border border-[#1b2336]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-2">
                    <Wrench className="w-4 h-4 text-[#ea580c]" />
                    <span>Sample Spare Parts Catalogue</span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                    Precision Automotive Spare Parts
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                    Precision replacement and OEM specification parts for Toyota, Mercedes-Benz, BMW, Honda, and electric platforms.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenCustomSourcing()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#182133] hover:bg-[#202b40] text-slate-200 border border-[#28354f] text-xs font-bold transition-all"
                  >
                    <span>Request Unlisted Part</span>
                  </button>

                  <button
                    id="home-view-all-parts"
                    onClick={() => handleNavigate('spare_parts')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold shadow-md shadow-[#ea580c]/25 transition-all"
                  >
                    <span>View All {SAMPLE_SPARE_PARTS.length} Parts</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 4 Featured Parts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredParts.map((part) => (
                  <div
                    key={part.id}
                    className="group bg-[#121826] hover:bg-[#151c2d] border border-[#20293d] hover:border-[#ea580c]/60 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div
                      className="relative h-48 bg-[#090d18] overflow-hidden cursor-pointer"
                      onClick={() => handleOpenInspect(part)}
                    >
                      <img
                        src={part.images[0]}
                        alt={part.partName}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_SPARE_PART_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-transparent to-black/30" />

                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#1e293b] text-white border border-[#334155]">
                          {part.category}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between pointer-events-none">
                        <div className="bg-[#0f1422]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#242e44]">
                          <div className="text-[9px] text-slate-400 uppercase tracking-wider">
                            Price (₦)
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-white font-mono-spec">
                            {part.priceDisplay}
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-[#ea580c] bg-black/70 px-2 py-0.5 rounded">
                          {part.partNumber}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          {part.manufacturerBrand}
                        </div>
                        <h4
                          onClick={() => handleOpenInspect(part)}
                          className="font-heading text-sm font-bold text-white hover:text-[#ea580c] transition-colors line-clamp-1 cursor-pointer mt-0.5"
                        >
                          {part.partName}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                          {part.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#1d263b] grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOpenInspect(part)}
                          className="min-h-[44px] px-2.5 py-1.5 rounded-xl bg-[#182133] hover:bg-[#202b40] text-slate-200 text-xs font-semibold border border-[#28354f] transition-colors flex items-center justify-center"
                        >
                          Fitment
                        </button>
                        <button
                          onClick={() => handleOpenEnquire(part)}
                          className="min-h-[44px] px-2.5 py-1.5 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold shadow-sm transition-all text-center flex items-center justify-center"
                        >
                          Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SERVICES SECTION */}
            <ServicesSection
              onSelectServiceEnquiry={(serviceName, type) => {
                handleOpenGeneralEnquiry(type, `${serviceName} Consultation`);
              }}
            />

            {/* HOW IT WORKS */}
            <HowItWorksSection
              onOpenEnquiry={() => handleOpenGeneralEnquiry('General Enquiry')}
            />

            {/* WHY CHOOSE VANGUARD */}
            <WhyChooseSection />

            {/* DELIVERY & LOGISTICS */}
            <DeliverySection onOpenEnquiry={() => handleOpenGeneralEnquiry('Delivery')} />

            {/* DIRECT CALL TO ACTION BANNER */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="relative rounded-3xl bg-gradient-to-r from-[#141b2c] via-[#111728] to-[#19152a] border border-[#29344d] p-8 sm:p-12 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-2xl space-y-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#ea580c]/20 text-[#ea580c] border border-[#ea580c]/30">
                    Direct Automotive Assistance
                  </span>
                  <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                    Need a Specific Vehicle or Hard-to-Find Spare Part in Nigeria?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Our Lagos procurement team sources genuine auto parts directly from licensed distributors in Japan, Germany, and the USA. Speak with our specialists today.
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
                    {isWhatsAppActive() ? (
                      <a
                        href={generateWhatsAppLink(`Hello ${BUSINESS_CONFIG.businessName}, I would like to make an enquiry regarding automotive inventory and parts sourcing.`)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-6 py-3 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#16a34a]/30 transition-all hover:scale-[1.02]"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => handleOpenGeneralEnquiry('General Enquiry')}
                        className="min-h-[44px] px-6 py-3 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#ea580c]/30 transition-all hover:scale-[1.02]"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Enquire Now</span>
                      </button>
                    )}

                    {isPhoneActive() ? (
                      <a
                        href={generateTelLink()!}
                        className="min-h-[44px] px-5 py-3 rounded-xl bg-[#1c2438] hover:bg-[#25304a] text-white font-semibold text-xs sm:text-sm border border-[#2d3a57] flex items-center justify-center gap-2 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-[#ea580c]" />
                        <span>Call {BUSINESS_CONFIG.phone}</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => handleNavigate('contact')}
                        className="min-h-[44px] px-5 py-3 rounded-xl bg-[#1c2438] hover:bg-[#25304a] text-white font-semibold text-xs sm:text-sm border border-[#2d3a57] flex items-center justify-center gap-2 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-[#ea580c]" />
                        <span>Contact {BUSINESS_CONFIG.businessName}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenCustomSourcing()}
                      className="min-h-[44px] px-5 py-3 rounded-xl bg-[#141a29] hover:bg-[#1f283d] text-slate-200 hover:text-white font-bold text-xs sm:text-sm border border-[#26344d] shadow-md transition-all flex items-center justify-center"
                    >
                      Request Custom Part Sourcing
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 1.5: ALL INVENTORY CATALOGUE                         */}
        {/* ========================================================= */}
        {currentPage === 'all_inventory' && (
          <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
            <AllInventoryCatalogue
              vehicles={SAMPLE_VEHICLES}
              parts={SAMPLE_SPARE_PARTS}
              onInspect={handleOpenInspect}
              onEnquire={handleOpenEnquire}
              onRequestPart={() => handleOpenCustomSourcing()}
              onGeneralEnquiry={() => handleOpenGeneralEnquiry('General Enquiry')}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 2: VEHICLES CATALOGUE                                */}
        {/* ========================================================= */}
        {currentPage === 'vehicles' && (
          <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Showroom Component */}
            <VehicleShowroom
              vehicles={SAMPLE_VEHICLES}
              onInspect={handleOpenInspect}
              onEnquire={handleOpenEnquire}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 3: SPARE PARTS CATALOGUE                             */}
        {/* ========================================================= */}
        {currentPage === 'spare_parts' && (
          <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Quick Sourcing Request Banner */}
            <div className="bg-[#121826] border border-[#242e44] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#ea580c]/15 border border-[#ea580c]/30 flex items-center justify-center text-[#ea580c] shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-white">
                    Can't find your exact part number or vehicle trim?
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Submit your vehicle model, chassis/VIN, or part description. Our Lagos sourcing desk will quote you within 24 hours.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleOpenCustomSourcing()}
                className="px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs shrink-0 shadow-lg shadow-[#ea580c]/25 transition-all hover:scale-[1.02]"
              >
                Request Custom Part Sourcing
              </button>
            </div>

            {/* Precision Parts Catalogue */}
            <SparePartsCatalogue
              parts={SAMPLE_SPARE_PARTS}
              onInspect={handleOpenInspect}
              onEnquire={handleOpenEnquire}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 4: SERVICES                                          */}
        {/* ========================================================= */}
        {currentPage === 'services' && (
          <div className="animate-fade-in">
            {/* Page Header */}
            <div className="bg-[#0e1424] border-b border-[#1c2438] py-12 px-4 sm:px-6 lg:px-8 text-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#ea580c]/20 text-[#ea580c] border border-[#ea580c]/30">
                Professional Automotive Solutions
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Automotive Services &amp; Logistics
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
                From vehicle acquisition and pre-purchase diagnostics to genuine parts importation and nationwide dispatch across Nigeria.
              </p>
            </div>

            <ServicesSection
              onSelectServiceEnquiry={(serviceName, type) => {
                handleOpenGeneralEnquiry(type, `${serviceName} Consultation`);
              }}
            />

            <DeliverySection onOpenEnquiry={() => handleOpenGeneralEnquiry('Delivery')} />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 5: ABOUT                                             */}
        {/* ========================================================= */}
        {currentPage === 'about' && (
          <div className="animate-fade-in">
            {/* Page Header */}
            <div className="bg-[#0e1424] border-b border-[#1c2438] py-12 px-4 sm:px-6 lg:px-8 text-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#ea580c]/20 text-[#ea580c] border border-[#ea580c]/30">
                Lagos Automotive Leaders
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-3">
                About VANGUARD Motors &amp; Parts
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
                Delivering verified vehicles and original spare parts across Nigeria with unwavering transparency, precision, and technical integrity.
              </p>
            </div>

            <AboutSection
              onNavigate={handleNavigate}
              onOpenEnquiry={() => handleOpenGeneralEnquiry('General Enquiry')}
            />

            <WhyChooseSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 6: CONTACT                                           */}
        {/* ========================================================= */}
        {currentPage === 'contact' && (
          <div className="animate-fade-in">
            <ContactSection
              onSubmitEnquiry={handleSubmitEnquiry}
              onOpenEnquiryModal={(type, subject) => handleOpenGeneralEnquiry(type, subject)}
            />
          </div>
        )}
      </main>

      {/* Persistent Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenGeneralEnquiry={() => handleOpenGeneralEnquiry('General Enquiry')}
        onOpenRequestPart={() => handleOpenCustomSourcing()}
      />

      {/* Floating 24/7 WhatsApp Support / Contact Button */}
      <WhatsAppButton onOpenEnquiry={() => handleOpenGeneralEnquiry('General Enquiry')} />

      {/* ========================================================= */}
      {/* MODALS & DRAWERS                                          */}
      {/* ========================================================= */}

      {/* Product Detail Modal */}
      {selectedItemForDetail && (
        <ProductDetailModal
          item={selectedItemForDetail}
          onClose={() => setSelectedItemForDetail(null)}
          onEnquire={handleOpenEnquire}
          onRequestSourcing={() => {
            const initialInfo = selectedItemForDetail
              ? selectedItemForDetail.type === 'vehicle'
                ? `${(selectedItemForDetail as any).manufacturer} ${(selectedItemForDetail as any).model}`
                : (selectedItemForDetail as any).partName
              : undefined;
            setSelectedItemForDetail(null);
            handleOpenCustomSourcing(initialInfo);
          }}
        />
      )}

      {/* General Automotive Enquiry Modal */}
      {isEnquiryModalOpen && (
        <EnquiryModal
          isOpen={isEnquiryModalOpen}
          item={selectedItemForEnquiry}
          initialEnquiryType={initialEnquiryType}
          initialSubject={initialEnquirySubject}
          onClose={() => {
            setIsEnquiryModalOpen(false);
            setSelectedItemForEnquiry(null);
            setInitialEnquiryType(undefined);
            setInitialEnquirySubject(undefined);
          }}
          onSubmitEnquiry={handleSubmitEnquiry}
          onNavigateToContact={() => handleNavigate('contact')}
        />
      )}

      {/* Request Unlisted Part Modal */}
      {isRequestPartModalOpen && (
        <RequestPartModal
          isOpen={isRequestPartModalOpen}
          onClose={() => setIsRequestPartModalOpen(false)}
          onSubmitRequest={handleSubmitPartRequest}
        />
      )}

      {/* My Enquiries Drawer */}
      {isEnquiryDrawerOpen && (
        <EnquiryDrawer
          isOpen={isEnquiryDrawerOpen}
          onClose={() => setIsEnquiryDrawerOpen(false)}
          enquiries={enquiries}
          onNewEnquiry={() => {
            setIsEnquiryDrawerOpen(false);
            handleOpenGeneralEnquiry('General Enquiry');
          }}
        />
      )}
    </div>
  );
}
