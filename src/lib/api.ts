import { DownloadResult, VideoInfo } from '../types/video';

export interface VideoInfoResponse {
  ok: boolean;
  data?: VideoInfo;
  error?: string;
  message?: string;
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

    const data = await response.json();

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: data.error || data.message || "We couldn't process this video. Check the URL and try again.",
      };
    }

    return {
      ok: true,
      data: data.data,
    };
  } catch (err) {
    console.error('API Error fetchVideoInfo:', err);
    return {
      ok: false,
      error: "Couldn't connect to the downloader service. Please check your connection and try again.",
    };
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

    const data = await response.json();

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        url: '',
        filename: '',
        expiresInSeconds: 0,
        message: data.error || data.message || "Couldn't prepare this download. Try another format or video.",
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
    console.error('API Error requestDownloadUrl:', err);
    return {
      ok: false,
      url: '',
      filename: '',
      expiresInSeconds: 0,
      message: "Couldn't connect to the downloader service. Please check your network connection.",
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
