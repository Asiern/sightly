import React from "react";

type Color = {
  R: number;
  G: number;
  B: number;
  A: number;
};

const crosshairTypes = ["default", "T", "dot"];
type CrosshairType = (typeof crosshairTypes)[number];
type Crosshair = {
  type: CrosshairType;
  thickness: number;
  spacing: number;
  size: number;
  color: Color;
};

function ComplementarColor(c: Color): Color {
  return {
    R: 255 - c.R,
    G: 255 - c.G,
    B: 255 - c.B,
    A: c.A,
  };
}

function RenderCrosshair(
  canvas: React.RefObject<HTMLCanvasElement>,
  crosshair: Crosshair
): void {
  // Get the canvas context
  const ctx = canvas.current?.getContext("2d");
  if (!ctx || !canvas.current) return;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

  // Paint the canvas background
  ctx.fillStyle = `rgba(${ComplementarColor(crosshair.color).R}, ${
    ComplementarColor(crosshair.color).G
  }, ${ComplementarColor(crosshair.color).B}, ${crosshair.color.A})`;

  // Set the stroke style
  ctx.strokeStyle = `rgba(${crosshair.color.R}, ${crosshair.color.G}, ${crosshair.color.B}, ${crosshair.color.A})`;
  ctx.lineWidth = crosshair.thickness;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Draw the crosshair
  if (crosshair.type === "dot") {
    // Draw a dot with the size of the crosshair
    ctx.beginPath();
    ctx.arc(
      canvas.current.width / 2,
      canvas.current.height / 2,
      crosshair.size / 2,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  } else if (crosshair.type === "T" || crosshair.type === "default") {
    ctx.beginPath();

    // Only draw top line if the crosshair is not a T
    if (crosshair.type === "default") {
      ctx.moveTo(
        canvas.current.width / 2,
        canvas.current.height / 2 - crosshair.spacing
      );
      ctx.lineTo(
        canvas.current.width / 2,
        canvas.current.height / 2 - crosshair.size - crosshair.spacing
      );
    }

    // Draw the bottom line
    ctx.moveTo(
      canvas.current.width / 2,
      canvas.current.height / 2 + crosshair.spacing
    );
    ctx.lineTo(
      canvas.current.width / 2,
      canvas.current.height / 2 + crosshair.size + crosshair.spacing
    );

    // Draw the left line
    ctx.moveTo(
      canvas.current.width / 2 - crosshair.spacing,
      canvas.current.height / 2
    );
    ctx.lineTo(
      canvas.current.width / 2 - crosshair.size - crosshair.spacing,
      canvas.current.height / 2
    );

    // Draw the right line
    ctx.moveTo(
      canvas.current.width / 2 + crosshair.spacing,
      canvas.current.height / 2
    );
    ctx.lineTo(
      canvas.current.width / 2 + crosshair.size + crosshair.spacing,
      canvas.current.height / 2
    );

    ctx.stroke();
  }
}

function CrosshairToText(crosshair: Crosshair): string {
  return JSON.stringify(crosshair);
}

export { RenderCrosshair, crosshairTypes, CrosshairToText };
export type { CrosshairType, Crosshair };
