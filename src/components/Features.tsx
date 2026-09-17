import React from 'react';
import { Sliders, Music, Zap, Smartphone, UserCheck, ShieldCheck } from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      title: 'Multiple Qualities',
      desc: 'Select from 1080p Full HD, 720p HD, 480p, or 360p depending on source availability.',
      icon: Sliders,
    },
    {
      title: 'Audio Extraction',
      desc: 'Extract crystal-clear MP3 or M4A audio tracks directly from videos for podcasts or music.',
      icon: Music,
    },
    {
      title: 'Ultra-Fast Fetching',
      desc: 'Powered by server-side proxy architecture for instant video info retrieval without full page reloads.',
      icon: Zap,
    },
    {
      title: 'Mobile First Design',
      desc: 'Responsive interface optimized with touch-friendly controls for Android, iPhone, and iPad.',
      icon: Smartphone,
    },
    {
      title: 'No Account Required',
      desc: 'Start downloading immediately without sign-up forms, passkeys, or account registration.',
      icon: UserCheck,
    },
    {
      title: 'Secure & Private',
      desc: 'Your API requests are proxied securely server-side with zero tracking or file storage.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="features" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-3 mb-12">
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-wider">
          Everything You Need
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          Built for Creators & Power Users
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          All the essential video and audio downloading capabilities packed into one modern web interface.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#111111] border border-white/[0.08] hover:border-[#FF5A00]/40 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF5A00]/10 border border-[#FF5A00]/20 flex items-center justify-center text-[#FF5A00] mb-4">
                <IconComponent className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
