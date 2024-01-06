import { Injectable } from '@nestjs/common';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ArticlesService {
  constructor(private databaseService: DatabaseService) {}

  async create(createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    return this.databaseService.article.create({ data: createArticleDto });
  }

  async findAll(): Promise<ArticleEntity[]> {
    return this.databaseService.article.findMany({
      where: { published: true },
    });
  }

  async findDrafts(): Promise<ArticleEntity[]> {
    return this.databaseService.article.findMany({
      where: { published: false },
    });
  }

  async findOne(id: number): Promise<ArticleEntity> {
    return this.databaseService.article.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    return this.databaseService.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.databaseService.article.delete({ where: { id } });
  }
}
