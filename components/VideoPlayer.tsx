import { SearchResult } from "../types/SearchResult";
import { Transcript } from "./Transcript";

interface VideoPlayerProps {
  result: SearchResult;
  query?: string;
  className?: string;
}

export const VideoPlayer = ({
  result,
  query = "",
  className = "",
}: VideoPlayerProps) => {
  const getYoutubeEmbedUrl = (videoId: string, youtubeTimeLink: string) => {
    const timeMatch = youtubeTimeLink.match(/[?&]t=(\d+)/);
    const timeValue = timeMatch ? timeMatch[1] : "0";
    return `https://www.youtube.com/embed/${videoId}?start=${timeValue}`;
  };

  return (
    <div className={`flex flex-col  ${className}`}>
      <div className="flex-none">
        <div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getYoutubeEmbedUrl(
              result.metadata.videoId!,
              result.metadata.youtubeTimeLink
            )}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-white mb-1">
            {result.metadata.videoTitle}
          </h3>
          <p className="text-sm text-gray-200 mb-4">
            {result.metadata.chapterTitle}
          </p>
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto sm:hidden">
        <Transcript text={result.metadata.text} searchQuery={query} />
      </div>
    </div>
  );
};
