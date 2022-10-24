import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query Books {
    books {
      id
      name
      genre
    }
  }
`;

export const GET_AUTHORS = gql`
  query Authors {
    authors {
      id
      name
      age
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;
