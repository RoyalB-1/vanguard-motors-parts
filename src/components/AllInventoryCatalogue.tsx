import { useState, useMemo } from 'react';
import { CatalogueItem, VehicleRecord, SparePartRecord } from '../types';
import { DEFAULT_VEHICLE_IMAGE, DEFAULT_SPARE_PART_IMAGE } from '../data/mockCatalogue';
import { 
  Search, 
  X, 
  Car, 
  Wrench, 
  Layers, 
  RotateCcw, 
  Eye, 
  ArrowRight, 
  Fuel, 
  ShieldCheck, 
  ChevronRight,
  Filter,
  CheckCircle2,
  SlidersHorizontal,
  Package
} from 'lucide-react';

interface AllInventoryCatalogueProps {
  vehicles: VehicleRecord[];
  parts: SparePartRecord[];
  onInspect: (item: CatalogueItem) => void;
  onEnquire: (item: CatalogueItem) => void;
  onRequestPart: () => void;
  onGeneralEnquiry: () => void;
}

const SPARE_CATEGORIES = [
  'All Categories',
  'Brakes & Rotors',
  'Engine Components',
  'Filters',
  'Suspension & Steering',
  'Electrical & Lighting',
  'Cooling System',
  'Transmission & Drivetrain',
  'Turbochargers',
  'Exhaust Components',
  'Batteries & Charging',
  'Body & Exterior Parts'
];

const VEHICLE_MAKES = [
  'All Makes',
  'Toyota',
  'Mercedes-Benz',
  'BMW',
  'Tesla',
  'Honda'
];

const VEHICLE_BODY_STYLES = [
  'All Body Styles',
  'Sedan',
  'SUV',
  'Coupe',
  'Electric',
  'Truck / All-Terrain',
  'Hatchback'
];

const VEHICLE_FUEL_TYPES = [
  'All Fuel Types',
  'Gasoline',
  'Electric',
  'Hybrid'
];

export default function AllInventoryCatalogue({
  vehicles,
  parts,
  onInspect,
  onEnquire,
  onRequestPart,
  onGeneralEnquiry
}: AllInventoryCatalogueProps) {
  // Primary inventory type: 'all' | 'vehicles' | 'spare_parts'
  const [inventoryType, setInventoryType] = useState<'all' | 'vehicles' | 'spare_parts'>('all');
  
  // Unified search query
  const [searchQuery, setSearchQuery] = useState('');

  // Contextual Vehicle Filters
  const [vehicleMake, setVehicleMake] = useState('All Makes');
  const [vehicleBodyStyle, setVehicleBodyStyle] = useState('All Body Styles');
  const [vehicleFuelType, setVehicleFuelType] = useState('All Fuel Types');

  // Contextual Spare Part Filters
  const [partCategory, setPartCategory] = useState('All Categories');
  const [partCompatibilityFilter, setPartCompatibilityFilter] = useState('');

  // Shared Brand Filter (when type is 'all')
  const [brandFilter, setBrandFilter] = useState('All Brands');

  // Sorting
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');

  // Total items combined (exactly 35 records: 20 vehicles + 15 spare parts)
  const allItems: CatalogueItem[] = useMemo(() => {
    return [...vehicles, ...parts];
  }, [vehicles, parts]);

  // Clean, multi-field search and filter logic
  const filteredItems = useMemo(() => {
    // Normalize search query: remove punctuation/hyphens for flexible code matching
    const qClean = searchQuery.toLowerCase().trim();
    const qAlphaNum = qClean.replace(/[\s\-_]/g, '');

    return allItems.filter((item) => {
      const isVehicle = item.type === 'vehicle';
      const isPart = item.type === 'spare_part';

      // 1. Inventory Type Filter
      if (inventoryType === 'vehicles' && !isVehicle) return false;
      if (inventoryType === 'spare_parts' && !isPart) return false;

      // 2. Search Query Matching
      if (qClean) {
        if (isVehicle) {
          const v = item as VehicleRecord;
          const matchManufacturer = v.manufacturer.toLowerCase().includes(qClean);
          const matchModel = v.model.toLowerCase().includes(qClean);
          const matchTitle = v.title.toLowerCase().includes(qClean);
          const matchTrim = (v.trim || '').toLowerCase().includes(qClean);
          const matchYear = v.year.toString().includes(qClean);
          const matchBody = v.bodyStyle.toLowerCase().includes(qClean);
          const matchFuel = v.fuelType.toLowerCase().includes(qClean);
          const matchEngine = (v.engine || '').toLowerCase().includes(qClean);
          const matchTrans = (v.transmission || '').toLowerCase().includes(qClean);
          const matchDesc = v.description.toLowerCase().includes(qClean);

          if (!matchManufacturer && !matchModel && !matchTitle && !matchTrim && 
              !matchYear && !matchBody && !matchFuel && !matchEngine && !matchTrans && !matchDesc) {
            return false;
          }
        } else {
          const p = item as SparePartRecord;
          const partNumClean = p.partNumber.toLowerCase().replace(/[\s\-_]/g, '');
          const matchPartName = p.partName.toLowerCase().includes(qClean);
          const matchPartNumber = p.partNumber.toLowerCase().includes(qClean) || partNumClean.includes(qAlphaNum);
          const matchCategory = p.category.toLowerCase().includes(qClean);
          const matchBrand = (p.manufacturerBrand || '').toLowerCase().includes(qClean);
          const matchDesc = p.description.toLowerCase().includes(qClean);
          const matchCompatibility = p.compatibleVehicles.some((veh) => 
            veh.toLowerCase().includes(qClean)
          );

          if (!matchPartName && !matchPartNumber && !matchCategory && 
              !matchBrand && !matchDesc && !matchCompatibility) {
            return false;
          }
        }
      }

      // 3. Contextual Filters when inventoryType === 'all'
      if (inventoryType === 'all') {
        if (brandFilter !== 'All Brands') {
          const b = brandFilter.toLowerCase();
          if (isVehicle) {
            const v = item as VehicleRecord;
            if (v.manufacturer.toLowerCase() !== b) return false;
          } else {
            const p = item as SparePartRecord;
            const matchesComp = p.compatibleVehicles.some((veh) => veh.toLowerCase().includes(b));
            const matchesBrand = (p.manufacturerBrand || '').toLowerCase().includes(b);
            if (!matchesComp && !matchesBrand) return false;
          }
        }
      }

      // 4. Contextual Filters when inventoryType === 'vehicles'
      if (inventoryType === 'vehicles' && isVehicle) {
        const v = item as VehicleRecord;
        if (vehicleMake !== 'All Makes' && v.manufacturer !== vehicleMake) return false;
        if (vehicleBodyStyle !== 'All Body Styles' && v.bodyStyle !== vehicleBodyStyle) return false;
        if (vehicleFuelType !== 'All Fuel Types' && v.fuelType !== vehicleFuelType) return false;
      }

      // 5. Contextual Filters when inventoryType === 'spare_parts' && isPart
      if (inventoryType === 'spare_parts' && isPart) {
        const p = item as SparePartRecord;
        if (partCategory !== 'All Categories' && p.category !== partCategory) return false;
        if (partCompatibilityFilter.trim()) {
          const compQ = partCompatibilityFilter.toLowerCase().trim();
          const matchesComp = p.compatibleVehicles.some((veh) => veh.toLowerCase().includes(compQ));
          if (!matchesComp) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'price-desc') return b.priceNumeric - a.priceNumeric;
      if (sortBy === 'name-asc') {
        const nameA = a.type === 'vehicle' ? (a as VehicleRecord).title : (a as SparePartRecord).partName;
        const nameB = b.type === 'vehicle' ? (b as VehicleRecord).title : (b as SparePartRecord).partName;
        return nameA.localeCompare(nameB);
      }
      return 0;
    });
  }, [
    allItems, 
    inventoryType, 
    searchQuery, 
    brandFilter, 
    vehicleMake, 
    vehicleBodyStyle, 
    vehicleFuelType, 
    partCategory, 
    partCompatibilityFilter, 
    sortBy
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setBrandFilter('All Brands');
    setVehicleMake('All Makes');
    setVehicleBodyStyle('All Body Styles');
    setVehicleFuelType('All Fuel Types');
    setPartCategory('All Categories');
    setPartCompatibilityFilter('');
    setSortBy('default');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    brandFilter !== 'All Brands' ||
    vehicleMake !== 'All Makes' ||
    vehicleBodyStyle !== 'All Body Styles' ||
    vehicleFuelType !== 'All Fuel Types' ||
    partCategory !== 'All Categories' ||
    partCompatibilityFilter.trim() !== '' ||
    sortBy !== 'default';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header Banner & Catalogue Overview */}
      <div className="bg-[#101625] border border-[#1e273c] rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c2438] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ea580c] uppercase tracking-wider mb-1">
              <Package className="w-4 h-4 text-[#ea580c]" />
              <span>Unified Inventory Catalogue • Lagos, Nigeria</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              All Inventory
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Browse vehicles and precision spare parts from the VANGUARD Motors &amp; Parts catalogue.
            </p>
          </div>

          {/* Records Counter Badges */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto text-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141a29] border border-[#232c40] font-mono text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
              <strong className="text-white">35</strong> Catalogue Records
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1c2438] border border-[#2d3a54] text-slate-300">
              <Car className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>20 Vehicles</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1c2438] border border-[#2d3a54] text-slate-300">
              <Wrench className="w-3.5 h-3.5 text-[#4ade80]" />
              <span>15 Spare Parts</span>
            </div>
          </div>
        </div>

        {/* 2. Inventory Type Filter Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 p-1 bg-[#090d18] border border-[#1a2336] rounded-xl self-start">
            <button
              id="filter-type-all"
              type="button"
              onClick={() => setInventoryType('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                inventoryType === 'all'
                  ? 'bg-[#ea580c] text-white shadow-md shadow-[#ea580c]/25'
                  : 'text-slate-300 hover:text-white hover:bg-[#141a29]'
              }`}
            >
              <span>All</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                inventoryType === 'all' ? 'bg-black/30 text-white' : 'bg-[#182133] text-slate-400'
              }`}>
                35
              </span>
            </button>

            <button
              id="filter-type-vehicles"
              type="button"
              onClick={() => setInventoryType('vehicles')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                inventoryType === 'vehicles'
                  ? 'bg-[#ea580c] text-white shadow-md shadow-[#ea580c]/25'
                  : 'text-slate-300 hover:text-white hover:bg-[#141a29]'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Vehicles</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                inventoryType === 'vehicles' ? 'bg-black/30 text-white' : 'bg-[#182133] text-slate-400'
              }`}>
                20
              </span>
            </button>

            <button
              id="filter-type-spares"
              type="button"
              onClick={() => setInventoryType('spare_parts')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                inventoryType === 'spare_parts'
                  ? 'bg-[#ea580c] text-white shadow-md shadow-[#ea580c]/25'
                  : 'text-slate-300 hover:text-white hover:bg-[#141a29]'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Spare Parts</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                inventoryType === 'spare_parts' ? 'bg-black/30 text-white' : 'bg-[#182133] text-slate-400'
              }`}>
                15
              </span>
            </button>
          </div>

          {/* Showing Count */}
          <div className="text-xs text-slate-400">
            Showing <strong className="text-white">{filteredItems.length}</strong> of{' '}
            {inventoryType === 'all' ? '35' : inventoryType === 'vehicles' ? '20' : '15'} matching records
          </div>
        </div>
      </div>

      {/* 3. Unified Search & Contextual Secondary Filters */}
      <div className="bg-[#0f1422] border border-[#1d263b] rounded-xl p-4 sm:p-5 space-y-3.5">
        {/* Search Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ea580c]" />
            <input
              id="unified-inventory-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all inventory: BMW, Toyota Camry, Tesla Model 3, brake, filter, BP 8842 CER..."
              className="w-full min-h-[44px] pl-10 pr-9 py-2.5 bg-[#141a29] border border-[#222c40] rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[32px] min-h-[32px] flex items-center justify-center text-slate-400 hover:text-white"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs">
            <span className="text-slate-400 shrink-0">Sort:</span>
            <select
              id="inventory-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="min-h-[44px] px-3 py-2 bg-[#141a29] border border-[#222c40] rounded-xl text-white text-xs focus:outline-none focus:border-[#ea580c]"
            >
              <option value="default">Default Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical: A to Z</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1a2133] hover:bg-[#222b40] text-slate-300 hover:text-white border border-[#252f46] text-xs transition-colors shrink-0"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* 4. Contextual Filters based on selected Inventory Type */}
        {/* ONLY display relevant filters for the selected record type */}

        {/* CONTEXT A: When Inventory Type is "All" */}
        {inventoryType === 'all' && (
          <div className="pt-2 border-t border-[#1a2336] flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick Filter by Brand:</span>
            {['All Brands', 'Toyota', 'Mercedes-Benz', 'BMW', 'Tesla', 'Honda'].map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setBrandFilter(brand)}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors border ${
                  brandFilter === brand
                    ? 'bg-[#ea580c] text-white border-[#ea580c] font-semibold'
                    : 'bg-[#141a29] text-slate-300 border-[#20293d] hover:text-white hover:border-[#ea580c]/40'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}

        {/* CONTEXT B: When Inventory Type is "Vehicles" (Show ONLY vehicle filters: Manufacturer, Body Style, Fuel) */}
        {inventoryType === 'vehicles' && (
          <div className="pt-2 border-t border-[#1a2336] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Manufacturer
              </label>
              <select
                id="vehicle-make-filter"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#141a29] border border-[#222c40] rounded-lg text-white focus:outline-none focus:border-[#ea580c]"
              >
                {VEHICLE_MAKES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Body Style
              </label>
              <select
                id="vehicle-body-filter"
                value={vehicleBodyStyle}
                onChange={(e) => setVehicleBodyStyle(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#141a29] border border-[#222c40] rounded-lg text-white focus:outline-none focus:border-[#ea580c]"
              >
                {VEHICLE_BODY_STYLES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Powertrain / Fuel
              </label>
              <select
                id="vehicle-fuel-filter"
                value={vehicleFuelType}
                onChange={(e) => setVehicleFuelType(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#141a29] border border-[#222c40] rounded-lg text-white focus:outline-none focus:border-[#ea580c]"
              >
                {VEHICLE_FUEL_TYPES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* CONTEXT C: When Inventory Type is "Spare Parts" (Show ONLY parts filters: Category, Compatibility) */}
        {inventoryType === 'spare_parts' && (
          <div className="pt-2 border-t border-[#1a2336] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Spare Part Category
              </label>
              <select
                id="parts-category-filter"
                value={partCategory}
                onChange={(e) => setPartCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#141a29] border border-[#222c40] rounded-lg text-white focus:outline-none focus:border-[#ea580c]"
              >
                {SPARE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Vehicle Compatibility Filter
              </label>
              <input
                id="parts-compatibility-filter"
                type="text"
                value={partCompatibilityFilter}
                onChange={(e) => setPartCompatibilityFilter(e.target.value)}
                placeholder="Filter by vehicle (e.g. BMW, Camry, Civic, Model 3)..."
                className="w-full px-2.5 py-1.5 bg-[#141a29] border border-[#222c40] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c]"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Inventory Results Grid */}
      {filteredItems.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 bg-[#101625] border border-[#1e273c] rounded-2xl p-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#182133] border border-[#2b354d] flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-7 h-7 text-[#ea580c]" />
          </div>
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
              No matching catalogue records found.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1">
              We couldn't find any vehicles or spare parts matching "{searchQuery}". You can reset your search, browse by category, or request custom sourcing.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-4 py-2 rounded-lg bg-[#1a2233] hover:bg-[#222d42] text-white text-xs font-semibold border border-[#28354f] transition-colors"
              >
                Clear Search
              </button>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-semibold shadow-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>

            <button
              type="button"
              onClick={onRequestPart}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#14532d]/80 hover:bg-[#166534] text-[#4ade80] hover:text-white border border-[#166534] text-xs font-semibold transition-colors"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Request Custom Part Sourcing</span>
            </button>

            <button
              type="button"
              onClick={onGeneralEnquiry}
              className="px-4 py-2 rounded-lg bg-[#101726] hover:bg-[#182136] text-slate-300 hover:text-white border border-[#222c42] text-xs font-semibold transition-colors"
            >
              General Sourcing Enquiry
            </button>
          </div>
        </div>
      ) : (
        /* Results Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isVehicle = item.type === 'vehicle';
            const vehicle = isVehicle ? (item as VehicleRecord) : null;
            const part = !isVehicle ? (item as SparePartRecord) : null;

            return (
              <div
                key={item.id}
                className="group flex flex-col bg-[#141a29] hover:bg-[#161e30] border border-[#20293d] hover:border-[#ea580c]/60 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
              >
                {/* Visual Media with Strict Image Separation & Fallbacks */}
                <div 
                  className="relative h-48 sm:h-52 bg-[#0c101c] overflow-hidden cursor-pointer"
                  onClick={() => onInspect(item)}
                >
                  <img
                    src={item.images[0]}
                    alt={isVehicle ? vehicle?.title : part?.partName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      // Strict separation of fallback images
                      (e.target as HTMLImageElement).src = isVehicle 
                        ? DEFAULT_VEHICLE_IMAGE 
                        : DEFAULT_SPARE_PART_IMAGE;
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#141a29] via-transparent to-black/50" />

                  {/* 4. Smart Result Identification Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                    {isVehicle ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-black tracking-wider uppercase shadow-md bg-[#ea580c] text-white">
                        <Car className="w-3 h-3" />
                        <span>VEHICLE</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-black tracking-wider uppercase shadow-md bg-[#1e293b] text-white border border-[#334155]">
                        <Wrench className="w-3 h-3 text-[#4ade80]" />
                        <span>SPARE PART</span>
                      </span>
                    )}

                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/75 backdrop-blur-md text-slate-200 border border-white/10">
                      {isVehicle ? vehicle?.manufacturer : part?.category}
                    </span>
                  </div>

                  {/* Top-Right Secondary Identification */}
                  <div className="absolute top-3 right-3 pointer-events-none">
                    {isVehicle && vehicle ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-black/75 backdrop-blur-md text-white border border-white/10">
                        {vehicle.year}
                      </span>
                    ) : part ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/75 backdrop-blur-md text-[#ea580c] border border-white/10">
                        #{part.partNumber}
                      </span>
                    ) : null}
                  </div>

                  {/* Bottom Image Info: Price & Status */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 pointer-events-none">
                    <div className="bg-[#0f1422]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#242e44]">
                      <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                        {isVehicle ? 'Price (Lagos, ₦)' : 'Price (₦)'}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white font-mono-spec">
                        {item.priceDisplay}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#14532d]/90 backdrop-blur-md text-[#4ade80] border border-[#166534] text-[10px] font-semibold truncate max-w-[170px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                      <span className="truncate">{item.availabilityStatus}</span>
                    </div>
                  </div>
                </div>

                {/* 5. Result Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Identification / Subtitle Line */}
                    <div className="flex items-center justify-between gap-2 mb-1 text-xs">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider truncate">
                        {isVehicle && vehicle
                          ? `${vehicle.manufacturer} • ${vehicle.bodyStyle}`
                          : part?.manufacturerBrand || 'Precision Spec'}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-[#ea580c] shrink-0">
                        {isVehicle && vehicle ? vehicle.model : `#${part?.partNumber}`}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onInspect(item)}
                      className="font-heading text-base sm:text-lg font-bold text-white hover:text-[#ea580c] transition-colors line-clamp-1 cursor-pointer"
                      title={isVehicle ? vehicle?.title : part?.partName}
                    >
                      {isVehicle ? vehicle?.title : part?.partName}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Quick Specs / Compatibility Preview */}
                    {isVehicle && vehicle ? (
                      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-[#0b101d] border border-[#1a2336] truncate">
                          <span className="text-slate-500 block text-[10px]">Powertrain</span>
                          <span className="text-slate-200 font-medium truncate block">{vehicle.engine}</span>
                        </div>
                        <div className="p-2 rounded bg-[#0b101d] border border-[#1a2336] truncate">
                          <span className="text-slate-500 block text-[10px]">Transmission</span>
                          <span className="text-slate-200 font-medium truncate block">{vehicle.transmission}</span>
                        </div>
                      </div>
                    ) : part ? (
                      <div className="mt-3 bg-[#0f1422] border border-[#1e2639] rounded-lg p-2.5">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-[#ea580c] mb-1 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-[#ea580c]" />
                          <span>Compatible Vehicles:</span>
                        </div>
                        <div className="space-y-1">
                          {part.compatibleVehicles.slice(0, 2).map((v, i) => (
                            <div key={i} className="text-[11px] text-slate-300 truncate flex items-center gap-1.5">
                              <span className="text-[#22c55e]">•</span>
                              <span className="truncate">{v}</span>
                            </div>
                          ))}
                          {part.compatibleVehicles.length > 2 && (
                            <div className="text-[10px] text-slate-400 italic">
                              +{part.compatibleVehicles.length - 2} more vehicle models
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* 10. Action Buttons with Precise Wording */}
                  <div className="mt-4 pt-3.5 border-t border-[#1e273b] grid grid-cols-2 gap-2">
                    <button
                      id={`inspect-item-${item.id}`}
                      onClick={() => onInspect(item)}
                      className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1c2333] hover:bg-[#232c40] text-slate-200 text-xs font-semibold border border-[#2b354d] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>View Details</span>
                    </button>

                    <button
                      id={`enquire-item-${item.id}`}
                      onClick={() => onEnquire(item)}
                      className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold shadow-md shadow-[#ea580c]/20 transition-all hover:scale-[1.02] text-center"
                      title={isVehicle ? 'Enquire About This Vehicle' : 'Enquire About This Part'}
                    >
                      <span className="truncate">
                        {isVehicle ? 'Enquire' : 'Enquire'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
