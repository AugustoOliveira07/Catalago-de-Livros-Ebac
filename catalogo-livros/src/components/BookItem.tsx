import type { Book } from "../types/Book";

interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
}

function BookItem({ book, onDelete }: BookItemProps) {
  return (
    <div className="book-item">
      <div>
        <h3>{book.title}</h3>
        <p>Autor: {book.author}</p>
        <p>Status: {book.status}</p>
      </div>

      <button onClick={() => book._id && onDelete(book._id)}>
        Excluir
      </button>
    </div>
  );
}

export default BookItem;