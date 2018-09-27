import { Context } from 'koa'
import { getManager } from "typeorm"
import { InsetInfo } from "../models/InsetInfo"

export async function getInsetInfo(ctx: Context): Promise<void> {
  const insetRepository = getManager().getRepository(InsetInfo)

  ctx.body = await insetRepository.find()
}

export async function setInsetInfo(ctx: Context): Promise<void> {
  const insetRepository = getManager().getRepository(InsetInfo)
  const newsData = insetRepository.create(ctx.request.body)

  await insetRepository.save(newsData)
  ctx.body = true
}

export async function deleteInset(ctx: Context): Promise<void> {
  const insetRepository = getManager().getRepository(InsetInfo)

  await insetRepository.delete(ctx.query.id)
  ctx.body = true
}
