/**
 * URL Validation and Normalization for GrabVideo
 */

export interface ParsedUrlInfo {
  isValid: boolean;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'unknown';
  cleanUrl: string;
  videoId?: string;
  error?: string;
}

export function validateAndNormalizeUrl(rawUrl: string): ParsedUrlInfo {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      isValid: false,
      platform: 'unknown',
      cleanUrl: '',
      error: 'Paste a video URL first.',
    };
  }

  const trimmed = rawUrl.trim();

  if (!trimmed) {
    return {
      isValid: false,
      platform: 'unknown',
      cleanUrl: '',
      error: 'Paste a video URL first.',
    };
  }

  // Basic web URL regex test
  let urlObj: URL;
  try {
    // Add protocol if missing
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    urlObj = new URL(withProto);
  } catch {
    return {
      isValid: false,
      platform: 'unknown',
      cleanUrl: trimmed,
      error: 'Enter a valid video URL.',
    };
  }

  const host = urlObj.hostname.toLowerCase();

  // YouTube check
  if (
    host.includes('youtube.com') ||
    host.includes('youtu.be') ||
    host.includes('m.youtube.com') ||
    host.includes('music.youtube.com')
  ) {
    let videoId: string | undefined;

    if (host.includes('youtu.be')) {
      videoId = urlObj.pathname.slice(1).split('/')[0]?.split('?')[0];
    } else if (urlObj.pathname.includes('/shorts/')) {
      const parts = urlObj.pathname.split('/shorts/');
      videoId = parts[1]?.split('/')[0]?.split('?')[0];
    } else if (urlObj.pathname.includes('/embed/')) {
      const parts = urlObj.pathname.split('/embed/');
      videoId = parts[1]?.split('/')[0]?.split('?')[0];
    } else {
      videoId = urlObj.searchParams.get('v') || undefined;
    }

    return {
      isValid: true,
      platform: 'youtube',
      cleanUrl: urlObj.toString(),
      videoId,
    };
  }

  // TikTok check
  if (host.includes('tiktok.com')) {
    return {
      isValid: true,
      platform: 'tiktok',
      cleanUrl: urlObj.toString(),
    };
  }

  // Instagram check
  if (host.includes('instagram.com') || host.includes('instagr.am')) {
    return {
      isValid: true,
      platform: 'instagram',
      cleanUrl: urlObj.toString(),
    };
  }

  return {
    isValid: false,
    platform: 'unknown',
    cleanUrl: urlObj.toString(),
    error: 'Currently GrabVideo supports YouTube URLs (TikTok & Instagram coming soon).',
  };
}

export function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

  if (hrs > 0) {
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    return `${hrs}:${formattedMins}:${formattedSecs}`;
  }

  return `${mins}:${formattedSecs}`;
}
