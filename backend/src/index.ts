import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';

import AicAPI from "./aic-api.js";
import VaAPI from "./va-api.js";
import resolvers from './resolvers.js'
import typeDefs from './schema.js'

interface ContextValue {
  dataSources: {
    aicApi: AicAPI;
    vaApi: VaAPI
  };
}

async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const corsOptions = {
    origin: 'https://artsleuth.netlify.app',
    credentials: true,
  };

  app.use(cors(corsOptions))

  const httpServer = http.createServer(app);

  const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({ req }: {req: Request}) => {
      return {
        dataSources: {
          aicApi: new AicAPI(),
          vaApi: new VaAPI(),
        },
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start()

  server.applyMiddleware({
    app,
    path: '/'
  })

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers)
