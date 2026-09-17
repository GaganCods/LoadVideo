import React from 'react';
import { Youtube, CheckCircle2, Clock } from 'lucide-react';

export const SupportedPlatforms: React.FC = () => {
  const platforms = [
    {
      name: 'YouTube & Shorts',
      status: 'Active',
      isSupported: true,
      desc: 'Full support for videos, music tracks, and YouTube Shorts.',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: Youtube,
    },
    {
      name: 'TikTok',
      status: 'Coming Soon',
      isSupported: false,
      desc: 'Architecture ready. Platform integration scheduled next.',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: Clock,
    },
    {
      name: 'Instagram Reels',
      status: 'Coming Soon',
      isSupported: false,
      desc: 'Support for Instagram videos and reels coming soon.',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: Clock,
    },
  ];

  return (
    <section id="platforms" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-8 shadow-xl">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Supported Platforms</h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            LoadVideo is engineered with high-speed extensible platform handlers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                  p.isSupported
                    ? 'bg-white/[0.03] border-white/10 hover:border-[#FF5A00]/50'
                    : 'bg-black/30 border-white/5 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white">
                      <IconComp
                        className={`w-5 h-5 ${p.isSupported ? 'text-[#FF0000]' : 'text-gray-400'}`}
                      />
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${p.badgeColor}`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-gray-400">
                  {p.isSupported ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ready to download</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>In development</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
