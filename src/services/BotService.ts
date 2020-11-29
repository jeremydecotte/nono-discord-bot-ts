import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { textChangeRangeIsUnchanged } from "typescript";
import { IBotService } from "../interfaces/IBotService";
import { IConfigurationService } from "../interfaces/IConfigurationService";
import { IMessageManager } from "../interfaces/IMessageManager";
import { IReminderManager } from "../interfaces/IReminderManager";
import { TYPES } from "../types";

@injectable()
export class BotService implements IBotService {

    private _client: Client;
    private _configuration: IConfigurationService;
    private _messageManager: IMessageManager;
    private _reminderManager: IReminderManager;

    public constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.IConfigurationService) configuration: IConfigurationService,
        @inject(TYPES.IMessageManager) messageManager: IMessageManager,
        @inject(TYPES.IReminderManager) reminderManager: IReminderManager
    ) {
        this._client = client;
        this._configuration = configuration;
        this._messageManager = messageManager;
        this._reminderManager = reminderManager;
    }

    Start(): void {
        this._client.on("message", (message) => this._messageManager.HandleMessage(message));
        this._client.login(this._configuration.GetConfigValue("token")).then(() => 
        {
            console.log("coucou bien connecté !");
            this._reminderManager.StartToRemind();
        });
    }

}