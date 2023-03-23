import { app, logger } from "./app";
import config from "./config";
import { version } from '../package.json';
import { SessionService } from "./services/session";
import fileSystem from "fs";

const port = config.port || 21465;

app.listen(port, async () => {
    // Delete files backup and restore on startup server
    fileSystem.rmSync("backupSessions.zip", { force: true });
    fileSystem.rmSync("uploads/restore.zip", { force: true });
    fileSystem.rmSync("restore", { force: true, recursive: true });

    console.log(`\x1b[32m
                                      Welcome to WPPConnect REST                                          `);
    console.log(`\x1b[33m Version: ${version} - Running on port: ${port}`)
    console.log(`\x1b[31m Visit ${config.host}:${port}/docs for Swagger docs`);

    if(config.log.level === 'error' || config.log.level === 'warn') {
      console.log(`\x1b[33m ======================================================
Attention:
Your configuration is configured to show only a few logs, before opening an issue, 
please set the log to 'silly', copy the log that shows the error and open your issue.
======================================================
`)
    }

    if(config.startAllSession) new SessionService("").startAllSessions(config, logger);
  }
);