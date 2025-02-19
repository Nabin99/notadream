import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return createPortal(
    isVisible ? (
      <button
        className={`scroll-to-top`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    ) : (
      <></>
    ),
    document.body
  );
}
