import rbcLogoAsset from '../assets/developer/rbc_temp_logo_v1.jpg';

/**
 * ==============================================================================
 * CENTRALIZED ROYAL BRAND CIRCUIT (RBC) DEVELOPER INFORMATION
 * Agency & Technical Attribution Configuration
 * ==============================================================================
 *
 * This configuration contains Royal Brand Circuit's agency details, contact channels,
 * and attribution links. It is centralized here so any updates (phone, WhatsApp,
 * email, social links, location, OR logo) can be made in one place and automatically reflected.
 *
 * RBC DEVELOPER LOGO STATUS:
 * - Current Logo: "RBC Temporary Developer Logo — Version 1"
 * - Stored in: /src/assets/developer/rbc_temp_logo_v1.jpg
 * - Future replacement: Replace that single file or update `logo.src` below to update
 *   the logo site-wide automatically without modifying any pages or layouts.
 *
 * CRITICAL BRAND INTEGRITY RULES:
 * 1. RBC is the website developer/agency ONLY.
 * 2. VANGUARD Motors & Parts remains the primary business, brand, and owner of this website.
 * 3. Never substitute VANGUARD's customer-facing contact details with RBC details.
 * 4. RBC currently operates online with NO physical office to display — do not add a fake address.
 * 5. Do NOT create fake URLs for Facebook, TikTok, or Website.
 * 6. RBC YouTube is "Timeless Sipur" (no official URL provided yet — displayed as text/reference).
 */

export interface DeveloperConfig {
  brandName: string;
  shortName: string;
  attributionText: string;

  // Centralized Developer Logo
  logo: {
    src: string;
    alt: string;
    version: string;
    title: string;
    width: number;
    height: number;
    description: string;
  };
  
  // Contact numbers
  phone: string;
  isPhoneConfigured: boolean;
  
  whatsapp: string;
  whatsappRawNumber: string; // Digits only with country code
  isWhatsAppConfigured: boolean;
  defaultWhatsAppMessage: string;
  
  // Email
  email: string;
  isEmailConfigured: boolean;
  
  // Online / Physical presence
  operatingModel: string;
  physicalAddress: string | null;
  
  // Links & Channels (null if not available or not yet confirmed)
  websiteUrl: string | null;
  tiktokUrl: string | null;
  facebookUrl: string | null;
  youtubeName: string;
  youtubeUrl: string | null;
}

export const DEVELOPER_CONFIG: DeveloperConfig = {
  brandName: 'Royal Brand Circuit',
  shortName: 'RBC',
  attributionText: 'Designed & Developed by RBC',

  // Centralized Logo Reference (RBC Temporary Developer Logo — Version 1)
  logo: {
    src: rbcLogoAsset,
    alt: 'Royal Brand Circuit (RBC) — Developer Logo',
    version: 'RBC Temporary Developer Logo — Version 1',
    title: 'Royal Brand Circuit (RBC)',
    width: 1024,
    height: 1024,
    description: 'Temporary developer logo active during initial rollout. Official brand identity will be updated automatically upon finalization.'
  },

  // Phone: 08100484301
  phone: '08100484301',
  isPhoneConfigured: true,

  // WhatsApp: +234 907 108 0448 (international format 2349071080448)
  whatsapp: '+234 907 108 0448',
  whatsappRawNumber: '2349071080448',
  isWhatsAppConfigured: true,
  defaultWhatsAppMessage: 'Hello Royal Brand Circuit, I would like to make an enquiry about your website/design services.',

  // Email: royalbrandcircuit01@gmail.com
  email: 'royalbrandcircuit01@gmail.com',
  isEmailConfigured: true,

  // Physical Location: Online operating agency (No physical showroom/office)
  operatingModel: 'Operating Online',
  physicalAddress: null,

  // Digital accounts (strictly no fake URLs)
  websiteUrl: null, // Not available yet
  tiktokUrl: null,  // Not available yet
  facebookUrl: null, // Not configured yet — DO NOT convert royalbrandcircuit01 to a fake URL
  youtubeName: 'Timeless Sipur',
  youtubeUrl: null   // Channel URL not officially supplied; referenced by channel name only
};

/**
 * Standard suggested subject for Royal Brand Circuit technical & agency enquiries
 */
export const RBC_DEFAULT_EMAIL_SUBJECT = 'Website Enquiry — Royal Brand Circuit';

/**
 * Returns telephone href for RBC developer contact
 */
export function generateRbcTelLink(): string | null {
  if (!DEVELOPER_CONFIG.isPhoneConfigured || !DEVELOPER_CONFIG.phone) return null;
  const clean = DEVELOPER_CONFIG.phone.replace(/[^\d+]/g, '');
  return `tel:${clean}`;
}

/**
 * Returns primary universal mailto href for RBC developer email
 * Target recipient: royalbrandcircuit01@gmail.com
 * Opens user's configured email application (Outlook, Apple Mail, Thunderbird, etc.)
 */
export function generateRbcMailtoLink(subject?: string, body?: string): string | null {
  if (!DEVELOPER_CONFIG.isEmailConfigured || !DEVELOPER_CONFIG.email) return null;
  const params: string[] = [];
  const defaultSub = RBC_DEFAULT_EMAIL_SUBJECT;
  params.push(`subject=${encodeURIComponent(subject || defaultSub)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${DEVELOPER_CONFIG.email}?${params.join('&')}`;
}

/**
 * Returns direct web compose URL for Gmail users
 * Opens https://mail.google.com/mail/?view=cm&fs=1&to=royalbrandcircuit01@gmail.com
 * with recipient and prefilled subject
 */
export function generateRbcGmailComposeLink(subject?: string, body?: string): string | null {
  if (!DEVELOPER_CONFIG.isEmailConfigured || !DEVELOPER_CONFIG.email) return null;
  const sub = encodeURIComponent(subject || RBC_DEFAULT_EMAIL_SUBJECT);
  const base = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(DEVELOPER_CONFIG.email)}&su=${sub}`;
  if (body) {
    return `${base}&body=${encodeURIComponent(body)}`;
  }
  return base;
}

/**
 * Returns direct web compose URL for Yahoo Mail users
 * Opens https://compose.mail.yahoo.com/?to=royalbrandcircuit01@gmail.com
 * with recipient and prefilled subject
 */
export function generateRbcYahooComposeLink(subject?: string, body?: string): string | null {
  if (!DEVELOPER_CONFIG.isEmailConfigured || !DEVELOPER_CONFIG.email) return null;
  const sub = encodeURIComponent(subject || RBC_DEFAULT_EMAIL_SUBJECT);
  const base = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(DEVELOPER_CONFIG.email)}&subj=${sub}`;
  if (body) {
    return `${base}&body=${encodeURIComponent(body)}`;
  }
  return base;
}

/**
 * Returns direct web compose URL for Microsoft Outlook web users
 * Opens https://outlook.live.com/mail/0/deeplink/compose?to=royalbrandcircuit01@gmail.com
 * with recipient and prefilled subject in a new browser tab
 */
export function generateRbcOutlookComposeLink(subject?: string, body?: string): string | null {
  if (!DEVELOPER_CONFIG.isEmailConfigured || !DEVELOPER_CONFIG.email) return null;
  const sub = encodeURIComponent(subject || RBC_DEFAULT_EMAIL_SUBJECT);
  const base = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(DEVELOPER_CONFIG.email)}&subject=${sub}`;
  if (body) {
    return `${base}&body=${encodeURIComponent(body)}`;
  }
  return base;
}

/**
 * Returns click-to-chat WhatsApp link for RBC developer contact
 */
export function generateRbcWhatsAppLink(customMessage?: string): string | null {
  if (!DEVELOPER_CONFIG.isWhatsAppConfigured || !DEVELOPER_CONFIG.whatsappRawNumber) return null;
  const message = customMessage || DEVELOPER_CONFIG.defaultWhatsAppMessage;
  return `https://wa.me/${DEVELOPER_CONFIG.whatsappRawNumber}?text=${encodeURIComponent(message)}`;
}
