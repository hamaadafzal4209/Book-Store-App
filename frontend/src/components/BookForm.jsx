import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/books/${id}`);
      const book = response.data;
      setTitle(book.title);
      setAuthor(book.author);
      setPublishYear(book.publishYear);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3000/books/${id}`, {
          title,
          author,
          publishYear,
        });
      } else {
        await axios.post("http://localhost:3000/books", {
          title,
          author,
          publishYear,
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Book" : "Add Book"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Publish Year</label>
          <input
            type="number"
            className="border border-gray-300 p-2 w-full rounded"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          {id ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
