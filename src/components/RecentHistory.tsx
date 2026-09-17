import React from 'react';
import { History, Trash2, ArrowRight, Video, Music, ExternalLink } from 'lucide-react';
import { HistoryItem } from '../types/video';

interface RecentHistoryProps {
  items: HistoryItem[];
  onSelectHistoryItem: (url: string) => void;
  onClearHistory: () => void;
}

export const RecentHistory: React.FC<RecentHistoryProps> = ({
  items,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  if (!items || items.length === 0) return null;

  const formatRelativeTime = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  return (
    <section id="recent-history" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF5A00]/10 flex items-center justify-center text-[#FF5A00]">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Recent Downloads</h3>
              <p className="text-xs text-gray-400">Saved in your local browser session</p>
            </div>
          </div>

          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="group bg-[#090909] border border-white/[0.08] hover:border-[#FF5A00]/40 rounded-xl p-3 flex gap-3 items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-14 h-10 object-cover rounded-lg bg-black shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop';
                  }}
                />

                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-[#FF5A00] transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                    <span className="font-semibold text-gray-300">{item.quality}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(item.timestamp)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectHistoryItem(item.originalUrl)}
                className="p-2 rounded-lg bg-white/5 hover:bg-[#FF5A00] hover:text-white text-gray-400 transition-colors shrink-0"
                title="Re-fetch this video"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
