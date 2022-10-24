import { v4 as uuid } from "uuid";
import data from "./data/data.json";

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

export const resolvers = {
  Book: {
    author: (parent, args, context, info) => {
      const author = data.authors.find(
        (author) => author.id === parent.authorId
      );
      return author;
    },
  },

  Author: {
    books: (parent, args, context, info) => {
      const books = data.books.filter((book) => book.authorId === parent.id);
      return books;
    },
  },

  Query: {
    book: (parent, args, context, info) => {
      const { id } = args;
      const book = data.books.find((book) => book.id === id);
      return book;
    },
    books: async () => {
      await delay(2000);

      return data.books;
    },
    author: (parent, args, context, info) => {
      const { id } = args;
      const author = data.authors.find((author) => author.id === id);
      return author;
    },
    authors: () => data.authors,
  },

  Mutation: {
    addBook: (parent, args, context, info) => {
      const { name, genre, authorId } = args;
      const item = { id: uuid(), name, genre, authorId };
      data.books.push(item);
      return item;
    },
    updateBook: (parent, args, context, info) => {
      const { id } = args;
      const { id: newId, name, genre, authorId } = args.input;
      const record = data.books.find((book) => book.id === id);
      if (newId !== undefined) {
        record.id = newId;
      }
      if (name !== undefined) {
        record.name = name;
      }
      if (genre !== undefined) {
        record.genre = genre;
      }
      if (authorId !== undefined) {
        record.authorId = authorId;
      }
      data.books = data.books.map((book) => (book.id === id ? record : book));
      return record;
    },
    addAuthor: (parent, args, context, info) => {
      const { name, age } = args;
      const item = { id: uuid(), name, age };
      data.authors.push(item);
      return item;
    },
    updateAuthor: (parent, args, context, info) => {
      const { id } = args;
      const { id: newId, name, age } = args.input;
      const record = data.authors.find((author) => author.id === id);
      if (newId !== undefined) {
        record.id = newId;

        // Cascading update
        data.books = data.books.map((book) =>
          book.authorId === id ? { ...book, authorId: newId } : book
        );
      }
      if (name !== undefined) {
        record.name = name;
      }
      if (age !== undefined) {
        record.age = age;
      }
      data.authors = data.authors.map((author) =>
        author.id === id ? record : author
      );
      return record;
    },
  },
};
