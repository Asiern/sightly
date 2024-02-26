#include "crosshair.h"

VOID RenderCrosshair(HDC hdc, int x, int y, crosshair c)
{
    // Define Pen
    HPEN hPen = CreatePen(PS_SOLID, c.thickness, c.color);
    HPEN hOldPen = (HPEN)SelectObject(hdc, hPen);

    // Draw the crosshair
    MoveToEx(hdc, x - 10, y, NULL);
    LineTo(hdc, x + 10, y);
    MoveToEx(hdc, x, y - 10, NULL);
    LineTo(hdc, x, y + 10);

    // Clean up
    SelectObject(hdc, hOldPen);
    DeleteObject(hPen);
}
