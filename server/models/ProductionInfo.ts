import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ProductionInfo {

  @PrimaryGeneratedColumn()
  id: number

  // 文章标题
  @Column()
  title: string

  // 文章内容
  @Column('mediumtext',{
    nullable: true
  })
  content: string

  // 创建时间
  @Column('timestamp')
  createTime: Date

}
