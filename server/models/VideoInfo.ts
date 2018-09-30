import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class VideoInfo {

  @PrimaryGeneratedColumn()
  id: number

  // 标题
  @Column()
  title: string

  // 视频代码
  @Column('mediumtext',{
    nullable: true
  })
  code: string

  // 创建时间
  @Column('timestamp')
  createTime: Date

}
