export type ItemType = 'vehicle' | 'spare_part';

export type NavigationPage = 
  | 'home' 
  | 'all_inventory'
  | 'vehicles' 
  | 'spare_parts' 
  | 'services' 
  | 'about' 
  | 'contact';

export type VehicleBodyStyle = 
  | 'Sedan' 
  | 'SUV' 
  | 'Coupe' 
  | 'Electric' 
  | 'Truck / All-Terrain'
  | 'Hatchback';

export type SparePartCategory =
  | 'Engine Parts'
  | 'Brake System'
  | 'Suspension & Steering'
  | 'Transmission'
  | 'Cooling System'
  | 'Electrical & Lighting'
  | 'Exhaust System'
  | 'Filters'
  | 'Body Parts'
  | 'Interior & Accessories'
  | 'Tyres & Wheels'
  | 'Batteries'
  | 'Fluids & Lubricants'
  // Legacy aliases for backward compatibility
  | 'Brakes & Rotors'
  | 'Engine Components'
  | 'Transmission & Drivetrain'
  | 'Turbochargers'
  | 'Exhaust Components'
  | 'Batteries & Charging'
  | 'Body & Exterior Parts';

export interface SpecificationItem {
  label: string;
  value: string;
}

export interface VehicleRecord {
  id: string;
  type: 'vehicle';
  manufacturer: string; // e.g. Toyota, Mercedes-Benz, BMW, Tesla, Honda
  model: string;        // e.g. Land Cruiser, Camry, GLE 450, 3 Series
  title: string;        // e.g. 2024 Toyota Land Cruiser 250 First Edition
  year: number;
  trim: string;         // e.g. VXR, AMG Line, XSE, Long Range
  bodyStyle: VehicleBodyStyle;
  priceDisplay: string; // e.g. ₦135,000,000 or Price on Request
  priceNumeric: number;
  mileage: string;
  engine: string;
  horsepower: string;
  transmission: string;
  fuelType: 'Gasoline' | 'Electric' | 'Hybrid' | 'Diesel';
  drivetrain: string;
  condition?: string;   // e.g. Brand New, Foreign Used (Tokunbo)
  keySpecifications: SpecificationItem[];
  description: string;
  images: string[];
  availabilityStatus: string; // e.g. "Available on Request • Enquire for Allocation"
}

export interface SparePartRecord {
  id: string;
  type: 'spare_part';
  partName: string;
  category: SparePartCategory;
  partNumber: string;
  priceDisplay: string; // e.g. ₦45,000 or Price on Request
  priceNumeric: number;
  description: string;
  compatibleVehicles: string[];
  condition?: string;   // e.g. Brand New OEM, Premium Aftermarket
  specifications: SpecificationItem[];
  images: string[];
  availabilityStatus: string;
  manufacturerBrand?: string;
}

export type CatalogueItem = VehicleRecord | SparePartRecord;

export type EnquiryContactPref = 'Phone Call' | 'WhatsApp' | 'Email';
export type EnquiryType = 
  | 'Vehicle Enquiry'
  | 'Spare Part Enquiry'
  | 'Spare Parts Enquiry'
  | 'Custom Part Sourcing'
  | 'Parts Sourcing'
  | 'Delivery'
  | 'Service Enquiry'
  | 'General Enquiry'
  | 'Compatibility / Fitment Enquiry'
  | 'Price & Availability Enquiry'
  | 'Vehicle Inspection Booking'
  | 'Vehicle Viewing / Enquiry'
  | 'General Sourcing Request';

export interface EnquirySubmission {
  id: string;
  referenceNumber: string;
  createdAt: string;
  itemId?: string;
  itemTitle?: string;
  itemSkuOrPartNum?: string;
  itemType?: ItemType | 'general' | 'service';
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vinOrChassis?: string;
  partRequired?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  contactPreference: EnquiryContactPref;
  enquiryType: EnquiryType;
  message: string;
  status: 'Submitted' | 'Under Review' | 'Awaiting Confirmation' | 'Responded' | 'Completed' | 'Received • Pending Review' | 'Under Review by Advisor' | 'Response Sent';
}

export interface PartRequestSubmission {
  id: string;
  referenceNumber: string;
  createdAt: string;
  clientName: string;
  clientPhone: string;
  clientWhatsApp: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vinOrChassis?: string;
  engineVariant?: string;
  partRequired: string;
  partNumber?: string;
  conditionPreference: 'Brand New (OEM)' | 'Foreign Used (Tokunbo)' | 'Aftermarket Replacement' | 'Certified Aftermarket' | 'Any Available';
  additionalInfo?: string;
  photoUrl?: string;
  status: 'Submitted' | 'Under Review' | 'Awaiting Confirmation' | 'Responded' | 'Completed';
}

export interface FilterState {
  searchQuery: string;
  type: 'all' | ItemType;
  category: string;
  make: string;
  condition: string;
  stockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
}

export interface VehicleFilterState {
  searchQuery: string;
  manufacturer: string;
  bodyStyle: string;
  minYear?: number;
  maxYear?: number;
  fuelType: string;
  priceSort: 'default' | 'price-asc' | 'price-desc' | 'year-desc';
}

export interface SparePartFilterState {
  searchQuery: string;
  category: string;
  compatibilityQuery: string;
  priceSort: 'default' | 'price-asc' | 'price-desc';
}
