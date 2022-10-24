import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Book {
    id: ID!
    name: String!
    genre: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book!]!
  }

  type Query {
    book(id: ID): Book
    books: [Book!]!
    author(id: ID): Author
    authors: [Author!]!
  }

  input BookInput {
    id: ID
    name: String
    genre: String
    authorId: ID
  }

  input AuthorInput {
    id: ID
    name: String
    age: Int
  }

  type Mutation {
    addBook(name: String!, genre: String!, authorId: ID!): Book!
    updateBook(id: ID!, input: BookInput!): Book!
    addAuthor(name: String!, age: Int!): Author!
    updateAuthor(id: ID!, input: AuthorInput!): Author!
  }
`;
