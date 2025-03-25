export interface SearchResultMetadata {
  chapterTitle: string;
  endTime: number;
  startTime: number;
  text?: string;
  videoTitle: string;
  videoId?: string;
  youtubeTimeLink: string;
}

export interface SearchResult {
  id: string;
  metadata: SearchResultMetadata;
  score: number;
  values?: number[];
  sparseValues?: any;
}
