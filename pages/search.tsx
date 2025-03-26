"use client";
import { useState } from "react";
import Image from "next/image";
import { SearchForm } from "../components/SearchForm";
import { SearchResult } from "../types/SearchResult";
import { SearchResults } from "../components/SearchResults";

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedResult, setSelectedResult] = useState<SearchResult>();
  const [query, setQuery] = useState<string>("");

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
