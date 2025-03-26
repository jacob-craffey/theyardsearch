import { SearchResult } from "../types/SearchResult";
import { useState } from "react";
import { ResultItem } from "./ResultItem";
import { VideoPlayer } from "./VideoPlayer";
import { Transcript } from "./Transcript";
import { Drawer } from "./Drawer";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export const SearchResults = ({ results, query }: SearchResultsProps) => {
  const [playingIndex, setPlayingIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const mainResult = results[0];
  const recommendations = results.slice(1);

  const handleResultClick = (index: number) => {
    setPlayingIndex(index);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-4">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col">
        <div className="flex-1 mb-4">
          <VideoPlayer result={results[playingIndex]} query={query} />
        </div>

        <Drawer
          title="More Results"
          isOpen={isDrawerOpen}
          setOpen={setIsDrawerOpen}
        >
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-4 pb-4">
              {recommendations.map((result, index) => (
                <div className="flex-shrink-0 w-72" key={result.id}>
                  <ResultItem
                    result={result}
                    index={index + 1}
                    isPlaying={index + 1 === playingIndex}
                    onClick={() => handleResultClick(index + 1)}
                    query={query}
                  />
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex flex-col p-4 gap-4">
          <div className="min-h-0 flex gap-6 max-h-[550px]">
            {/* Video Player - 70% */}
            <div className="relative w-[70%]">
              <VideoPlayer result={results[playingIndex]} />
            </div>

            {/* Transcript - 30% */}
            <div className="w-[30%] overflow-y-auto">
              <Transcript
                text={results[playingIndex].metadata.text}
                searchQuery={query}
              />
            </div>
          </div>

          {/* Horizontal scrolling results */}
          <div className="relative">
            <div className="overflow-x-auto">
              <div className="flex gap-4">
                {results.map((result, index) => (
                  <div className="flex-shrink-0 w-72" key={result.id}>
                    <ResultItem
                      result={result}
                      index={index}
                      isPlaying={index === playingIndex}
                      onClick={() => handleResultClick(index)}
                      query={query}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
