import { Context } from 'koa'
import { getManager } from "typeorm"
import { RecruitInfo } from "../models/RecruitInfo"

export async function getRecruitInfo(ctx: Context): Promise<void> {
  const recruitRepository = getManager().getRepository(RecruitInfo)
  const filter = ctx.query.id ? { id: ctx.query.id } : {}
  ctx.body = await recruitRepository.find(filter)
}

export async function setRecruitInfo(ctx: Context): Promise<void> {
  const recruitRepository = getManager().getRepository(RecruitInfo)
  const recruitData = recruitRepository.create(ctx.request.body)

  await recruitRepository.save(recruitData)
  ctx.body = true
}

export async function publishRecruit(ctx: Context): Promise<void> {
  const recruitRepository = getManager().getRepository(RecruitInfo)
  const publishData = await recruitRepository.findOne({ status: 1 })
  if(publishData) {
    await recruitRepository.update(publishData.id, { status: 0 })
  }
  await recruitRepository.update(ctx.request.body.id, { status: 1 })
  ctx.body = true
}

export async function deleteRecruit(ctx: Context): Promise<void> {
  const recruitRepository = getManager().getRepository(RecruitInfo)

  await recruitRepository.delete(ctx.query.id)
  ctx.body = true
}

export async function updateRecruitInfo(ctx: Context): Promise<void> {
  const recruitRepository = getManager().getRepository(RecruitInfo)
  const newData = recruitRepository.create(ctx.request.body)
  await recruitRepository.save(newData)
}
