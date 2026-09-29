import { X, FileText, CheckCircle } from 'lucide-react';
import { EnquirySubmission } from '../types';

interface EnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  enquiries: EnquirySubmission[];
  onNewEnquiry: () => void;
}

export default function EnquiryDrawer({
  isOpen,
  onClose,
  enquiries,
  onNewEnquiry
}: EnquiryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div 
          className="w-screen max-w-md bg-[#121826] border-l border-[#232c40] shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="px-5 sm:px-6 py-4 sm:py-5 bg-[#0e1422] border-b border-[#1f283d] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ea580c] flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-white">
                  My Enquiries
                </h2>
                <p className="text-xs text-slate-400">
                  {enquiries.length} {enquiries.length === 1 ? 'Enquiry' : 'Enquiries'} Logged
                </p>
              </div>
            </div>

            <button
              id="close-enquiry-drawer-btn"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a2336] transition-colors flex items-center justify-center"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {enquiries.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#182133] border border-[#2b354d] flex items-center justify-center mx-auto text-slate-400">
                  <FileText className="w-6 h-6 text-[#ea580c]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">No Enquiries Logged Yet</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                    Select any vehicle or precision spare part in the catalogue to request availability, pricing, or fitment confirmation.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNewEnquiry();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ea580c] text-white text-xs font-semibold shadow-md"
                >
                  Create Enquiry
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Logged Enquiries
                </div>

                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-4 rounded-xl bg-[#0e1422] border border-[#1f283d] hover:border-[#ea580c]/50 transition-all space-y-3"
                  >
                    {/* Header: Ref & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#ea580c]">
                        {enq.referenceNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#14532d]/40 text-[#4ade80] border border-[#166534]">
                        {enq.status}
                      </span>
                    </div>

                    {/* Item title */}
                    <div>
                      <div className="text-xs text-slate-400">Target Item / Part:</div>
                      <div className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                        {enq.itemTitle}
                      </div>
                      {enq.itemSkuOrPartNum && (
                        <div className="text-[11px] font-mono text-[#ea580c] mt-0.5">
                          Identifier: {enq.itemSkuOrPartNum}
                        </div>
                      )}
                    </div>

                    {/* Purpose and details */}
                    <div className="bg-[#141a29] p-2.5 rounded-lg border border-[#1d263b] text-xs space-y-1">
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Request Type:</span>
                        <span className="text-slate-200 font-medium">{enq.enquiryType}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Contact Method:</span>
                        <span className="text-slate-200">{enq.clientName} ({enq.contactPreference})</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Date:</span>
                        <span className="text-slate-300">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 bg-[#0a0f1d] p-2.5 rounded border border-[#1a2336] italic">
                      "{enq.message}"
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-[#182133]">
                      <span>Enquiry Desk: enquiries@vanguardmotors.ng</span>
                      <span className="text-[#22c55e] flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Received
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-5 bg-[#0e1422] border-t border-[#1f283d] space-y-3">
            <button
              id="drawer-new-enquiry-btn"
              onClick={() => {
                onClose();
                onNewEnquiry();
              }}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#ea580c] hover:bg-[#f97316] text-white font-semibold text-xs shadow-md transition-colors text-center flex items-center justify-center"
            >
              Submit Another Enquiry
            </button>

            <button
              onClick={onClose}
              className="w-full min-h-[44px] py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors text-center flex items-center justify-center"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
