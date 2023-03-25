import config from "./config";
import { printMessageText } from "./examples/plugin-example";
import { Plugin } from "./services/plugin";
/**
 * Register your plugins here
 * Don't use config.useExamplePlugins, register directly with:
 * plugins.register(yourPluginFunc);
 */

export const plugins = new Plugin();

if (config.useExamplePlugins) plugins.register(printMessageText);