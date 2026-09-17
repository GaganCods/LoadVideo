import React, { useState } from 'react';
import { BookOpen, Search, Clock, User, ChevronRight, Tag, Sparkles, ArrowLeft, Flame } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';

interface BlogHubPageProps {
  onSelectPost: (slug: string) => void;
  onScrollToDownloader: () => void;
}

export const BlogHubPage: React.FC<BlogHubPageProps> = ({
  onSelectPost,
  onScrollToDownloader,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Guides', 'Audio MP3', 'YouTube Shorts', 'Tips'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div id="blog-hub" className="min-h-screen bg-[#090909] text-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <button
              onClick={onScrollToDownloader}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-[#FF5A00] font-semibold">Blog & Guides Hub</span>
          </nav>

          <button
            onClick={onScrollToDownloader}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5A00] hover:bg-[#FF6B1A] text-xs font-bold text-white shadow-lg shadow-[#FF5A00]/20 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Downloader</span>
          </button>
        </div>

        {/* Hub Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span>LoadVideo Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Video Downloader <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FF5A00] via-[#FF7A00] to-[#FF9E00] bg-clip-text text-transparent">
              Articles & Guides Hub
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Discover in-depth tutorials on downloading 1080p Full HD MP4 videos, converting 320kbps MP3 audio, saving YouTube Shorts on mobile, and media extraction best practices.
          </p>
        </div>

        {/* Featured Article Spotlight */}
        {featuredPost && (
          <div
            onClick={() => onSelectPost(featuredPost.slug)}
            className="bg-gradient-to-r from-[#111111] via-[#161616] to-[#111111] border border-[#FF5A00]/30 hover:border-[#FF5A00]/60 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 group shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5A00]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#FF5A00] text-white font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Featured Guide</span>
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{featuredPost.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#FF5A00] transition-colors leading-snug">
                {featuredPost.title}
              </h2>

              <p className="text-sm text-gray-300 max-w-3xl leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF5A00]/20 border border-[#FF5A00]/40 text-[#FF5A00] font-bold text-xs group-hover:bg-[#FF5A00] group-hover:text-white transition-all">
                  <span>Read Featured Article</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FF5A00] text-white shadow-lg shadow-[#FF5A00]/20'
                    : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides & keywords..."
              className="w-full bg-[#111111] border border-white/10 focus:border-[#FF5A00] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post.slug)}
              className="bg-[#111111] border border-white/[0.08] hover:border-[#FF5A00]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 cursor-pointer shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF5A00]/10 border border-[#FF5A00]/20 text-[#FF5A00] font-bold text-[11px]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#FF5A00] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <User className="w-3.5 h-3.5 text-gray-600" />
                  <span>{post.author}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5A00] group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-[#111111] rounded-2xl border border-white/10 text-gray-400 text-sm">
            No blog articles found matching your search term.
          </div>
        )}

        {/* Footer Call to Action */}
        <div className="p-8 bg-gradient-to-r from-[#FF5A00]/20 via-[#111111] to-black border border-[#FF5A00]/40 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-extrabold text-white">
              Ready to Download Videos in 1080p MP4 or MP3?
            </h3>
            <p className="text-xs text-gray-300">
              No account required. Fast, free, and compatible with all modern devices.
            </p>
          </div>

          <button
            onClick={onScrollToDownloader}
            className="px-6 py-3 bg-[#FF5A00] hover:bg-[#FF6B1A] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#FF5A00]/30 shrink-0 transition-transform active:scale-95"
          >
            Launch Downloader Now
          </button>
        </div>
      </div>
    </div>
  );
};
