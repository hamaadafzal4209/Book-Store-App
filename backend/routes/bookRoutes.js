import express from 'express'
const router = express.Router();
import bookModel from '../models/bookModel.js';

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
    try {
        const allBooks = await bookModel.find();
        res.status(200).json(allBooks)
    } catch (error) {
        console.log(error.message)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const book = await bookModel.findById(id);
        res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
    }
})

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

export default router;