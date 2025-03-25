import { SearchResult } from "../types/SearchResult";
import Image from "next/image";

interface ResultItemProps {
  result: SearchResult;
  index: number;
  isPlaying: boolean;
  compact?: boolean;
  onClick: () => void;
}

export const ResultItem = ({
  result,
  index,
  isPlaying,
  compact = false,
  onClick,
}: ResultItemProps) => {
  const getYoutubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  return (
    <div
      className={`transform transition-all duration-200 ease-in-out cursor-pointer
        ${isPlaying ? "bg-white/10" : "hover:bg-white/5"}`}
      onClick={onClick}
    >
      <div className="p-3 rounded-lg">
        <div className={`flex ${compact ? "gap-3" : "flex-col gap-2"}`}>
          <div
            className={`${
              compact ? "w-40 flex-shrink-0" : "w-full"
            } relative aspect-video rounded-md overflow-hidden`}
          >
            <Image
              src={getYoutubeThumbnail(result.metadata.videoId!)}
              alt={result.metadata.chapterTitle}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={index === 0}
            />
          </div>
          <div className="min-w-0 flex items-center gap-2">
            {isPlaying ? (
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            ) : null}
            <h3 className="font-medium truncate text-white text-sm">
              {result.metadata.chapterTitle}
            </h3>
            <div className="text-xs text-gray-400 flex items-center gap-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
