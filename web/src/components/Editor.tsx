import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useRef, useState } from "react";
import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Crosshair props
import {
  RenderCrosshair,
  Crosshair,
  CrosshairType,
  crosshairTypes,
  CrosshairToText,
} from "@/lib/crosshair";

export default function Editor(): JSX.Element {
  // Crosshair props
  const [crosshairType, setCrosshairType] = useState<CrosshairType>("default");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onCopy = useCallback(() => {
    // Get crosshair
    const crosshair: Crosshair = {
      type: crosshairType,
      thickness: Number(
        (document.getElementById("thickness") as HTMLInputElement)?.value
      ),
      spacing: Number(
        (document.getElementById("spacing") as HTMLInputElement)?.value
      ),
      size: Number(
        (document.getElementById("size") as HTMLInputElement)?.value
      ),
      color: {
        R: Number((document.getElementById("R") as HTMLInputElement)?.value),
        G: Number((document.getElementById("G") as HTMLInputElement)?.value),
        B: Number((document.getElementById("B") as HTMLInputElement)?.value),
        A: 1,
      },
    };

    // Copy to clipboard
    navigator.clipboard.writeText(CrosshairToText(crosshair));
    toast("Copied to clipboard", {
      closeButton: true,
      duration: 3000,
      description:
        "You can now paste it in the overlay config file located at 'Documents/Sightly/config.json'",
    });
  }, [crosshairType]);

  const onRenderCrosshair = useCallback(() => {
    const crosshair: Crosshair = {
      type: crosshairType,
      thickness: Number(
        (document.getElementById("thickness") as HTMLInputElement)?.value
      ),
      spacing: Number(
        (document.getElementById("spacing") as HTMLInputElement)?.value
      ),
      size: Number(
        (document.getElementById("size") as HTMLInputElement)?.value
      ),
      color: {
        R: Number((document.getElementById("R") as HTMLInputElement)?.value),
        G: Number((document.getElementById("G") as HTMLInputElement)?.value),
        B: Number((document.getElementById("B") as HTMLInputElement)?.value),
        A: 1,
      },
    };
    RenderCrosshair(canvasRef, crosshair);
  }, [crosshairType]);

  useEffect(() => {
    onRenderCrosshair();
  }, [onRenderCrosshair]);

  return (
    <section className="max-w-6xl mx-auto py-4 my-8 gap-4 flex flex-col flex-1">
      <Tabs
        defaultValue="editor"
        className="justify-center flex flex-col items-center mx-auto gap-4"
      >
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="valorant" disabled>
            Valorant
          </TabsTrigger>
          <TabsTrigger value="cs" disabled>
            CS:GO
          </TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardTitle className="text-center mt-8 mb-2">Editor</CardTitle>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Crosshair type</Label>
                    <Select
                      defaultValue="default"
                      onValueChange={(v) => {
                        setCrosshairType(v as CrosshairType);
                        onRenderCrosshair();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Crosshair Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {crosshairTypes.map((type) => {
                          return (
                            <SelectItem
                              key={type}
                              value={type}
                              onSelect={() => setCrosshairType(type)}
                            >
                              {type}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <Label>Thickness</Label>
                    <Input
                      id="thickness"
                      type="number"
                      defaultValue={2}
                      min={0}
                      onChange={onRenderCrosshair}
                    />
                    <Label>Spacing</Label>
                    <Input
                      id="spacing"
                      type="number"
                      defaultValue={4}
                      min={0}
                      onChange={onRenderCrosshair}
                      disabled={crosshairType === "dot"}
                    />
                    <Label>Size</Label>
                    <Input
                      id="size"
                      type="number"
                      defaultValue={10}
                      min={0}
                      onChange={onRenderCrosshair}
                    />
                    <Label>RGB Color</Label>
                    <div className="flex flex-row gap-2">
                      <Input
                        id="R"
                        type="number"
                        defaultValue={2}
                        max={255}
                        min={0}
                        onChange={onRenderCrosshair}
                        className="max-w-[100px]"
                      />
                      <Input
                        id="G"
                        type="number"
                        defaultValue={8}
                        max={255}
                        min={0}
                        onChange={onRenderCrosshair}
                        className="max-w-[100px]"
                      />
                      <Input
                        id="B"
                        type="number"
                        defaultValue={23}
                        max={255}
                        min={0}
                        onChange={onRenderCrosshair}
                        className="max-w-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardTitle className="text-center mt-8 mb-2">Preview</CardTitle>
              <CardContent className="flex flex-col mt-4 justify-between flex-1">
                <canvas id="previewCanvas" color="white" ref={canvasRef} />
                <Button
                  variant={"outline"}
                  className="mx-auto"
                  onClick={onCopy}
                >
                  <CopyIcon className="size-4 mr-2" /> Copy config
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="valorant">Change your password here.</TabsContent>
        <TabsContent value="cs">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
}
