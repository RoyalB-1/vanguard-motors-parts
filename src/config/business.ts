/**
 * ==============================================================================
 * CENTRALIZED BUSINESS CONTACT & OPERATIONAL CONFIGURATION
 * VANGUARD Motors & Parts • Lagos, Nigeria
 * ==============================================================================
 * 
 * Update this single file when actual client contact credentials (phone number,
 * WhatsApp number, verified email address, or registered showroom address) 
 * are officially provided.
 * 
 * IMPORTANT CONFIGURATION RULES:
 * 1. Do NOT invent fake phone numbers, WhatsApp numbers, or emails.
 * 2. Keep isPhoneConfigured, isWhatsAppConfigured, and isEmailConfigured as `false`
 *    until genuine verified client credentials are provided.
 * 3. The entire application dynamically adapts:
 *    - Clickable `tel:` and `mailto:` links only activate when configured.
 *    - "Continue on WhatsApp" links only activate when a real number exists.
 *    - When unconfigured, the app offers "Contact VANGUARD" and allows one-click
 *      copying of pre-formatted enquiry messages without broken/dead links.
 */

export interface BusinessConfig {
  // Brand Identity
  businessName: string;
  tagline: string;

  // Address & Geographical Coordinates
  businessAddress: string;
  city: string;
  state: string;
  country: string;
  location: string;
  addressNotice: string;
  googleMapsUrl: string | null;
  
  // Phone configuration
  phone: string;
  isPhoneConfigured: boolean;
  
  // WhatsApp configuration
  whatsapp: string;
  whatsappRawNumber: string; // Digits only with country code (e.g., '2348012345678')
  isWhatsAppConfigured: boolean;
  
  // Email configuration
  email: string;
  isEmailConfigured: boolean;
  
  // Operations & Schedule
  openingDays: string;
  openingHours: string;
  businessHours: string;
  currencySymbol: string;

  // Social Media Links (null until real verified URLs are provided)
  facebookUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  youtubeUrl: string | null;
  twitterUrl: string | null;
  linkedinUrl: string | null;
  socialLinks: {
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
    youtube: string | null;
    twitter: string | null;
    linkedin: string | null;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  businessName: 'VANGUARD Motors & Parts',
  tagline: 'Automotive Vehicles & Spare Parts — Nigeria',
  
  // Real known business location: Lagos, Nigeria (No invented street address or fake map pin)
  businessAddress: 'Mainland Showroom & Dispatch Hub (Awaiting Specific Street Address)',
  city: 'Lagos',
  state: 'Lagos State',
  country: 'Nigeria',
  location: 'Lagos, Nigeria',
  addressNotice: 'Lagos Operational Center • Mainland Showroom & Dispatch Hub (Vehicle inspections arranged by appointment)',
  googleMapsUrl: null, // Null until authentic Google Maps place link is supplied
  
  // Placeholders until actual client details are supplied
  phone: '+234 (Awaiting Client Details)',
  isPhoneConfigured: false,
  
  whatsapp: '+234 (Awaiting Client Details)',
  whatsappRawNumber: '', // Empty until real WhatsApp number is supplied
  isWhatsAppConfigured: false,
  
  email: 'contact@vanguardmotors.ng (Awaiting Domain Activation)',
  isEmailConfigured: false,
  
  // Schedule
  openingDays: 'Monday – Saturday',
  openingHours: '8:00 AM – 6:00 PM (WAT)',
  businessHours: 'Monday – Saturday: 8:00 AM – 6:00 PM (WAT)',
  currencySymbol: '₦',

  // Social accounts (Preserve no fake accounts / dead links)
  facebookUrl: null,
  instagramUrl: null,
  tiktokUrl: null,
  youtubeUrl: null,
  twitterUrl: null,
  linkedinUrl: null,
  socialLinks: {
    facebook: null,
    instagram: null,
    tiktok: null,
    youtube: null,
    twitter: null,
    linkedin: null
  }
};

/**
 * Checks whether Google Maps link is configured.
 */
export function isGoogleMapsActive(): boolean {
  return Boolean(BUSINESS_CONFIG.googleMapsUrl && BUSINESS_CONFIG.googleMapsUrl.trim());
}

/**
 * Checks whether any verified social link is active.
 */
export function hasActiveSocialLinks(): boolean {
  return Boolean(
    BUSINESS_CONFIG.facebookUrl ||
    BUSINESS_CONFIG.instagramUrl ||
    BUSINESS_CONFIG.tiktokUrl ||
    BUSINESS_CONFIG.youtubeUrl ||
    BUSINESS_CONFIG.twitterUrl ||
    BUSINESS_CONFIG.linkedinUrl
  );
}

/**
 * Checks whether WhatsApp is configured with a genuine active number.
 */
export function isWhatsAppActive(): boolean {
  return BUSINESS_CONFIG.isWhatsAppConfigured && Boolean(BUSINESS_CONFIG.whatsappRawNumber.trim());
}

/**
 * Checks whether a phone line is configured with a genuine active number.
 */
export function isPhoneActive(): boolean {
  return BUSINESS_CONFIG.isPhoneConfigured && Boolean(BUSINESS_CONFIG.phone.trim());
}

/**
 * Checks whether an email address is configured with a genuine active address.
 */
export function isEmailActive(): boolean {
  return BUSINESS_CONFIG.isEmailConfigured && Boolean(BUSINESS_CONFIG.email.trim());
}

/**
 * Generates pre-filled WhatsApp click-to-chat URL if WhatsApp is configured,
 * otherwise returns null so components can render a non-fake contact fallback.
 */
export function generateWhatsAppLink(customMessage?: string): string | null {
  if (!isWhatsAppActive()) {
    return null;
  }
  const defaultMsg = `Hello ${BUSINESS_CONFIG.businessName}, I would like to make an enquiry regarding automotive inventory.`;
  const message = (customMessage || defaultMsg).trim();
  return `https://wa.me/${BUSINESS_CONFIG.whatsappRawNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a tel: link only if phone is active, otherwise null.
 */
export function generateTelLink(): string | null {
  if (!isPhoneActive()) {
    return null;
  }
  const clean = BUSINESS_CONFIG.phone.replace(/[^\d+]/g, '');
  return `tel:${clean}`;
}

/**
 * Generates a mailto: link only if email is active, otherwise null.
 */
export function generateMailtoLink(subject?: string, body?: string): string | null {
  if (!isEmailActive()) {
    return null;
  }
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${BUSINESS_CONFIG.email}${params.length ? `?${params.join('&')}` : ''}`;
}

/**
 * ==============================================================================
 * STANDARDIZED ENQUIRY LEAD HANDOFF MESSAGE BUILDERS
 * Aligned strictly with Section 2 of Specification:
 * - Vehicle Enquiry
 * - Spare Part Enquiry
 * - Custom Part Sourcing
 * - General Enquiry
 * ==============================================================================
 */

export function buildVehicleWhatsAppMessage(params: {
  vehicle: string;
  clientName?: string;
  clientPhone?: string;
  clientMessage?: string;
}): string {
  const lines = [
    `Hello ${BUSINESS_CONFIG.businessName},`,
    '',
    'I would like to enquire about this vehicle.',
    '',
    'Vehicle:',
    params.vehicle
  ];

  if (params.clientName) {
    lines.push('', 'Name:', params.clientName);
  }
  if (params.clientPhone) {
    lines.push('', 'Phone:', params.clientPhone);
  }
  if (params.clientMessage) {
    lines.push('', 'Message:', params.clientMessage);
  }

  return lines.join('\n');
}

export function buildSparePartWhatsAppMessage(params: {
  part: string;
  partNumber?: string;
  compatibleVehicle?: string;
  clientName?: string;
  clientPhone?: string;
  clientMessage?: string;
}): string {
  const lines = [
    `Hello ${BUSINESS_CONFIG.businessName},`,
    '',
    'I would like to enquire about this spare part.',
    '',
    'Part:',
    params.part
  ];

  if (params.partNumber) {
    lines.push('', 'Part Number:', params.partNumber);
  }
  if (params.compatibleVehicle) {
    lines.push('', 'Compatible Vehicle:', params.compatibleVehicle);
  }
  if (params.clientName) {
    lines.push('', 'Name:', params.clientName);
  }
  if (params.clientPhone) {
    lines.push('', 'Phone:', params.clientPhone);
  }
  if (params.clientMessage) {
    lines.push('', 'Message:', params.clientMessage);
  }

  return lines.join('\n');
}

export function buildCustomSourcingWhatsAppMessage(params: {
  vehicle: string;
  partNumber?: string;
  partDescription: string;
  clientName?: string;
  clientPhone?: string;
  clientMessage?: string;
}): string {
  const lines = [
    `Hello ${BUSINESS_CONFIG.businessName},`,
    '',
    'I would like assistance sourcing an automotive spare part.',
    '',
    'Vehicle:',
    params.vehicle,
    '',
    'Part Number:',
    params.partNumber && params.partNumber.trim() ? params.partNumber : 'Awaiting confirmation / not provided',
    '',
    'Part Description:',
    params.partDescription
  ];

  if (params.clientName) {
    lines.push('', 'Name:', params.clientName);
  }
  if (params.clientPhone) {
    lines.push('', 'Phone:', params.clientPhone);
  }
  if (params.clientMessage) {
    lines.push('', 'Message:', params.clientMessage);
  }

  return lines.join('\n');
}

export function buildGeneralWhatsAppMessage(params: {
  clientName?: string;
  clientPhone?: string;
  clientMessage?: string;
  subject?: string;
}): string {
  const lines = [
    `Hello ${BUSINESS_CONFIG.businessName},`,
    '',
    params.subject ? `I would like to enquire about: ${params.subject}.` : 'I would like to make an enquiry.'
  ];

  if (params.clientName) {
    lines.push('', 'Name:', params.clientName);
  }
  if (params.clientPhone) {
    lines.push('', 'Phone:', params.clientPhone);
  }
  if (params.clientMessage) {
    lines.push('', 'Message:', params.clientMessage);
  }

  return lines.join('\n');
}

// Backward-compatibility helpers
export const generateVehicleWhatsAppMessage = (title: string, year?: number, make?: string, model?: string) => 
  buildVehicleWhatsAppMessage({ vehicle: `${title}${year ? ` (${year})` : ''}` });

export const generatePartWhatsAppMessage = (partName: string, partNumber?: string, compatible?: string[]) =>
  buildSparePartWhatsAppMessage({ 
    part: partName, 
    partNumber, 
    compatibleVehicle: compatible && compatible.length > 0 ? compatible.join(', ') : undefined 
  });

export const generateRequestPartWhatsAppMessage = (vehicleMake: string, vehicleModel: string, partName: string) =>
  buildCustomSourcingWhatsAppMessage({
    vehicle: `${vehicleMake} ${vehicleModel}`,
    partDescription: partName
  });

