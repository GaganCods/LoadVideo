export interface Format {
  id: string;
  kind: 'video' | 'audio';
  container: string;
  quality: string;
  height?: number;
  hasVideo: boolean;
  hasAudio: boolean;
  filesizeEstimate?: string;
}

export interface VideoInfo {
  id: string;
  platform: string;
  title: string;
  durationSeconds: number;
  thumbnailUrl: string;
  formats: Format[];
  author?: string;
  viewCount?: string;
}

export type DownloaderState = 'idle' | 'fetching' | 'success' | 'error';

export interface DownloadResult {
  ok: boolean;
  url: string;
  filename: string;
  expiresInSeconds: number;
  message?: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  originalUrl: string;
  selectedFormat: string;
  quality: string;
  kind: 'video' | 'audio';
  timestamp: number;
}

export interface SampleVideo {
  title: string;
  url: string;
  badge: string;
  author: string;
}
