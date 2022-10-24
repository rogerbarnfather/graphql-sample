import express from "express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server-express";

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const app = express();

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server listening on port 4000");
  });
}

start();
