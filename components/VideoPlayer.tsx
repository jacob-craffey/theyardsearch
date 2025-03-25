import { SearchResult } from "../types/SearchResult";

interface VideoPlayerProps {
  result: SearchResult;
}

export const VideoPlayer = ({ result }: VideoPlayerProps) => {
  const getYoutubeEmbedUrl = (videoId: string, youtubeTimeLink: string) => {
    const timeMatch = youtubeTimeLink.match(/[?&]t=(\d+)/);
    const timeValue = timeMatch ? timeMatch[1] : "0";
    return `https://www.youtube.com/embed/${videoId}?start=${timeValue}`;
  };

  return (
    <div className="flex-shrink-0 mb-6">
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
        <h3 className="text-2xl font-bold text-white mb-1">
          {result.metadata.videoTitle}
        </h3>
        <p className="text-lg text-white">{result.metadata.chapterTitle}</p>
      </div>
    </div>
  );
};
