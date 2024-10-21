import { mapArtwork, mapArtworks } from './utils/artworkMappers.js'

const resolvers = {
  Query: {
    artworks: async (_, { searchTerm, limit = 20, page = 1 }, { dataSources }) => {
      try {
        const [aicResponse, vaResponse] = await Promise.all([
          searchTerm 
            ? dataSources.aicApi.searchArtworks(searchTerm, limit, page) 
            : dataSources.aicApi.getArtworks(limit, page),
          searchTerm 
            ? dataSources.vaApi.searchArtworks(searchTerm, limit, page) 
            : dataSources.vaApi.getArtworks(limit, page),
        ]);
        const { data: aicData, config: aicConfig, pagination: aicPagination } = aicResponse
        const { records: vaData, info: vaInfo } = vaResponse

        const aicArtworks = aicData.map(item => mapArtworks(item, 'aic', aicConfig, aicPagination))
        const vaArtworks = vaData.map(item => mapArtworks(item, 'v&a', vaInfo))
        
        return [...aicArtworks, ...vaArtworks]
      } catch (error) {
        console.error("Error fetching artworks:", error);
        throw new Error("Failed to fetch artworks");
      }
    },

    artwork: async (_, { id , api }, { dataSources }) => {
      try {
        if(api === 'aic') {
          const artworkDetail = await dataSources.aicApi.getArtwork(id)
          return mapArtwork(artworkDetail, api)
        } else if (api === 'v&a') {
          const artworkDetail = await dataSources.vaApi.getArtwork(id)
          return mapArtwork(artworkDetail, api)
        }
      } catch (error) {
        console.error("Error fetching artwork:", error)
        throw new Error("Failed to fetch artworks")
      }
    }
  }
}

export default resolvers;