import { injectable } from "inversify";
import { IConfigurationService } from "../interfaces/IConfigurationService";

import config from "./../config.json";
import path from "path";
import fs from "fs";

const dbPath: string = path.join(".", "db");

@injectable()
export class ConfigurationService implements IConfigurationService {

    private _databases: any = {};
    private _config: any;

    constructor() {
        this._config = config;

        this.LoadDatabases();
    }

    GetEnabledHandlers(): string[] {
        return this.GetConfigValue("enabledMessagesHandlers");
    }

    GetConfigValue(configName: string): any {
        return this._config[configName];
    }

    GetData(dataName: string): any {
        if (this._databases[dataName])
        {
            return this._databases[dataName];
        }
        return null;
    }

    public LoadDatabases(): void {
        fs.readdir(dbPath, (err, files) => {
            var dbFiles = files.filter((f) => path.extname(f) == ".db");
            dbFiles.forEach((file) => {
                fs.readFile(path.join(dbPath, file), (err, data) => {
                    var dbName = path.basename(file, path.extname(file));
                    this._databases[dbName] = data.toString().split("\n");
                    console.log(`fichier "${file}" chargé.`);
                });
            });
        });
    }

}