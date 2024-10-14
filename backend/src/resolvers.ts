const resolvers = {
    Query: {
      artworks: async (_, __, { dataSources }) => {

        try {
          const data = await dataSources.aicApi.getArtworks();
          console.log(data)
          const aicArtworks = data.map(item => ({
            id: item.id,
            title: item.title,
            artist: item.artist_title,
            medium: item.medium_display,
            date: item.date_display,
            images: {
                lqip: item.thumbnail.lqip,
                alt_text: item.thumbnail.alt_text
            }
          }))
          console.log(aicArtworks)
          return aicArtworks
        } catch (error) {
          console.error("Error fetching:", error);
          throw new Error("Failed to fetch artworks");
        }
      },
      searchArtworks: async (_, { searchTerm }, { dataSources }) => {
        try {
            //Fetch from AIC API with search query
          const aicSearch = await dataSources.aicApi.searchArtworks(searchTerm);
          const aicData = aicSearch.map(item => ({
            id: item.id,
            title: item.title,
            images: {
                lqip: item.thumbnail?.lqip || null,
                alt_text: item.thumbnail?.alt_text || null,
            }
          }))
            //Fetch from V&A API with search query
          const vaSearch = await dataSources.vaApi.searchArtworks(searchTerm)
          const vaData = vaSearch.map(item => ({
            id: item.systemNumber,
            title: item._primaryTitle,
            images: {
                thumbnail: item._images?._primary_thumbnail || null
            }
          }))
          return [...aicData, ...vaData]
        } catch (error) {
          console.error("Error fetching:", error);
          throw new Error("Failed to fetch artworks");
        }
      },
    },
  }

  export default resolvers