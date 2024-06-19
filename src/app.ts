import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { NotFound } from "./app/middlewares/NotFound";
import { GlobalError } from "./app/middlewares/GlobalError";

const app: Application = express();

// parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://loalhost:5173"] }));

// application routes
app.use("/api/v1", router);

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get("/", test);

// Route not found handler
app.use("*", NotFound);

// Global error handler
app.use(GlobalError);

export default app;
