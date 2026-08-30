import express, { json, urlencoded,  Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import cors from 'cors';
import { RegisterRoutes } from "../tsoa/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import { RequestEx } from "./models/Request";
import { logger as log } from "./utils/defaultLogger";
import pino from "pino";
import pinoHttp from "pino-http";
import { PluginManager } from "./utils/pluginManager";

export const app = express();
export const logger = log;

export const pluginManager = new PluginManager<Express.Application>();
export const plugin = pluginManager.loadDir(app, './src/packages')

app.use(
  urlencoded({
    extended: true,
  })
);

const loggerRequest = pinoHttp({
  logger: log,
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res
  },
  wrapSerializers: true,
  customLogLevel: function (_req: any, res: any, err: any) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn'
    } else if (res.statusCode >= 500 || err) {
      return 'error'
    }
    return 'silent'
  },
  customSuccessMessage: function (req: any, res: any) {
    if (res.statusCode === 404) {
      return 'resource not found'
    }
    return `${req.method} completed`
  },
  customReceivedMessage: function (req: any, _res: any) {
    return 'request received: ' + req.method
  },
  customErrorMessage: function (_req: any, res: any, _next: any) {
    return 'request errored with status code: ' + res.statusCode
  },
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken'
  },

  // Define additional custom request properties
  customProps: function (req: any, _res: any) {
    return {
      session: req.session,
    }
  }
})

app.use('/uploads', express.static('uploads'));

app.use(cors());

app.use((req: RequestEx, res: any, next: NextFunction) => {
  req.logger = logger;
  loggerRequest(req, res);
  next();
})
app.use(json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../tsoa/swagger.json"))
    );
  });

app.use(function errorHandler(
  err: unknown,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    return res.status(422).json({
      error: {
      message: "Validation Failed",
      type: "invalid_request",
      code: 3,
      error_data: {
          messaging_product: "whatsapp",
          details: err?.fields,
      },
      error_subcode: 132000,
      fbtrace_id: undefined,
    }});
  }
  if (err instanceof Error) {
    return res.status(500).json({
      error: {
      message: "Not found",
      type: "invalid_request",
      code: 3,
      error_data: {
          messaging_product: "whatsapp",
          details: "Invalid request or possible server error",
      },
      error_subcode: 1,
      fbtrace_id: undefined,
    }});
  }

  next();
});

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse): void {
  res.status(404).send({
    error: {
    message: "Not found",
    type: "invalid_request",
    code: 3,
    error_data: {
        messaging_product: "whatsapp",
        details: "Invalid request or possible server error",
    },
    error_subcode: 1,
    fbtrace_id: undefined,
  }});
});

app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = err.status || 500;
  const body: any = {
      error: {
      message: err.message || "Invalid request",
      type: err.type || "invalid_request",
      code: err.code || 3,
      error_data: {
          messaging_product: "whatsapp",
          details: err.details || "Invalid request or possible server error",
      },
      error_subcode: err.subcode || 0,
      fbtrace_id: undefined,
    }
  };
  res.status(status).json(body);
  next();
});