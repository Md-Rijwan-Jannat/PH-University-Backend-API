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
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// application routes
app.use("/api/v1", router);

// Test route
const test = async (req: Request, res: Response) => {
  try {
    const a = 10;
    res.send(`The value is ${a}`); // Sending a valid response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

app.get("/", test);

// Route not found handler
app.use("*", NotFound);

// Global error handler
app.use(GlobalError);

export default app;
