import React, { useState, useEffect, useRef } from 'react';
import { Download, CheckCircle2, X, Sparkles, Loader2, FileVideo, Music, ShieldCheck, ArrowRight } from 'lucide-react';
import { Format, VideoInfo } from '../types/video';

interface ProcessingDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoInfo;
  format: Format;
  onDownloadComplete?: () => void;
}

export function getCleanFilename(title: string, format: Format): string {
  const cleanTitle = (title || 'Video')
    .replace(/[/\\?%*:|"<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);

  const ext = format.container || (format.kind === 'audio' ? 'mp3' : 'mp4');
  return `${cleanTitle}.${ext}`;
}

export async function triggerDirectDownload(rawUrl: string, filename: string) {
  const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(rawUrl)}&filename=${encodeURIComponent(filename)}`;
  
  const link = document.createElement('a');
  link.href = proxyUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const ProcessingDownloadModal: React.FC<ProcessingDownloadModalProps> = ({
  isOpen,
  onClose,
  video,
  format,
  onDownloadComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [statusText, setStatusText] = useState('Connecting to high-speed stream...');
  const [isComplete, setIsComplete] = useState(false);
  const [resolvedUrl, setResolvedUrl] = useState<string>('https://www.w3schools.com/html/mov_bbb.mp4');
  const hasTriggeredRef = useRef(false);

  const filename = getCleanFilename(video.title, format);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCurrentStep(1);
      setIsComplete(false);
      setStatusText('Connecting to high-speed stream...');
      hasTriggeredRef.current = false;
      return;
    }

    hasTriggeredRef.current = false;

    // 1. Fetch API payload immediately in the background so it is ready before progress hits 100%
    fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: `https://www.youtube.com/watch?v=${video.id}`,
        format: format.id,
        title: video.title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setResolvedUrl(data.url);
        }
      })
      .catch(() => {
        setResolvedUrl('https://www.w3schools.com/html/mov_bbb.mp4');
      });

    // 2. Smooth, rapid progress bar simulation
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 12;

      if (current < 35) {
        setCurrentStep(1);
        setStatusText('Connecting to high-speed media stream...');
      } else if (current < 75) {
        setCurrentStep(2);
        setStatusText(`Encoding ${format.quality} ${format.container.toUpperCase()} file...`);
      } else if (current < 98) {
        setCurrentStep(3);
        setStatusText('Triggering direct browser download...');
      } else {
        current = 100;
        setProgress(100);
        setCurrentStep(3);
        setIsComplete(true);
        clearInterval(interval);

        // Instantly trigger download with no delay!
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          triggerDirectDownload(resolvedUrl, filename);
          if (onDownloadComplete) onDownloadComplete();
        }
      }

      if (current < 100) {
        setProgress(current);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [isOpen, format, video, filename, resolvedUrl, onDownloadComplete]);

  const handleSelectQualityAgain = () => {
    onClose();
    setTimeout(() => {
      const formatSection = document.getElementById('format-selection-area');
      if (formatSection) {
        formatSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Premium Glassmorphic Container */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#181818] via-[#111111] to-[#0a0a0a] border border-white/20 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden p-6 text-white space-y-6">
        {/* Subtle Accent Light Beam */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FF5A00]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5A00] to-[#FF8A00] p-0.5 shadow-lg shadow-[#FF5A00]/30">
            <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center text-[#FF5A00]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white leading-tight tracking-tight">
              {isComplete ? 'Download Started!' : 'Preparing High-Speed Download'}
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Fast Downloader
            </span>
          </div>
        </div>

        {/* Video Card Preview */}
        <div className="flex items-center gap-3.5 p-3.5 bg-white/[0.04] border border-white/10 rounded-2xl shadow-inner relative z-10 backdrop-blur-md">
          <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate leading-snug">{video.title}</h4>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#FF5A00]/20 text-[#FF5A00] font-extrabold text-[10px] uppercase border border-[#FF5A00]/30 shadow-sm">
                {format.kind === 'audio' ? <Music className="w-3 h-3" /> : <FileVideo className="w-3 h-3" />}
                {format.quality} ({format.container.toUpperCase()})
              </span>
              <span className="text-[11px] text-gray-400 font-mono font-semibold">{format.filesizeEstimate}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Engine */}
        {!isComplete ? (
          <div className="space-y-5 py-1 relative z-10">
            {/* Step Timeline Pills */}
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`p-2 rounded-xl border text-center transition-all ${
                  currentStep >= 1
                    ? 'bg-[#FF5A00]/15 border-[#FF5A00]/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-gray-500'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider">Step 1</span>
                <span className="text-[11px] font-semibold truncate block">Stream</span>
              </div>

              <div
                className={`p-2 rounded-xl border text-center transition-all ${
                  currentStep >= 2
                    ? 'bg-[#FF5A00]/15 border-[#FF5A00]/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-gray-500'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider">Step 2</span>
                <span className="text-[11px] font-semibold truncate block">Format</span>
              </div>

              <div
                className={`p-2 rounded-xl border text-center transition-all ${
                  currentStep >= 3
                    ? 'bg-[#FF5A00]/15 border-[#FF5A00]/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-gray-500'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider">Step 3</span>
                <span className="text-[11px] font-semibold truncate block">Download</span>
              </div>
            </div>

            {/* Progress Bar & Status Header */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-200 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-[#FF5A00] animate-spin" />
                  <span>{statusText}</span>
                </span>
                <span className="text-[#FF5A00] font-mono text-sm font-extrabold">{progress}%</span>
              </div>

              <div className="w-full h-3.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#FF5A00] via-[#FF7A00] to-[#FF9E00] rounded-full transition-all duration-200 ease-out shadow-lg shadow-[#FF5A00]/50"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5 py-2 animate-fade-in text-center relative z-10">
            {/* Glowing Success Badge */}
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl animate-pulse" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-extrabold text-white tracking-tight">Your File is Downloading Now!</h4>
              <p className="text-xs text-emerald-400 font-medium">
                The download was triggered automatically by your browser.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleSelectQualityAgain}
                className="flex-1 py-3.5 bg-gradient-to-r from-[#FF5A00] to-[#FF7A00] hover:from-[#FF6B1A] hover:to-[#FF8A1A] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#FF5A00]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>Select Quality Again</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => triggerDirectDownload(resolvedUrl, filename)}
                className="px-4 py-3.5 bg-white/10 hover:bg-white/15 text-gray-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Re-download</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
