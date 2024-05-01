import { Home } from "./Home";
import { Intelli } from "./Intelli";
import { Settings } from "./Settings";

export const Nav = () => {
  return (
    <nav className="absolute space-x-2 top-1 right-1 p-4 z-10 w-32 h-12 flex items-center rounded-xl bg-white/20 shadow-sm shadow-blue-500/30 ring-1 ring-blue-500/50 backdrop-blur-2xl">
      <Home />
      <Intelli />
      <Settings />
    </nav>
  );
};
