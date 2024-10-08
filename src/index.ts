import express, { Request, Response } from "express";
import dotenv from "dotenv";
import vehicleRouter from "./routes/vehicles.route";
import userRouter from "./routes/users.route";
import authRouter from "./routes/auth.routes";
import { Db, MongoClient } from "mongodb";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json()); /// Parse payloads to JSON and make it available in req.body
app.use(cors()); // Allow all COR requests

const port = process.env.PORT || 3000;
const connectionString = process.env.DB_CONNECTION_URL || "";

// Define route
app.use("/health-check", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});
app.use("/vehicles", vehicleRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

// Catch requests that don't match any routes
app.use((req, res, next) => {
  res.status(404).send("Not found");
});

export let db: Db;
const connectDB = async () => {
  try {
    console.log(
      "Ready to connect with Mongo via connection string:",
      connectionString,
      "..."
    );
    const client = new MongoClient(connectionString);
    await client.connect();
    // Use the database from the client connection
    db = client.db();
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // Exit the application if the connection fails
    process.exit(1);
  }
};

// Start the server and connect to MongoDB
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};
startServer();

// TODO: Error Handler
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {});
