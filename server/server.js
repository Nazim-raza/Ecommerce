import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";

//configure ENV
dotenv.config();

//DB config
connectDB();

//REST object
const app = express();


// CORS configuration
const allowedOrigins = [
  'https://ecommerce-client-red.vercel.app',
  'http://localhost:3000', // add other allowed origins here
];
//Middlewares
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow requests with no origin (like mobile apps, curl, etc)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());
app.use(morgan("dev"));

//route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//REST Api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Ecommerce",
  });
});

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "client", "build")));
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });

//PORT
const PORT = process.env.PORT || 8080;

//Run Listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
