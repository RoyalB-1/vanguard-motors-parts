import { useState, useMemo } from 'react';
import { SparePartRecord } from '../types';
import { DEFAULT_SPARE_PART_IMAGE } from '../data/mockCatalogue';
import { 
  Wrench, 
  Search, 
  ArrowRight, 
  Eye, 
  Layers, 
  Tag, 
  CheckCircle2, 
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Disc,
  Filter,
  Zap,
  Flame,
  Activity,
  Box
} from 'lucide-react';

interface SparePartsCatalogueProps {
  parts: SparePartRecord[];
  onInspect: (part: SparePartRecord) => void;
  onEnquire: (part: SparePartRecord) => void;
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

export default function SparePartsCatalogue({
  parts,
  onInspect,
  onEnquire
}: SparePartsCatalogueProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleFilterQuery, setVehicleFilterQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');

  // Filtered parts based on category, part search, compatibility search, and sort
  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      // 1. Category filter
      if (selectedCategory !== 'All Categories' && part.category !== selectedCategory) {
        return false;
      }

      // 2. Main Search Query (Part Name, Part Number, Description, Brand, Compatibility)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const qAlphaNum = q.replace(/[\s\-_]/g, '');
        const partNumClean = part.partNumber.toLowerCase().replace(/[\s\-_]/g, '');
        const matchesName = part.partName.toLowerCase().includes(q);
        const matchesNumber = part.partNumber.toLowerCase().includes(q) || (qAlphaNum.length >= 3 && partNumClean.includes(qAlphaNum));
        const matchesCat = part.category.toLowerCase().includes(q);
        const matchesDesc = part.description.toLowerCase().includes(q);
        const matchesBrand = (part.manufacturerBrand || '').toLowerCase().includes(q);
        const matchesCompatibility = part.compatibleVehicles.some((car) =>
          car.toLowerCase().includes(q)
        );

        if (!matchesName && !matchesNumber && !matchesCat && !matchesDesc && !matchesBrand && !matchesCompatibility) {
          return false;
        }
      }

      // 3. Vehicle Compatibility Filter (e.g. BMW, Tesla, Civic, Camry)
      if (vehicleFilterQuery.trim()) {
        const vq = vehicleFilterQuery.toLowerCase().trim();
        const matchesCompatibility = part.compatibleVehicles.some((car) =>
          car.toLowerCase().includes(vq)
        );
        if (!matchesCompatibility) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'price-desc') return b.priceNumeric - a.priceNumeric;
      if (sortBy === 'name-asc') return a.partName.localeCompare(b.partName);
      return 0;
    });
  }, [parts, selectedCategory, searchQuery, vehicleFilterQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setSearchQuery('');
    setVehicleFilterQuery('');
    setSortBy('default');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#101625] border border-[#1e273c] rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c2438] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ea580c] uppercase tracking-wider mb-1">
              <Wrench className="w-4 h-4 text-[#ea580c]" />
              <span>Precision Spare Parts • Lagos Hub &amp; Nationwide Delivery</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Automotive Precision Spare Parts
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Browse replacement components by automotive category or search by part number and vehicle fitment compatibility.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141a29] border border-[#232c40] text-xs self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
            <span className="text-slate-300 font-medium">Sample Spare Parts Inventory</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-mono">{parts.length} Part Records</span>
          </div>
        </div>

        {/* Category Pills Slider/Grid */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>Filter by Category:</span>
            </span>
            {selectedCategory !== 'All Categories' && (
              <button
                onClick={() => setSelectedCategory('All Categories')}
                className="text-xs text-[#ea580c] hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Show All Categories</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {SPARE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'All Categories'
                ? parts.length
                : parts.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  id={`parts-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-md shadow-[#ea580c]/25 font-semibold'
                      : 'bg-[#141a29] text-slate-300 border-[#20293d] hover:border-[#ea580c]/40 hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-black/30 text-white' : 'bg-[#1a2336] text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Breadcrumb Path */}
        <div className="mt-4 pt-3 border-t border-[#1c2438] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="font-semibold text-white">Catalogue Path:</span>
            <span 
              onClick={() => setSelectedCategory('All Categories')}
              className="text-[#ea580c] hover:underline cursor-pointer font-medium"
            >
              Precision Spare Parts
            </span>
            {selectedCategory !== 'All Categories' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-white font-bold">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="text-slate-400">
            Showing <strong className="text-white">{filteredParts.length}</strong> matching {filteredParts.length === 1 ? 'part record' : 'part records'}
          </div>
        </div>
      </div>

      {/* Search & Compatibility Filters */}
      <div className="bg-[#0f1422] border border-[#1d263b] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search by Part Name / Part # */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="parts-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search part name, part # (e.g. BP-8842-CER), or keyword..."
            className="w-full min-h-[44px] pl-9 pr-4 py-2 bg-[#141a29] border border-[#222c40] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c]"
          />
        </div>

        {/* Compatibility Filter input */}
        <div className="relative flex-1 min-w-[200px]">
          <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="parts-compatibility-input"
            type="text"
            value={vehicleFilterQuery}
            onChange={(e) => setVehicleFilterQuery(e.target.value)}
            placeholder="Filter by vehicle (e.g. BMW, Camry, Civic)..."
            className="w-full min-h-[44px] pl-9 pr-4 py-2 bg-[#141a29] border border-[#222c40] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ea580c]"
          />
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 shrink-0">Sort:</span>
          <select
            id="parts-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="min-h-[44px] px-3 py-2 bg-[#141a29] border border-[#222c40] rounded-xl text-white focus:outline-none focus:border-[#ea580c]"
          >
            <option value="default">Default Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Part Name: A to Z</option>
          </select>
        </div>

        {/* Reset button */}
        {(searchQuery || vehicleFilterQuery || selectedCategory !== 'All Categories' || sortBy !== 'default') && (
          <button
            onClick={handleResetFilters}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#1a2133] hover:bg-[#222b40] text-slate-300 hover:text-white border border-[#252f46] transition-colors flex items-center justify-center"
          >
            Reset
          </button>
        )}
      </div>

      {/* Spare Parts Grid */}
      {filteredParts.length === 0 ? (
        <div className="text-center py-16 bg-[#101625] border border-[#1e273c] rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#182133] border border-[#2b354d] flex items-center justify-center mx-auto text-slate-400">
            <Wrench className="w-6 h-6 text-[#ea580c]" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">No Spare Parts Match Criteria</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              No replacement parts found matching the selected category, part number, or vehicle compatibility search.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ea580c] text-white text-xs font-semibold shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Parts Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="group flex flex-col bg-[#141a29] hover:bg-[#161e30] border border-[#20293d] hover:border-[#ea580c]/60 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
            >
              {/* Part Image with appropriate fallback */}
              <div 
                className="relative h-48 sm:h-52 bg-[#0c101c] overflow-hidden cursor-pointer"
                onClick={() => onInspect(part)}
              >
                <img
                  src={part.images[0]}
                  alt={part.partName}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    // Safe automotive spare part placeholder
                    (e.target as HTMLImageElement).src = DEFAULT_SPARE_PART_IMAGE;
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#141a29] via-transparent to-black/50" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase shadow-md bg-[#1e293b] text-white border border-[#334155]">
                    {part.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/75 backdrop-blur-md text-[#ea580c] border border-white/10">
                    {part.partNumber}
                  </span>
                </div>

                {/* Bottom Image Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 pointer-events-none">
                  <div className="bg-[#0f1422]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#242e44]">
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      Price (₦)
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white font-mono-spec">
                      {part.priceDisplay}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#14532d]/90 backdrop-blur-md text-[#4ade80] border border-[#166534] text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                    <span>Fitment Assistance Available</span>
                  </div>
                </div>
              </div>

              {/* Part Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider truncate">
                      {part.manufacturerBrand || 'Precision Spec'}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-[#ea580c] bg-[#ea580c]/10 px-2 py-0.5 rounded border border-[#ea580c]/20 shrink-0">
                      {part.partNumber}
                    </span>
                  </div>

                  <h3
                    onClick={() => onInspect(part)}
                    className="font-heading text-base sm:text-lg font-bold text-white hover:text-[#ea580c] transition-colors line-clamp-1 cursor-pointer"
                    title={part.partName}
                  >
                    {part.partName}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {part.description}
                  </p>

                  {/* Vehicle Compatibility summary */}
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
                          +{part.compatibleVehicles.length - 2} more vehicle applications
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Demo status text */}
                  <div className="mt-2.5 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
                    <span>{part.availabilityStatus}</span>
                  </div>
                </div>

                {/* Action Buttons: Details & ENQUIRE */}
                <div className="mt-4 pt-3.5 border-t border-[#1e273b] grid grid-cols-2 gap-2">
                  <button
                    id={`inspect-part-btn-${part.id}`}
                    onClick={() => onInspect(part)}
                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1c2333] hover:bg-[#232c40] text-slate-200 text-xs font-semibold border border-[#2b354d] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>View Details</span>
                  </button>

                  <button
                    id={`enquire-part-btn-${part.id}`}
                    onClick={() => onEnquire(part)}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-semibold shadow-md shadow-[#ea580c]/20 transition-all hover:scale-[1.02]"
                  >
                    <span>ENQUIRE</span>
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
