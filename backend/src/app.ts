import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
    res.json({message: "API Running"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});