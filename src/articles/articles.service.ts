import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ArticlesService {
  constructor(private databaseService: DatabaseService) {}

  async create(createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    return this.databaseService.article.create({
      data: createArticleDto,
      include: { author: true },
    });
  }

  async findAll(): Promise<ArticleEntity[]> {
    return this.databaseService.article.findMany({
      where: { published: true },
      include: { author: true },
    });
  }

  async findDrafts(): Promise<ArticleEntity[]> {
    return this.databaseService.article.findMany({
      where: { published: false },
      include: { author: true },
    });
  }

  async findOne(id: number): Promise<ArticleEntity> {
    const article = await this.databaseService.article.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!article) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }

    return article;
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    return this.databaseService.article.update({
      where: { id },
      include: { author: true },
      data: updateArticleDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.databaseService.article.delete({ where: { id } });
  }
}
