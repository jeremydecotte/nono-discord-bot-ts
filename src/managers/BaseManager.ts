import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { IConfigurationService } from "../interfaces/IConfigurationService";
import { TYPES } from "../types";

@injectable()
export abstract class BaseManager {

    protected _configuration: IConfigurationService;
    protected _client: Client;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.IConfigurationService) configuration: IConfigurationService
    )
    {
        this._client = client;
        this._configuration = configuration;
    }
}