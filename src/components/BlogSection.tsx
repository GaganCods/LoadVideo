import React, { useState } from 'react';
import { BookOpen, Search, Clock, User, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';

interface BlogSectionProps {
  onScrollToDownloader: () => void;
  onSelectPost: (slug: string) => void;
  onOpenBlogHub?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onSelectPost,
  onOpenBlogHub,
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

  return (
    <section id="blog-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#FF5A00]" />
          <span>Knowledge Base & Tutorials</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          Video Downloader Guides & Articles
        </h2>

        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          Explore expert tutorials on downloading 1080p HD videos, extracting 320kbps MP3 audio, saving Shorts, and video conversion tips.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#FF5A00] text-white shadow-md shadow-[#FF5A00]/20'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides & tags..."
            className="w-full bg-[#111111] border border-white/10 focus:border-[#FF5A00] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post.slug)}
            className="bg-[#111111] border border-white/[0.08] hover:border-[#FF5A00]/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:translate-y-[-2px] shadow-lg cursor-pointer"
          >
            <div className="space-y-3">
              {/* Category & Meta */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF5A00]/10 border border-[#FF5A00]/20 text-[#FF5A00] font-bold text-[11px]">
                  {post.category}
                </span>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white group-hover:text-[#FF5A00] transition-colors cursor-pointer leading-snug">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{post.excerpt}</p>
            </div>

            {/* Footer / Read Action */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <User className="w-3 h-3 text-gray-600" />
                <span>{post.author}</span>
              </div>

              <div className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5A00] group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-transform">
                <span>Read Full Guide</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-sm">
          No articles found matching your search. Try another query.
        </div>
      )}

      {/* Dedicated Blog Hub Button */}
      {onOpenBlogHub && (
        <div className="mt-10 text-center">
          <button
            onClick={onOpenBlogHub}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold text-white hover:border-[#FF5A00]/50 transition-all shadow-lg group"
          >
            <span>Explore All Dedicated Articles in Blog Hub</span>
            <ChevronRight className="w-4 h-4 text-[#FF5A00] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};
