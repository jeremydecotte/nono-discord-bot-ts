import { Message } from "discord.js";
import { IMessageHandler } from "./IMessageHandler";

export interface IMessageManager {

    Handlers: Array<IMessageHandler>;

    HandleMessage(message: Message): any;
}