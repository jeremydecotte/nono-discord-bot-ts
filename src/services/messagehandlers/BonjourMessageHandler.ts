import { Message } from "discord.js";
import { IConfig } from "../../interfaces/IConfiguration";
import { IMessageHandler } from "../../interfaces/IMessageHandler";
import { BaseMessageHandler } from "./BaseMessageHandler";

export class BonjourHandler extends BaseMessageHandler {

    HandleMessage(message: Message): any {
        if (!message.author.bot && message.content.toLocaleLowerCase().startsWith("hello")) {
            message.reply(`salut !`);
        }
    }
}