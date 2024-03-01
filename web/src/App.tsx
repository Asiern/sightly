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
      <section className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mt-8">Configuration</h2>
        <p className="mt-4">To configure Sightly, follow these steps:</p>
        <ol className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            Launch Sightly for the first time. This will create a config file at{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              Documents/Sightly/config.json
            </code>{" "}
            with the default configuration.
          </li>
          <li>
            Use the editor below to customize your crosshair. Adjust the
            settings according to your preferences.
          </li>
          <li>
            Once you are satisfied with your custom crosshair, copy the
            configuration from the editor.
          </li>
          <li>
            Open the{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              config.json
            </code>{" "}
            file located at <code>Documents/Sightly</code>.
          </li>
          <li>
            Paste the copied configuration into the <code>config.json</code>{" "}
            file, replacing the existing content.
          </li>
          <li>
            Save the{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              config.json
            </code>{" "}
            file.
          </li>
          <li>Restart Sightly for the changes to take effect.</li>
        </ol>
      </section>
      <Editor />
      <Footer />
      <Toaster />
    </main>
  );
}
