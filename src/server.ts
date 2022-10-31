import { app, logger } from "./app";
import config from "./config";
import { version } from '../package.json';
import { SessionService } from "./services/session";

const port = config.port || 21465;

app.listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
    logger.info(`\x1b[31m Visit ${config.host}:${port}/docs for Swagger docs`);
    logger.info(`WPPConnect-Server version: ${version}`);

    if(config.startAllSession) new SessionService("").startAllSessions(config, logger);
  }
);