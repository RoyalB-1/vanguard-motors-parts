import { VehicleRecord, SparePartRecord, EnquirySubmission } from '../types';
import brakePadsImg from '../assets/images/brake_pads_set_1789992797678.jpg';
import brakeRotorsImg from '../assets/images/brake_rotors_pair_1789992814950.jpg';
import sparkPlugsImg from '../assets/images/spark_plugs_set_1789992828359.jpg';
import timingChainImg from '../assets/images/timing_chain_kit_1789992840447.jpg';
import engineOilFilterImg from '../assets/images/engine_oil_filter_1789992858130.jpg';
import cabinAirFilterImg from '../assets/images/cabin_air_filter_1789992869769.jpg';
import suspensionStrutImg from '../assets/images/suspension_strut_1789992886285.jpg';
import ledHeadlightImg from '../assets/images/led_headlight_1789992901028.jpg';
import autoAlternatorImg from '../assets/images/auto_alternator_1789992921127.jpg';
import autoRadiatorImg from '../assets/images/auto_radiator_1789992937151.jpg';
import transFilterKitImg from '../assets/images/trans_filter_kit_1789992951029.jpg';
import turbochargerUnitImg from '../assets/images/turbocharger_unit_1789992963751.jpg';
import exhaustMufflerImg from '../assets/images/exhaust_muffler_1789992977865.jpg';
import carBatteryAgmImg from '../assets/images/car_battery_agm_1789992990075.jpg';
import carSideMirrorImg from '../assets/images/car_side_mirror_1789993005049.jpg';
import sparePartFallbackImg from '../assets/images/spare_part_fallback_1789993019566.jpg';

export const DEFAULT_SPARE_PART_IMAGE = sparePartFallbackImg;
export const DEFAULT_VEHICLE_IMAGE = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80';

export const SAMPLE_VEHICLES: VehicleRecord[] = [
  // --- TESLA ---
  {
    id: 'veh-tesla-01',
    type: 'vehicle',
    manufacturer: 'Tesla',
    model: 'Model 3',
    title: '2024 Tesla Model 3 Long Range AWD',
    year: 2024,
    trim: 'Long Range Dual Motor',
    bodyStyle: 'Sedan',
    priceDisplay: '₦48,500,000',
    priceNumeric: 48500000,
    mileage: 'Brand New (15 km)',
    engine: 'Dual Electric Motors (AWD)',
    horsepower: '394 HP',
    transmission: 'Single-Speed Fixed Gear',
    fuelType: 'Electric',
    drivetrain: 'Dual Motor All-Wheel Drive',
    keySpecifications: [
      { label: 'EPA Range', value: '341 Miles Est.' },
      { label: '0-60 mph', value: '4.2 Seconds' },
      { label: 'Top Speed', value: '125 mph' },
      { label: 'Charging Rate', value: 'Up to 250 kW Supercharging' },
      { label: 'Seating', value: '5 Passengers' },
      { label: 'Cargo Volume', value: '24.1 cu ft' }
    ],
    description: 'Updated Model 3 featuring redesigned front fascia, acoustic 360-degree glass, ambient interior lighting, and rear 8-inch passenger display screen.',
    images: [
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-tesla-02',
    type: 'vehicle',
    manufacturer: 'Tesla',
    model: 'Model Y',
    title: '2024 Tesla Model Y Long Range Dual Motor',
    year: 2024,
    trim: 'Long Range AWD',
    bodyStyle: 'SUV',
    priceDisplay: '₦54,000,000',
    priceNumeric: 54000000,
    mileage: 'Brand New (22 km)',
    engine: 'Dual AC Electric Motors',
    horsepower: '384 HP',
    transmission: 'Single-Speed Fixed Gear',
    fuelType: 'Electric',
    drivetrain: 'All-Wheel Drive (AWD)',
    keySpecifications: [
      { label: 'EPA Range', value: '310 Miles Est.' },
      { label: '0-60 mph', value: '4.8 Seconds' },
      { label: 'Cargo Space', value: '76.2 cu ft Max' },
      { label: 'Towing Capacity', value: '3,500 lbs' },
      { label: 'Wheels', value: '19-inch Gemini Dark' }
    ],
    description: 'Midsize all-electric crossover SUV with elevated seating position, panoramic all-glass roof, expansive cargo versatility, and Supercharger compatibility.',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-tesla-03',
    type: 'vehicle',
    manufacturer: 'Tesla',
    model: 'Model S',
    title: '2024 Tesla Model S Dual Motor AWD',
    year: 2024,
    trim: 'Dual Motor All-Wheel Drive',
    bodyStyle: 'Sedan',
    priceDisplay: '₦82,000,000',
    priceNumeric: 82000000,
    mileage: 'Brand New (45 km)',
    engine: 'Dual AC Permanent Magnet Motors',
    horsepower: '670 HP',
    transmission: 'Single-Speed Fixed Gear',
    fuelType: 'Electric',
    drivetrain: 'All-Wheel Drive (AWD)',
    keySpecifications: [
      { label: 'EPA Range', value: '402 Miles Est.' },
      { label: '0-60 mph', value: '3.1 Seconds' },
      { label: 'Top Speed', value: '130 mph' },
      { label: 'Suspension', value: 'Adaptive Air Suspension' },
      { label: 'Display', value: '17-inch Cinematic Touchscreen' }
    ],
    description: 'Flagship electric luxury liftback sedan offering extensive driving range, tri-zone climate controls, wireless gaming console capability, and aerodynamic efficiency.',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-tesla-04',
    type: 'vehicle',
    manufacturer: 'Tesla',
    model: 'Model X',
    title: '2024 Tesla Model X Dual Motor AWD',
    year: 2024,
    trim: 'Dual Motor All-Wheel Drive',
    bodyStyle: 'SUV',
    priceDisplay: '₦95,000,000',
    priceNumeric: 95000000,
    mileage: 'Showroom Demo (30 mi)',
    engine: 'Dual High-Output Electric Motors',
    horsepower: '670 HP',
    transmission: 'Single-Speed Fixed Gear',
    fuelType: 'Electric',
    drivetrain: 'All-Wheel Drive (AWD)',
    keySpecifications: [
      { label: 'EPA Range', value: '335 Miles Est.' },
      { label: '0-60 mph', value: '3.8 Seconds' },
      { label: 'Doors', value: 'Falcon Wing Rear Doors' },
      { label: 'Towing Capacity', value: '5,000 lbs' },
      { label: 'Windshield', value: 'Panoramic Windshield' }
    ],
    description: 'Premium three-row electric SUV equipped with signature articulating Falcon Wing rear doors, generous towing threshold, and adaptive air suspension.',
    images: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },

  // --- BMW ---
  {
    id: 'veh-bmw-01',
    type: 'vehicle',
    manufacturer: 'BMW',
    model: '3 Series',
    title: '2024 BMW 330i xDrive Sedan',
    year: 2024,
    trim: '330i xDrive Sport Line',
    bodyStyle: 'Sedan',
    priceDisplay: '₦56,000,000',
    priceNumeric: 56000000,
    mileage: 'Demo (850 mi)',
    engine: '2.0L TwinPower Turbo 4-Cylinder',
    horsepower: '255 HP @ 5,000-6,500 RPM',
    transmission: '8-Speed Sport Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'xDrive Intelligent All-Wheel Drive',
    keySpecifications: [
      { label: 'Torque', value: '295 lb-ft @ 1,550 RPM' },
      { label: '0-60 mph', value: '5.4 Seconds' },
      { label: 'Fuel Economy', value: '24 City / 33 Hwy MPG' },
      { label: 'Display', value: 'BMW Curved Display (iDrive 8.5)' },
      { label: 'Wheels', value: '18-inch V-Spoke Alloy' }
    ],
    description: 'Benchmark sports sedan pairing a turbocharged 2.0L powertrain with BMW xDrive all-weather traction and BMW Curved Display interface.',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-bmw-02',
    type: 'vehicle',
    manufacturer: 'BMW',
    model: '5 Series',
    title: '2024 BMW 540i xDrive Sedan',
    year: 2024,
    trim: '540i xDrive Executive',
    bodyStyle: 'Sedan',
    priceDisplay: '₦78,000,000',
    priceNumeric: 78000000,
    mileage: 'Demo (1,200 mi)',
    engine: '3.0L BMW TwinPower Turbo Inline-6 + 48V Mild Hybrid',
    horsepower: '375 HP',
    transmission: '8-Speed Steptronic Sport Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'xDrive All-Wheel Drive',
    keySpecifications: [
      { label: 'Torque', value: '384 lb-ft @ 1,850 RPM' },
      { label: '0-60 mph', value: '4.4 Seconds' },
      { label: 'Cockpit', value: 'Interaction Bar with Ambient Lighting' },
      { label: 'Audio', value: 'Harman Kardon Premium Sound' },
      { label: 'Sunroof', value: 'Sky Lounge Panoramic Glass' }
    ],
    description: 'Next-generation executive sedan with 48V mild hybrid technology, illuminated kidney grille contour, and BMW Interaction Bar.',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-bmw-03',
    type: 'vehicle',
    manufacturer: 'BMW',
    model: 'X3',
    title: '2024 BMW X3 xDrive30i',
    year: 2024,
    trim: 'xDrive30i M Sport',
    bodyStyle: 'SUV',
    priceDisplay: '₦92,000,000',
    priceNumeric: 92000000,
    mileage: 'Demo (640 mi)',
    engine: '2.0L 4-Cylinder TwinPower Turbo',
    horsepower: '248 HP',
    transmission: '8-Speed Automatic Transmission',
    fuelType: 'Gasoline',
    drivetrain: 'xDrive All-Wheel Drive',
    keySpecifications: [
      { label: 'Torque', value: '258 lb-ft' },
      { label: 'Cargo Volume', value: '28.7 / 62.7 cu ft' },
      { label: '0-60 mph', value: '6.0 Seconds' },
      { label: 'Ground Clearance', value: '8.0 Inches' },
      { label: 'Roof Rails', value: 'Satin Aluminum Roof Rails' }
    ],
    description: 'Compact luxury Sports Activity Vehicle engineered for agility and everyday practicality with split-folding rear seats and driver assistance suite.',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-bmw-04',
    type: 'vehicle',
    manufacturer: 'BMW',
    model: 'X5',
    title: '2024 BMW X5 xDrive40i',
    year: 2024,
    trim: 'xDrive40i Premium Package',
    bodyStyle: 'SUV',
    priceDisplay: '₦118,000,000',
    priceNumeric: 118000000,
    mileage: 'Demo (980 mi)',
    engine: '3.0L Inline 6-Cylinder TwinPower Turbo',
    horsepower: '375 HP',
    transmission: '8-Speed Sport Automatic with Paddle Shifters',
    fuelType: 'Gasoline',
    drivetrain: 'xDrive All-Wheel Drive',
    keySpecifications: [
      { label: 'Torque', value: '398 lb-ft' },
      { label: '0-60 mph', value: '5.2 Seconds' },
      { label: 'Towing Capacity', value: '7,200 lbs Max' },
      { label: 'Tailgate', value: 'Split Two-Section Electric Tailgate' },
      { label: 'Seating', value: 'Sensafin Upholstery with Heated Front Seats' }
    ],
    description: 'Midsize luxury utility vehicle equipped with signature split rear tailgate, robust 7,200 lbs towing capability, and refined iDrive infotainment.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },

  // --- TOYOTA ---
  {
    id: 'veh-toyota-01',
    type: 'vehicle',
    manufacturer: 'Toyota',
    model: 'Camry',
    title: '2025 Toyota Camry XSE Hybrid',
    year: 2025,
    trim: 'XSE Hybrid Electronic On-Demand AWD',
    bodyStyle: 'Sedan',
    priceDisplay: '₦42,000,000',
    priceNumeric: 42000000,
    mileage: 'New Demo (25 mi)',
    engine: '2.5L 4-Cylinder Gas/Electric Hybrid',
    horsepower: '232 Combined Net HP',
    transmission: 'Electronically Controlled eCVT',
    fuelType: 'Hybrid',
    drivetrain: 'Electronic On-Demand All-Wheel Drive',
    keySpecifications: [
      { label: 'Fuel Economy', value: '44 City / 43 Hwy MPG Est.' },
      { label: 'Wheels', value: '19-inch Smoke Gray Alloy Wheels' },
      { label: 'Safety', value: 'Toyota Safety Sense 3.0 Standard' },
      { label: 'Touchscreen', value: '12.3-inch Toyota Audio Multimedia' },
      { label: 'Upholstery', value: 'Leather-Trimmed Interior' }
    ],
    description: 'Redesigned ninth-generation Camry with dedicated hybrid powertrain, standard dual digital displays, and sport-tuned suspension.',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-toyota-02',
    type: 'vehicle',
    manufacturer: 'Toyota',
    model: 'Corolla',
    title: '2024 Toyota Corolla XSE',
    year: 2024,
    trim: 'XSE 2.0L Sedan',
    bodyStyle: 'Sedan',
    priceDisplay: '₦32,500,000',
    priceNumeric: 32500000,
    mileage: 'New Demo (10 mi)',
    engine: '2.0L 4-Cylinder Dynamic Force',
    horsepower: '169 HP @ 6,600 RPM',
    transmission: 'Dynamic-Shift CVT with Paddle Shifters',
    fuelType: 'Gasoline',
    drivetrain: 'Front-Wheel Drive (FWD)',
    keySpecifications: [
      { label: 'Torque', value: '151 lb-ft' },
      { label: 'Fuel Economy', value: '31 City / 40 Hwy MPG' },
      { label: 'Lighting', value: 'LED Headlights with DRL Accents' },
      { label: 'Cluster', value: '7-inch Fully Digital Gauge Display' },
      { label: 'Safety', value: 'Pre-Collision System with Pedestrian Detection' }
    ],
    description: 'Dependable compact sedan featuring sport suspension tuning, digital instrument cluster, and proven fuel efficiency.',
    images: [
      'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-toyota-03',
    type: 'vehicle',
    manufacturer: 'Toyota',
    model: 'RAV4',
    title: '2024 Toyota RAV4 Hybrid XSE',
    year: 2024,
    trim: 'Hybrid XSE AWD Two-Tone',
    bodyStyle: 'SUV',
    priceDisplay: '₦46,000,000',
    priceNumeric: 46000000,
    mileage: 'New Demo (18 mi)',
    engine: '2.5L 4-Cylinder Hybrid System',
    horsepower: '219 Combined Net HP',
    transmission: 'Electronically Controlled eCVT',
    fuelType: 'Hybrid',
    drivetrain: 'Electronic On-Demand All-Wheel Drive',
    keySpecifications: [
      { label: 'Fuel Economy', value: '41 City / 38 Hwy MPG' },
      { label: 'Roof', value: 'Two-Tone Midnight Black Metallic Roof' },
      { label: 'Cargo Space', value: '37.5 cu ft Behind 2nd Row' },
      { label: 'Wheels', value: '18-inch Black-Painted Alloy Wheels' },
      { label: 'Clearance', value: '8.1-inch Ground Clearance' }
    ],
    description: 'Best-selling hybrid crossover combining elevated ground clearance, electronic AWD rear motor traction, and modern two-tone exterior styling.',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-toyota-04',
    type: 'vehicle',
    manufacturer: 'Toyota',
    model: 'Land Cruiser',
    title: '2024 Toyota Land Cruiser 250 Series',
    year: 2024,
    trim: 'First Edition i-FORCE MAX 4WD',
    bodyStyle: 'Truck / All-Terrain',
    priceDisplay: '₦145,000,000',
    priceNumeric: 145000000,
    mileage: 'Showroom Demo (50 mi)',
    engine: 'i-FORCE MAX 2.4L Turbocharged Hybrid Powertrain',
    horsepower: '326 HP',
    transmission: '8-Speed Direct Shift Automatic',
    fuelType: 'Hybrid',
    drivetrain: 'Full-Time 4WD with Center & Rear Locking Differentials',
    keySpecifications: [
      { label: 'Torque', value: '465 lb-ft @ 1,700 RPM' },
      { label: 'Towing Capacity', value: '6,000 lbs Max' },
      { label: 'Off-Road', value: 'Multi-Terrain Select & CRAWL Control' },
      { label: 'Sway Bar', value: 'Front Stabilizer Disconnect Mechanism (SDM)' },
      { label: 'Lighting', value: 'Heritage Heritage Round LED Headlamps' }
    ],
    description: 'Reimagined Land Cruiser 250 built on the TNGA-F global truck platform with standard rear electronic locker and high-torque hybrid powertrain.',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },

  // --- MERCEDES-BENZ ---
  {
    id: 'veh-mb-01',
    type: 'vehicle',
    manufacturer: 'Mercedes-Benz',
    model: 'C-Class',
    title: '2024 Mercedes-Benz C 300 4MATIC Sedan',
    year: 2024,
    trim: 'C 300 4MATIC AMG Line',
    bodyStyle: 'Sedan',
    priceDisplay: '₦72,000,000',
    priceNumeric: 72000000,
    mileage: 'Brand New (30 km)',
    engine: '2.0L Inline-4 Turbo with Mild Hybrid ISG',
    horsepower: '255 HP + 20 HP EQ Boost',
    transmission: '9G-TRONIC 9-Speed Automatic',
    fuelType: 'Gasoline',
    drivetrain: '4MATIC All-Wheel Drive',
    keySpecifications: [
      { label: 'Torque', value: '295 lb-ft' },
      { label: '0-60 mph', value: '5.9 Seconds' },
      { label: 'Display', value: '11.9-inch Portrait Central Touchscreen' },
      { label: 'Sound', value: 'Burmester 3D Surround Sound System' },
      { label: 'Assistance', value: 'Active Brake Assist & Blind Spot Monitoring' }
    ],
    description: 'Compact executive luxury sedan featuring vertical touchscreen cockpit, mild hybrid integrated starter generator, and AMG styling package.',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-mb-02',
    type: 'vehicle',
    manufacturer: 'Mercedes-Benz',
    model: 'E-Class',
    title: '2024 Mercedes-Benz E 350 4MATIC Sedan',
    year: 2024,
    trim: 'E 350 4MATIC Pinnacle Trim',
    bodyStyle: 'Sedan',
    priceDisplay: '₦98,000,000',
    priceNumeric: 98000000,
    mileage: 'Brand New (18 km)',
    engine: '2.0L Turbo 4-Cylinder with EQ Boost',
    horsepower: '255 HP',
    transmission: '9G-TRONIC 9-Speed Automatic',
    fuelType: 'Gasoline',
    drivetrain: '4MATIC All-Wheel Drive',
    keySpecifications: [
      { label: 'Torque', value: '295 lb-ft' },
      { label: 'Cockpit', value: 'MBUX Superscreen with Passenger Display' },
      { label: 'Lighting', value: 'Active Ambient Lighting with Sound Visualization' },
      { label: 'Suspension', value: 'AGILITY CONTROL with Selective Damping' },
      { label: 'Connectivity', value: '5G Communication Module' }
    ],
    description: 'All-new W214 E-Class equipped with optional MBUX Superscreen, flush door handles, and advanced digital cabin integration.',
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-mb-03',
    type: 'vehicle',
    manufacturer: 'Mercedes-Benz',
    model: 'GLC',
    title: '2024 Mercedes-Benz GLC 300 4MATIC SUV',
    year: 2024,
    trim: 'GLC 300 4MATIC Exclusive Trim',
    bodyStyle: 'SUV',
    priceDisplay: '₦85,000,000',
    priceNumeric: 85000000,
    mileage: 'Brand New (24 km)',
    engine: '2.0L Turbo 4-Cylinder with 48V Mild Hybrid',
    horsepower: '255 HP',
    transmission: '9G-TRONIC 9-Speed Automatic',
    fuelType: 'Gasoline',
    drivetrain: '4MATIC Permanent All-Wheel Drive',
    keySpecifications: [
      { label: 'Torque', value: '295 lb-ft' },
      { label: 'Cargo Capacity', value: '21.9 / 59.3 cu ft' },
      { label: 'Roof', value: 'Panorama Sunroof' },
      { label: 'Parking', value: 'PARKTRONIC with Active Parking Assist' },
      { label: 'Camera', value: 'Transparent Hood Virtual Off-Road View' }
    ],
    description: 'Versatile midsize luxury SUV with standard 4MATIC all-wheel drive, mild-hybrid smoothness, and spacious second-row legroom.',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-mb-04',
    type: 'vehicle',
    manufacturer: 'Mercedes-Benz',
    model: 'GLE',
    title: '2024 Mercedes-Benz GLE 450 4MATIC SUV',
    year: 2024,
    trim: 'GLE 450 4MATIC AMG Line Exterior',
    bodyStyle: 'SUV',
    priceDisplay: '₦112,000,000',
    priceNumeric: 112000000,
    mileage: 'Demo (1,450 mi)',
    engine: '3.0L Inline-6 Turbo with 48V Integrated Starter-Generator',
    horsepower: '375 HP',
    transmission: '9G-TRONIC Automatic',
    fuelType: 'Gasoline',
    drivetrain: '4MATIC Fully Variable All-Wheel Drive',
    keySpecifications: [
      { label: 'Torque', value: '369 lb-ft' },
      { label: 'Towing Rating', value: '7,700 lbs' },
      { label: '0-60 mph', value: '5.3 Seconds' },
      { label: 'Third Row', value: 'Available 7-Seat Configuration' },
      { label: 'Wheels', value: '20-inch AMG 5-Spoke Alloys' }
    ],
    description: 'Full-size luxury SUV offering confident 6-cylinder performance, 7,700 lbs towing capacity, and dual 12.3-inch widescreen displays.',
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },

  // --- HONDA ---
  {
    id: 'veh-honda-01',
    type: 'vehicle',
    manufacturer: 'Honda',
    model: 'Civic',
    title: '2024 Honda Civic Touring Sedan',
    year: 2024,
    trim: 'Touring 1.5L Turbo',
    bodyStyle: 'Sedan',
    priceDisplay: '₦29,500,000',
    priceNumeric: 29500000,
    mileage: 'Demo (400 mi)',
    engine: '1.5L In-Line 4-Cylinder with Turbocharger',
    horsepower: '180 HP @ 6,000 RPM',
    transmission: 'Continuously Variable Transmission (LL-CVT)',
    fuelType: 'Gasoline',
    drivetrain: 'Front-Wheel Drive (FWD)',
    keySpecifications: [
      { label: 'Torque', value: '177 lb-ft @ 1,700-4,500 RPM' },
      { label: 'Fuel Economy', value: '31 City / 38 Hwy MPG' },
      { label: 'Audio', value: 'Bose 12-Speaker Premium Sound' },
      { label: 'Display', value: '9-inch Color Touchscreen with Wireless CarPlay' },
      { label: 'Safety', value: 'Honda Sensing Safety Suite' }
    ],
    description: 'Top-trim Civic sedan equipped with leather-trimmed seating, wireless smartphone charging, Bose premium audio, and turbocharged responsiveness.',
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-honda-02',
    type: 'vehicle',
    manufacturer: 'Honda',
    model: 'Accord',
    title: '2024 Honda Accord Touring Hybrid',
    year: 2024,
    trim: 'Touring 2.0L Hybrid',
    bodyStyle: 'Sedan',
    priceDisplay: '₦42,000,000',
    priceNumeric: 42000000,
    mileage: 'Demo (610 mi)',
    engine: '2.0L 4-Cylinder Two-Motor Hybrid System',
    horsepower: '204 Combined System HP',
    transmission: 'Electronic Continuously Variable Transmission (E-CVT)',
    fuelType: 'Hybrid',
    drivetrain: 'Front-Wheel Drive (FWD)',
    keySpecifications: [
      { label: 'Torque', value: '247 lb-ft' },
      { label: 'Fuel Economy', value: '46 City / 41 Hwy MPG' },
      { label: 'Tech', value: 'Google Built-in (Google Maps & Assistant)' },
      { label: 'Head-Up Display', value: '6-inch Color Head-Up Display (HUD)' },
      { label: 'Seats', value: 'Ventilated & Heated Front Leather Seats' }
    ],
    description: 'Midsize hybrid flagship sedan featuring Google built-in connectivity, head-up display, active noise cancellation, and quiet electric-mode cruising.',
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-honda-03',
    type: 'vehicle',
    manufacturer: 'Honda',
    model: 'CR-V',
    title: '2024 Honda CR-V Sport Touring Hybrid',
    year: 2024,
    trim: 'Sport Touring Real Time AWD',
    bodyStyle: 'SUV',
    priceDisplay: '₦45,500,000',
    priceNumeric: 45500000,
    mileage: 'Demo (550 mi)',
    engine: '2.0L 4-Cylinder Hybrid with Real Time AWD',
    horsepower: '204 Combined Net HP',
    transmission: 'Electronic Continuously Variable Transmission',
    fuelType: 'Hybrid',
    drivetrain: 'Real Time AWD with Intelligent Control System',
    keySpecifications: [
      { label: 'Fuel Economy', value: '40 City / 34 Hwy MPG' },
      { label: 'Cargo Space', value: '39.3 / 76.5 cu ft' },
      { label: 'Tailgate', value: 'Hands-Free Access Power Tailgate' },
      { label: 'Wheels', value: '19-inch Gloss Black Alloys' },
      { label: 'Roof', value: 'One-Touch Power Moonroof' }
    ],
    description: 'Practical family crossover with mechanical all-wheel drive, dual-motor hybrid efficiency, hands-free power tailgate, and spacious cargo volume.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  },
  {
    id: 'veh-honda-04',
    type: 'vehicle',
    manufacturer: 'Honda',
    model: 'Pilot',
    title: '2024 Honda Pilot TrailSport AWD',
    year: 2024,
    trim: 'TrailSport 3.5L V6 AWD',
    bodyStyle: 'SUV',
    priceDisplay: '₦68,000,000',
    priceNumeric: 68000000,
    mileage: 'Demo (880 mi)',
    engine: '3.5L 24-Valve DOHC V6 Engine',
    horsepower: '285 HP @ 6,100 RPM',
    transmission: '10-Speed Automatic Transmission',
    fuelType: 'Gasoline',
    drivetrain: 'i-VTM4 All-Wheel-Drive System',
    keySpecifications: [
      { label: 'Torque', value: '262 lb-ft @ 5,000 RPM' },
      { label: 'Towing Capacity', value: '5,000 lbs Max' },
      { label: 'Suspension', value: 'Off-Road Tuned Suspension (+1.0 in Lift)' },
      { label: 'Skid Plates', value: 'Steel Skid Plates (Engine & Fuel Tank)' },
      { label: 'Tires', value: 'Continental TerrainContact All-Terrain Tires' }
    ],
    description: 'Rugged three-row family utility vehicle with off-road suspension lift, steel underbody skid plates, TrailWatch camera system, and i-VTM4 torque vectoring.',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    availabilityStatus: 'Available on Request • Lagos Inspection Available'
  }
];

export const SAMPLE_SPARE_PARTS: SparePartRecord[] = [
  // 1. Brakes & Rotors
  {
    id: 'part-brk-01',
    type: 'spare_part',
    partName: 'Ceramic Composite Brake Pad Set (Front Axle)',
    category: 'Brakes & Rotors',
    partNumber: 'BP-8842-CER',
    manufacturerBrand: 'Vanguard Precision Spares Spec',
    priceDisplay: '₦48,000',
    priceNumeric: 48000,
    description: 'Low-dust, noise-dampened ceramic composite brake friction pads engineered for consistent thermal coefficient and extended rotor life.',
    compatibleVehicles: [
      'BMW 3 Series (G20, 2019-2024)',
      'BMW 5 Series (G30/G60, 2018-2024)',
      'BMW X3 (G01, 2018-2024)'
    ],
    specifications: [
      { label: 'Pad Material', value: 'Ceramic Formulation' },
      { label: 'Axle Placement', value: 'Front Left & Right' },
      { label: 'Backing Plate', value: 'Anti-Corrosion Powder Coated' },
      { label: 'Hardware Included', value: 'Yes (Stainless Shims & Clips)' }
    ],
    images: [brakePadsImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },
  {
    id: 'part-brk-02',
    type: 'spare_part',
    partName: 'Vented Slotted Front Brake Rotors Pair (340mm)',
    category: 'Brakes & Rotors',
    partNumber: 'BR-4410-SLT',
    manufacturerBrand: 'Vanguard Precision Spares Spec',
    priceDisplay: '₦85,000',
    priceNumeric: 85000,
    description: 'High-carbon metallurgy brake discs with directional ventilation vanes and curved slots to expel gas and prevent brake fade under repeated braking.',
    compatibleVehicles: [
      'Toyota Camry (2018-2025)',
      'Toyota RAV4 (2019-2024)',
      'Mercedes-Benz C-Class (W206, 2022-2024)'
    ],
    specifications: [
      { label: 'Diameter', value: '340 mm' },
      { label: 'Thickness', value: '30 mm Nominal' },
      { label: 'Ventilation', value: 'Internal Curved Vanes' },
      { label: 'Bolt Pattern', value: '5 x 114.3 / 5 x 112 Compatible' }
    ],
    images: [brakeRotorsImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },

  // 2. Engine Components
  {
    id: 'part-eng-01',
    type: 'spare_part',
    partName: 'Iridium Platinum Fine-Wire Spark Plug Set (Pack of 4)',
    category: 'Engine Components',
    partNumber: 'SP-9920-IRID',
    manufacturerBrand: 'Vanguard Ignition Series',
    priceDisplay: '₦32,000',
    priceNumeric: 32000,
    description: '0.6mm laser-welded iridium center electrode with platinum ground pad providing consistent ignitability and corrosion resistance over long maintenance intervals.',
    compatibleVehicles: [
      'Honda Civic (1.5L Turbo / 2.0L, 2016-2024)',
      'Honda Accord (1.5T / 2.0T, 2018-2024)',
      'Toyota Corolla (2.0L, 2019-2024)'
    ],
    specifications: [
      { label: 'Electrode Material', value: 'Laser-Welded Iridium / Platinum' },
      { label: 'Thread Diameter', value: '14 mm' },
      { label: 'Thread Pitch', value: '1.25 mm' },
      { label: 'Pre-gapped', value: '0.044 in (1.1 mm)' }
    ],
    images: [sparkPlugsImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },
  {
    id: 'part-eng-02',
    type: 'spare_part',
    partName: 'Timing Chain & Hydraulic Tensioner Master Kit',
    category: 'Engine Components',
    partNumber: 'TC-5012-KIT',
    manufacturerBrand: 'Vanguard Valvetrain Spec',
    priceDisplay: '₦135,000',
    priceNumeric: 135000,
    description: 'Complete overhead cam timing drive kit including reinforced link chain, hydraulic tensioner, nylon guide rails, and crank sprocket.',
    compatibleVehicles: [
      'BMW 3 Series & 5 Series (B48/B58 2.0L / 3.0L Engines)',
      'BMW X3 & X5 (2018-2024)'
    ],
    specifications: [
      { label: 'Components', value: 'Primary Chain, Tensioner, 3x Guides, Seals' },
      { label: 'Tensile Strength', value: 'High-Strength Heat-Treated Steel' }
    ],
    images: [timingChainImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },

  // 3. Filters
  {
    id: 'part-flt-01',
    type: 'spare_part',
    partName: 'High-Efficiency Engine Oil Filter Cartridge',
    category: 'Filters',
    partNumber: 'FL-OF-3321',
    manufacturerBrand: 'Vanguard Filtration Line',
    priceDisplay: '₦18,500',
    priceNumeric: 18500.5,
    description: 'Synthetic blend pleated filter media designed to capture particulates down to 20 microns while maintaining oil pressure across extended service intervals.',
    compatibleVehicles: [
      'BMW 3 Series, 5 Series, X3, X5 (B48/B58 Engines)',
      'Toyota Land Cruiser & RAV4 (A25A / Dynamic Force)',
      'Mercedes-Benz C-Class & GLC (M254 Engines)'
    ],
    specifications: [
      { label: 'Filter Media', value: 'Micro-Glass Synthetic Fiber' },
      { label: 'Efficiency Rating', value: '99% @ 25 Microns' },
      { label: 'Gasket', value: 'Includes Viton O-Rings and Crush Washer' }
    ],
    images: [engineOilFilterImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },
  {
    id: 'part-flt-02',
    type: 'spare_part',
    partName: 'Multi-Stage Cabin Air Filter with Activated Charcoal',
    category: 'Filters',
    partNumber: 'FL-CF-1190',
    manufacturerBrand: 'Vanguard Filtration Line',
    priceDisplay: '₦16,000',
    priceNumeric: 16000,
    description: 'Dual-layer electrostatic cabin air filter embedded with coconut shell activated charcoal to adsorb odors, ozone, and pollen from entering the vehicle interior.',
    compatibleVehicles: [
      'Tesla Model 3 & Model Y (2018-2024)',
      'Honda Civic & Accord (2018-2024)',
      'Toyota Camry & RAV4 (2018-2025)'
    ],
    specifications: [
      { label: 'Filtration Class', value: 'PM2.5 Micro-Particle' },
      { label: 'Deodorization', value: 'Activated Carbon Adsorption Layer' }
    ],
    images: [cabinAirFilterImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },

  // 4. Suspension & Steering
  {
    id: 'part-sus-01',
    type: 'spare_part',
    partName: 'Front Gas-Charged MacPherson Strut Assembly (Pair)',
    category: 'Suspension & Steering',
    partNumber: 'SUS-ST-7714',
    manufacturerBrand: 'Vanguard Chassis Control',
    priceDisplay: '₦145,000',
    priceNumeric: 145000,
    description: 'Nitrogen pressurized twin-tube strut dampers with multi-lip piston rod seals to maintain ride comfort and responsive steering control.',
    compatibleVehicles: [
      'Toyota RAV4 (2019-2024)',
      'Honda CR-V (2017-2024)',
      'Toyota Camry (2018-2024)'
    ],
    specifications: [
      { label: 'Damper Type', value: 'Nitrogen Gas Pressurized Twin-Tube' },
      { label: 'Shaft Finish', value: 'Hard Chrome Plated Piston Rod' },
      { label: 'Position', value: 'Front Left & Front Right' }
    ],
    images: [suspensionStrutImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },

  // 5. Electrical & Lighting
  {
    id: 'part-elec-01',
    type: 'spare_part',
    partName: 'Bi-LED Projector Headlight Assembly (Complete Unit)',
    category: 'Electrical & Lighting',
    partNumber: 'LGT-HL-9041',
    manufacturerBrand: 'Vanguard Lighting Systems',
    priceDisplay: '₦280,000',
    priceNumeric: 280000,
    description: 'Replacement projector headlight assembly with integrated daytime running light (DRL) light guides, internal leveling motor, and polycarbonate lens.',
    compatibleVehicles: [
      'Honda Civic (Sedan/Hatch, 2022-2024)',
      'Toyota Camry (2021-2024)',
      'BMW 3 Series (LED Replacement Variant)'
    ],
    specifications: [
      { label: 'Light Source', value: 'Integrated High-Power Bi-LED Projector' },
      { label: 'Lens Material', value: 'UV-Coated Polycarbonate' },
      { label: 'Operating Voltage', value: '12V DC' },
      { label: 'Plug Type', value: 'Direct Multi-Pin OEM Harness Connector' }
    ],
    images: [ledHeadlightImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },
  {
    id: 'part-elec-02',
    type: 'spare_part',
    partName: 'High-Output Automotive Alternator 180 Amp',
    category: 'Electrical & Lighting',
    partNumber: 'ELC-ALT-180A',
    manufacturerBrand: 'Vanguard Power Electronics',
    priceDisplay: '₦125,000',
    priceNumeric: 125000,
    description: 'Direct-replacement 180A alternator featuring heavy-duty copper windings, internal voltage regulator, and freewheeling decouple pulley.',
    compatibleVehicles: [
      'Mercedes-Benz C-Class & GLC (2016-2023)',
      'BMW 3 Series & 5 Series (2016-2023)',
      'Honda Pilot (2016-2023)'
    ],
    specifications: [
      { label: 'Amperage Output', value: '180 Amperes @ 14.4V' },
      { label: 'Pulley Type', value: '6-Groove Decoupler Pulley' }
    ],
    images: [autoAlternatorImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },

  // 6. Cooling System
  {
    id: 'part-clg-01',
    type: 'spare_part',
    partName: 'High-Efficiency Aluminum Core Engine Radiator',
    category: 'Cooling System',
    partNumber: 'CLG-RAD-6500',
    manufacturerBrand: 'Vanguard Thermal Dynamics',
    priceDisplay: '₦98,000',
    priceNumeric: 98000,
    description: 'Brazed aluminum radiator core with high-density cooling fins and reinforced polymer end tanks for optimal heat dissipation in demanding thermal climates.',
    compatibleVehicles: [
      'Toyota Camry & RAV4 (2018-2024)',
      'Honda Accord & CR-V (2018-2024)'
    ],
    specifications: [
      { label: 'Core Material', value: 'Corrosion-Resistant Brazed Aluminum' },
      { label: 'Core Thickness', value: '16 mm / 26 mm Dual Row' },
      { label: 'Pressure Test Rating', value: '2.0 Bar Hydrostatic Inspected' }
    ],
    images: [autoRadiatorImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },

  // 7. Transmission & Drivetrain
  {
    id: 'part-trn-01',
    type: 'spare_part',
    partName: 'Automatic Transmission Filter & Pan Gasket Service Kit',
    category: 'Transmission & Drivetrain',
    partNumber: 'TRN-FK-880',
    manufacturerBrand: 'Vanguard Drivetrain Service',
    priceDisplay: '₦52,000',
    priceNumeric: 52000,
    description: 'Complete transmission fluid service kit including internal felt fluid filter, molded rubber perimeter gasket, and magnetic drain plug replacement.',
    compatibleVehicles: [
      'Toyota Camry & RAV4 (Direct-Shift 8-Speed)',
      'Honda Civic & CR-V (CVT Transmission Service)',
      'Mercedes-Benz C-Class & E-Class (9G-TRONIC)'
    ],
    specifications: [
      { label: 'Filter Media', value: 'High-Density Synthetic Transmission Felt' },
      { label: 'Gasket Material', value: 'Oil-Resistant Nitrile Elastomer' }
    ],
    images: [transFilterKitImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },

  // 8. Turbochargers
  {
    id: 'part-trb-01',
    type: 'spare_part',
    partName: 'Twin-Scroll Replacement Turbocharger Assembly',
    category: 'Turbochargers',
    partNumber: 'TRB-TS-2050',
    manufacturerBrand: 'Vanguard Induction Spec',
    priceDisplay: '₦395,000',
    priceNumeric: 395000,
    description: 'Complete twin-scroll exhaust gas turbocharger with electronic wastegate actuator, balanced compressor wheel, and stainless steel turbine housing.',
    compatibleVehicles: [
      'BMW 330i & 530i (2.0L B48 Engines, 2017-2024)',
      'BMW X3 xDrive30i (2018-2024)',
      'Mercedes-Benz C 300 (M264 / M254 2.0L Turbo)'
    ],
    specifications: [
      { label: 'Housing Material', value: 'Austenitic Cast Stainless Steel' },
      { label: 'Bearing Type', value: 'Full-Floating Journal Bearing' },
      { label: 'Actuator', value: 'Direct Electronic Stepper Motor Actuator' }
    ],
    images: [turbochargerUnitImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },

  // 9. Exhaust Components
  {
    id: 'part-exh-01',
    type: 'spare_part',
    partName: 'Direct-Fit Stainless Steel Exhaust Muffler Unit',
    category: 'Exhaust Components',
    partNumber: 'EXH-MUF-550',
    manufacturerBrand: 'Vanguard Exhaust Line',
    priceDisplay: '₦115,000',
    priceNumeric: 115000,
    description: 'Corrosion-resistant 409 stainless steel rear silencer unit configured with internal perforated baffles for compliant acoustic levels and minimal exhaust backpressure.',
    compatibleVehicles: [
      'Honda Civic (1.5T / 2.0L, 2016-2023)',
      'Toyota Corolla (2019-2024)',
      'Toyota Camry (2.5L, 2018-2024)'
    ],
    specifications: [
      { label: 'Material', value: '409 Grade Stainless Steel' },
      { label: 'Inlet Diameter', value: '2.25 inches (57 mm)' },
      { label: 'Mounting', value: 'Direct Rubber Hanger Eyelets' }
    ],
    images: [exhaustMufflerImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },

  // 10. Batteries & Charging
  {
    id: 'part-bat-01',
    type: 'spare_part',
    partName: '12V 80Ah AGM Automotive Starting Battery (Group 48 / H6)',
    category: 'Batteries & Charging',
    partNumber: 'BAT-AGM-80AH',
    manufacturerBrand: 'Vanguard Power Cell',
    priceDisplay: '₦145,000',
    priceNumeric: 145000,
    description: 'Absorbent Glass Mat (AGM) battery engineered for start-stop equipped vehicles, delivering 800 Cold Cranking Amps (CCA) and sealed non-spillable construction.',
    compatibleVehicles: [
      'BMW 3 Series, 5 Series, X3, X5',
      'Mercedes-Benz C-Class, E-Class, GLC, GLE',
      'Tesla Model 3 & Model Y (12V Auxiliary Replacement)'
    ],
    specifications: [
      { label: 'Group Size', value: 'BCI Group 48 (DIN H6 / L3)' },
      { label: 'Cold Cranking Amps (CCA)', value: '800 CCA @ 0°F' },
      { label: 'Nominal Capacity', value: '80 Ah @ 20-Hour Rate' },
      { label: 'Technology', value: 'Sealed Absorbent Glass Mat (AGM)' }
    ],
    images: [carBatteryAgmImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  },

  // 11. Body & Exterior Parts
  {
    id: 'part-bdy-01',
    type: 'spare_part',
    partName: 'Heated Power-Folding Side Mirror Assembly with Turn Signal (Left)',
    category: 'Body & Exterior Parts',
    partNumber: 'BDY-SMR-701',
    manufacturerBrand: 'Vanguard Exterior Body',
    priceDisplay: '₦72,000',
    priceNumeric: 72000,
    description: 'Factory replacement side view mirror housing equipped with electric adjustment motors, internal heating element, blind-spot indicator LED, and amber turn signal.',
    compatibleVehicles: [
      'Toyota RAV4 (2019-2024)',
      'Honda CR-V (2017-2023)',
      'Toyota Camry (2018-2024)'
    ],
    specifications: [
      { label: 'Adjustment', value: 'Power Glass with Electric Folding Motor' },
      { label: 'Features', value: 'Heated Defrost Grid + Blind-Spot Alert LED' },
      { label: 'Connector', value: 'Multi-Pin Weatherproof Plug' }
    ],
    images: [carSideMirrorImg],
    availabilityStatus: 'Availability — Enquire for Current Status'
  }
];

export const INITIAL_SAMPLE_ENQUIRIES: EnquirySubmission[] = [
  {
    id: 'enq-sample-1',
    referenceNumber: 'VNG-ENQ-2026-1042',
    createdAt: '2026-09-21T09:30:00Z',
    itemId: 'veh-toyota-04',
    itemTitle: '2024 Toyota Land Cruiser 250 First Edition',
    itemSkuOrPartNum: 'Toyota Land Cruiser 250',
    itemType: 'vehicle',
    clientName: 'Chinedu Okonkwo',
    clientEmail: 'c.okonkwo@example.ng',
    clientPhone: '+234 803 456 7890',
    contactPreference: 'WhatsApp',
    enquiryType: 'Vehicle Enquiry',
    message: 'Requesting vehicle inspection appointment in Victoria Island, Lagos and final landed price quote.',
    status: 'Submitted'
  },
  {
    id: 'enq-sample-2',
    referenceNumber: 'VNG-ENQ-2026-1038',
    createdAt: '2026-09-20T16:15:00Z',
    itemId: 'part-brk-01',
    itemTitle: 'Ceramic Composite Brake Pad Set (Front Axle)',
    itemSkuOrPartNum: 'BP-8842-CER',
    itemType: 'spare_part',
    clientName: 'Babajide Adeleke',
    clientEmail: 'b.adeleke@example.ng',
    clientPhone: '+234 802 112 3344',
    contactPreference: 'WhatsApp',
    enquiryType: 'Compatibility / Fitment Enquiry',
    message: 'Confirming whether these front brake pads fit a 2022 BMW 330i with M Sport braking package in Ikeja, Lagos.',
    status: 'Under Review'
  },
  {
    id: 'enq-sample-3',
    referenceNumber: 'VNG-ENQ-2026-1035',
    createdAt: '2026-09-19T11:20:00Z',
    itemId: 'part-flt-01',
    itemTitle: 'High-Efficiency Engine Oil Filter Cartridge',
    itemSkuOrPartNum: 'FLT-OF-104',
    itemType: 'spare_part',
    clientName: 'Emeka Nwosu',
    clientEmail: 'e.nwosu@example.ng',
    clientPhone: '+234 814 998 7766',
    contactPreference: 'Phone Call',
    enquiryType: 'Parts Sourcing',
    message: 'Inquiring about bulk delivery of 10 units of oil and transmission filters to Port Harcourt.',
    status: 'Awaiting Confirmation'
  }
];

export const INITIAL_CATALOGUE = [...SAMPLE_VEHICLES, ...SAMPLE_SPARE_PARTS];
export const INITIAL_ENQUIRIES = INITIAL_SAMPLE_ENQUIRIES;
