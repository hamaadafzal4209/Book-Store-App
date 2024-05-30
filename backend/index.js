import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bookModel from "./models/bookModel.js";

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.ijmxjab.mongodb.net/bookstoredb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cors());

app.post("/books", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    const book = await bookModel.create({
      title,
      author,
      publishYear,
    });
    res.status(201).json("Book Created Successfully!");
  } catch (error) {
    console.log({ message: error.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const allBooks = await bookModel.find();
    res.status(200).json(allBooks);
  } catch (error) {
    console.log({ message: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(500).json("Book not found");
    }
  } catch (error) {
    console.log({ message: error.message });
  }
});

app.put("/books/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const book = await bookModel.findByIdAndUpdate(id, req.body)
        res.status(200).json('Book updated successfully');
    } catch (error) {
        console.log({message: error.message});
    }
})

app.delete("/books/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const book = await bookModel.findByIdAndDelete(id)
        res.status(200).json('Book deleted successfully');
    } catch (error) {
        console.log({message: error.message});
    }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
