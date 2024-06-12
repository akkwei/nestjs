import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import { hashPassword } from '../../libs/lib';

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 50, unique: true })
  name: string

  @Column("varchar", { select: false })
  password: string;

  @Column("varchar", { nullable: true, comment: "用户头像URL" })
  avatar: string;

  @Column("simple-array", { nullable: true, comment: "用户角色数组" })
  roles: string[];

  @Column('mediumtext', { nullable: true, comment: "用户简介" })
  intro: string

  @Column({ type: "boolean", default: true, comment: "用户状态，默认为启用" })
  status: boolean

  @CreateDateColumn({ type: "timestamp", comment: "记录更新时间", select: false })
  createdAt: Date

  @UpdateDateColumn({ type: "timestamp", comment: "记录更新时间" })
  updatedAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = hashPassword(this.password);
    }
  }
}
