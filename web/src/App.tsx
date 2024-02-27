import { Editor, Footer, NavBar } from "@/components";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <main>
      <NavBar />
      <Separator />
      <section className="max-w-6xl mx-auto mt-8 text-center flex flex-col gap-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Sightly
        </h1>
        <p className="text-xl text-muted-foreground">
          An open-source crosshair overlay for gamers
        </p>
        <div className="flex mx-auto gap-4 mt-4">
          <Button
            onClick={() =>
              window.open(
                "https://github.com/Asiern/sightly/releases/latest",
                "_blank"
              )
            }
            className="font-bold"
          >
            <Icons.gitHub className="mr-2 size-4" /> Download
          </Button>
        </div>
      </section>
      <Editor />
      <Footer />
      <Toaster />
    </main>
  );
}
