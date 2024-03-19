import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

//configure ENV
dotenv.config();

//DB config
connectDB();

//REST object
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

//REST Api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Ecommerce",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

//Run Listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
