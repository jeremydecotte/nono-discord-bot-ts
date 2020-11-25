import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { IBotService } from "../interfaces/IBot";
import { IConfig } from "../interfaces/IConfiguration";
import { IMessageManager } from "../interfaces/IMessageManager";
import { TYPES } from "../types";

@injectable()
export class BotService implements IBotService {

    private _client: Client;
    private _configuration: IConfig;
    private _messageManager: IMessageManager;

    public constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.IConfig) configuration: IConfig,
        @inject(TYPES.IMessageManager) messageManager: IMessageManager
    ) {
        this._client = client;
        this._configuration = configuration;
        this._messageManager = messageManager;
    }

    Start(): Promise<any> {
        this._client.on("message", (message) => this._messageManager.HandleMessage(message));
        return this._client.login(this._configuration.Token);
    }

}