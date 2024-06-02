import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import cors from "cors";
import { RouteError } from "./app/middlewares/routeError";
import { GlobalError } from "./app/middlewares/globalError";

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
app.use("*", RouteError);

// Global error handler
app.use(GlobalError);

export default app;
