import categoryMapper from './mappers/category-mapper';
import HttpClient from './utils/http-client';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://192.168.0.100:3001');
  }

  async listCategories(signal) {
    const categories = await this.httpClient.get('/categories', { signal });

    return categories.map(categoryMapper.toDomain);
  }
}

export default new CategoriesService();
