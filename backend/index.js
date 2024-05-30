import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from './routes/bookRoutes.js'

const app = express();

app.use(express.json());

mongoose
    .connect("mongodb+srv://root:root@cluster0.ijmxjab.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Databse connected Successfully"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

app.use('/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
