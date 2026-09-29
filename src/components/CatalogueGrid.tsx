import { CatalogueItem, VehicleRecord, SparePartRecord } from '../types';
import { DEFAULT_SPARE_PART_IMAGE, DEFAULT_VEHICLE_IMAGE } from '../data/mockCatalogue';
import CatalogueCard from './CatalogueCard';
import { SearchX, Wrench, ArrowRight, Eye, Car } from 'lucide-react';

interface CatalogueGridProps {
  items: CatalogueItem[];
  viewMode: 'grid' | 'list';
  onInspect: (item: CatalogueItem) => void;
  onEnquire: (item: CatalogueItem) => void;
  onResetFilters: () => void;
}

export default function CatalogueGrid({
  items,
  viewMode,
  onInspect,
  onEnquire,
  onResetFilters
}: CatalogueGridProps) {
  if (items.length === 0) {
    return (
      <div className="bg-[#141a29] border border-[#20293d] rounded-2xl p-12 text-center my-8">
        <div className="w-14 h-14 rounded-full bg-[#1c2333] border border-[#2d3852] flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7 text-[#ea580c]" />
        </div>
        <h3 className="font-heading text-xl font-bold text-white mb-2">
          No Matching Records Found
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          We could not locate catalogue items matching your exact filter parameters. You can submit an enquiry for specific vehicle models or spare parts.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-semibold shadow-md transition-colors"
        >
          Reset Filter Criteria
        </button>
      </div>
    );
  }

  // Grid View Mode
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <CatalogueCard
            key={item.id}
            item={item}
            onInspect={onInspect}
            onEnquire={onEnquire}
          />
        ))}
      </div>
    );
  }

  // Technical Specification Matrix / List Mode
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isVehicle = item.type === 'vehicle';
        const vehicle = isVehicle ? (item as VehicleRecord) : null;
        const part = !isVehicle ? (item as SparePartRecord) : null;

        return (
          <div
            key={item.id}
            className="bg-[#141a29] hover:bg-[#161f33] border border-[#20293d] hover:border-[#ea580c]/50 rounded-xl p-4 sm:p-5 transition-all flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5"
          >
            {/* Left: Thumbnail & Core Info */}
            <div className="flex items-start sm:items-center gap-4 flex-1">
              <div 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-[#0a0f1d] shrink-0 cursor-pointer border border-[#20293d]"
                onClick={() => onInspect(item)}
              >
                <img
                  src={item.images[0]}
                  alt={isVehicle ? vehicle?.title : part?.partName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = isVehicle
                      ? DEFAULT_VEHICLE_IMAGE
                      : DEFAULT_SPARE_PART_IMAGE;
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1 text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    isVehicle ? 'bg-[#ea580c] text-white' : 'bg-[#1e293b] text-white border border-[#334155]'
                  }`}>
                    {isVehicle ? vehicle?.manufacturer : part?.category}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#ea580c]">
                    {isVehicle ? vehicle?.model : `PART #${part?.partNumber}`}
                  </span>
                  {isVehicle && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-300 font-medium">{vehicle?.year}</span>
                    </>
                  )}
                </div>

                <h3 
                  onClick={() => onInspect(item)}
                  className="font-heading text-base sm:text-lg font-bold text-white hover:text-[#ea580c] transition-colors cursor-pointer truncate"
                >
                  {isVehicle ? vehicle?.title : part?.partName}
                </h3>

                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {item.description}
                </p>

                <div className="mt-2 text-xs text-slate-400">
                  Status: <span className="text-[#4ade80] font-medium">{item.availabilityStatus}</span>
                </div>
              </div>
            </div>

            {/* Middle: Specifications Strip */}
            <div className="bg-[#0f1422] border border-[#1e273b] rounded-lg p-3 lg:w-72 shrink-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#ea580c] mb-1 flex items-center gap-1">
                <Wrench className="w-3 h-3 text-[#ea580c]" />
                <span>Primary Specifications</span>
              </div>
              <div className="space-y-1 text-xs">
                {isVehicle && vehicle ? (
                  <>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Powertrain:</span>
                      <span className="text-white font-medium truncate max-w-[140px]">{vehicle.engine}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Power:</span>
                      <span className="text-white font-medium">{vehicle.horsepower}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Drivetrain:</span>
                      <span className="text-white font-medium">{vehicle.drivetrain}</span>
                    </div>
                  </>
                ) : (
                  part?.specifications.slice(0, 3).map((spec, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400 truncate mr-2">{spec.label}</span>
                      <span className="text-white font-medium truncate max-w-[130px]">{spec.value}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right: Pricing & Actions */}
            <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#1e2639]">
              <div className="text-left lg:text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Sample Price
                </div>
                <div className="text-lg font-bold text-white font-mono-spec">
                  {item.priceDisplay}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onInspect(item)}
                  className="px-3 py-1.5 rounded-lg bg-[#1c2333] hover:bg-[#252e42] text-xs font-semibold text-slate-200 border border-[#2b354d] transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onEnquire(item)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#ea580c] hover:bg-[#f97316] text-xs font-semibold text-white shadow-md shadow-[#ea580c]/20 transition-all hover:scale-[1.02]"
                >
                  <span>MAKE ENQUIRY</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
