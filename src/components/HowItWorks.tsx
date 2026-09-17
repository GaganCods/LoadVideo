import React from 'react';
import { Link2, Sliders, Download } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Paste URL',
      desc: 'Copy your YouTube video or Shorts link and paste it into the downloader input.',
      icon: Link2,
    },
    {
      num: '02',
      title: 'Choose Quality',
      desc: 'Select from available resolutions (1080p, 720p, 480p) or extract MP3/M4A audio.',
      icon: Sliders,
    },
    {
      num: '03',
      title: 'Download File',
      desc: 'Click generate to receive your temporary high-speed download link instantly.',
      icon: Download,
    },
  ];

  return (
    <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-3 mb-12">
        <span className="px-3 py-1 rounded-full bg-[#FF5A00]/10 border border-[#FF5A00]/20 text-[#FF5A00] font-bold text-xs uppercase tracking-wider">
          Simple 3-Step Process
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">How LoadVideo Works</h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          Designed for creators, editors, and researchers to fetch content with zero complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div
              key={idx}
              className="relative bg-[#111111] border border-white/[0.08] hover:border-[#FF5A00]/40 rounded-2xl p-6 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-extrabold text-3xl text-white/10 group-hover:text-[#FF5A00]/40 transition-colors font-mono">
                  {step.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] group-hover:bg-[#FF5A00] border border-white/10 group-hover:border-[#FF5A00] flex items-center justify-center text-gray-300 group-hover:text-white transition-all shadow-md">
                  <IconComp className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF5A00] transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
