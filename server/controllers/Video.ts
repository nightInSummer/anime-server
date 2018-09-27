import { Context } from 'koa'
import { getManager } from "typeorm"
import { VideoInfo } from "../models/VideoInfo"

export async function getVideoInfo(ctx: Context): Promise<void> {
  const videoRepository = getManager().getRepository(VideoInfo)

  ctx.body = await videoRepository.find()
}

export async function setVideoInfo(ctx: Context): Promise<void> {
  const videoRepository = getManager().getRepository(VideoInfo)
  const newsData = videoRepository.create(ctx.request.body)

  await videoRepository.save(newsData)
  ctx.body = true
}

export async function updateVideoInfo(ctx: Context): Promise<void> {
  const videoRepository = getManager().getRepository(VideoInfo)
  const newsData = videoRepository.create(ctx.request.body)

  await videoRepository.save(newsData)
  ctx.body = true
}

export async function deleteVideo(ctx: Context): Promise<void> {
  const videoRepository = getManager().getRepository(VideoInfo)
  await videoRepository.delete(ctx.query.id)
  ctx.body = true
}
