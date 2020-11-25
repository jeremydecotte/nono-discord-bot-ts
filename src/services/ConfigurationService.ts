import { injectable } from "inversify";
import { IConfig } from "../interfaces/IConfiguration";

import config from "./../config.json";

@injectable()
export class ConfigurationService implements IConfig {
    Token: string;

    constructor() {
        this.Token = config.token;
    }
    GetEnabledHandlers(): string[] {
        return config.enabledMessagesHandlers;
    }
    
    GetData(): void {
        throw new Error("Method not implemented.");
    }

}