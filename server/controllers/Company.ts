import { Context } from 'koa'
import { getManager } from "typeorm"
import { CompanyInfo } from "../models/CompanyInfo"

export async function getCompanyInfo(ctx: Context): Promise<void> {
  const companyRepository = getManager().getRepository(CompanyInfo)

  ctx.body = await companyRepository.find()
}

export async function setCompanyInfo(ctx: Context): Promise<void> {
  const companyRepository = getManager().getRepository(CompanyInfo)
  const newsData = companyRepository.create(ctx.request.body)

  await companyRepository.save(newsData)
  ctx.body = true
}

export async function deleteCompany(ctx: Context): Promise<void> {
  const companyRepository = getManager().getRepository(CompanyInfo)

  await companyRepository.delete(ctx.query.id)
  ctx.body = true
}
