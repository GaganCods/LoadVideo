import React from 'react';
import { Video, Music, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Format } from '../types/video';

interface FormatCardProps {
  format: Format;
  isSelected: boolean;
  onSelect: (format: Format) => void;
  isRecommended?: boolean;
}

export const FormatCard: React.FC<FormatCardProps> = ({
  format,
  isSelected,
  onSelect,
  isRecommended = false,
}) => {
  const isAudio = format.kind === 'audio';

  return (
    <div
      onClick={() => onSelect(format)}
      className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
        isSelected
          ? 'bg-[#FF5A00]/10 border-[#FF5A00] ring-1 ring-[#FF5A00]/50 shadow-lg shadow-[#FF5A00]/10'
          : 'bg-[#161616] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
      }`}
    >
      {/* Recommended Tag */}
      {isRecommended && (
        <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#FF5A00] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          <span>Recommended</span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        {/* Left Icon & Details */}
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              isAudio
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}
          >
            {isAudio ? <Music className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base">
                {format.quality}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-semibold text-[11px] uppercase">
                {format.container}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400">
              <span>
                {isAudio
                  ? 'Audio only'
                  : format.hasVideo && format.hasAudio
                  ? 'Video + Audio'
                  : format.hasVideo
                  ? 'Video only'
                  : 'Audio'}
              </span>

              {format.filesizeEstimate && (
                <>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-300 font-medium">{format.filesizeEstimate}</span>
                </>
              )}
            </div>

            {!isAudio && !format.hasAudio && (
              <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-400">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>No audio track in video format</span>
              </div>
            )}
          </div>
        </div>

        {/* Selection Checkbox */}
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
            isSelected
              ? 'bg-[#FF5A00] border-[#FF5A00] text-white'
              : 'border-white/20 bg-black/40'
          }`}
        >
          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
};
