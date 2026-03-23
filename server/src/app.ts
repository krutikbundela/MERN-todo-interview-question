import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import routes from "./routes/index";

export const app = express();

// middlewares
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  }),
);

//health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1",routes);