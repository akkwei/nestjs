import { ApiProperty } from "@nestjs/swagger";

export class FindUserDto {
  @ApiProperty({
    description: "关键字",
    required: true,
    example: "张三"
  })
  keyword: string;

  @ApiProperty({
    description: "页码",
    example: 1,
    default: 1,
    required: false
  })
  page: number;

  @ApiProperty({
    description: "每页数量",
    example: 10,
    default: 10,
    required: false
  })
  limit: number;
}