import { Client, Message } from "discord.js";
import { IConfigurationService } from "../../interfaces/IConfigurationService";
import { IMessageHandler } from "../../interfaces/IMessageHandler";

export abstract class BaseMessageHandler implements IMessageHandler {
    protected _configuration: IConfigurationService;
    protected _client: Client;
    protected _handlerConfiguration: any;

    constructor(configuration: IConfigurationService, client: Client) {
        this._configuration = configuration;
        this._client = client;
        this._handlerConfiguration = this._configuration.GetConfigValue("handlersConfiguration")[this.constructor.name];
    }

    abstract HandleMessage(message: Message): any;

    IsEnabled(): boolean {
        return this._configuration.GetEnabledHandlers().some((h) => h == this.constructor.name);
    }
}