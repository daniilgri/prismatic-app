import { Module } from '@nestjs/common';

import { ArticlesModule } from './articles/articles.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, ArticlesModule, UsersModule],
})
export class AppModule {}
