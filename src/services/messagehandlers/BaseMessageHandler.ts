import { Message } from "discord.js";
import { IConfig } from "../../interfaces/IConfiguration";
import { IMessageHandler } from "../../interfaces/IMessageHandler";

export abstract class BaseMessageHandler implements IMessageHandler {
    private _configuration: IConfig;

    constructor(configuration: IConfig) {
        this._configuration = configuration;
    }

    abstract HandleMessage(message: Message): any;

    IsEnabled(): boolean {
        return this._configuration.GetEnabledHandlers().some((h) => h == this.constructor.name);
    }

}