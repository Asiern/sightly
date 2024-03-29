#include "window.h"
#include "config.h"
#include "crosshair.h"
#include "globals.h"
#include <shellapi.h>

crosshair c;

LPCSTR ClassName()
{
    return "MyWindowClass";
}

HWND Create(LPCSTR lpWindowName, DWORD dwStyle, DWORD dwExStyle, int x, int y, int nWidth, int nHeight, HWND hWndParent,
            HMENU hMenu)
{
    WNDCLASS wc = {0};
    wc.lpfnWndProc = WindowProc;
    wc.hInstance = GetModuleHandleW(NULL);
    wc.lpszClassName = ClassName();

    RegisterClass(&wc);

    return CreateWindowEx(dwExStyle, ClassName(), lpWindowName, dwStyle, x, y, nWidth, nHeight, hWndParent, hMenu,
                          GetModuleHandle(NULL), NULL);
}

LRESULT CALLBACK WindowProc(HWND hwnd, UINT message, WPARAM wParam, LPARAM lParam)
{
    PAINTSTRUCT ps;
    HDC hdc;

    switch (message)
    {
    case WM_CREATE: {
        // Initialize the notification icon
        nidApp.cbSize = sizeof(NOTIFYICONDATA);
        nidApp.hWnd = hwnd;
        nidApp.uID = 1;
        nidApp.uFlags = NIF_ICON | NIF_MESSAGE | NIF_TIP;
        nidApp.uCallbackMessage = WM_USER + 1;
        nidApp.hIcon = LoadIcon(GetModuleHandle(NULL), "IDI_ICON_CROSSHAIR");
        strcpy(nidApp.szTip, "Sightly");
        Shell_NotifyIcon(NIM_ADD, &nidApp);

        // Create the context menu
        hMenu = CreatePopupMenu();
        AppendMenu(hMenu, MF_STRING, IDM_SHOW, "Show");
        AppendMenu(hMenu, MF_STRING, IDM_HIDE, "Hide");
        // AppendMenu(hMenu, MF_STRING, IDM_RELOAD, "Reload config");
        AppendMenu(hMenu, MF_SEPARATOR, 0, NULL); // Add a separator (line)
        AppendMenu(hMenu, MF_STRING, IDM_EDITOR, "Crosshair editor");
        AppendMenu(hMenu, MF_STRING, IDM_ABOUT, "About");
        AppendMenu(hMenu, MF_STRING, IDM_EXIT, "Exit");
        SetMenu(hwnd, hMenu);

        return 0;
    }
    case WM_PAINT: {
        hdc = BeginPaint(hwnd, &ps);

        // Load config
        config* cfg = new config();
        c = cfg->parse();

        // Draw the crosshair in the center of the window
        RECT rect;
        GetClientRect(hwnd, &rect);
        int centerX = (rect.right - rect.left) / 2;
        int centerY = (rect.bottom - rect.top) / 2;

        RenderCrosshair(hdc, centerX, centerY, c);

        EndPaint(hwnd, &ps);
        return 0;
    }
    case WM_USER + 1: {
        switch (lParam)
        {
        case WM_LBUTTONDOWN:
            break;
        case WM_RBUTTONDOWN:
            // Show the context menu
            POINT pt;
            GetCursorPos(&pt);
            TrackPopupMenu(hMenu, TPM_RIGHTBUTTON, pt.x, pt.y, 0, hwnd, NULL);
            break;
        default:
            break;
        }
        return 0;
    }
    case WM_CONTEXTMENU: {
        // Show the context menu
        POINT pt;
        GetCursorPos(&pt);
        TrackPopupMenu(hMenu, TPM_RIGHTBUTTON, pt.x, pt.y, 0, hwnd, NULL);
        return 0;
    }
    case WM_COMMAND: {
        switch (LOWORD(wParam))
        {
        case IDM_EXIT:
            DestroyWindow(hwnd);
            break;

        case IDM_EDITOR:
            ShellExecute(NULL, NULL, "https://asiern.github.io/sightly/", NULL, NULL, SW_SHOW);
            break;

        case IDM_SHOW:
            ShowWindow(hwnd, SW_SHOW);
            break;

        case IDM_HIDE:
            ShowWindow(hwnd, SW_HIDE);
            break;

        case IDM_ABOUT:
            MessageBox(hwnd, "Sightly\n\nMade by Asiern\n\nhttps://asiern.github.io/sightly/", "About", MB_OK);
            break;

            // case IDM_RELOAD:
            //     config* cfg = new config();
            //     c = cfg->parse();
            //     InvalidateRect(hwnd, NULL, TRUE);
            //     break;
        }
        return 0;
    }
    case WM_CLOSE: {
        DestroyWindow(hwnd);
        return 0;
    }
    case WM_DESTROY: {
        PostQuitMessage(0);
        return 0;
    }
    default:
        return DefWindowProc(hwnd, message, wParam, lParam);
    }
}