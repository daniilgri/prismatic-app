import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    return new ArticleEntity(
      await this.articlesService.create(createArticleDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll(): Promise<ArticleEntity[]> {
    const articles = await this.articlesService.findAll();

    return articles.map((article) => new ArticleEntity(article));
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts(): Promise<ArticleEntity[]> {
    const drafts = await this.articlesService.findDrafts();

    return drafts.map((draft) => new ArticleEntity(draft));
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id') id: number): Promise<ArticleEntity> {
    return new ArticleEntity(await this.articlesService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param('id') id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    return new ArticleEntity(
      await this.articlesService.update(id, updateArticleDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.articlesService.remove(+id);
  }
}
