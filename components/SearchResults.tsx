import { SearchResult } from "../types/SearchResult";
import { useState } from "react";
import { ResultItem } from "./ResultItem";
import { VideoPlayer } from "./VideoPlayer";

interface SearchResultsProps {
  results: SearchResult[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  const [playingIndex, setPlayingIndex] = useState(0);

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="min-h-0 flex justify-center">
        <div className="w-full max-w-4xl">
          <VideoPlayer result={results[playingIndex]} />
        </div>
      </div>

      <div className="relative">
        <div className="overflow-x-auto ">
          <div className="flex gap-4">
            {results.map((result, index) => (
              <div className="flex-shrink-0 w-72" key={result.id}>
                <ResultItem
                  key={result.id}
                  result={result}
                  index={index}
                  isPlaying={index === playingIndex}
                  onClick={() => setPlayingIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
