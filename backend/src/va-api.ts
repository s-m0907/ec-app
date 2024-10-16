import { RESTDataSource } from '@apollo/datasource-rest';

class VaAPI extends RESTDataSource {
  override baseURL = 'https://api.vam.ac.uk/v2/'

  async getArtworks(limit: number, page: number): Promise<any> {
    const data = await this.get('objects/search', {
      params: {
        images_exist: '1',
        data_restrict: 'descriptive_only',
        on_display_at: 'all',
        page_size: `${limit}`,
        page: `${page}`,
      }
    })
      return data
  }

  async searchArtworks(searchTerm: string, limit: number, page: number): Promise<any> {
    const data = await this.get('objects/search', {
        params: {
          images_exist: '1',
          data_restrict: 'descriptive_only',
          on_display_at: 'all',
          q_object_name: `${searchTerm}`,
          page_size: `${limit}`,
          page: `${page}`,
        },
      })
      return data
  }

  async getArtwork(id: string): Promise<any> {
    const data = await this.get(`museumobject/${id}`)
    return data
  }
}

export default VaAPI