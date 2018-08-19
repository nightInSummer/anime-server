import { Context } from 'koa'
import { getManager } from "typeorm"
import { SowingInfo } from "../models/SowingInfo"

export async function getSowingInfo(ctx: Context): Promise<void> {
  const sowingRepository = getManager().getRepository(SowingInfo)

  ctx.body = await sowingRepository.find()
}

export async function setSowingInfo(ctx: Context): Promise<void> {
  const sowingRepository = getManager().getRepository(SowingInfo)
  const newsData = sowingRepository.create(ctx.request.body)

  await sowingRepository.save(newsData)
  ctx.body = true
}

export async function deleteSowing(ctx: Context): Promise<void> {
  const sowingRepository = getManager().getRepository(SowingInfo)

  await sowingRepository.delete(ctx.query.id)
  ctx.body = true
}
