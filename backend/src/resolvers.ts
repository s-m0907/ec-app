import { mapArtwork } from './utils/artworkMappers.js';

const resolvers = {
  Query: {
    artworks: async (_, { searchTerm , limit = 20, page = 1}, { dataSources }) => {
      try {
        const [aicData, vaData] = await Promise.all([
          searchTerm 
            ? dataSources.aicApi.searchArtworks(searchTerm, limit, page) 
            : dataSources.aicApi.getArtworks(limit, page),
          searchTerm 
            ? dataSources.vaApi.searchArtworks(searchTerm, limit, page) 
            : dataSources.vaApi.getArtworks(limit, page),
        ]);

        const aicArtworks = aicData.map(item => mapArtwork(item, 'aic'));
        const vaArtworks = vaData.map(item => mapArtwork(item, 'v&a'));

        return [...aicArtworks, ...vaArtworks];
      } catch (error) {
        console.error("Error fetching artworks:", error);
        throw new Error("Failed to fetch artworks");
      }
    },
  },
};

export default resolvers;