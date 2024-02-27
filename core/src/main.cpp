#include "globals.h"
#include "window.h"
#include <Windows.h>

// Global variables
NOTIFYICONDATA nidApp = {sizeof(NOTIFYICONDATA)};
HMENU hMenu;

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow)
{
    HWND hwnd, hiddenHwnd;
    MSG msg;
    HMONITOR hMonitor;
    MONITORINFO mi;

    // Get the primary monitor
    hMonitor = MonitorFromPoint({0, 0}, MONITOR_DEFAULTTOPRIMARY);
    mi = {sizeof(mi)};
    GetMonitorInfoW(hMonitor, &mi);

    // Calculate the width of the window
    int rc = mi.rcMonitor.right - mi.rcMonitor.left;

    // Calculate the height of the window
    int rh = mi.rcMonitor.bottom - mi.rcMonitor.top;

    // Create the window
    if ((hwnd = Create("Crosshair", WS_POPUP | WS_VISIBLE, WS_EX_TOPMOST | WS_EX_LAYERED | WS_EX_TRANSPARENT,
                       CW_USEDEFAULT, CW_USEDEFAULT, rc, rh, NULL, NULL)) == NULL)
    {
        return 1;
    }

    // Set window transparency
    SetLayeredWindowAttributes(hwnd, RGB(0, 0, 0), 0, LWA_COLORKEY);

    ShowWindow(hwnd, nCmdShow);
    UpdateWindow(hwnd);

    while (GetMessage(&msg, NULL, 0, 0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    // Clean up
    Shell_NotifyIcon(NIM_DELETE, &nidApp);

    return 0;
}
