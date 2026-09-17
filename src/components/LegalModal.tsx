import React, { useState } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'terms' | 'privacy';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'terms',
  onClose,
}) => {
  const [tab, setTab] = useState<'terms' | 'privacy'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('terms')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tab === 'terms'
                  ? 'bg-[#FF5A00] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>

            <button
              onClick={() => setTab('privacy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tab === 'privacy'
                  ? 'bg-[#FF5A00] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-gray-300 space-y-4 leading-relaxed custom-scrollbar">
          {tab === 'terms' ? (
            <>
              <h3 className="text-lg font-bold text-white">Terms of Service</h3>
              <p>
                Welcome to <strong>LoadVideo</strong>. By accessing or using our website, you agree
                to be bound by these Terms of Service.
              </p>

              <h4 className="font-bold text-white pt-2">1. Permitted Use & Ownership</h4>
              <p>
                LoadVideo is designed as a tool for creators, researchers, and users to download
                videos and audio content that they own, hold rights to, or have explicit permission
                to download. You agree not to use this service to infringe upon copyrighted content
                or intellectual property rights.
              </p>

              <h4 className="font-bold text-white pt-2">2. User Responsibility</h4>
              <p>
                You are solely responsible for how you handle, store, or distribute any media files
                retrieved using LoadVideo. LoadVideo does not host or store downloaded files on its
                servers.
              </p>

              <h4 className="font-bold text-white pt-2">3. Service Limitations</h4>
              <p>
                LoadVideo provides temporary download links provided by third-party APIs. We do not
                guarantee 100% uptime, availability of specific video resolutions, or permanent
                storage.
              </p>

              <h4 className="font-bold text-white pt-2">4. Disclaimers</h4>
              <p>
                The service is provided &quot;AS IS&quot; without warranties of any kind. LoadVideo
                reserves the right to rate-limit or restrict access to preserve service health.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
              <p>
                At <strong>LoadVideo</strong>, we respect user privacy and are committed to maintaining
                a transparent, zero-tracking service.
              </p>

              <h4 className="font-bold text-white pt-2">1. No Personal Accounts</h4>
              <p>
                LoadVideo does not require user accounts, passwords, or personal identity details.
                You can use all features anonymously.
              </p>

              <h4 className="font-bold text-white pt-2">2. Local Browser Storage</h4>
              <p>
                Recent download histories are stored strictly inside your browser&apos;s local storage
                (`localStorage`). They are never uploaded, logged, or saved on our server databases.
              </p>

              <h4 className="font-bold text-white pt-2">3. Server Proxy Requests</h4>
              <p>
                To protect third-party API credentials, video info requests are proxied securely
                through our backend. We do not record or retain your video URLs or download payloads.
              </p>

              <h4 className="font-bold text-white pt-2">4. Cookies</h4>
              <p>We do not use tracking cookies or third-party marketing trackers.</p>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 flex justify-end bg-white/[0.02]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
