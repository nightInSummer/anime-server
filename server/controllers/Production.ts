import { Context } from 'koa'
import { getManager } from "typeorm"
import { ProductionInfo } from "../models/ProductionInfo"

export async function getProductionInfo(ctx: Context): Promise<void> {
  const productionRepository = getManager().getRepository(ProductionInfo)
  const filter = ctx.query.id ? { id: ctx.query.id } : {}
  ctx.body = await productionRepository.find(filter)
}

export async function setProductionInfo(ctx: Context): Promise<void> {
  const productionRepository = getManager().getRepository(ProductionInfo)
  const newsData = productionRepository.create(ctx.request.body)

  await productionRepository.save(newsData)
  ctx.body = true
}

export async function deleteProduction(ctx: Context): Promise<void> {
  const productionRepository = getManager().getRepository(ProductionInfo)

  await productionRepository.delete(ctx.query.id)
  ctx.body = true
}

export async function updateProductionInfo(ctx: Context): Promise<void> {
  const productionRepository = getManager().getRepository(ProductionInfo)
  const newData = productionRepository.create(ctx.request.body)
  await productionRepository.save(newData)
}
