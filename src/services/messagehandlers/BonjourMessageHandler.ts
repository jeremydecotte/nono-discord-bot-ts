import { Message } from "discord.js";
import { BaseMessageHandler } from "./BaseMessageHandler";

export class HelloMessageHandler extends BaseMessageHandler {

    HandleMessage(message: Message): any {

        if (!message.author.bot
            && this._handlerConfiguration
            && message.channel.id == this._handlerConfiguration.channel
            && this._handlerConfiguration.words.some((w: string) => message.content.toLocaleLowerCase().startsWith(w))
            && Math.floor(Math.random() * this._handlerConfiguration.randomizer) == 0) {
            let index = Math.floor(Math.random() * this._configuration.GetData("hello").length);
            setTimeout(() => message.reply(`${this._configuration.GetData("hello")[index]}`).catch((err) => console.log(err)), 2000);
        }
    }
}