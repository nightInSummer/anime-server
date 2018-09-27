import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class PhotoInfo {

  @PrimaryGeneratedColumn()
  id: number

  // 标题
  @Column()
  title: string

  // 图片地址
  @Column()
  image: string

  // 创建时间
  @Column('timestamp')
  createTime: Date

}
