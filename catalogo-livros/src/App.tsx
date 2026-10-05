import { useState } from "react";
import { api } from "./services/api";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import type { BookFormData } from "./types/Book";

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleAddBook = async (book: BookFormData) => {
    try {
      await api.post("/books", book);

      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert("Não foi possível adicionar o livro.");
      throw error;
    }
  };

  return (
    <main>
      <h1>📚 Catálogo de Livros</h1>

      <BookForm onAddBook={handleAddBook} />

      <BookList refresh={refresh} />
    </main>
  );
}

export default App;