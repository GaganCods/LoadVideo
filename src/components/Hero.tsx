import React, { useState } from 'react';
import { Search, Clipboard, X, Loader2, AlertCircle, Download, CheckCircle2 } from 'lucide-react';
import { SampleVideo } from '../types/video';

interface HeroProps {
  urlInput: string;
  setUrlInput: (val: string) => void;
  onFetch: (urlToFetch?: string) => void;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
}

const SAMPLE_VIDEOS: SampleVideo[] = [
  {
    title: 'Never Gonna Give You Up',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badge: 'Music Video',
    author: 'Rick Astley',
  },
  {
    title: '4K Tropical Coast Drone',
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    badge: '4K Ultra HD',
    author: 'Nature 4K',
  },
  {
    title: 'Lofi Study Beats',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    badge: 'Audio / MP3',
    author: 'Lofi Girl',
  },
  {
    title: 'Epic Mountain Biking',
    url: 'https://www.youtube.com/watch?v=k85mRPqvMbE',
    badge: '60 FPS',
    author: 'GoPro',
  },
];

export const Hero: React.FC<HeroProps> = ({
  urlInput,
  setUrlInput,
  onFetch,
  isLoading,
  error,
  onClearError,
}) => {
  const [copied, setCopied] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrlInput(text.trim());
        onClearError();
      }
    } catch {
      // Clipboard access denied or unsupported
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onFetch();
    }
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrlInput(sampleUrl);
    onClearError();
    onFetch(sampleUrl);
  };

  return (
    <section id="downloader-section" className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF5A00]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Main Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Download Videos <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#FF5A00] via-[#FF7A00] to-[#FF9E00] bg-clip-text text-transparent">
            In Preferred Quality
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 font-normal max-w-2xl mx-auto">
          Paste a supported video URL, choose your preferred resolution or audio format, and generate a fast download link in seconds.
        </p>
      </div>

      {/* Main Downloader Card */}
      <div className="mt-8 bg-[#111111] border border-white/[0.1] rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80 relative">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          {/* Input field wrapper */}
          <div className="relative flex-1 flex items-center bg-[#090909] border border-white/10 focus-within:border-[#FF5A00] rounded-xl px-3.5 py-2.5 transition-colors group">
            <Search className="w-5 h-5 text-gray-500 group-focus-within:text-[#FF5A00] shrink-0 mr-2.5 transition-colors" />

            <input
              type="text"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                if (error) onClearError();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Paste YouTube video URL (e.g. https://www.youtube.com/watch?v=...)"
              className="w-full bg-transparent text-white placeholder-gray-500 text-sm sm:text-base focus:outline-none"
              disabled={isLoading}
            />

            {/* Clear Button */}
            {urlInput && !isLoading && (
              <button
                type="button"
                onClick={() => {
                  setUrlInput('');
                  onClearError();
                }}
                className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white mr-1 transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Paste Button */}
            <button
              type="button"
              onClick={handlePaste}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 rounded-lg transition-colors shrink-0"
              title="Paste from clipboard"
            >
              <Clipboard className="w-3.5 h-3.5 text-[#FF5A00]" />
              <span className="hidden xs:inline">Paste</span>
            </button>
          </div>

          {/* Download Button */}
          <button
            type="button"
            onClick={() => onFetch()}
            disabled={isLoading}
            className="w-full sm:w-auto px-7 py-3 bg-[#FF5A00] hover:bg-[#FF6B1A] disabled:opacity-60 text-white font-bold text-base rounded-xl shadow-lg shadow-[#FF5A00]/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download</span>
              </>
            )}
          </button>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mt-4 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-300 text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-rose-200">Unable to fetch video</p>
              <p className="text-xs text-rose-300/80 mt-0.5">{error}</p>
            </div>
            <button
              onClick={onClearError}
              className="text-rose-400 hover:text-rose-200 p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Sample Links Section */}
        <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-400">
          <span className="font-semibold text-gray-300 flex items-center gap-1.5 shrink-0">
            <span>Try Sample Videos:</span>
          </span>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {SAMPLE_VIDEOS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleSampleClick(sample.url)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-[#FF5A00]/40 text-gray-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00]" />
                <span className="font-medium truncate max-w-[130px]">{sample.title}</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-white/10 text-gray-400">
                  {sample.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subtext info badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>YouTube Videos & Shorts</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>MP4 (1080p, 720p, 480p) & MP3 Audio</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>No Login or Registration Required</span>
        </div>
      </div>
    </section>
  );
};
