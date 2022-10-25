import express, {json, urlencoded,  Response as ExResponse, Request as ExRequest} from "express";
import { RegisterRoutes } from "../tsoa/routes";
import swaggerUi from "swagger-ui-express";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../tsoa/swagger.json"))
    );
  });

RegisterRoutes(app);