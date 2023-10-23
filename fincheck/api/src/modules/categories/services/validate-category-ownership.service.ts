import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly CategoryRepository: CategoriesRepository) {}

  async validate(userId: string, categoryId: string) {
    const isOwner = await this.CategoryRepository.findFirst({
      where: { id: categoryId, userId }
    })

    if (!isOwner) {
      throw new NotFoundException('Category not found.')
    }
  }
}
