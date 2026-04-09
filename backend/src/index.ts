import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/error";

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Logging
app.use(morgan("dev"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/api", limiter);

// Routes
app.use("/api", routes);

// Global Error Handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[server]: Luminal Agent API is running at http://localhost:${config.port}`);
});

export default app; // For testing
