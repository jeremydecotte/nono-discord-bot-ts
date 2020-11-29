import { Message } from "discord.js";
import { textChangeRangeIsUnchanged } from "typescript";
import { BaseMessageHandler } from "./BaseMessageHandler";

export class PreumsMessageHandler extends BaseMessageHandler {
    private _preumsTimer: any;
    private _preumsOccurences: string[] = [];

    HandleMessage(message: Message) {
        if (message.author.bot) return;
        if (message.channel.id != this._handlerConfiguration.channel) return;

        // Si l'on trouve un message qui commence par "preums"
        if (this._handlerConfiguration.words.some((w: string) => message.content.toLocaleLowerCase().startsWith(w.toLocaleLowerCase()))) {

            // On annule le timer de remise à 0 du preums ...
            clearTimeout(this._preumsTimer);

            // Et on en relance un nouveau de remise à 0 ...
            this._preumsTimer = setTimeout(() => {
                // Si jamais le délais d'attente est passé, on remet à 0 la liste des messages à récompenser
                this._preumsOccurences = [];
            }, this._handlerConfiguration.delay);

            // On ajoute l'identifiant du message à potentiellement récompenser
            this._preumsOccurences.push(message.id);

            // Si il y a au moins 2 messages preums, on distribue les récompenses 
            // dans l'ordre d'ajout des messages dans le tableau des messages
            if (this._preumsOccurences.length > 1) {
                this._preumsOccurences.forEach((messageId, index) => {
                    message.channel.messages.fetch(messageId).then((m) => {
                        switch (index) {
                            case 0:
                                m.react("🥇");
                                break;
                            case 1:
                                m.react("🥈");
                                break;
                            case 2:
                                m.react("🥉");
                                break;
                            case 3:
                                m.react("🚜");
                                break;
                            case 4:
                                m.react("🐌");
                                break;
                            case 5:
                                m.react("☠️");
                                break;
                            case 6:
                                m.reply("https://tenor.com/view/bad-mauvais-oss177-tes-mauvais-gif-7523463");
                                break;
                        }
                    });
                });
            }
        }
        // Sinon, si le message commence presque par "preums" mais n'est pas un preums
        else if (this._handlerConfiguration.likeWordsStartButNotAWord.some((w: string) => message.content.toLocaleLowerCase().startsWith(w.toLocaleLowerCase()))) {
            // Si le jeu est lancé, on fait évidamment comprendre au mauvais joueur qu'il s'est trompé
            if (this._preumsOccurences.length > 0) {
                message.react("⛔");
            }
        }
    }
}