import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class SowingInfo {

  @PrimaryGeneratedColumn()
  id: number

  // 轮播图标题
  @Column()
  title: string

  // 轮播图地址
  @Column()
  image: string

  // 跳转地址
  @Column()
  url: string

  // 创建时间
  @Column('timestamp')
  createTime: Date

}
