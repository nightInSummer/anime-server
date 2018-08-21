import { Context } from 'koa'
import { getManager } from "typeorm"
import { ActivityKey } from "../models/ActivityKey"
import { ActivityValue } from "../models/ActivityValue"

export async function getActivity(ctx: Context): Promise<void> {
  const activityKeyRepository = getManager().getRepository(ActivityKey)
  const result = await activityKeyRepository
    .createQueryBuilder('activityKey')
    .leftJoinAndSelect('activityKey.activityValues', 'activityValues')
    .getMany()

  ctx.body = result
}

export async function getActivityKey(ctx: Context): Promise<void> {
  const activityKeyRepository = getManager().getRepository(ActivityKey)
  ctx.body = await activityKeyRepository.find()
}

export async function setActivityKey(ctx: Context): Promise<void> {
  const activityKeyRepository = getManager().getRepository(ActivityKey)
  const activityKeyData = activityKeyRepository.create(ctx.request.body)

  await activityKeyRepository.save(activityKeyData)
  ctx.body = true
}

export async function setActivityValue(ctx: Context): Promise<void> {
  const activityKeyRepository = getManager().getRepository(ActivityKey)
  const ActivityValueRepository = getManager().getRepository(ActivityValue)
  const activityKey = await activityKeyRepository.findOne(ctx.request.body.id)
  const activityArr = await activityKeyRepository.find({
    join: {
      alias: "activityKey",
      leftJoinAndSelect: {
        activityValues: "activityKey.activityValues",
      }
    },
    where: { id: activityKey.id }
  })
  const newActivityValue = ActivityValueRepository.create(ctx.request.body)
  activityKey.activityValues = activityArr[0].activityValues.concat(newActivityValue)
  await activityKeyRepository.save(activityKey)
  ctx.body = true
}

export async function deleteActivityKey(ctx: Context): Promise<void>  {
  const activityValueRepository = getManager().getRepository(ActivityValue)
  const activityKeyRepository = getManager().getRepository(ActivityKey)
  await activityValueRepository.delete({ activityKey: ctx.query.id })
  await activityKeyRepository.delete(ctx.query.id)
  ctx.body = true
}

export async function deleteActivityValue(ctx: Context): Promise<void>  {
  const activityValueRepository = getManager().getRepository(ActivityValue)
  await activityValueRepository.delete(ctx.query.id)
  ctx.body = true
}

export async function getOldActivityKey(ctx: Context): Promise<void> {
  const activityKeyRepository = getManager().getRepository(ActivityKey)
  const result = await activityKeyRepository.find({ id: ctx.query.id })
  ctx.body = result
}

export async function getOldActivityValue(ctx: Context): Promise<void> {
  const activityValueRepository = getManager().getRepository(ActivityValue)
  const result = await activityValueRepository.find({ id: ctx.query.id })
  ctx.body = result
}

export async function updateOldActivityKey(ctx: Context): Promise<void> {
  const activityKeyRepository = getManager().getRepository(ActivityKey)
  const newData = activityKeyRepository.create(ctx.request.body)
  await activityKeyRepository.save(newData)
  ctx.body = true
}

export async function updateOldActivityValue(ctx: Context): Promise<void> {
  const activityValueRepository = getManager().getRepository(ActivityValue)
  const newData = activityValueRepository.create(ctx.request.body)
  await activityValueRepository.save(newData)
  ctx.body = true
}

