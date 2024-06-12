import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsBoolean, IsOptional, IsString, Length, IsDate, IsEnum } from "class-validator"

export class CreateUserDto {
  id: string;

  @ApiProperty({ description: "用户名", example: "admin" })
  @IsString({ message: "用户名必须为字符串类型" })
  @IsNotEmpty({ message: "用户名不能为空" })
  @Length(4, 20, { message: "用户名长度必须在4-20之间" })
  name: string;

  @ApiProperty({ description: "密码", example: "123456" })
  @IsString({ message: "密码必须为字符串类型" })
  @IsNotEmpty({ message: "密码不能为空" })
  password: string;

  @ApiProperty({ description: "用户状态", example: true, required: false })
  @IsBoolean({ message: "用户状态必须为布尔类型" })
  @IsOptional()
  status?: boolean = true;

  @ApiProperty({ description: "头像", example: "https://www.gravatar.com/avatar/0000000000?d=mp", required: false })
  @IsString({ message: "头像必须为字符串类型" })
  @IsOptional()
  avatar?: string = "https://www.gravatar.com/avatar/0000000000?d=mp";

  @ApiProperty({ description: "简介", example: "introduce", required: false })
  @IsString({ message: "简介必须为字符串类型" })
  @IsOptional()
  intro?: string;

  @ApiProperty({ description: "角色", example: ["USER"], required: false })
  @IsOptional()
  roles?: string[] = ["USER"];

  @ApiProperty({ description: "创建时间", example: new Date(), required: false })
  @IsDate({ message: "创建时间必须为日期类型" })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ description: "更新时间", example: new Date(), required: false })
  @IsDate({ message: "更新时间必须为日期类型" })
  @IsOptional()
  updatedAt: Date;
}
