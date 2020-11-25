import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { BonjourHandler } from "../services/messagehandlers/BonjourMessageHandler";
import { IConfig } from "../interfaces/IConfiguration";
import { IMessageHandler } from "../interfaces/IMessageHandler";
import { IMessageManager } from "../interfaces/IMessageManager";
import { TYPES } from "../types";
import { CommandsMessageHandler } from "../services/messagehandlers/CommandsMessageHandler";

@injectable()
export class MessageManager implements IMessageManager {
    
    private _configuration: IConfig;
    
    public Handlers: IMessageHandler[];

    constructor(@inject(TYPES.IConfig) configuration: IConfig) {
        this._configuration = configuration;
        
        this.Handlers = [];
        // Charger dynamiquement les handlers qui sont activés.
        this.Handlers.push(new BonjourHandler(this._configuration));
        this.Handlers.push(new CommandsMessageHandler(this._configuration));
    }

    HandleMessage(message: Message) {
        this.Handlers.forEach((handler) => {
            handler.HandleMessage(message);
        })
    }
}