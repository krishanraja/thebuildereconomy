import mindmakerLogo from "@/assets/mindmaker-logo.png";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 p-4">
      <img 
        src={mindmakerLogo} 
        alt="Mindmaker" 
        className="h-8 w-auto opacity-90"
      />
    </header>
  );
};
