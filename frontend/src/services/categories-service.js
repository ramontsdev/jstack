import categoryMapper from './mappers/category-mapper';
import HttpClient from './utils/http-client';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    const categories = await this.httpClient.get('/categories');

    return categories.map(categoryMapper.toDomain);
  }
}

export default new CategoriesService();
