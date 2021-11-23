const fs = require("fs");
const path = require("path");

const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const { get: getIntegators } = require("./services/integrator-services");
const { get: getClients } = require("./services/client-services");
const { get: getSites } = require("./services/site-services");

const resolvers = {
  Query: {
    integrators: () => {
      return getIntegators();
    },
    clients: () => {
      return getClients();
    },
    sites: () => {
      return getSites();
    },
  },
  Integrator: {
    clients: (integrator) =>
      getClients().filter((c) => c.integrator_id === integrator.id),
  },
  Client: {
    integrator: (client) =>
      getIntegators().find((i) => i.id === client.integrator_id),
  },
  Site: {
    client: (site) => getSites().find((i) => i.id === site.client_id),
  },
  Mutation: {
    upsertIntegrator: async (_, args) => {
      console.log("integrator", args);
      return {
        success: true,
        message: JSON.stringify(args),
      };
    },
  },
};

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
