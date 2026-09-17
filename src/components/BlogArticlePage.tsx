import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Check, Sparkles, BookOpen, ChevronRight, Tag, MessageSquare, ThumbsUp } from 'lucide-react';
import { BlogPost, BLOG_POSTS } from '../data/blogData';

interface BlogArticlePageProps {
  post: BlogPost;
  onBackToBlogList: () => void;
  onNavigateToPost: (slug: string) => void;
  onScrollToDownloader: () => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  post,
  onBackToBlogList,
  onNavigateToPost,
  onScrollToDownloader,
}) => {
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5">
          <button
            onClick={onScrollToDownloader}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <button
            onClick={onBackToBlogList}
            className="hover:text-white transition-colors"
          >
            Guides & Blog
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-[#FF5A00] font-medium truncate max-w-[200px] sm:max-w-xs">
            {post.title}
          </span>
        </nav>

        {/* Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToBlogList}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all shadow-md group"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF5A00] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Guides</span>
          </button>

          <button
            onClick={onScrollToDownloader}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5A00] hover:bg-[#FF6B1A] text-xs font-bold text-white shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Downloader</span>
          </button>
        </div>

        {/* Dedicated Article Header */}
        <header className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5A00]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#FF5A00]/20 border border-[#FF5A00]/40 text-[#FF5A00] font-extrabold text-xs uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-500 text-xs">•</span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{post.date}</span>
            </div>
            <span className="text-gray-500 text-xs">•</span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed border-l-2 border-[#FF5A00] pl-4 italic bg-white/[0.02] py-2 rounded-r-lg">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF5A00]/20 border border-[#FF5A00]/40 flex items-center justify-center text-[#FF5A00] font-bold text-sm">
                LV
              </div>
              <div>
                <div className="text-xs font-bold text-white">{post.author}</div>
                <div className="text-[11px] text-gray-500">Video Technology Specialist</div>
              </div>
            </div>

            {/* Actions: Like & Share */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleLike}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  hasLiked
                    ? 'bg-[#FF5A00] text-white border-[#FF5A00]'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{likes} Helpful</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-xs font-bold transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#FF5A00]" />
                    <span>Share Guide</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Dedicated Article Body Card */}
        <main className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">
          {/* Main Article Content */}
          <article
            className="prose prose-invert max-w-none text-sm sm:text-base space-y-6 text-gray-300 [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:text-white [&>h2]:pt-4 [&>h2]:border-b [&>h2]:border-white/10 [&>h2]:pb-2 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-[#FF5A00] [&>h3]:mt-6 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol>li]:font-medium [&>ul>li]:font-medium [&>a]:text-[#FF5A00] [&>a]:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Dedicated Downloader CTA Banner */}
          <div className="p-6 bg-gradient-to-r from-[#FF5A00]/20 via-[#111111] to-black border border-[#FF5A00]/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5A00]">
                <Sparkles className="w-4 h-4" />
                <span>TRY LOADVIDEO DOWNLOADER NOW</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Download Any YouTube Video in 1080p MP4 or MP3
              </h3>
              <p className="text-xs text-gray-400">
                100% free, unlimited downloads, no software installation required.
              </p>
            </div>

            <button
              onClick={onScrollToDownloader}
              className="px-6 py-3 bg-[#FF5A00] hover:bg-[#FF6B1A] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#FF5A00]/30 shrink-0 transition-transform active:scale-95"
            >
              Start Downloading Now
            </button>
          </div>

          {/* Article Footer Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#FF5A00]" />
              Tags:
            </span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </main>

        {/* Related Dedicated Blog Posts */}
        {relatedPosts.length > 0 && (
          <section className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#FF5A00]" />
                <span>More LoadVideo Guides</span>
              </h3>

              <button
                onClick={onBackToBlogList}
                className="text-xs font-bold text-[#FF5A00] hover:underline flex items-center gap-1"
              >
                <span>View All Articles</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigateToPost(rel.slug)}
                  className="bg-[#111111] border border-white/[0.08] hover:border-[#FF5A00]/40 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group shadow-md"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#FF5A00]">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#FF5A00] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2">{rel.excerpt}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                    <span>{rel.readTime}</span>
                    <span className="font-bold text-[#FF5A00] group-hover:translate-x-1 transition-transform">
                      Read →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
