#ifndef _CONFIG_H
#define _CONFIG_H

#include "crosshair.h"
#include <ShlObj.h>
#include <Windows.h>
#include <fstream>
#include <string>

#define lpFileName "config.ini"

class config
{
  private:
    FILE* configFile = NULL;
    std::string lpFilePath;
    std::string getConfigPath();

  public:
    config();
    ~config();
    crosshair parse();
};
#endif