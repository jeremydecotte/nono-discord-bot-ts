

export interface IConfig {
    Token: string

    GetEnabledHandlers(): string[];

    GetData(): any;
}