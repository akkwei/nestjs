import { IsArray } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class RemoveUserDto {
  @ApiProperty({ type: [String], description: "要删除的用户id数组" })
  @IsArray()
  ids: []
}