import { IBotService } from "./interfaces/IBotService";
import { container } from "./inversify.config";
import { TYPES } from "./types";

let bot = container.get<IBotService>(TYPES.IBotService);

bot.Start();