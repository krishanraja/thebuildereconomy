import { useEffect, useState } from "react";
import mindmakerLogo from "@/assets/mindmaker-logo.png";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 p-2 md:p-4">
      <a 
        href="https://www.themindmaker.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <img 
          src={mindmakerLogo} 
          alt="Mindmaker" 
          className={`h-10 md:h-32 w-auto hover:opacity-100 cursor-pointer transition-all duration-300 ${
            scrolled ? "opacity-0" : "opacity-70 md:opacity-90"
          }`}
        />
      </a>
    </header>
  );
};
