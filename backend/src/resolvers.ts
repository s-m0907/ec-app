import { mapArtwork, mapArtworkDetail } from './utils/artworkMappers.js';

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

    artwork: async (_, { id , api }, { dataSources }) => {
      try {
        if(api === 'aic') {
          const artworkDetail = await dataSources.aicApi.getArtwork(id)
          return mapArtworkDetail(artworkDetail, api)
        } else if (api === 'v&a') {
          const artworkDetail = await dataSources.vaApi.getArtwork(id)
          return mapArtworkDetail(artworkDetail, api)
        }
      } catch (error) {
        console.error("Error fetching artwork:", error)
        throw new Error("Failed to fetch artworks")
      }
    }
  },
};

export default resolvers;