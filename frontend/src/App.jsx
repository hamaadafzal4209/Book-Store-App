import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CreateBook from "./Pages/CreateBook";
import ShowBooks from "./Pages/ShowBooks";
import EditBook from "./Pages/EditBook";
import DeleteBook from "./Pages/DeleteBook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBooks />} />
      <Route path="/book/edit/:id" element={<EditBook />} />
      <Route path="/book/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
}

export default App;
