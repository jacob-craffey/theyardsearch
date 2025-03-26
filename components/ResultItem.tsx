import { SearchResult } from "../types/SearchResult";
import Image from "next/image";

interface ResultItemProps {
  result: SearchResult;
  index: number;
  isPlaying: boolean;
  onClick: () => void;
  query: string;
}

export const ResultItem = ({
  result,
  index,
  isPlaying,
  onClick,
  query,
}: ResultItemProps) => {
  const getYoutubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const words = query.trim().toLowerCase().split(/\s+/);
    const regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");

    return text.split(regex).map((part, i) =>
      words.some((word) => part.toLowerCase() === word) ? (
        <mark
          key={i}
          className="bg-[color:var(--color-lawn-500)]/30 text-white"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={`transform transition-all duration-200 ease-in-out cursor-pointer
        ${isPlaying ? "bg-white/10" : "hover:bg-white/5"}`}
      onClick={onClick}
    >
      <div className="p-3 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="w-full relative aspect-video rounded-md overflow-hidden">
            <Image
              src={getYoutubeThumbnail(result.metadata.videoId!)}
              alt={result.metadata.chapterTitle}
              fill
              sizes="100vw"
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
          </div>
          <p className="text-sm text-gray-400 line-clamp-5">
            {highlightText(result.metadata.text || "", query)}
          </p>
        </div>
      </div>
    </div>
  );
};
