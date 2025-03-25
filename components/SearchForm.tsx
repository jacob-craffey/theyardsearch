import { useState } from "react";

interface SearchFormProps {
  onSearch: (query: string) => Promise<void>;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSearch(query);
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setQuery(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search anything..."
          maxLength={500}
          className="w-full px-6 pr-18 py-4 text-lg bg-white/80 backdrop-blur-md border-2 border-white/20 rounded-2xl focus:outline-none focus:border-[color:var(--color-lawn-500)] focus:bg-white/90 transition-all duration-200 shadow-lg text-gray-800 placeholder-gray-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-2  px-4 py-2 bg-[color:var(--color-lawn-500)]/90 hover:bg-[color:var(--color-lawn-600)] text-white rounded-2xl disabled:bg-[color:var(--color-lawn-300)]/50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 backdrop-blur-sm"
          disabled={isLoading || query.trim().length === 0}
        >
          <svg
            className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isLoading ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            )}
          </svg>
        </button>
      </div>
    </form>
  );
};
