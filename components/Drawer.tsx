import { useState, useRef, useEffect } from "react";

interface DrawerProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export function Drawer({ title, children, isOpen, setOpen }: DrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (!isOpen) {
      setShouldRender(false);
    }
  };

  return (
    <div className="relative rounded-lg">
      <div className="absolute bottom-full w-full">
        <div
          ref={drawerRef}
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out mb-2 rounded-lg ${
            isOpen ? "max-h-[70vh]" : "max-h-0"
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          {(isOpen || isAnimating || shouldRender) && (
            <div className="bg-black p-4 rounded-lg">{children}</div>
          )}
        </div>
      </div>

      <button
        onClick={() => setOpen(!isOpen)}
        className="w-full flex justify-between items-center text-white"
      >
        <span className="font-semibold">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
