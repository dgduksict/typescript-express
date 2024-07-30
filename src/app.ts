import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, TypeScript with Express! -- 🚀🚀" });
});

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());

app.use(notFound);
app.use(errorHandler);

export = app;
