import { Ack, Message } from "@wppconnect-team/wppconnect"
import { pino } from "pino";
import { ClientWhatsApp } from "../models/Request";

export abstract class PluginTemplate<T extends Express.Application> {
    abstract name: string;
    abstract version: string;
    app: T;
    logger: pino.Logger;
    client?: ClientWhatsApp;

    constructor(app: T, logger: pino.Logger) {
      this.app = app;
      this.logger = logger;
    }

    onMessage?(client: ClientWhatsApp, msg: Message): void | Promise<void>;
    onMessageAck?(client: ClientWhatsApp, ack: Ack): void | Promise<void>;
    start?(): void | Promise<void>;
    stop?(): void | Promise<void>;
}
