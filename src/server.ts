import { app, logger } from "./app";
import config from "./config";
import { version } from '../package.json';
import { SessionService } from "./services/session";
import fileSystem from "fs";

const port = config.port || 21465;

app.listen(port, () => {
    // Delete files backup and restore on startup server
    fileSystem.rmSync("backupSessions.zip", { force: true });
    fileSystem.rmSync("uploads/restore.zip", { force: true });
    fileSystem.rmSync("restore", { force: true, recursive: true });

    logger.info(`Server is running on port: ${port}`);
    logger.info(`\x1b[31m Visit ${config.host}:${port}/docs for Swagger docs`);
    logger.info(`WPPConnect-Server version: ${version}`);

    if(config.startAllSession) new SessionService("").startAllSessions(config, logger);
  }
);