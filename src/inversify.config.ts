import "reflect-metadata";
import { Client } from "discord.js";
import { Container } from "inversify";
import { IBotService } from "./interfaces/IBot";
import { IConfig } from "./interfaces/IConfiguration";
import { IMessageManager } from "./interfaces/IMessageManager";
import { ConfigurationService } from "./services/ConfigurationService";
import { BotService } from "./services/BotService";
import { MessageManager } from "./managers/MessageManager";
import { TYPES } from "./types";

const container = new Container();
container.bind<IBotService>(TYPES.IBotService).to(BotService).inSingletonScope();
container.bind<IMessageManager>(TYPES.IMessageManager).to(MessageManager).inSingletonScope();
container.bind<IConfig>(TYPES.IConfig).toConstantValue(new ConfigurationService());
container.bind<Client>(TYPES.Client).toConstantValue(new Client());

export { container };