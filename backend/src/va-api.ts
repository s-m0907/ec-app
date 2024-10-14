import { RESTDataSource } from '@apollo/datasource-rest';

class VaAPI extends RESTDataSource {
  override baseURL = 'https://api.vam.ac.uk/v2/'

  async searchArtworks(searchTerm: string): Promise<any> {
    const data = await this.get('objects/search', {
        params: {
          q_object_name: `${searchTerm}`,
          images_exist: '1'
        },
      })
      return data.records
  }
}

export default VaAPI