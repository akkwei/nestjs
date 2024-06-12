import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, Raw, In } from 'typeorm';
import { plainToClass } from "class-transformer";

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { RemoveUserDto } from "./dto/remove-user.dto"

import { hashPassword } from '../libs/lib'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }
  // 新增
  async create(createUserDto: CreateUserDto): Promise<any> {
    createUserDto = plainToClass(CreateUserDto, createUserDto);

    const { name, password, status, avatar, roles, intro, createdAt, updatedAt } = createUserDto;
    createUserDto.createdAt = createUserDto.createdAt || new Date();
    createUserDto.updatedAt = new Date();
    createUserDto.password = hashPassword(password);
    delete createUserDto.id;

    const isExist = await this.usersRepository.count({
      where: { name }
    })

    if (isExist > 0) {
      return {
        status: 202,
        msg: "已存在"
      }
    }

    return await this.usersRepository.save(createUserDto);
  }

  // 删除
  async delete(removeUserDto: RemoveUserDto): Promise<any> {
    const { ids } = removeUserDto;
    return this.usersRepository.delete(ids);
  }

  // 更改
  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const { name, password, status, avatar, roles, intro, createdAt, updatedAt } = updateUserDto;
    updateUserDto.updatedAt = new Date();

    const isExist = await this.usersRepository.count({
      where: { name }
    })

    if (isExist > 1) {
      return {
        status: 202,
        msg: "已存在"
      }
    }

    return await this.usersRepository.update(id, updateUserDto);
  }

  // 列表
  async findAll(query: FindUserDto): Promise<any> {
    const { keyword, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    let params = {
      skip,
      take: limit,
    }

    let where = {}
    if (keyword) {
      where = Object.assign(where, {
        name: Like(`%${keyword}%`),
      })
    }

    params = Object.assign(
      params,
      {
        select: ["id", "name", "avatar", "status", "roles", "intro", "createdAt", "updatedAt"],
      },
      where,
      {
        order: {
          updatedAt: 'DESC'
        }
      }
    )

    const [result, total] = await this.usersRepository.findAndCount(params);

    return {
      data: result,
      total,
    }
  }

  // 数量
  async getCount() {
    return await this.usersRepository.count();
  }
}
