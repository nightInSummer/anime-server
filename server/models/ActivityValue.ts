import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import {ActivityKey} from "./ActivityKey"

@Entity()
export class ActivityValue {

  @PrimaryGeneratedColumn()
  id: number

  // 二级活动标题
  @Column()
  title: string

  // 活动内容
  @Column('mediumtext',{
    nullable: true
  })
  content: string

  // 创建时间
  @Column('timestamp')
  createTime: Date

  // 建立多对一关系
  @ManyToOne(type => ActivityKey, activityKey => activityKey.activityValues, {
    cascade: ["insert", "update"]
  })

  activityKey: ActivityKey

}
