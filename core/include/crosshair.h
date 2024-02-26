#ifndef _CROSSHAIR_H
#define _CROSSHAIR_H

#include <windows.h>

typedef struct
{
    int size;
    int spacing;
    int thickness;
    COLORREF color;
} crosshair;

VOID RenderCrosshair(HDC hdc, int x, int y, crosshair c);

#endif