import "reflect-metadata";
import { Client } from "discord.js";
import { Container } from "inversify";
import { IBotService } from "./interfaces/IBotService";
import { IConfigurationService } from "./interfaces/IConfigurationService";
import { IMessageManager } from "./interfaces/IMessageManager";
import { ConfigurationService } from "./services/ConfigurationService";
import { BotService } from "./services/BotService";
import { MessageManager } from "./managers/MessageManager";
import { TYPES } from "./types";
import { IReminderManager } from "./interfaces/IReminderManager";
import { ReminderManager } from "./managers/ReminderManager";

const container = new Container();
container.bind<IBotService>(TYPES.IBotService).to(BotService).inSingletonScope();
container.bind<IMessageManager>(TYPES.IMessageManager).to(MessageManager).inSingletonScope();
container.bind<IReminderManager>(TYPES.IReminderManager).to(ReminderManager).inSingletonScope();
container.bind<IConfigurationService>(TYPES.IConfigurationService).toConstantValue(new ConfigurationService());
container.bind<Client>(TYPES.Client).toConstantValue(new Client());

export { container };