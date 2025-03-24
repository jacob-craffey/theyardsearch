import { SearchResult } from "../types/SearchResult";
import { useState } from "react";

interface SearchResultsProps {
  results: SearchResult[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  const [playingIndex, setPlayingIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getYoutubeEmbedUrl = (videoId: string, youtubeTimeLink: string) => {
    const timeMatch = youtubeTimeLink.match(/[?&]t=(\d+)/);
    const timeValue = timeMatch ? timeMatch[1] : "0";
    return `https://www.youtube.com/embed/${videoId}?start=${timeValue}`;
  };

  const getYoutubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  const ResultItem = ({
    result,
    index,
    compact = false,
  }: {
    result: SearchResult;
    index: number;
    compact?: boolean;
  }) => (
    <div
      className={`transform transition-all duration-200 ease-in-out cursor-pointer
        ${index === playingIndex ? "bg-white/10" : "hover:bg-white/5"}`}
      onClick={() => {
        setPlayingIndex(index);
        setIsDrawerOpen(false);
      }}
    >
      <div className="p-3 rounded-lg">
        <div className={`flex ${compact ? "gap-3" : "flex-col gap-2"}`}>
          <div
            className={`${
              compact ? "w-40 flex-shrink-0" : "w-full"
            } aspect-video overflow-hidden rounded-md`}
          >
            <img
              src={getYoutubeThumbnail(result.metadata.videoId!)}
              alt={result.metadata.chapterTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <h3 className="font-medium truncate text-white text-sm">
              {result.metadata.chapterTitle}
            </h3>
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                {index === playingIndex ? (
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                ) : null}
                Score: {result.score.toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full relative">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Drawer overlay */}
      {isDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <div className="h-full flex gap-6 p-4">
        {/* Thumbnails drawer/sidebar */}
        <div
          className={`
          fixed lg:relative inset-y-0 left-0 z-40 w-80 bg-black/80 backdrop-blur-md lg:backdrop-blur-none lg:bg-transparent
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${
            isDrawerOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <div className="h-full overflow-y-auto lg:py-0">
            <div className="space-y-1 px-2">
              {results.map((result, index) => (
                <ResultItem key={result.id} result={result} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-grow min-w-0 flex flex-col">
          {/* Primary player */}
          <div className="flex-shrink-0 mb-6">
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getYoutubeEmbedUrl(
                  results[playingIndex].metadata.videoId!,
                  results[playingIndex].metadata.youtubeTimeLink
                )}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-medium text-white">
                {results[playingIndex].metadata.chapterTitle}
              </h3>
              <div className="text-sm text-gray-300"></div>
              Score: {results[playingIndex].score.toFixed(4)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
