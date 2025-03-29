"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SearchForm } from "../components/SearchForm";
import { SearchResult } from "../types/SearchResult";
import { SearchResults } from "../components/SearchResults";

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setResults(data.results);
      setError("");
    } catch {
      setError("Failed to perform search");
      setResults([]);
    }
  };

  return (
    <div className="h-screen relative">
      {/* Backdrop with blur and overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/images/backdrop.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
            quality={85}
          />
        </div>
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex-shrink-0 pt-4 lg:pt-8 pb-4 lg:pb-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-center text-white mb-4 lg:mb-8 drop-shadow-lg">
              Search The Yard
            </h1>

            <div className="absolute top-2 right-2" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-white opacity-80 hover:opacity-100 transition-opacity text-2xl cursor-pointer mt-0.5"
              >
                ☰
              </button>

              <div
                className={`absolute right-0 mt-2 w-48 z-10 bg-black/30 ${
                  isDropdownOpen ? "visible" : "invisible"
                }`}
              >
                <div
                  className={`
                  transform transition-all duration-200 ease-out origin-top-right
                  ${
                    isDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }
                  rounded-md shadow-lg bg-white/10 backdrop-blur-md border border-white/20
                `}
                >
                  <div className="py-1">
                    <a
                      href="https://github.com/jacob-craffey/theyardsearch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 hover:bg-white/10 transition-colors"
                    >
                      <Image
                        src="/images/github-logo.png"
                        alt="GitHub"
                        width={20}
                        height={20}
                        className="mr-[8px]"
                      />
                      <span className="text-white">GitHub</span>
                    </a>
                    <a
                      href="https://buymeacoffee.com/jcraffey96"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 hover:bg-white/10 transition-colors"
                    >
                      <span className="mr-2">❤️</span>
                      <span className="text-white">Support</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <SearchForm
              onSearch={handleSearch}
              selectedResult={results[0]}
              query={query}
              setQuery={setQuery}
            />
          </div>
        </div>
        {/* Results Section */}
        <div className="flex-1 min-h-0">
          <div className="h-full max-w-7xl mx-auto py-2 lg:py-4">
            {error && (
              <div className="mx-4 mb-4 p-4 bg-red-500/20 backdrop-blur-md border border-red-200/20 text-red-100 rounded-lg text-center">
                {error}
              </div>
            )}

            {results.length > 0 && (
              <div className=" backdrop-blur-md bg-white/10 rounded-2xl">
                <SearchResults results={results} query={query} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
