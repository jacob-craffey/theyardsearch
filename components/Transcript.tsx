import { useState } from "react";

interface TranscriptProps {
  text?: string;
  searchQuery: string;
}

export const Transcript = ({ text, searchQuery }: TranscriptProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const words = query.trim().toLowerCase().split(/\s+/);
    // Add word boundaries to match whole words only
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
    <div className="h-full rounded-xl text-white/90">
      <div className="sticky top-0">
        <h3 className="text-lg font-medium">Transcript</h3>
      </div>
      <div className="pt-2 h-[calc(100%-4rem)] overflow-y-auto">
        <p
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-sm leading-relaxed cursor-pointer sm:cursor-default ${
            !isExpanded ? "sm:line-clamp-none line-clamp-5" : ""
          }`}
        >
          {highlightText(text, searchQuery)}
        </p>
      </div>
    </div>
  );
};
