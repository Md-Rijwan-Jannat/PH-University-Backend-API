import express, { Application, Request, Response } from "express";
import { ErrorHandler } from "./app/middlewares/errorHandler";
import router from "./app/routes";
import cors from "cors";

const app: Application = express();

// parser middleware
app.use(express.json());
app.use(express.text());
app.use(cors());

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("The university server is running!");
});

// Route not found handler
app.use("*", ErrorHandler.notFoundErrorHandler);

// Global error handler
app.use(ErrorHandler.globalErrorHandler);

export default app;
