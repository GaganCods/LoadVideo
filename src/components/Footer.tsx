import React from 'react';
import { Download, AlertCircle, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenLegal }) => {
  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-[#070707] text-gray-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Legal Disclaimer Box */}
        <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3 text-gray-400">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="flex-1 text-xs">
            <span className="font-bold text-gray-300">Usage Disclaimer: </span>
            Download only content you own or have explicit permission to download. You are
            responsible for how you use downloaded content in compliance with applicable laws.
          </div>
        </div>

        {/* Footer Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF5A00] flex items-center justify-center text-white">
                <Download className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white">LoadVideo</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Fast, modern online video and audio downloader tool. Simple, responsive, and secure.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Product</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('downloader-section')}
                  className="hover:text-white transition-colors"
                >
                  Video Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('features')}
                  className="hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('platforms')}
                  className="hover:text-white transition-colors"
                >
                  Supported Platforms
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Resources</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('blog-section')}
                  className="hover:text-white transition-colors"
                >
                  SEO Guides & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: API Notice */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Architecture</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Powered by secure high-speed server-side request proxying.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Storage Logs</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} LoadVideo. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <button onClick={() => onOpenLegal('terms')} className="hover:text-gray-300">
              Terms
            </button>
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-gray-300">
              Privacy
            </button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-gray-300">
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
