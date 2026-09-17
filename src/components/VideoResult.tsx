import React, { useState } from 'react';
import {
  Download,
  ExternalLink,
  Clock,
  Youtube,
  Music,
  Video,
  RefreshCw,
} from 'lucide-react';
import { Format, VideoInfo, DownloadResult } from '../types/video';
import { formatDuration } from '../lib/url-validation';
import { FormatCard } from './FormatCard';
import { ProcessingDownloadModal } from './ProcessingDownloadModal';

interface VideoResultProps {
  video: VideoInfo;
  originalUrl: string;
  onPrepareDownload: (format: Format) => Promise<DownloadResult>;
  onReset: () => void;
}

export const VideoResult: React.FC<VideoResultProps> = ({
  video,
  originalUrl,
  onReset,
}) => {
  // Sort formats: video first (descending height), then audio
  const videoFormats = video.formats
    .filter((f) => f.kind === 'video')
    .sort((a, b) => (b.height || 0) - (a.height || 0));

  const audioFormats = video.formats.filter((f) => f.kind === 'audio');

  // Select 720p or first video format by default
  const defaultFormat =
    videoFormats.find((f) => f.quality.includes('720p')) ||
    videoFormats[0] ||
    audioFormats[0] ||
    video.formats[0];

  const [selectedFormat, setSelectedFormat] = useState<Format>(defaultFormat);
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartDownload = () => {
    if (!selectedFormat) return;
    setIsModalOpen(true);
  };

  return (
    <div id="video-result-container" className="mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="bg-[#111111] border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Header Bar */}
        <div className="bg-white/[0.02] border-b border-white/[0.08] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-sm text-gray-200">Video Information Fetched</span>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Fetch Another Video</span>
          </button>
        </div>

        {/* Content Body: 2 Columns on Desktop */}
        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Video Preview & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Thumbnail Card */}
            <div className="relative rounded-xl overflow-hidden bg-black/60 aspect-video group border border-white/10 shadow-lg">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop';
                }}
              />

              {/* Overlay Badges */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10">
                <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                <span className="capitalize">{video.platform || 'YouTube'}</span>
              </div>

              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-xs font-bold font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#FF5A00]" />
                <span>{formatDuration(video.durationSeconds)}</span>
              </div>
            </div>

            {/* Title & Author */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug line-clamp-2">
                {video.title}
              </h2>

              <div className="flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
                <span className="font-medium text-gray-300">
                  {video.author ? `By ${video.author}` : 'YouTube Creator'}
                </span>

                <a
                  href={originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#FF5A00] hover:text-[#FF7A00] hover:underline font-semibold"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-xs text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Available Qualities:</span>
                <span className="text-white font-medium">
                  {videoFormats.length} Video / {audioFormats.length} Audio
                </span>
              </div>
              <div className="flex justify-between">
                <span>Maximum Resolution:</span>
                <span className="text-[#FF5A00] font-bold">
                  {videoFormats[0]?.quality || '720p'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Format Selection & Download Action (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div id="format-selection-area" className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Choose Download Format</span>
                </h3>

                {/* Tabs: Video vs Audio */}
                <div className="flex bg-[#090909] p-1 rounded-lg border border-white/10">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeTab === 'video'
                        ? 'bg-[#FF5A00] text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video ({videoFormats.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('audio')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeTab === 'audio'
                        ? 'bg-[#FF5A00] text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Music className="w-3.5 h-3.5" />
                    <span>Audio ({audioFormats.length})</span>
                  </button>
                </div>
              </div>

              {/* Format Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                {activeTab === 'video' ? (
                  videoFormats.length > 0 ? (
                    videoFormats.map((f) => (
                      <FormatCard
                        key={f.id}
                        format={f}
                        isSelected={selectedFormat?.id === f.id}
                        onSelect={(fmt) => {
                          setSelectedFormat(fmt);
                        }}
                        isRecommended={f.quality.includes('720p')}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500 text-sm">
                      No video formats returned.
                    </div>
                  )
                ) : audioFormats.length > 0 ? (
                  audioFormats.map((f) => (
                    <FormatCard
                      key={f.id}
                      format={f}
                      isSelected={selectedFormat?.id === f.id}
                      onSelect={(fmt) => {
                        setSelectedFormat(fmt);
                      }}
                      isRecommended={f.quality.includes('320') || f.quality.includes('MP3')}
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-gray-500 text-sm">
                    No audio formats returned.
                  </div>
                )}
              </div>
            </div>

            {/* Direct Download Action Button */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <button
                onClick={handleStartDownload}
                disabled={!selectedFormat}
                className="w-full py-4 bg-[#FF5A00] hover:bg-[#FF6B1A] disabled:opacity-60 text-white font-extrabold text-base rounded-xl shadow-xl shadow-[#FF5A00]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Download className="w-5 h-5" />
                <span>
                  Download {selectedFormat?.quality} {selectedFormat?.container.toUpperCase()}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Download Action Bar */}
      {selectedFormat && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#090909]/95 border-t border-white/10 backdrop-blur-lg flex items-center justify-between gap-3 shadow-2xl">
          <div className="flex flex-col text-xs">
            <span className="text-gray-400">Selected Format:</span>
            <span className="font-extrabold text-white text-sm">
              {selectedFormat.quality} {selectedFormat.container.toUpperCase()}
            </span>
          </div>

          <button
            onClick={handleStartDownload}
            className="px-5 py-2.5 bg-[#FF5A00] active:bg-[#FF6B1A] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#FF5A00]/20 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      )}

      {/* Processing Download Popup Modal */}
      {selectedFormat && (
        <ProcessingDownloadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          video={video}
          format={selectedFormat}
        />
      )}
    </div>
  );
};

