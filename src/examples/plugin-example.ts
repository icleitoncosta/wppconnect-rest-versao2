import { logger } from "../app";

export function printMessageText() {
    if(arguments[0] === 'onMessage') {
        const session = arguments[1].session;
        logger.child({session}).info(`Plugin example: Received a new message from ${arguments[2].from}`);
        logger.child({session}).info(`Disable this on config.ts, set useExamplePlugins to false`);
    }
}