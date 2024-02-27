#include "crosshair.h"

/**
 * @brief Render the crosshair on the screen
 * @param hdc device context
 * @param x position
 * @param y position
 * @param c crosshair struct
 */
VOID RenderCrosshair(HDC hdc, int x, int y, crosshair c)
{
    // Define Pen
    HPEN hPen = CreatePen(PS_SOLID, c.thickness, c.color);
    HPEN hOldPen = (HPEN)SelectObject(hdc, hPen);

    // Draw the crosshair

    // Move cursor to center of the screen
    MoveToEx(hdc, x, y, NULL);

    if (c.type == CROSSHAIR_TYPE_DOT)
    {
        // Draw the dot
        Ellipse(hdc, x - c.size, y - c.size, x + c.size, y + c.size);
    }
    else if (c.type == CROSSHAIR_TYPE_CROSS || c.type == CROSSHAIR_TYPE_T)
    {
        // Draw top line
        if (c.type == CROSSHAIR_TYPE_CROSS)
        {
            // Mode cursor vertically for spacing
            MoveToEx(hdc, x, y - c.spacing, NULL);

            // Start drawing the line
            LineTo(hdc, x, y - (c.size + c.spacing));
        }

        // Draw bottom line
        MoveToEx(hdc, x, y + c.spacing, NULL);
        LineTo(hdc, x, y + (c.size + c.spacing));

        // Draw left line
        MoveToEx(hdc, x - c.spacing, y, NULL);
        LineTo(hdc, x - (c.size + c.spacing), y);

        // Draw right line
        MoveToEx(hdc, x + c.spacing, y, NULL);
        LineTo(hdc, x + (c.size + c.spacing), y);
    }

    // Clean up
    SelectObject(hdc, hOldPen);
    DeleteObject(hPen);
}
