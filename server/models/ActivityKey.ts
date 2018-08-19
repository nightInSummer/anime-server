import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import {ActivityValue} from "./ActivityValue"

@Entity()
export class ActivityKey {

  @PrimaryGeneratedColumn()
  id: number

  // 一级标题
  @Column()
  title: string

  // 创建时间
  @Column('timestamp')
  createTime: Date

  // 建立一对多关系
  @OneToMany(type => ActivityValue, activityValue => activityValue.activityKey, {
    cascade: true
  })
  activityValues: ActivityValue[]

}
