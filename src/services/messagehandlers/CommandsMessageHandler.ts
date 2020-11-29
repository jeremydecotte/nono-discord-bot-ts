import { Message } from "discord.js";
import { BaseMessageHandler } from "./BaseMessageHandler";
import axios from "axios";
import parser from "rss-parser";
import cheerio from "cheerio";

export class CommandsMessageHandler extends BaseMessageHandler {

    private _commandPrefix: string = "!";
    private _currentNickNamesBeforePokemonize: any[] = [];

    HandleMessage(message: Message): any {
        if (message.author.bot) return;

        if (message.content.startsWith(this._commandPrefix)) {
            const commandBody = message.content.slice(this._commandPrefix.length);
            const args: Array<string> = commandBody.split(" ");
            const command = args?.shift()?.toLowerCase();

            const isFromAdmin = message.member ? message.member.hasPermission("ADMINISTRATOR") : false;

            switch (command) {
                case "chucknorris":
                    axios.get("https://api.chucknorris.io/jokes/random").then((response) => {
                        message.reply(`tu reprendras bien un peu de chuck norris : ${response.data.value}`);
                    });
                    break;
                case "kaamelott":
                    const datas = this._configuration.GetData("kaamelott");
                    if (datas) {
                        let index = (args && !isNaN(parseInt(args[0]))) ? parseInt(args[0]) : Math.floor(Math.random() * datas.length);
                        let citation = datas[index - 1];
                        citation.split("|").forEach((c: string) => { message.reply(`(${index}/${datas.length}) - ${c.replace(/¤/g, "\n")}`); });
                    }
                    break;
                case "gorafi":
                    let gorafiParser = new parser();
                    gorafiParser.parseURL("http://www.legorafi.fr/feed/", (err: any, feed: any) => {
                        message.reply(`c'est tout chaud ça vient de sortir : ${feed.items[0].title} ${feed.items[0].link}`);
                    });
                    break;
                case "bourse":
                    let share: any = { "cac": {}, "atos": {} };

                    let promises = [
                        axios.get("https://www.boursedirect.fr/fr/marche/euronext-paris/cac-40-FR0003500008-PX1-EUR-XPAR/seance"),
                        axios.get("https://www.boursedirect.fr/fr/marche/euronext-paris/atos-se-FR0000051732-ATO-EUR-XPAR/seance")
                    ];

                    Promise.all(promises).then(
                        (responses) => {
                            var html = cheerio.load(responses[0].data);
                            share.cac["value"] = html("div.container-instrument-quotation > div.instrument-quotation.bd-streaming-select-anim-update > span.quotation-last.bd-streaming-select-value-last").text().split("\n")[1].trim();
                            share.cac["percent"] = html("div.container-instrument-quotation > div.instrument-quotation.bd-streaming-select-anim-update > strong").text().split("\n")[1].trim();

                            html = cheerio.load(responses[1].data);
                            share.atos["value"] = html("div.container-instrument-quotation > div.instrument-quotation.bd-streaming-select-anim-update > span.quotation-last.bd-streaming-select-value-last").text().split("\n")[1].trim();
                            share.atos["percent"] = html("div.container-instrument-quotation > div.instrument-quotation.bd-streaming-select-anim-update > strong").text().split("\n")[1].trim();

                            message.reply(`Le CAC40 est à **${share.cac.value}**pts (${share.cac.percent}). L'action ATOS est à **${share.atos.value}**€ (${share.atos.percent}).`);
                        });
                    break;

                case "reload":
                    if (isFromAdmin) {
                        this._configuration.LoadDatabases();
                    }
                    break;
                // case "pokemonize":
                //     if (!isFromAdmin || !message.guild?.me?.hasPermission('MANAGE_NICKNAMES')) return;

                //     message.guild.members.fetch().then(members => {
                //         members.forEach((m) => console.log(m.user.username + '//' + m.user.id));
                //     });
                //     // else {
                //     //     message.member?.setNickname("Pikachu");
                //     // }

                //     break;
            }            
        }
    }

}