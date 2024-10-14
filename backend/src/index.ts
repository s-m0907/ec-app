import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
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

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        aicApi: new AicAPI({ cache }),
        vaApi: new VaAPI({ cache })
      },
    };
  },
});
console.log(`🚀  Server ready at: ${url}`);
