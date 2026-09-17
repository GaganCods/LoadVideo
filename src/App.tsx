import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoResult } from './components/VideoResult';
import { RecentHistory } from './components/RecentHistory';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { SupportedPlatforms } from './components/SupportedPlatforms';
import { BlogSection } from './components/BlogSection';
import { BlogHubPage } from './components/BlogHubPage';
import { BlogArticlePage } from './components/BlogArticlePage';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';

import { Format, VideoInfo, HistoryItem, DownloaderState } from './types/video';
import { validateAndNormalizeUrl } from './lib/url-validation';
import { fetchVideoInfo, requestDownloadUrl } from './lib/api';
import { BLOG_POSTS } from './data/blogData';

const HISTORY_STORAGE_KEY = 'loadvideo_recent_history';

export default function App() {
  const [urlInput, setUrlInput] = useState<string>('');
  const [state, setState] = useState<DownloaderState>('idle');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [activeUrl, setActiveUrl] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Hash-based routing state: 'home' | 'blog-hub' | 'blog-article'
  const [route, setRoute] = useState<{
    view: 'home' | 'blog-hub' | 'blog-article';
    slug?: string;
    sectionId?: string;
  }>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#blog/')) {
      return { view: 'blog-article', slug: hash.replace('#blog/', '') };
    }
    if (hash === '#blog' || hash === '#blog-hub' || hash === '#guides') {
      return { view: 'blog-hub' };
    }
    return { view: 'home', sectionId: hash.replace('#', '') };
  });

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        setRoute({ view: 'blog-article', slug: hash.replace('#blog/', '') });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#blog' || hash === '#blog-hub' || hash === '#guides') {
        setRoute({ view: 'blog-hub' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const rawSection = hash.replace('#', '');
        setRoute({ view: 'home', sectionId: rawSection });

        if (rawSection) {
          setTimeout(() => {
            const targetId = rawSection === 'downloader' ? 'downloader-section' : rawSection === 'blog' ? 'blog-section' : rawSection;
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Recent History state from LocalStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Legal Modal state
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'terms' | 'privacy'>('terms');

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  }, [history]);

  const scrollToSection = (sectionId: string) => {
    const cleanId = sectionId === 'downloader-section' ? 'downloader' : sectionId === 'blog-section' ? 'blog' : sectionId;

    if (cleanId === 'blog-hub' || cleanId === 'guides') {
      window.location.hash = '#blog-hub';
      return;
    }

    window.location.hash = `#${cleanId}`;
  };

  const handleSelectBlogPost = (slug: string) => {
    window.location.hash = `#blog/${slug}`;
  };

  const handleBackToBlogList = () => {
    window.location.hash = '#blog-hub';
  };

  const handleFetch = async (customUrl?: string) => {
    const targetUrl = customUrl || urlInput;
    setErrorMsg(null);

    // 1. Validate input URL
    const parsed = validateAndNormalizeUrl(targetUrl);
    if (!parsed.isValid) {
      setErrorMsg(parsed.error || 'Please enter a valid video URL.');
      setState('idle');
      return;
    }

    setState('fetching');

    // 2. Call server-side video info API
    const res = await fetchVideoInfo(parsed.cleanUrl);

    if (!res.ok || !res.data) {
      setErrorMsg(res.error || "We couldn't retrieve information for this video.");
      setState('error');
      return;
    }

    // 3. Success state
    setVideoInfo(res.data);
    setActiveUrl(parsed.cleanUrl);
    setState('success');

    // Add to history
    const newItem: HistoryItem = {
      id: `${res.data.id}_${Date.now()}`,
      title: res.data.title,
      thumbnailUrl: res.data.thumbnailUrl,
      originalUrl: parsed.cleanUrl,
      selectedFormat: res.data.formats[0]?.quality || '720p',
      quality: res.data.formats[0]?.quality || '720p',
      kind: res.data.formats[0]?.kind || 'video',
      timestamp: Date.now(),
    };

    setHistory((prev) => [newItem, ...prev.filter((i) => i.originalUrl !== parsed.cleanUrl)].slice(0, 10));

    // Scroll smoothly to video result container
    setTimeout(() => {
      const container = document.getElementById('video-result-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handlePrepareDownload = async (format: Format) => {
    return await requestDownloadUrl(activeUrl, format.id);
  };

  const handleReset = () => {
    setState('idle');
    setVideoInfo(null);
    setActiveUrl('');
    setErrorMsg(null);
    setUrlInput('');
    window.location.hash = '#downloader';
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleOpenLegal = (tab: 'terms' | 'privacy') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const activeBlogPost = route.view === 'blog-article' && route.slug ? BLOG_POSTS.find((p) => p.slug === route.slug) : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#090909] text-gray-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#FF5A00] selection:text-white">
      {/* Floating Header */}
      <Header
        onScrollToSection={scrollToSection}
        historyCount={history.length}
        onOpenLegal={handleOpenLegal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {route.view === 'blog-article' && activeBlogPost ? (
          /* Dedicated Single Blog Article Page */
          <BlogArticlePage
            post={activeBlogPost}
            onBackToBlogList={handleBackToBlogList}
            onNavigateToPost={handleSelectBlogPost}
            onScrollToDownloader={() => scrollToSection('downloader-section')}
          />
        ) : route.view === 'blog-hub' ? (
          /* Dedicated Main Blog Hub Page */
          <BlogHubPage
            onSelectPost={handleSelectBlogPost}
            onScrollToDownloader={() => scrollToSection('downloader-section')}
          />
        ) : (
          /* Standard Home & Downloader View with Deep Sections */
          <>
            {/* Downloader Hero */}
            <Hero
              urlInput={urlInput}
              setUrlInput={setUrlInput}
              onFetch={handleFetch}
              isLoading={state === 'fetching'}
              error={errorMsg}
              onClearError={() => setErrorMsg(null)}
            />

            {/* Video Result View (Visible on Success) */}
            {state === 'success' && videoInfo && (
              <VideoResult
                video={videoInfo}
                originalUrl={activeUrl}
                onPrepareDownload={handlePrepareDownload}
                onReset={handleReset}
              />
            )}

            {/* Recent History Section */}
            <RecentHistory
              items={history}
              onSelectHistoryItem={(url) => {
                setUrlInput(url);
                handleFetch(url);
              }}
              onClearHistory={handleClearHistory}
            />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Features Grid */}
            <Features />

            {/* Supported Platforms */}
            <SupportedPlatforms />

            {/* SEO Guides & Knowledge Base Blog */}
            <BlogSection
              onScrollToDownloader={() => scrollToSection('downloader-section')}
              onSelectPost={handleSelectBlogPost}
              onOpenBlogHub={() => scrollToSection('blog-hub')}
            />

            {/* FAQ Accordion */}
            <FAQ />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onScrollToSection={scrollToSection} onOpenLegal={handleOpenLegal} />

      {/* Terms & Privacy Legal Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalModalTab}
        onClose={() => setLegalModalOpen(false)}
      />
    </div>
  );
}
