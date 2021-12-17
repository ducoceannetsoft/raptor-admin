const fs = require("fs");
const path = require("path");

const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`Database successfully connected`))
  .catch((err) => console.log(`Error connection database: ${err.message}`));

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const intergratorService = require("./services/integrator-services");
const clientService = require("./services/client-services");
const siteService = require("./services/site-services");

const resolvers = require("./resolvers")(
  intergratorService,
  clientService,
  siteService
);

async function startApolloServer(typeDefs, resolvers) {
  const app = new express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
