import { IBotService } from "./interfaces/IBot";
import { container } from "./inversify.config";
import { TYPES } from "./types";

let bot = container.get<IBotService>(TYPES.IBotService);

bot.Start();