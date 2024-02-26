#ifndef _WINDOW_H
#define _WINDOW_H

#include "globals.h"
#include <windows.h>

#define IDM_EXIT 1
#define IDM_ABOUT 2
#define IDM_SHOW 3
#define IDM_HIDE 4

LPCSTR ClassName();
LRESULT CALLBACK WindowProc(HWND hwnd, UINT message, WPARAM wParam, LPARAM lParam);
HWND Create(LPCSTR lpWindowName, DWORD dwStyle, DWORD dwExStyle, int x = CW_USEDEFAULT, int y = CW_USEDEFAULT,
            int nWidth = CW_USEDEFAULT, int nHeight = CW_USEDEFAULT, HWND hWndParent = NULL, HMENU hMenu = NULL);

#endif