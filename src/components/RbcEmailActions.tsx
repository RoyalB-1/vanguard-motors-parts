import React, { useState, useRef, useEffect } from 'react';
import { Mail, Copy, Check, ExternalLink, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { 
  DEVELOPER_CONFIG, 
  generateRbcMailtoLink, 
  generateRbcGmailComposeLink, 
  generateRbcYahooComposeLink,
  generateRbcOutlookComposeLink,
  RBC_DEFAULT_EMAIL_SUBJECT 
} from '../config/developer';

/**
 * Robust copy helper that works across modern browsers and sandboxed iframes
 */
function copyEmailToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
      .then(() => true)
      .catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text: string): boolean {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

/**
 * Safely opens webmail URLs (Gmail, Yahoo, Outlook) in an external NEW browser tab.
 * Never navigates or embeds within the current page or preview frame.
 */
function handleOpenExternalWebmail(e: React.MouseEvent, url: string, onDone?: () => void) {
  e.preventDefault();
  e.stopPropagation();

  try {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
      newWindow.focus();
    } else {
      // Fallback for strict popup blockers
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 100);
    }
  } catch {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);
  }

  if (onDone) {
    setTimeout(onDone, 150);
  }
}

/**
 * Safely dispatches mailto: to the OS/device default email client.
 * Uses an external target so it NEVER navigates the current application or iframe,
 * preventing blank error pages when no local mail client is configured.
 */
function handleOpenDefaultMailApp(e: React.MouseEvent, mailtoUrl: string, onDone?: () => void) {
  e.preventDefault();
  e.stopPropagation();

  try {
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);
  } catch {
    // If blocked, fallback to window.open
    window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
  }

  if (onDone) {
    setTimeout(onDone, 150);
  }
}

interface RbcEmailCardProps {
  onCopySuccess?: () => void;
}

/**
 * Comprehensive Email Options Card for RBC Attribution Modal
 * Contains all 5 email options directly accessible with clear descriptions
 */
export function RbcEmailCard({ onCopySuccess }: RbcEmailCardProps) {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const mailtoLink = generateRbcMailtoLink() || `mailto:${DEVELOPER_CONFIG.email}`;
  const gmailLink = generateRbcGmailComposeLink() || `https://mail.google.com/mail/?view=cm&fs=1&to=${DEVELOPER_CONFIG.email}`;
  const yahooLink = generateRbcYahooComposeLink() || `https://compose.mail.yahoo.com/?to=${DEVELOPER_CONFIG.email}`;
  const outlookLink = generateRbcOutlookComposeLink() || `https://outlook.live.com/mail/0/deeplink/compose?to=${DEVELOPER_CONFIG.email}`;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await copyEmailToClipboard(DEVELOPER_CONFIG.email);
    setCopyStatus('RBC email copied.');
    if (onCopySuccess) onCopySuccess();
    setTimeout(() => setCopyStatus(null), 3000);
  };

  return (
    <div className="p-4 rounded-xl bg-[#0e1628] border border-[#1b2742] hover:border-[#253659] transition-colors space-y-3.5">
      {/* Header: Label, Official Email, and Copy Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#1a2336] border border-[#283856] flex items-center justify-center text-sky-400 shrink-0 shadow-sm">
            <Mail className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold tracking-wider">
              Official RBC Email (Single Source of Truth)
            </span>
            <span className="text-white font-mono font-bold text-xs sm:text-sm truncate block select-all">
              {DEVELOPER_CONFIG.email}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-[#141e33] hover:bg-[#1d2a44] text-slate-300 hover:text-white border border-[#202e49] text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Copy RBC Email Address"
        >
          {copyStatus ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px] font-semibold">{copyStatus}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px]">Copy RBC Email</span>
            </>
          )}
        </button>
      </div>

      {/* 5 Email Choices Grid */}
      <div className="pt-2 border-t border-[#18233a] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            Select Your Preferred Email Method:
          </span>
          {copyStatus && (
            <span className="text-emerald-400 text-[10px] font-semibold animate-in fade-in">
              ✓ {copyStatus}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* 1. Gmail */}
          <a
            href={gmailLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleOpenExternalWebmail(e, gmailLink)}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#121b2f] hover:bg-[#18243e] border border-[#202e4d] hover:border-[#ea580c]/50 text-slate-200 hover:text-white transition-all group cursor-pointer"
            title="Open Gmail in a new browser tab"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shrink-0"></span>
              <div className="text-left">
                <span className="text-xs font-semibold block text-white">Gmail</span>
                <span className="text-[10px] text-slate-400 block">New browser tab</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
          </a>

          {/* 2. Yahoo Mail */}
          <a
            href={yahooLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleOpenExternalWebmail(e, yahooLink)}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#121b2f] hover:bg-[#18243e] border border-[#202e4d] hover:border-[#ea580c]/50 text-slate-200 hover:text-white transition-all group cursor-pointer"
            title="Open Yahoo Mail in a new browser tab"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shrink-0"></span>
              <div className="text-left">
                <span className="text-xs font-semibold block text-white">Yahoo Mail</span>
                <span className="text-[10px] text-slate-400 block">New browser tab</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
          </a>

          {/* 3. Outlook */}
          <a
            href={outlookLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleOpenExternalWebmail(e, outlookLink)}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#121b2f] hover:bg-[#18243e] border border-[#202e4d] hover:border-[#ea580c]/50 text-slate-200 hover:text-white transition-all group cursor-pointer"
            title="Open Outlook.com in a new browser tab"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shrink-0"></span>
              <div className="text-left">
                <span className="text-xs font-semibold block text-white">Outlook</span>
                <span className="text-[10px] text-slate-400 block">Outlook Web (New tab)</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
          </a>

          {/* 4. Default Email App */}
          <button
            type="button"
            onClick={(e) => handleOpenDefaultMailApp(e, mailtoLink)}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#121b2f] hover:bg-[#18243e] border border-[#202e4d] hover:border-[#ea580c]/50 text-slate-200 hover:text-white transition-all group cursor-pointer text-left"
            title="Launch operating system email client"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-sm shrink-0"></span>
              <div>
                <span className="text-xs font-semibold block text-white">Default Email App</span>
                <span className="text-[10px] text-slate-400 block">Mailto (Desktop / OS)</span>
              </div>
            </div>
            <Send className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
          </button>

          {/* 5. Copy RBC Email */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#121b2f] hover:bg-[#18243e] border border-[#202e4d] hover:border-[#ea580c]/50 text-slate-200 hover:text-white transition-all group cursor-pointer text-left"
            title="Copy royalbrandcircuit01@gmail.com to clipboard"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shrink-0"></span>
              <div>
                <span className="text-xs font-semibold block text-white">Copy RBC Email</span>
                <span className="text-[10px] text-slate-400 block">
                  {copyStatus ? 'RBC email copied.' : 'Copy to clipboard'}
                </span>
              </div>
            </div>
            {copyStatus ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
            )}
          </button>
        </div>

        {/* Guidance / Manual Review Notice */}
        <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
          <strong className="text-slate-300">Notice:</strong> Webmail links open in a new tab with recipient <span className="font-mono text-slate-200 font-semibold">{DEVELOPER_CONFIG.email}</span> and suggested subject pre-filled. You remain in complete control to review, write, and press Send yourself. No emails are sent automatically.
        </p>
      </div>
    </div>
  );
}

/**
 * Compact Footer "Email RBC" Popover Menu
 * Clicking "Email RBC" opens a compact, restrained options popover:
 * 1. Gmail (New Tab)
 * 2. Yahoo Mail (New Tab)
 * 3. Outlook (New Tab)
 * 4. Default Email App (Mailto)
 * 5. Copy RBC Email (Clipboard with "RBC email copied.")
 */
export function RbcEmailFooterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const mailtoLink = generateRbcMailtoLink() || `mailto:${DEVELOPER_CONFIG.email}`;
  const gmailLink = generateRbcGmailComposeLink() || `https://mail.google.com/mail/?view=cm&fs=1&to=${DEVELOPER_CONFIG.email}`;
  const yahooLink = generateRbcYahooComposeLink() || `https://compose.mail.yahoo.com/?to=${DEVELOPER_CONFIG.email}`;
  const outlookLink = generateRbcOutlookComposeLink() || `https://outlook.live.com/mail/0/deeplink/compose?to=${DEVELOPER_CONFIG.email}`;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await copyEmailToClipboard(DEVELOPER_CONFIG.email);
    setCopyStatus('RBC email copied.');
    setTimeout(() => {
      setCopyStatus(null);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Main "Email RBC" Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#080d19] hover:bg-[#0e1628] border border-[#1b263e] hover:border-[#2f4066] text-slate-300 hover:text-white transition-all text-xs cursor-pointer shadow-sm select-none"
        title="Email RBC — Choose Gmail, Yahoo Mail, Outlook, or Default Mail App"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Mail className="w-3.5 h-3.5 text-sky-400 group-hover:text-sky-300 transition-colors" />
        <span className="font-medium text-[11px] sm:text-xs">Email RBC</span>
        {isOpen ? (
          <ChevronUp className="w-3 h-3 text-slate-400 group-hover:text-slate-200 transition-colors" />
        ) : (
          <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-200 transition-colors" />
        )}
      </button>

      {/* Upward-anchored Compact Popover Menu */}
      {isOpen && (
        <div 
          className="absolute bottom-full right-0 sm:right-auto sm:left-0 mb-2 w-64 rounded-xl bg-[#0a0f1d] border border-[#202f4d] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 text-xs"
          role="menu"
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-[#162137]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Email Royal Brand Circuit
            </p>
            <p className="text-white font-mono text-[11px] truncate font-medium mt-0.5 select-all">
              {DEVELOPER_CONFIG.email}
            </p>
          </div>

          <div className="py-1">
            {/* 1. Gmail */}
            <a
              href={gmailLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleOpenExternalWebmail(e, gmailLink, () => setIsOpen(false))}
              className="flex items-center justify-between px-3 py-2 text-slate-200 hover:text-white hover:bg-[#131d33] transition-colors cursor-pointer"
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span className="font-medium">Gmail</span>
              </div>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                New Tab <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </a>

            {/* 2. Yahoo Mail */}
            <a
              href={yahooLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleOpenExternalWebmail(e, yahooLink, () => setIsOpen(false))}
              className="flex items-center justify-between px-3 py-2 text-slate-200 hover:text-white hover:bg-[#131d33] transition-colors cursor-pointer"
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span className="font-medium">Yahoo Mail</span>
              </div>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                New Tab <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </a>

            {/* 3. Outlook */}
            <a
              href={outlookLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleOpenExternalWebmail(e, outlookLink, () => setIsOpen(false))}
              className="flex items-center justify-between px-3 py-2 text-slate-200 hover:text-white hover:bg-[#131d33] transition-colors cursor-pointer"
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="font-medium">Outlook</span>
              </div>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                New Tab <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </a>

            {/* 4. Default Email App */}
            <button
              type="button"
              onClick={(e) => handleOpenDefaultMailApp(e, mailtoLink, () => setIsOpen(false))}
              className="w-full flex items-center justify-between px-3 py-2 text-slate-200 hover:text-white hover:bg-[#131d33] transition-colors cursor-pointer text-left"
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span className="font-medium">Default Email App</span>
              </div>
              <span className="text-[10px] text-slate-400">Mailto (OS)</span>
            </button>

            {/* 5. Copy RBC Email */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center justify-between px-3 py-2 text-slate-300 hover:text-white hover:bg-[#131d33] transition-colors border-t border-[#162137] mt-1 pt-1.5 cursor-pointer text-left"
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                {copyStatus ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span className={copyStatus ? 'text-emerald-400 font-semibold' : ''}>
                  {copyStatus || 'Copy RBC Email'}
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
