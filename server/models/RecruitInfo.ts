import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class RecruitInfo {

  @PrimaryGeneratedColumn()
  id: number

  // 标题
  @Column()
  title: string

  // 内容
  @Column('mediumtext',{
    nullable: true
  })
  content: string

  // 状态（0为未发布，1已发布）
  @Column({ default: 0 })
  status: number

  // 创建时间
  @Column('timestamp')
  createTime: Date

}
