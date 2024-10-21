import { RESTDataSource } from '@apollo/datasource-rest';

const queryFields = 'id,artist_title,title,date_display,thumbnail,medium_display,description,short_description,image_id,dimensions,is_on_view,gallery_title,config,place_of_origin,category_titles'

class AicAPI extends RESTDataSource {
  override baseURL = 'https://api.artic.edu/api/v1/';


  async getArtworks(limit: number, page: number): Promise<any> {
    const data = await this.get('artworks', {
      params: {
        limit: `${limit}`,
        fields: queryFields,
        page: `${page}`
      }
    })
      return data
  }

  async searchArtworks(searchTerm: string, limit: number, page: number): Promise<any> {
    const data = await this.get('artworks/search', {
        params: {
          q: searchTerm,
          fields: queryFields,
          limit: `${limit}`,
          page: `${page}`
        }
      })
      return data
  }

  async getArtwork(id: number): Promise<any> {
    const data = await this.get(`artworks/${id}`, {
        params: {
          fields: queryFields,
        }
      })
      return data
  }
}

export default AicAPI