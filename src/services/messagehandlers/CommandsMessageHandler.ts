import { Message } from "discord.js";
import { BaseMessageHandler } from "./BaseMessageHandler";
import axios from "axios";

export class CommandsMessageHandler extends BaseMessageHandler {

    private _commandPrefix: string = "!";

    HandleMessage(message: Message): any {
        if (message.author.bot) return;

        if (message.content.startsWith(this._commandPrefix)) {
            const commandBody = message.content.slice(this._commandPrefix.length);
            const args: Array<string> = commandBody.split(" ");
            const command = args?.shift()?.toLowerCase();

            if (command === "chucknorris") {
                axios.get("https://api.chucknorris.io/jokes/random").then((response) => {
                    message.reply(`tu reprendras bien un peu de chuck norris : ${response.data.value}`);
                });
            }
        }
    }

}