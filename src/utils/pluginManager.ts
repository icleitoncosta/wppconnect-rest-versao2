import { PluginTemplate } from "../services/pluginTemplate";
import fs from "fs/promises";
import path from "path";
import { logger } from "./defaultLogger";
import { ClientWhatsApp } from "src/models/Request";
import { Ack, Message } from "@wppconnect-team/wppconnect";

export class PluginManager<T extends Express.Application> {
    private _plugins: PluginTemplate<T>[] = [];
    async load(plugin: PluginTemplate<T>) {
      this._plugins.push(plugin);
      await plugin.start?.();
    }
    async unload(pluginName: string) {
      let plugin = this._plugins.find(plugin => plugin.name === pluginName);
      if (!plugin) return false;
      await plugin.stop?.();
      return true;
    }
    async onMessage(client: ClientWhatsApp, msg: Message) {
        for(const plugin of this._plugins) {
            this.setClient(client, plugin);
            const plg: PluginTemplate<T> = plugin;
            try {
                await plg.onMessage?.(client, msg);
            } catch (error) {
                
            }
        }
    }
    async onMessageAck(client: ClientWhatsApp, ack: Ack) {
        for(const plugin of this._plugins) {
            this.setClient(client, plugin);
            const plg: PluginTemplate<T> = plugin;
            try {
                await plg.onMessageAck?.(client, ack);
            } catch (error) {
                
            }
        }
    }

    async loadDir(app: T, dir: string) {
        let folders = await fs.readdir(dir);
        for (let folder of folders) {
          // The current working is used to resolve the path to the plugins directory.
          //console.log(path.join(process.cwd(), dir + '/' + folder, "index.ts"));
          let Plugin = (await import(path.join(process.cwd(), dir + '/' + folder, 'index.ts'))).default;
          let plugin = new Plugin(app, logger);
          await this.load(plugin as PluginTemplate<T>);
        }
      }

    async unloadAll() {
        for (let plugin of this._plugins) {
            await plugin.stop?.();
        }
    }

    setClient(client: ClientWhatsApp, plugin: PluginTemplate<T>) {
        plugin.client = client;
        const session = client.session;
        if(client.logger) {
            plugin.logger = plugin.logger.child( { session });
        }
    }
  }