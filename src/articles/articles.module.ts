import { Module } from '@nestjs/common';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [DatabaseModule],
})
export class ArticlesModule {}
