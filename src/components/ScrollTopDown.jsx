import { useEffect, useState, useCallback } from "react";

/**
 * Floating scroll-nav widget.
 * - Shows an "up" button once the user has scrolled down a bit.
 * - Shows a "down" button unless already near the bottom of the page.
 * - Sits bottom-right, stacked above WhatsAppFloat.
 */
export default function ScrollTopBottom() {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const viewport = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    setShowUp(scrollY > 300);
    // Hide the down-arrow once we're within ~150px of the bottom.
    setShowDown(scrollY + viewport < fullHeight - 150);
  }, []);

  useEffect(() => {
    handleScroll(); // set initial state on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!showUp && !showDown) return null;

  return (
    <div
      className="fixed right-5 bottom-[4.9rem] z-40 flex flex-col gap-2"
      aria-label="Page scroll navigation"
    >
      {showUp && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-11 h-11 rounded-full bg-[#2F4A7D] text-white shadow-lg
                     flex items-center justify-center
                     transition-all duration-200 hover:bg-[#25396347] hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F4A7D]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}

      {showDown && (
        <button
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
          className="w-11 h-11 rounded-full bg-[#2F4A7D] text-white shadow-lg
                     flex items-center justify-center
                     transition-all duration-200 hover:bg-[#25396347] hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F4A7D]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}