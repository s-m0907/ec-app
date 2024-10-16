import { RESTDataSource } from '@apollo/datasource-rest';

class AicAPI extends RESTDataSource {
  override baseURL = 'https://api.artic.edu/api/v1/';

  async getArtworks(limit: number, page: number): Promise<any> {
    const data = await this.get('artworks', {
      params: {
        limit: `${limit}`,
        fields: 'id,artist_title,title,date_display,thumbnail,medium_display',
        page: `${page}`
      }
    })
      return data.data
  }

  async searchArtworks(searchTerm: string, limit: number, page: number): Promise<any> {
    const data = await this.get('artworks/search', {
        params: {
          q: searchTerm,
          fields: 'id,artist_title,title,date_display,thumbnail,medium_display',
          limit: `${limit}`,
          page: `${page}`
        }
      })
      return data.data
  }

  async getArtwork(id: number): Promise<any> {
    const data = await this.get(`artworks/${id}`, {
        params: {
          fields: 'id,artist_title,title,date_display,thumbnail,medium_display,description,short_description,image_id,dimensions,is_on_view,gallery_title,config,place_of_origin,category_titles',
        }
      })
      return data
  }
}

export default AicAPI