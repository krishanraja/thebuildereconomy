import mindmakerLogo from "@/assets/mindmaker-logo.png";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 p-4">
      <a 
        href="https://www.themindmaker.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <img 
          src={mindmakerLogo} 
          alt="Mindmaker" 
          className="h-32 w-auto opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
        />
      </a>
    </header>
  );
};
