#include "config.h"
#include <fstream>
#include <nlohmann/json.hpp>
#include <string>

using json = nlohmann::json;

#define MAX_LINE_LENGTH 256

std::string config::getConfigPath()
{
    CHAR DocumentsPath[MAX_PATH];
    HRESULT result = SHGetFolderPathA(NULL, CSIDL_PERSONAL, NULL, SHGFP_TYPE_CURRENT, DocumentsPath);
    if (result == S_OK)
    {
        return std::string(DocumentsPath) + std::string("\\Sightly");
    }
    return NULL;
}

config::config()
{
    // Get the config full path
    std::string configPath = this->getConfigPath();

    // Check if the directory exists
    DWORD ftyp = GetFileAttributesA(configPath.c_str());
    if (ftyp == INVALID_FILE_ATTRIBUTES)
    {
        // Create the directory
        CreateDirectoryA(configPath.c_str(), NULL);
    }

    this->lpFilePath = configPath + std::string("\\") + std::string(lpFileName);

    // Open the file and create it if it doesn't exist
    fopen_s(&this->configFile, this->lpFilePath.c_str(), "r");

    if (this->configFile == NULL)
    {
        fopen_s(&this->configFile, this->lpFilePath.c_str(), "w");
        // Write the default config
        fprintf(this->configFile,
                "{\"type\":\"default\",\"thickness\":2,\"spacing\":4,\"size\":10,\"color\":{\"R\":255,"
                "\"G\":0,\"B\":0,\"A\":1}}");
        fclose(this->configFile);
        fopen_s(&this->configFile, this->lpFilePath.c_str(), "r");
    }
}

config::~config()
{
    // Close the file
    fclose(this->configFile);
}

crosshair config::parse()
{
    std::ifstream file(this->lpFilePath);
    json config = json::parse(file);

    crosshair crosshair;
    crosshair.size = config["size"];
    crosshair.color = RGB(config["color"]["R"], config["color"]["G"], config["color"]["B"]);
    crosshair.thickness = config["thickness"];
    crosshair.spacing = config["spacing"];

    std::string type = config["type"];
    if (type == "T")
        crosshair.type = CROSSHAIR_TYPE_T;
    else if (type == "dot")
        crosshair.type = CROSSHAIR_TYPE_DOT;
    else
        crosshair.type = CROSSHAIR_TYPE_CROSS;

    // Close file
    fclose(this->configFile);

    return crosshair;
}
