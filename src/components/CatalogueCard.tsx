import { Eye, ArrowRight, Wrench, Car, Zap } from 'lucide-react';
import { CatalogueItem, VehicleRecord, SparePartRecord } from '../types';
import { DEFAULT_SPARE_PART_IMAGE, DEFAULT_VEHICLE_IMAGE } from '../data/mockCatalogue';

interface CatalogueCardProps {
  item: CatalogueItem;
  onInspect: (item: CatalogueItem) => void;
  onEnquire: (item: CatalogueItem) => void;
}

export default function CatalogueCard({
  item,
  onInspect,
  onEnquire
}: CatalogueCardProps) {
  const isVehicle = item.type === 'vehicle';
  const vehicle = isVehicle ? (item as VehicleRecord) : null;
  const part = !isVehicle ? (item as SparePartRecord) : null;

  return (
    <div className="bg-[#141a29] border border-[#20293d] hover:border-[#ea580c]/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
      {/* Visual media banner */}
      <div className="relative h-52 bg-[#0e1422] overflow-hidden">
        <img
          src={item.images[0]}
          alt={isVehicle ? vehicle?.title : part?.partName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = isVehicle
              ? DEFAULT_VEHICLE_IMAGE
              : DEFAULT_SPARE_PART_IMAGE;
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141a29] via-transparent to-black/40" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
            isVehicle ? 'bg-[#ea580c] text-white' : 'bg-[#1e293b] text-white border border-[#334155]'
          }`}>
            {isVehicle ? `${vehicle?.manufacturer}` : `${part?.category}`}
          </span>
        </div>

        {/* Status Tag */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-semibold text-[#4ade80] border border-[#166534]">
          Verified
        </div>

        {/* Price Pill */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-[#2a344a] text-right">
          <div className="text-[10px] uppercase text-slate-400 font-medium">Price (₦)</div>
          <div className="text-sm font-bold text-white font-mono-spec">
            {item.priceDisplay}
          </div>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Subtitle / Model Info */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">
              {isVehicle ? `${vehicle?.year} • ${vehicle?.bodyStyle}` : `Part #: ${part?.partNumber}`}
            </span>
            <span className="font-mono text-[11px] text-[#ea580c]">
              {isVehicle ? vehicle?.model : part?.category}
            </span>
          </div>

          <h3 
            onClick={() => onInspect(item)}
            className="font-heading text-lg font-bold text-white group-hover:text-[#ea580c] transition-colors cursor-pointer leading-snug"
          >
            {isVehicle ? vehicle?.title : part?.partName}
          </h3>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Key specifications preview */}
          <div className="mt-3 bg-[#0e1422] border border-[#1e273b] rounded-lg p-2.5 space-y-1.5 text-xs">
            {isVehicle && vehicle ? (
              <>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Powertrain:</span>
                  <span className="text-white font-medium truncate max-w-[170px]">{vehicle.engine}</span>
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
              part?.specifications.slice(0, 3).map((spec, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400 truncate mr-2">{spec.label}:</span>
                  <span className="text-white font-medium truncate max-w-[170px]">{spec.value}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-[#1e273b] flex items-center justify-between gap-2">
          <button
            onClick={() => onInspect(item)}
            className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-[#0e1422] hover:bg-[#182133] text-slate-300 hover:text-white text-xs font-semibold border border-[#232c40] transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Specifications</span>
          </button>
          
          <button
            onClick={() => onEnquire(item)}
            className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold shadow-md shadow-[#ea580c]/20 transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02]"
          >
            <span>MAKE ENQUIRY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
