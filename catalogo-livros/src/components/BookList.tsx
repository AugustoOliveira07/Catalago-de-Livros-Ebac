import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Book } from "../types/Book";
import BookItem from "./BookItem";

interface BookListProps {
  refresh: number;
}

function BookList({ refresh }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<Book[]>("/books");

      setBooks(response.data);
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar os livros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/books/${id}`);

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.error(error);
      setError("Não foi possível remover o livro.");
    }
  };

  if (loading) {
    return <p>Carregando livros...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Meus livros</h2>

      {books.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onDelete={handleDelete}
          />
        ))
      )}
    </section>
  );
}

export default BookList;