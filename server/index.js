const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./schemas/typeDefs'); // Esquema GraphQL
const resolvers = require('./resolvers/resolvers'); // Resolvers de GraphQL

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.start().then(res => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
