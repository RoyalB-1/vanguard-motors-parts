import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, Check, Car, Cog, Sparkles, LayoutGrid, List } from 'lucide-react';
import { FilterState, ItemType } from '../types';

interface SearchAndFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableMakes: string[];
  totalResults: number;
  totalCatalogueCount: number;
  totalVehiclesCount: number;
  totalSparesCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const POPULAR_QUERIES = [
  'Porsche 992',
  'BMW S58',
  'Carbon-Ceramic',
  'Garrett Turbo',
  'Titanium Exhaust',
  'Audi RS6',
  'Defender V8',
  'Bilstein Clubsport'
];

export default function SearchAndFilterBar({
  filters,
  onFilterChange,
  availableMakes,
  totalResults,
  totalCatalogueCount,
  totalVehiclesCount,
  totalSparesCount,
  viewMode,
  onViewModeChange
}: SearchAndFilterBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleQuickTagClick = (tag: string) => {
    onFilterChange({ ...filters, searchQuery: tag });
  };

  const clearSearch = () => {
    onFilterChange({ ...filters, searchQuery: '' });
  };

  const resetAllFilters = () => {
    onFilterChange({
      searchQuery: '',
      type: 'all',
      category: 'all',
      make: 'all',
      condition: 'all',
      stockOnly: false,
      sortBy: 'featured'
    });
  };

  const hasActiveFilters = 
    filters.searchQuery.trim() !== '' ||
    filters.type !== 'all' ||
    filters.make !== 'all' ||
    filters.condition !== 'all' ||
    filters.stockOnly;

  return (
    <div className="bg-[#141a29] border border-[#20293d] rounded-xl p-4 sm:p-5 shadow-xl shadow-black/30">
      {/* Primary Search Line */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#ea580c]" />
          </div>
          <input
            id="catalogue-search-input"
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by vehicle model, precision part #, engine code (e.g., S58, 992, CCM, Brembo, RS6)..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#0f1422] border border-[#232d42] rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-all"
          />
          {filters.searchQuery && (
            <button
              id="clear-search-btn"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* View Switcher & Result Counter */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <div className="flex items-center bg-[#0e1422] border border-[#232c40] rounded-lg p-1">
            <button
              id="view-grid-btn"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#ea580c] text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Card Grid Display"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="view-list-btn"
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#ea580c] text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Technical Specification List"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-400 whitespace-nowrap">
            Showing <span className="font-semibold text-[#ea580c]">{totalResults}</span> of {totalCatalogueCount} records
          </div>
        </div>
      </div>

      {/* Quick Search Tag Chips */}
      <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#ea580c]" />
          <span>Quick Lookup:</span>
        </span>
        {POPULAR_QUERIES.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleQuickTagClick(tag)}
            className={`px-2 py-0.5 rounded text-[11px] font-medium shrink-0 transition-colors border ${
              filters.searchQuery.toLowerCase() === tag.toLowerCase()
                ? 'bg-[#ea580c] text-white border-[#ea580c]'
                : 'bg-[#0e1422] text-slate-300 border-[#232c40] hover:border-[#ea580c]/50 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Filter Row: Type Tabs & Dropdowns */}
      <div className="mt-3.5 pt-3.5 border-t border-[#1d263b] flex flex-wrap items-center justify-between gap-3">
        {/* Category Type selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            id="filter-type-all"
            onClick={() => onFilterChange({ ...filters, type: 'all' })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filters.type === 'all'
                ? 'bg-[#ea580c] text-white shadow-sm'
                : 'bg-[#1a2133] text-slate-300 hover:bg-[#232c40]'
            }`}
          >
            <span>All Inventory</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              filters.type === 'all' ? 'bg-black/30 text-white' : 'bg-[#0f1422] text-slate-400'
            }`}>
              {totalCatalogueCount}
            </span>
          </button>
          <button
            id="filter-type-vehicle"
            onClick={() => onFilterChange({ ...filters, type: 'vehicle' })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filters.type === 'vehicle'
                ? 'bg-[#ea580c] text-white shadow-sm'
                : 'bg-[#1a2133] text-slate-300 hover:bg-[#232c40]'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Vehicle Catalogue</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              filters.type === 'vehicle' ? 'bg-black/30 text-white' : 'bg-[#0f1422] text-slate-400'
            }`}>
              {totalVehiclesCount}
            </span>
          </button>
          <button
            id="filter-type-spares"
            onClick={() => onFilterChange({ ...filters, type: 'spare_part' })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filters.type === 'spare_part'
                ? 'bg-[#ea580c] text-white shadow-sm'
                : 'bg-[#1a2133] text-slate-300 hover:bg-[#232c40]'
            }`}
          >
            <Cog className="w-3.5 h-3.5" />
            <span>Precision Spares</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              filters.type === 'spare_part' ? 'bg-black/30 text-white' : 'bg-[#0f1422] text-slate-400'
            }`}>
              {totalSparesCount}
            </span>
          </button>
        </div>

        {/* Dropdown Filters (Make, Condition, Sort, Stock) */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Make Filter */}
          <div className="flex items-center gap-1.5 bg-[#0e1422] border border-[#232c40] rounded-lg px-2.5 py-1.5">
            <span className="text-slate-400">Make:</span>
            <select
              id="filter-make-select"
              value={filters.make}
              onChange={(e) => onFilterChange({ ...filters, make: e.target.value })}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#141a29] text-white">All Makes</option>
              {availableMakes.map((m) => (
                <option key={m} value={m} className="bg-[#141a29] text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div className="flex items-center gap-1.5 bg-[#0e1422] border border-[#232c40] rounded-lg px-2.5 py-1.5">
            <span className="text-slate-400">Condition:</span>
            <select
              id="filter-condition-select"
              value={filters.condition}
              onChange={(e) => onFilterChange({ ...filters, condition: e.target.value })}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#141a29] text-white">All Conditions</option>
              <option value="Brand New OEM" className="bg-[#141a29] text-white">Brand New OEM</option>
              <option value="Certified Pre-Owned" className="bg-[#141a29] text-white">Certified Pre-Owned</option>
              <option value="Factory Reconditioned" className="bg-[#141a29] text-white">Factory Reconditioned</option>
              <option value="Competition Spec" className="bg-[#141a29] text-white">Competition Spec</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 bg-[#0e1422] border border-[#232c40] rounded-lg px-2.5 py-1.5">
            <ArrowUpDown className="w-3 h-3 text-[#ea580c]" />
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#141a29] text-white">Featured Priority</option>
              <option value="price-asc" className="bg-[#141a29] text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-[#141a29] text-white">Price: High to Low</option>
              <option value="name-asc" className="bg-[#141a29] text-white">Model / Part Name</option>
            </select>
          </div>

          {/* Stock Only Toggle (Dark Green highlight for in-stock guarantee) */}
          <button
            id="filter-in-stock-toggle"
            onClick={() => onFilterChange({ ...filters, stockOnly: !filters.stockOnly })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              filters.stockOnly
                ? 'bg-[#14532d]/40 text-[#4ade80] border-[#166534]'
                : 'bg-[#0e1422] text-slate-400 border-[#232c40] hover:text-slate-200'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${filters.stockOnly ? 'bg-[#22c55e]' : 'bg-slate-500'}`} />
            Immediate Dispatch / On Display
          </button>

          {/* Reset Filters CTA if any active */}
          {hasActiveFilters && (
            <button
              id="reset-filters-btn"
              onClick={resetAllFilters}
              className="text-xs text-[#ea580c] hover:text-[#f97316] underline font-medium px-1 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
