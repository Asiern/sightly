cmake_minimum_required(VERSION 3.15)
set(CMAKE_CXX_STANDARD 11)

set(SRC src/main.cpp src/crosshair.cpp src/window.cpp)


add_executable(${PROJECT_NAME} WIN32 ${SRC})
target_include_directories(${PROJECT_NAME} PRIVATE include)