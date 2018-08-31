import * as bodyParser from "body-parser";
import * as express from "express";
import { Server } from "http";

let server: Server = null;

function listen(port: number, middleware?: express.RequestHandler) {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res) => {
    if (req.path === "/tests") {
      const request: any = ["headers", "method", "path", "query"].reduce(
        (r, k) => Object.assign(r, { [k]: (req as any)[k] }),
        {},
      );
      if (req.body) {
        request.body = req.body;
      }
      res.status(200).json(request);
    } else {
      const error = {
        statusCode: 404,
        statusMessage: "Not Found",
      };
      res.status(404).json(error);
    }
  });

  return new Promise(resolve => {
    server = app.listen(port, () => resolve());
  });
}

function close() {
  return new Promise(resolve => {
    if (!server) {
      resolve();
    }
    server.close(() => resolve());
  });
}

export { listen, close };
