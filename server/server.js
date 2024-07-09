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

//Middlewares
app.use(express.json());
app.use(cors(
  {
    origin: ["https://ecommerce-client-omega-six.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
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
