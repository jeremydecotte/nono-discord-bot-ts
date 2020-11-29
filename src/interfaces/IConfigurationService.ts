export interface IConfigurationService {
    GetEnabledHandlers(): string[];
    GetConfigValue(configName: string): any
    GetData(dataName: string): any[];

    LoadDatabases() : void;
}