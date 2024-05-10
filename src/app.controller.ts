import { Controller, Get, Post, Body, Param, Query, Delete, Header, Headers, UsePipes, Req, Res, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from "@nestjs/common"
import { IsString, IsNotEmpty, IsNumber, MinLength } from "class-validator"
import { Request, Response } from 'express';


class CreateDataDto {
  constructor(id: number, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @IsNumber()
  @IsNotEmpty()
  age: number;
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get("")
  findAll(): string {
    return 'Hello World!666789';
  }

  @Get("getById/:id")
  getById(@Param("id") id: number) {
    return this.appService.getById(id);
  }

  @Get('getByName')
  getByName(@Query('name') name: string) {
    return this.appService.getByName(name);
  }

  @Post("create")
  @HttpCode(209)
  @Header("x-videos", "123456")
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateDataDto, @Headers("x-videos") myheader: string): CreateDataDto {
    return this.appService.create(data, myheader);
  }

  @Delete("delete/:id")
  delete(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;
    console.log('delete', id);
    res.send('delete success');
  }
}