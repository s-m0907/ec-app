import { RESTDataSource } from '@apollo/datasource-rest';

class AicAPI extends RESTDataSource {
  override baseURL = 'https://api.artic.edu/api/v1/';

  async getArtworks(): Promise<any> {
    const data = await this.get('artworks')
      return data.data
  }

  async searchArtworks(searchTerm: string): Promise<any> {
    const data = await this.get('artworks/search', {
        params: {
          q: searchTerm
        },
      })
      return data.data
  }
}

export default AicAPI