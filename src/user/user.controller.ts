import { Controller, Get, Post, Body, Patch, Param, Delete, Header, HttpCode, Redirect, Query, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

// dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto'

// entity
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller({
  path: 'user',
  // version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: '添加用户' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  async findAll(@Query() query: FindUserDto): Promise<User[]> {
    return await this.userService.findAll(query);
  }

  @Delete()
  @ApiOperation({ summary: '删除用户' })
  async remove(@Body() removeUserDto: RemoveUserDto): Promise<User> {
    return await this.userService.delete(removeUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    // console.log('id', id, 'updateUserDto', updateUserDto);
    return await this.userService.update(id, updateUserDto);
  }
}
