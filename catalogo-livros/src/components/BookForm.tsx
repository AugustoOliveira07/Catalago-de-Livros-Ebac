import { useState, type ChangeEvent, type FormEvent } from "react";
import type { BookFormData } from "../types/Book";

interface BookFormProps {
  onAddBook: (book: BookFormData) => Promise<void>;
}

function BookForm({ onAddBook }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    status: "Não lido",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.author.trim()) {
      return;
    }

    await onAddBook(formData);

    setFormData({
      title: "",
      author: "",
      status: "Não lido",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        name="title"
        placeholder="Título do livro"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="author"
        placeholder="Autor"
        value={formData.author}
        onChange={handleChange}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Não lido">Não lido</option>
        <option value="Lido">Lido</option>
      </select>

      <button type="submit">Adicionar livro</button>
    </form>
  );
}

export default BookForm;