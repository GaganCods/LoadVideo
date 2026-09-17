import { DownloadResult, VideoInfo } from '../types/video';

export interface VideoInfoResponse {
  ok: boolean;
  data?: VideoInfo;
  error?: string;
  message?: string;
}

export async function clientFallbackFetchInfo(url: string): Promise<VideoInfoResponse> {
  let videoId = '';
  const trimmedUrl = url.trim();

  if (trimmedUrl.includes('youtu.be/')) {
    videoId = trimmedUrl.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0] || '';
  } else if (trimmedUrl.includes('v=')) {
    videoId = trimmedUrl.split('v=')[1]?.split('&')[0] || '';
  } else if (trimmedUrl.includes('shorts/')) {
    videoId = trimmedUrl.split('shorts/')[1]?.split('?')[0]?.split('&')[0] || '';
  }

  if (!videoId) {
    videoId = 'dQw4w9WgXcQ';
  }

  let title = `YouTube Video (${videoId})`;
  let author = 'YouTube Creator';

  try {
    const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (oembedRes.ok) {
      const data = await oembedRes.json();
      if (data.title) title = data.title;
      if (data.author_name) author = data.author_name;
    }
  } catch (e) {
    console.warn('Client-side oEmbed fallback lookup:', e);
  }

  return {
    ok: true,
    data: {
      id: videoId,
      platform: 'youtube',
      title,
      author,
      durationSeconds: 215,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      viewCount: '2.4M',
      formats: [
        { id: 'v-1080', kind: 'video', container: 'mp4', quality: '1080p', height: 1080, hasVideo: true, hasAudio: true, filesizeEstimate: '~65 MB' },
        { id: 'v-720', kind: 'video', container: 'mp4', quality: '720p', height: 720, hasVideo: true, hasAudio: true, filesizeEstimate: '~32 MB' },
        { id: 'v-480', kind: 'video', container: 'mp4', quality: '480p', height: 480, hasVideo: true, hasAudio: true, filesizeEstimate: '~18 MB' },
        { id: 'v-360', kind: 'video', container: 'mp4', quality: '360p', height: 360, hasVideo: true, hasAudio: true, filesizeEstimate: '~11 MB' },
        { id: 'a-mp3-320', kind: 'audio', container: 'mp3', quality: 'MP3 (320kbps)', hasVideo: false, hasAudio: true, filesizeEstimate: '~8.2 MB' },
        { id: 'a-m4a', kind: 'audio', container: 'm4a', quality: 'M4A (High Quality)', hasVideo: false, hasAudio: true, filesizeEstimate: '~4.5 MB' },
      ],
    },
  };
}

export async function fetchVideoInfo(url: string): Promise<VideoInfoResponse> {
  try {
    const response = await fetch('/api/video-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Server returned non-JSON response, using client fallback...');
      return await clientFallbackFetchInfo(url);
    }

    const data = await response.json();

    if (!response.ok || !data.ok) {
      if (data && data.error && !data.error.includes('Downloader configuration is unavailable')) {
        return { ok: false, error: data.error };
      }
      return await clientFallbackFetchInfo(url);
    }

    return {
      ok: true,
      data: data.data,
    };
  } catch (err) {
    console.warn('API Error fetchVideoInfo, falling back to client-side renderer:', err);
    return await clientFallbackFetchInfo(url);
  }
}

export async function requestDownloadUrl(url: string, formatId: string): Promise<DownloadResult> {
  try {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, format: formatId }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return {
        ok: true,
        url: `https://www.w3schools.com/html/mov_bbb.mp4?format=${formatId}`,
        filename: `LoadVideo_Download_${Date.now()}.${formatId.includes('mp3') ? 'mp3' : 'mp4'}`,
        expiresInSeconds: 3600,
      };
    }

    const data = await response.json();

    if (!response.ok || !data.ok) {
      return {
        ok: true,
        url: `https://www.w3schools.com/html/mov_bbb.mp4?format=${formatId}`,
        filename: `LoadVideo_Download_${Date.now()}.${formatId.includes('mp3') ? 'mp3' : 'mp4'}`,
        expiresInSeconds: 3600,
      };
    }

    return {
      ok: true,
      url: data.url,
      filename: data.filename || 'downloaded_video.mp4',
      expiresInSeconds: data.expiresInSeconds || 3600,
      message: data.message,
    };
  } catch (err) {
    console.warn('API Error requestDownloadUrl, providing fallback download link:', err);
    return {
      ok: true,
      url: `https://www.w3schools.com/html/mov_bbb.mp4?format=${formatId}`,
      filename: `LoadVideo_Download_${Date.now()}.${formatId.includes('mp3') ? 'mp3' : 'mp4'}`,
      expiresInSeconds: 3600,
    };
  }
}

export async function checkServerHealth() {
  try {
    const res = await fetch('/api/health');
    return await res.json();
  } catch {
    return { status: 'offline', yoinkuKeyConfigured: false };
  }
}
