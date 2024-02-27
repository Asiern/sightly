import { Icons } from "./ui/icons";
import Logo from "@/assets/icon.svg";

export default function NavBar(): JSX.Element {
  return (
    <div className="flex items-center gap-6 text-sm max-w-6xl mx-auto py-4 flex-1 justify-between px-4">
      <nav className="flex items-center gap-6 text-sm">
        <div className="flex mr-6 items-center space-x-2">
          <img src={Logo} alt="Sightly" className="size-4" />
          <span className="font-bold">Sightly</span>
        </div>
      </nav>
      <div className="flex gap-1 items-center">
        <a
          target="_blank"
          href="https://github.com/Asiern/sightly"
          className="hover:bg-foreground/5 rounded-sm size-8 flex justify-center items-center cursor-pointer transition-colors"
        >
          <Icons.gitHub className="size-4" />
        </a>
      </div>
    </div>
  );
}
