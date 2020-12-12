import { Message } from "discord.js";
import { BaseMessageHandler } from "./BaseMessageHandler";

export class TooLongMessageHandler extends BaseMessageHandler {
    HandleMessage(message: Message) {
        if (message.author.bot) return;
        if (message.channel.id != this._handlerConfiguration.channel) return;
        if (message.content.startsWith("http")) return;

        const datas = this._configuration.GetData("toolongmessages");

        if (datas && message.content.length >= this._handlerConfiguration.length) {
            let index = Math.floor(Math.random() * datas.length);
            setTimeout(() => message.channel.send(`${datas[index]}`).catch((err) => console.log(err)), 2000);
        }
    }
}
