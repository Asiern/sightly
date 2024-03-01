cmake_minimum_required(VERSION 3.15)
project(Sightly)
add_subdirectory(core)

cmake_policy(SET CMP0135 NEW)

include(FetchContent)
FetchContent_Declare(json URL https://github.com/nlohmann/json/releases/download/v3.11.3/json.tar.xz)
FetchContent_MakeAvailable(json)

target_link_libraries(${PROJECT_NAME} PRIVATE nlohmann_json::nlohmann_json)
