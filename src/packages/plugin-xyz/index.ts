import { Message } from "@wppconnect-team/wppconnect";
import { PluginTemplate } from "../../services/pluginTemplate";
import { ClientWhatsApp } from "src/models/Request";

export default class MyPlugin extends PluginTemplate<Express.Application> {
    name = "Plugin XYZ";
    version = "1.0.0";

    onMessage(_client: ClientWhatsApp, msg: Message): void {
        this.logger.info(`Plugin example: Received a new message from ${msg.from}`);
        this.logger.info(`Disable this on config.ts, set useExamplePlugins to false`);
    }
    async start(): Promise<void> {
        this.logger.info('Started Plugin XYZ');
    }
    async stop(): Promise<void> {
        this.logger.info('Stopped Plugin XYZ');
    }
}
