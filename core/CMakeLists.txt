cmake_minimum_required(VERSION 3.15)
set(CMAKE_CXX_STANDARD 11)

set(SRC 
    src/main.cpp 
    src/crosshair.cpp 
    src/window.cpp 
    src/config.cpp
    
    include/crosshair.h
    include/window.h
    include/config.h
    include/globals.h
)

add_executable(${PROJECT_NAME} WIN32 ${SRC})
target_sources(${PROJECT_NAME} PRIVATE resources/resources.rc)
target_include_directories(${PROJECT_NAME} PRIVATE include)