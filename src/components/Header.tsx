import React, { useEffect, useState } from 'react';
import { Download, Sparkles, Key, ExternalLink, History, HelpCircle, ShieldCheck } from 'lucide-react';
import { checkServerHealth } from '../lib/api';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  historyCount: number;
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToSection,
  historyCount,
  onOpenLegal,
}) => {
  const [keyConfigured, setKeyConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    checkServerHealth().then((health) => {
      setKeyConfigured(Boolean(health.yoinkuKeyConfigured));
    });
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#090909]/80 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5A00] to-[#FF8A00] flex items-center justify-center shadow-lg shadow-[#FF5A00]/20 group-hover:scale-105 transition-transform">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-[#FF5A00] transition-colors">
                LoadVideo
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-white/10 text-white/80 border border-white/10">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium -mt-1 hidden sm:inline">
              Video Downloader
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <button
            onClick={() => onScrollToSection('downloader-section')}
            className="hover:text-white transition-colors"
          >
            Downloader
          </button>
          <button
            onClick={() => onScrollToSection('how-it-works')}
            className="hover:text-white transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => onScrollToSection('features')}
            className="hover:text-white transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => onScrollToSection('platforms')}
            className="hover:text-white transition-colors"
          >
            Platforms
          </button>
          <button
            onClick={() => onScrollToSection('blog-section')}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Guides & Blog</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00]" />
          </button>
          <button
            onClick={() => onScrollToSection('faq')}
            className="hover:text-white transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Right: History Link & Download Button */}
        <div className="flex items-center gap-3">
          {historyCount > 0 && (
            <button
              onClick={() => onScrollToSection('recent-history')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-200 transition-colors"
            >
              <History className="w-3.5 h-3.5 text-[#FF5A00]" />
              <span className="font-semibold">{historyCount}</span>
              <span className="hidden sm:inline text-gray-400">History</span>
            </button>
          )}

          <button
            onClick={() => onScrollToSection('downloader-section')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF5A00] hover:bg-[#FF6B1A] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#FF5A00]/20 active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </header>
  );
};
