import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Running");
});

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
});