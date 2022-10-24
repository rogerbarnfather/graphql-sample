import "./App.css";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS, ADD_BOOK } from "./queries/queries";

function BookForm() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addBook, { loading, error, data }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  useEffect(() => {
    console.log("Data changed:", data);
  }, [data]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    addBook({ variables: { name, genre, authorId } });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleGenreChange(e) {
    setGenre(e.target.value);
  }

  function handleAuthorIdChange(e) {
    setAuthorId(e.target.value);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oops!</p>;

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>New Book</h2>

      <p>
        <label htmlFor="name">Name</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </p>

      <p>
        <label htmlFor="genre">Genre</label>
        <input type="text" value={genre} onChange={handleGenreChange} />
      </p>

      <p>
        <label htmlFor="authorId">AuthorId</label>
        <input type="text" value={authorId} onChange={handleAuthorIdChange} />
      </p>

      <p>
        <input type="submit" value="Save" />
      </p>
    </form>
  );
}

function App() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oops!</p>;

  return (
    <div>
      <h1>Books</h1>

      {data.books.map((book, i) => (
        <div key={i}>
          <h4>{book.name}</h4>
          <p>genre: {book.genre}</p>
        </div>
      ))}

      <BookForm />
    </div>
  );
}

export default App;
