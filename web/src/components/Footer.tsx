import { Separator } from "./ui/separator";
import { Icons } from "./ui/icons";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="w-full">
      <Separator />
      <div className="max-w-6xl mx-auto my-4 items-center justify-center flex gap-2">
        <Button
          variant={"ghost"}
          onClick={() => window.open("https://ui.shadcn.com/", "_blank")}
        >
          <Icons.logo className="mr-2 size-4" /> shadcn/ui
        </Button>
        <Button
          variant={"ghost"}
          onClick={() =>
            window.open("https://github.com/nlohmann/json", "_blank")
          }
        >
          <Icons.gitHub className="mr-2 size-4" /> Nlohmann Json
        </Button>
      </div>
    </footer>
  );
}
