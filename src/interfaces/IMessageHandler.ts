import { Message } from "discord.js";

export interface IMessageHandler 
{
    IsEnabled() : boolean;

    HandleMessage(message: Message) : any;
}