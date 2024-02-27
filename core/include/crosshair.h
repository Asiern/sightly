#ifndef _CROSSHAIR_H
#define _CROSSHAIR_H

#include <windows.h>

#define CROSSHAIR_TYPE_CROSS 0
#define CROSSHAIR_TYPE_DOT 1
#define CROSSHAIR_TYPE_T 2

typedef struct
{
    int size;
    int spacing;
    int thickness;
    COLORREF color;
    int type;
} crosshair;

VOID RenderCrosshair(HDC hdc, int x, int y, crosshair c);

#endif