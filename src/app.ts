import express, { json, urlencoded,  Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import cors from 'cors';
import { RegisterRoutes } from "../tsoa/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import { createLogger } from "./utils/logger";
import config from "./config";
import { RequestEx } from "./models/Request";

export const app = express();
export const logger = createLogger(config.log);

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);

app.use('/uploads', express.static('uploads'));

app.use(cors());

app.use((req: RequestEx, _res: Express.Response, next: NextFunction) => {
  req.logger = logger;
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