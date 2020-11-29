import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { IConfigurationService } from "../interfaces/IConfigurationService";
import { IMessageHandler } from "../interfaces/IMessageHandler";
import { IMessageManager } from "../interfaces/IMessageManager";
import { TYPES } from "../types";
import { CommandsMessageHandler } from "../services/messagehandlers/CommandsMessageHandler";
import { HelloMessageHandler } from "../services/messagehandlers/BonjourMessageHandler";
import { PreumsMessageHandler } from "../services/messagehandlers/PreumsMessageHandler";
import { TooLongMessageHandler } from "../services/messagehandlers/TooLongMessageHandler";
import { BaseManager } from "./BaseManager";
import { config } from "process";

@injectable()
export class MessageManager extends BaseManager implements IMessageManager {
    public Handlers: IMessageHandler[];

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.IConfigurationService) configuration: IConfigurationService
    ) {
        super(client, configuration);
        this.Handlers = [];

        this.Start();
    }

    private Start(): void {
        // Charger dynamiquement les handlers qui sont activés.
        this.Handlers.push(new HelloMessageHandler(this._configuration));
        this.Handlers.push(new PreumsMessageHandler(this._configuration));
        this.Handlers.push(new CommandsMessageHandler(this._configuration));
        this.Handlers.push(new TooLongMessageHandler(this._configuration));
    }

    HandleMessage(message: Message) {
        this.Handlers.forEach((handler) => {
            handler.HandleMessage(message);
        });
    }
}