import { useState, useMemo } from 'react';
import { VehicleRecord } from '../types';
import { 
  Car, 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  Eye, 
  Fuel, 
  Gauge, 
  Zap, 
  Calendar, 
  Check, 
  Sparkles,
  ChevronRight,
  RotateCcw,
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface VehicleShowroomProps {
  vehicles: VehicleRecord[];
  onInspect: (vehicle: VehicleRecord) => void;
  onEnquire: (vehicle: VehicleRecord) => void;
}

const MANUFACTURERS = ['Tesla', 'BMW', 'Toyota', 'Mercedes-Benz', 'Honda'];

export default function VehicleShowroom({
  vehicles,
  onInspect,
  onEnquire
}: VehicleShowroomProps) {
  // Navigation Flow State: Manufacturer -> Models -> Selected Vehicle
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('all');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBodyStyle, setSelectedBodyStyle] = useState<string>('all');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'year-desc'>('default');

  // Models available for the selected manufacturer
  const availableModelsForSelectedMake = useMemo(() => {
    if (selectedManufacturer === 'all') return [];
    const models = new Set<string>();
    vehicles
      .filter((v) => v.manufacturer.toLowerCase() === selectedManufacturer.toLowerCase())
      .forEach((v) => models.add(v.model));
    return Array.from(models);
  }, [vehicles, selectedManufacturer]);

  // Handle selecting a manufacturer
  const handleSelectManufacturer = (make: string) => {
    setSelectedManufacturer(make);
    setSelectedModel('all'); // reset model selection when make changes
  };

  // Handle selecting a model
  const handleSelectModel = (model: string) => {
    setSelectedModel(model);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedManufacturer('all');
    setSelectedModel('all');
    setSearchQuery('');
    setSelectedBodyStyle('all');
    setSelectedFuelType('all');
    setSortBy('default');
  };

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // 1. Manufacturer filter
      if (selectedManufacturer !== 'all' && v.manufacturer.toLowerCase() !== selectedManufacturer.toLowerCase()) {
        return false;
      }

      // 2. Specific Model filter
      if (selectedModel !== 'all' && v.model.toLowerCase() !== selectedModel.toLowerCase()) {
        return false;
      }

      // 3. Body style filter
      if (selectedBodyStyle !== 'all' && v.bodyStyle !== selectedBodyStyle) {
        return false;
      }

      // 4. Fuel type filter
      if (selectedFuelType !== 'all' && v.fuelType !== selectedFuelType) {
        return false;
      }

      // 5. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = v.title.toLowerCase().includes(q);
        const matchesMake = v.manufacturer.toLowerCase().includes(q);
        const matchesModel = v.model.toLowerCase().includes(q);
        const matchesTrim = v.trim.toLowerCase().includes(q);
        const matchesEngine = v.engine.toLowerCase().includes(q);
        const matchesYear = v.year.toString().includes(q);
        const matchesBody = v.bodyStyle.toLowerCase().includes(q);

        if (!matchesTitle && !matchesMake && !matchesModel && !matchesTrim && !matchesEngine && !matchesYear && !matchesBody) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'price-desc') return b.priceNumeric - a.priceNumeric;
      if (sortBy === 'year-desc') return b.year - a.year;
      return 0;
    });
  }, [vehicles, selectedManufacturer, selectedModel, selectedBodyStyle, selectedFuelType, searchQuery, sortBy]);

  // If a single model is selected and there's an exact match, extract it for the featured vehicle highlight view
  const singleSelectedVehicle = useMemo(() => {
    if (selectedManufacturer !== 'all' && selectedModel !== 'all' && filteredVehicles.length === 1) {
      return filteredVehicles[0];
    }
    return null;
  }, [selectedManufacturer, selectedModel, filteredVehicles]);

  return (
    <div className="space-y-6">
      {/* Showroom Header & Flow Guidance */}
      <div className="bg-[#101625] border border-[#1e273c] rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c2438] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ea580c] uppercase tracking-wider mb-1">
              <Car className="w-4 h-4 text-[#ea580c]" />
              <span>Automobile Showroom • Lagos, Nigeria</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Manufacturer &amp; Model Showroom
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Select a manufacturer to explore models, or use filters to search by year, body style, and powertrain.
            </p>
          </div>

          {/* Inventory indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141a29] border border-[#232c40] text-xs self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
            <span className="text-slate-300 font-medium">Verified Vehicles</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-mono">{vehicles.length} Models Available</span>
          </div>
        </div>

        {/* STEP 1: Select Manufacturer */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Select Manufacturer:</span>
            </span>

            {selectedManufacturer !== 'all' && (
              <button
                onClick={() => handleSelectManufacturer('all')}
                className="text-xs text-[#ea580c] hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Show All Manufacturers</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            <button
              id="showroom-make-all"
              type="button"
              onClick={() => handleSelectManufacturer('all')}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedManufacturer === 'all'
                  ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-md shadow-[#ea580c]/30 font-bold'
                  : 'bg-[#141a29] text-slate-300 border-[#20293d] hover:border-[#ea580c]/50 hover:bg-[#182133]'
              }`}
            >
              <div className="text-xs font-semibold">All Makes</div>
              <div className="text-[10px] opacity-75 mt-0.5">{vehicles.length} Models</div>
            </button>

            {MANUFACTURERS.map((make) => {
              const count = vehicles.filter((v) => v.manufacturer.toLowerCase() === make.toLowerCase()).length;
              const isSelected = selectedManufacturer.toLowerCase() === make.toLowerCase();
              return (
                <button
                  key={make}
                  id={`showroom-make-${make.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  type="button"
                  onClick={() => handleSelectManufacturer(make)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-md shadow-[#ea580c]/30 font-bold scale-[1.02]'
                      : 'bg-[#141a29] text-slate-300 border-[#20293d] hover:border-[#ea580c]/50 hover:bg-[#182133]'
                  }`}
                >
                  <div className="text-xs font-semibold">{make}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{count} Models</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Select Model for the Chosen Manufacturer */}
        {selectedManufacturer !== 'all' && (
          <div className="mt-5 pt-4 border-t border-[#1c2438] animate-fade-in">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#ea580c] text-white flex items-center justify-center text-[10px]">2</span>
                <span>Select {selectedManufacturer} Model:</span>
              </span>

              {selectedModel !== 'all' && (
                <button
                  onClick={() => handleSelectModel('all')}
                  className="text-xs text-[#ea580c] hover:underline flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Show All {selectedManufacturer} Models</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                id="showroom-model-all"
                type="button"
                onClick={() => handleSelectModel('all')}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  selectedModel === 'all'
                    ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-sm font-semibold'
                    : 'bg-[#141a29] text-slate-300 border-[#20293d] hover:border-[#ea580c]/40 hover:text-white'
                }`}
              >
                All {selectedManufacturer} Models ({availableModelsForSelectedMake.length})
              </button>

              {availableModelsForSelectedMake.map((model) => {
                const isSelected = selectedModel.toLowerCase() === model.toLowerCase();
                return (
                  <button
                    key={model}
                    id={`showroom-model-${model.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    type="button"
                    onClick={() => handleSelectModel(model)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-sm font-semibold'
                        : 'bg-[#141a29] text-slate-300 border-[#20293d] hover:border-[#ea580c]/40 hover:text-white'
                    }`}
                  >
                    {selectedManufacturer} {model}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Breadcrumb Navigation Path */}
        <div className="mt-4 pt-3 border-t border-[#1c2438] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="font-semibold text-white">Showroom Path:</span>
            <span 
              onClick={() => handleSelectManufacturer('all')}
              className="text-[#ea580c] hover:underline cursor-pointer font-medium"
            >
              All Manufacturers
            </span>
            {selectedManufacturer !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                <span 
                  onClick={() => handleSelectModel('all')}
                  className="text-[#ea580c] hover:underline cursor-pointer font-medium"
                >
                  {selectedManufacturer}
                </span>
              </>
            )}
            {selectedModel !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-white font-bold">
                  {selectedModel}
                </span>
              </>
            )}
          </div>

          <div className="text-slate-400">
            Showing <strong className="text-white">{filteredVehicles.length}</strong> matching {filteredVehicles.length === 1 ? 'vehicle record' : 'vehicle records'}
          </div>
        </div>
      </div>

      {/* Search and Secondary Attribute Filters */}
      <div className="bg-[#0f1422] border border-[#1d263b] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="showroom-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by model, trim, year, or engine..."
            className="w-full min-h-[44px] pl-9 pr-4 py-2 bg-[#141a29] border border-[#222c40] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c]"
          />
        </div>

        {/* Filter: Body Style */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 shrink-0">Body Style:</span>
          <select
            id="showroom-body-select"
            value={selectedBodyStyle}
            onChange={(e) => setSelectedBodyStyle(e.target.value)}
            className="min-h-[44px] px-3 py-2 bg-[#141a29] border border-[#222c40] rounded-xl text-white focus:outline-none focus:border-[#ea580c]"
          >
            <option value="all">All Styles</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck / All-Terrain">Truck / All-Terrain</option>
          </select>
        </div>

        {/* Filter: Fuel Type */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 shrink-0">Powertrain:</span>
          <select
            id="showroom-fuel-select"
            value={selectedFuelType}
            onChange={(e) => setSelectedFuelType(e.target.value)}
            className="min-h-[44px] px-3 py-2 bg-[#141a29] border border-[#222c40] rounded-xl text-white focus:outline-none focus:border-[#ea580c]"
          >
            <option value="all">All Powertrains</option>
            <option value="Electric">Electric</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 shrink-0">Sort:</span>
          <select
            id="showroom-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="min-h-[44px] px-3 py-2 bg-[#141a29] border border-[#222c40] rounded-xl text-white focus:outline-none focus:border-[#ea580c]"
          >
            <option value="default">Default Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Year: Newest</option>
          </select>
        </div>

        {/* Reset button if any filter active */}
        {(searchQuery || selectedBodyStyle !== 'all' || selectedFuelType !== 'all' || selectedManufacturer !== 'all' || selectedModel !== 'all' || sortBy !== 'default') && (
          <button
            onClick={handleResetFilters}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#1a2133] hover:bg-[#222b40] text-slate-300 hover:text-white border border-[#252f46] transition-colors flex items-center justify-center"
          >
            Reset
          </button>
        )}
      </div>

      {/* SINGLE MODEL FOCUS VIEW: When user specifically selected a single model, display rich individual vehicle view */}
      {singleSelectedVehicle && (
        <div className="bg-[#121828] border border-[#ea580c]/50 rounded-2xl p-6 shadow-2xl shadow-black/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f283d] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-[#ea580c] text-white">
                  {singleSelectedVehicle.manufacturer} Showroom Allocation
                </span>
                <span className="text-xs font-mono font-semibold text-slate-300 bg-[#161c28] px-2.5 py-1 rounded border border-[#252f46]">
                  {singleSelectedVehicle.year} • {singleSelectedVehicle.trim}
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-2">
                {singleSelectedVehicle.title}
              </h3>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase font-medium">Price (Lagos, ₦)</div>
              <div className="font-mono text-2xl font-bold text-white font-mono-spec">
                {singleSelectedVehicle.priceDisplay}
              </div>
              <div className="text-xs text-[#4ade80] font-medium mt-0.5">
                {singleSelectedVehicle.availabilityStatus}
              </div>
            </div>
          </div>

          {/* Grid layout with Vehicle image & Detailed Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Vehicle Image */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-[#090d18] border border-[#1f283d]">
                <img
                  src={singleSelectedVehicle.images[0]}
                  alt={singleSelectedVehicle.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md text-xs font-semibold text-white">
                  {singleSelectedVehicle.manufacturer} {singleSelectedVehicle.model}
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-[#ea580c] text-white text-xs font-bold">
                  {singleSelectedVehicle.bodyStyle}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0e1422] p-4 rounded-xl border border-[#1d263b]">
                {singleSelectedVehicle.description}
              </p>
            </div>

            {/* Vehicle Specs Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#0e1422] p-4 rounded-xl border border-[#1d263b] space-y-3">
                <div className="text-xs uppercase font-bold text-[#ea580c] tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#ea580c]" />
                  <span>Powertrain &amp; Drivetrain Specifications</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded bg-[#141a29] border border-[#20293d]">
                    <span className="text-slate-400">Powertrain / Engine</span>
                    <span className="text-white font-medium text-right">{singleSelectedVehicle.engine}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-[#141a29] border border-[#20293d]">
                    <span className="text-slate-400">Horsepower</span>
                    <span className="text-white font-medium">{singleSelectedVehicle.horsepower}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-[#141a29] border border-[#20293d]">
                    <span className="text-slate-400">Transmission</span>
                    <span className="text-white font-medium">{singleSelectedVehicle.transmission}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-[#141a29] border border-[#20293d]">
                    <span className="text-slate-400">Drivetrain</span>
                    <span className="text-white font-medium">{singleSelectedVehicle.drivetrain}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-[#141a29] border border-[#20293d]">
                    <span className="text-slate-400">Mileage / Status</span>
                    <span className="text-white font-medium">{singleSelectedVehicle.mileage}</span>
                  </div>
                </div>
              </div>

              {/* Key Specs Highlights */}
              <div className="bg-[#0e1422] p-4 rounded-xl border border-[#1d263b] space-y-2">
                <div className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                  Key Model Highlights
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {singleSelectedVehicle.keySpecifications.map((spec, i) => (
                    <div key={i} className="p-2 rounded bg-[#141a29] border border-[#20293d]">
                      <div className="text-[10px] text-slate-400">{spec.label}</div>
                      <div className="text-white font-medium truncate" title={spec.value}>{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Call to Action: MAKE ENQUIRY */}
              <div className="pt-2 space-y-2">
                <button
                  id={`make-enquiry-focus-${singleSelectedVehicle.id}`}
                  onClick={() => onEnquire(singleSelectedVehicle)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-sm shadow-lg shadow-[#ea580c]/30 transition-all hover:scale-[1.01]"
                >
                  <span>MAKE ENQUIRY FOR {singleSelectedVehicle.model.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onInspect(singleSelectedVehicle)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#141a29] hover:bg-[#1a2336] text-slate-300 hover:text-white font-medium text-xs border border-[#222b40] transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Full Technical Dossier</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Vehicles */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-16 bg-[#101625] border border-[#1e273c] rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#182133] border border-[#2b354d] flex items-center justify-center mx-auto text-slate-400">
            <Car className="w-6 h-6 text-[#ea580c]" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">No Vehicles Match Criteria</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              No vehicles found matching the selected manufacturer, model, or filter combination.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ea580c] text-white text-xs font-semibold shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Showroom Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group flex flex-col bg-[#141a29] hover:bg-[#161e30] border border-[#20293d] hover:border-[#ea580c]/60 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
            >
              {/* Vehicle Image */}
              <div 
                className="relative h-52 sm:h-56 bg-[#0c101c] overflow-hidden cursor-pointer" 
                onClick={() => onInspect(vehicle)}
              >
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    // Safe automotive placeholder if network image fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#141a29] via-transparent to-black/50" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase shadow-md bg-[#ea580c] text-white">
                    {vehicle.manufacturer}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/70 backdrop-blur-md text-slate-200 border border-white/10">
                    {vehicle.bodyStyle}
                  </span>
                </div>

                {/* Bottom Image Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 pointer-events-none">
                  <div className="bg-[#0f1422]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#242e44]">
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      Price (₦)
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white font-mono-spec">
                      {vehicle.priceDisplay}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#14532d]/90 backdrop-blur-md text-[#4ade80] border border-[#166534] text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                    <span>{vehicle.fuelType}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider">
                      {vehicle.manufacturer} • {vehicle.year}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-[#ea580c] bg-[#ea580c]/10 px-2 py-0.5 rounded border border-[#ea580c]/20">
                      {vehicle.model}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onInspect(vehicle)}
                    className="font-heading text-lg font-bold text-white hover:text-[#ea580c] transition-colors line-clamp-1 cursor-pointer"
                    title={vehicle.title}
                  >
                    {vehicle.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {vehicle.description}
                  </p>

                  {/* Vehicle Spec Grid */}
                  <div className="mt-3.5 bg-[#0f1422] border border-[#1e2639] rounded-lg p-2.5 space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Powertrain:</span>
                      <span className="text-white font-medium truncate max-w-[170px]" title={vehicle.engine}>{vehicle.engine}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Horsepower:</span>
                      <span className="text-white font-medium">{vehicle.horsepower}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Drivetrain:</span>
                      <span className="text-white font-medium">{vehicle.drivetrain}</span>
                    </div>
                  </div>

                  {/* Demo status text */}
                  <div className="mt-2.5 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
                    <span>{vehicle.availabilityStatus}</span>
                  </div>
                </div>

                {/* Action Buttons: View Details & MAKE ENQUIRY */}
                <div className="mt-4 pt-3.5 border-t border-[#1e273b] grid grid-cols-2 gap-2">
                  <button
                    id={`inspect-veh-btn-${vehicle.id}`}
                    onClick={() => onInspect(vehicle)}
                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1c2333] hover:bg-[#232c40] text-slate-200 text-xs font-semibold border border-[#2b354d] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>Details</span>
                  </button>

                  <button
                    id={`enquire-veh-btn-${vehicle.id}`}
                    onClick={() => onEnquire(vehicle)}
                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-semibold shadow-md shadow-[#ea580c]/20 transition-all hover:scale-[1.02]"
                  >
                    <span>MAKE ENQUIRY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
