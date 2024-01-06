import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.databaseService.user.create({ data: createUserDto });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.databaseService.user.findMany();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.databaseService.user.delete({ where: { id } });
  }
}
