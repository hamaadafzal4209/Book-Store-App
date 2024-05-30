import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import bookModel from './models/bookModel.js'

const app = express();

app.use(express.json());

mongoose
    .connect("mongodb+srv://root:root@cluster0.ijmxjab.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Databse connected Successfully"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

app.post("/books", async (req, res) => {
    const { title, author, publishYear } = req.body;
    try {
        let book = await bookModel.create({
            title,
            author,
            publishYear,
        })
        res.status(201).json(book).send("Book Created Successfully!");
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/books", async (req, res) => {
    try {
        const allBooks = await bookModel.find();
        res.status(200).json(allBooks)
    } catch (error) {
        console.log(error.message)
    }
})

app.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params
        const book = await bookModel.findById(id);
        res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
    }
})

app.put("/books/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedBook = await bookModel.findByIdAndUpdate(id,req.body);
        if(!updatedBook){
            res.status(404).send("Book not found!");
        }

        res.status(200).json(updatedBook).send('Book updated successfully!');
        
    } catch (error) {
        console.log(error.message)
    }
})

app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedBook = await bookModel.findByIdAndDelete(id,req.body);
        if(!updatedBook){
            res.status(404).send("Book not found!");
        }

        res.status(200).json(updatedBook).send('Book deleted successfully!');
        
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
