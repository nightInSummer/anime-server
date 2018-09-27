import { Context } from 'koa'
import { getManager } from "typeorm"
import { PhotoInfo } from "../models/PhotoInfo"

export async function getPhotoInfo(ctx: Context): Promise<void> {
  const photoRepository = getManager().getRepository(PhotoInfo)

  ctx.body = await photoRepository.find()
}

export async function setPhotoInfo(ctx: Context): Promise<void> {
  const photoRepository = getManager().getRepository(PhotoInfo)
  const newsData = photoRepository.create(ctx.request.body)

  await photoRepository.save(newsData)
  ctx.body = true
}

export async function deletePhoto(ctx: Context): Promise<void> {
  const photoRepository = getManager().getRepository(PhotoInfo)

  await photoRepository.delete(ctx.query.id)
  ctx.body = true
}
