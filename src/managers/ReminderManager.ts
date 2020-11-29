import { inject, injectable } from "inversify";
import { IReminderManager } from "../interfaces/IReminderManager";
import { BaseManager } from "./BaseManager";
import { Client, TextChannel } from "discord.js";
import moment from "moment";
import { TYPES } from "../types";
import { IConfigurationService } from "../interfaces/IConfigurationService";

@injectable()
export class ReminderManager extends BaseManager implements IReminderManager {
    private _reminderInterval: any;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.IConfigurationService) configuration: IConfigurationService
    ) {
        super(client, configuration);

        this.StartToRemind();
    }

    StartToRemind(): void {
        clearInterval(this._reminderInterval);
        this._reminderInterval = setInterval(
            () => { this.ExecuteRemind() },
            60000
        );
    }

    private ExecuteRemind(): void {
        let today = moment().day();
        let reminders = this._configuration.GetData("reminders")?.map((reminder) => JSON.parse(reminder));

        let todayReminders = reminders.filter(
            (r) => r.trigger && r.trigger.days && r.trigger.days.includes(today)
        );

        if (todayReminders.length > 0 && this._client) {
            todayReminders.forEach((r: any) => {
                if (r.trigger) {
                    let triggersToExecute = r.trigger.at.filter((d: any) => d.lastTriggeredDay != today && moment().format("HH:mm") == d.time);
                    triggersToExecute.forEach((t: any) => {
                        const channel = this._client.channels.cache.get(r.channel);
                        if (channel?.isText) {
                            (channel as TextChannel).send(`[Rappel] - ${r.name} - ${r.text}`);
                            t.lastTriggeredDay = today;
                        }
                    });
                }
            });
        }
    }
}