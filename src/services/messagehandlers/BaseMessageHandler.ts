import { Message } from "discord.js";
import { IConfigurationService } from "../../interfaces/IConfigurationService";
import { IMessageHandler } from "../../interfaces/IMessageHandler";

export abstract class BaseMessageHandler implements IMessageHandler {
    protected _configuration: IConfigurationService;
    protected _handlerConfiguration: any;

    constructor(configuration: IConfigurationService) {
        this._configuration = configuration;
        this._handlerConfiguration = this._configuration.GetConfigValue("handlersConfiguration")[this.constructor.name];
    }

    abstract HandleMessage(message: Message): any;

    IsEnabled(): boolean {
        return this._configuration.GetEnabledHandlers().some((h) => h == this.constructor.name);
    }
}