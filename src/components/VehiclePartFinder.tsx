import { useState, useMemo } from 'react';
import { Search, Car, Wrench, ArrowRight, Sparkles, Filter, RotateCcw } from 'lucide-react';
import { VehicleRecord, SparePartRecord, SparePartCategory } from '../types';

interface VehiclePartFinderProps {
  vehicles: VehicleRecord[];
  parts: SparePartRecord[];
  onSearchVehicles: (filters: {
    make: string;
    model: string;
    year: string;
    bodyStyle: string;
    priceRange: string;
  }) => void;
  onSearchParts: (filters: {
    make: string;
    model: string;
    year: string;
    category: string;
  }) => void;
  onRequestPart: () => void;
}

const SPARE_PART_CATEGORIES: SparePartCategory[] = [
  'Engine Parts',
  'Brake System',
  'Suspension & Steering',
  'Transmission',
  'Cooling System',
  'Electrical & Lighting',
  'Exhaust System',
  'Filters',
  'Body Parts',
  'Interior & Accessories',
  'Tyres & Wheels',
  'Batteries',
  'Fluids & Lubricants'
];

export default function VehiclePartFinder({
  vehicles,
  parts,
  onSearchVehicles,
  onSearchParts,
  onRequestPart
}: VehiclePartFinderProps) {
  const [activeFinderTab, setActiveFinderTab] = useState<'parts' | 'vehicles'>('parts');

  // Vehicle Finder State
  const [vehMake, setVehMake] = useState<string>('all');
  const [vehModel, setVehModel] = useState<string>('all');
  const [vehYear, setVehYear] = useState<string>('all');
  const [vehBodyStyle, setVehBodyStyle] = useState<string>('all');
  const [vehPriceRange, setVehPriceRange] = useState<string>('all');

  // Spare Parts Finder State
  const [partMake, setPartMake] = useState<string>('all');
  const [partModel, setPartModel] = useState<string>('all');
  const [partYear, setPartYear] = useState<string>('all');
  const [partCategory, setPartCategory] = useState<string>('all');

  // Distinct vehicle makes from inventory
  const vehicleMakes = useMemo(() => {
    const makes = new Set<string>();
    vehicles.forEach((v) => makes.add(v.manufacturer));
    return Array.from(makes).sort();
  }, [vehicles]);

  // Distinct models for selected vehicle make
  const availableVehModels = useMemo(() => {
    if (vehMake === 'all') {
      const models = new Set<string>();
      vehicles.forEach((v) => models.add(v.model));
      return Array.from(models).sort();
    }
    const models = new Set<string>();
    vehicles
      .filter((v) => v.manufacturer.toLowerCase() === vehMake.toLowerCase())
      .forEach((v) => models.add(v.model));
    return Array.from(models).sort();
  }, [vehicles, vehMake]);

  // Vehicle years
  const availableVehYears = useMemo(() => {
    const years = new Set<number>();
    vehicles.forEach((v) => years.add(v.year));
    return Array.from(years).sort((a, b) => b - a);
  }, [vehicles]);

  // Parts makes extracted from compatibility strings
  const partCompatibleMakes = useMemo(() => {
    // Standard Nigerian automotive popular makes
    return ['Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Hyundai', 'Ford', 'Nissan'];
  }, []);

  const handleVehiclesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchVehicles({
      make: vehMake,
      model: vehModel,
      year: vehYear,
      bodyStyle: vehBodyStyle,
      priceRange: vehPriceRange
    });
  };

  const handlePartsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchParts({
      make: partMake,
      model: partModel,
      year: partYear,
      category: partCategory
    });
  };

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#121828] border border-[#222d44] rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-7">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1d273c] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-1">
              <Filter className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>Vehicle &amp; Parts Finder</span>
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
              Find What You Need in Nigeria
            </h2>
          </div>

          {/* Switcher Tabs */}
          <div className="flex items-center bg-[#0c111e] p-1 rounded-xl border border-[#1b2438]">
            <button
              id="finder-tab-parts"
              onClick={() => setActiveFinderTab('parts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeFinderTab === 'parts'
                  ? 'bg-[#ea580c] text-white shadow-md shadow-[#ea580c]/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Spare Parts</span>
            </button>

            <button
              id="finder-tab-vehicles"
              onClick={() => setActiveFinderTab('vehicles')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeFinderTab === 'vehicles'
                  ? 'bg-[#ea580c] text-white shadow-md shadow-[#ea580c]/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Vehicles</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Spare Parts Finder */}
        {activeFinderTab === 'parts' && (
          <form onSubmit={handlePartsSubmit} className="pt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Vehicle Make */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Vehicle Make
                </label>
                <select
                  value={partMake}
                  onChange={(e) => setPartMake(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0a0f1d] border border-[#222c42] rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="all">All Vehicle Makes</option>
                  {partCompatibleMakes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Vehicle Model */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Model / Series
                </label>
                <input
                  type="text"
                  value={partModel === 'all' ? '' : partModel}
                  onChange={(e) => setPartModel(e.target.value || 'all')}
                  placeholder="e.g. Camry, RAV4, C300, 3 Series..."
                  className="w-full px-3 py-2.5 bg-[#0a0f1d] border border-[#222c42] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Model Year
                </label>
                <select
                  value={partYear}
                  onChange={(e) => setPartYear(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0a0f1d] border border-[#222c42] rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="all">Any Model Year</option>
                  {Array.from({ length: 15 }, (_, i) => 2025 - i).map((y) => (
                    <option key={y} value={y.toString()}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Part Category */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Part Category
                </label>
                <select
                  value={partCategory}
                  onChange={(e) => setPartCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0a0f1d] border border-[#222c42] rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="all">All Part Categories (13)</option>
                  {SPARE_PART_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons & "Can't find part" banner */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#1c253b]">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs text-slate-400">
                  Can't find the part you need in our current list?
                </span>
                <button
                  type="button"
                  onClick={onRequestPart}
                  className="text-xs font-bold text-[#ea580c] hover:text-[#f97316] underline underline-offset-2"
                >
                  Request a Part Sourcing
                </button>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setPartMake('all');
                    setPartModel('all');
                    setPartYear('all');
                    setPartCategory('all');
                  }}
                  className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[#0a0f1d] hover:bg-[#161f33] text-slate-400 hover:text-white border border-[#222c42] transition-colors flex items-center justify-center"
                  title="Reset filters"
                  aria-label="Reset filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  id="search-parts-finder-btn"
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs shadow-md shadow-[#ea580c]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Parts</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Tab 2: Vehicle Finder */}
        {activeFinderTab === 'vehicles' && (
          <form onSubmit={handleVehiclesSubmit} className="pt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {/* Make */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Make
                </label>
                <select
                  value={vehMake}
                  onChange={(e) => {
                    setVehMake(e.target.value);
                    setVehModel('all');
                  }}
                  className="w-full px-3 py-2.5 bg-[#0a0f1d] border border-[#222c42] rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="all">All Makes</option>
                  {vehicleMakes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Model
                </label>
                <select
                  value={vehModel}
                  onChange={(e) => setVehModel(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0a0f1d] border border-[#222c42] rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="all">All Models</option>
                  {availableVehModels.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Year
                </label>
                <select
                  value={vehYear}
                  onChange={(e) => setVehYear(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0a0f1d] border border-[#222c42] rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="all">Any Year</option>
                  {availableVehYears.map((y) => (
                    <option key={y} value={y.toString()}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Body Style */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Body Style
                </label>
                <select
                  value={vehBodyStyle}
                  onChange={(e) => setVehBodyStyle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0a0f1d] border border-[#222c42] rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="all">All Body Styles</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Truck / All-Terrain">Truck / All-Terrain</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Budget (₦)
                </label>
                <select
                  value={vehPriceRange}
                  onChange={(e) => setVehPriceRange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0a0f1d] border border-[#222c42] rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="all">Any Budget</option>
                  <option value="under-40m">Under ₦40,000,000</option>
                  <option value="40m-70m">₦40M - ₦70,000,000</option>
                  <option value="70m-100m">₦70M - ₦100,000,000</option>
                  <option value="above-100m">Above ₦100,000,000</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#1c253b]">
              <button
                type="button"
                onClick={() => {
                  setVehMake('all');
                  setVehModel('all');
                  setVehYear('all');
                  setVehBodyStyle('all');
                  setVehPriceRange('all');
                }}
                className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[#0a0f1d] hover:bg-[#161f33] text-slate-400 hover:text-white border border-[#222c42] transition-colors flex items-center justify-center"
                title="Reset filters"
                aria-label="Reset filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="submit"
                id="search-vehicles-finder-btn"
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-bold text-xs shadow-md shadow-[#ea580c]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Vehicles</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
