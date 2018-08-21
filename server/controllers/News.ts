import { Context } from 'koa'
import { getManager } from "typeorm"
import { NewsInfo } from "../models/NewsInfo"

export async function getNewsInfo(ctx: Context): Promise<void> {
  const newsRepository = getManager().getRepository(NewsInfo)
  const filter = ctx.query.id ? { id: ctx.query.id } : {}
  ctx.body = await newsRepository.find(filter)
}

export async function setNewsInfo(ctx: Context): Promise<void> {
  const newsRepository = getManager().getRepository(NewsInfo)
  const newsData = newsRepository.create(ctx.request.body)

  await newsRepository.save(newsData)
  ctx.body = true
}

export async function publishNews(ctx: Context): Promise<void> {
  const newsRepository = getManager().getRepository(NewsInfo)
  const publishData = await newsRepository.findOne({ status: 1 })
  console.log(publishData)
  if(publishData) {
    await newsRepository.update(publishData.id, { status: 0 })
  }
  await newsRepository.update(ctx.request.body.id, { status: 1 })
  ctx.body = true
}

export async function deleteNews(ctx: Context): Promise<void> {
  const newsRepository = getManager().getRepository(NewsInfo)

  await newsRepository.delete(ctx.query.id)
  ctx.body = true
}

export async function updateNewsInfo(ctx: Context): Promise<void> {
  const newsRepository = getManager().getRepository(NewsInfo)
  const newData = newsRepository.create(ctx.request.body)
  await newsRepository.save(newData)
}
