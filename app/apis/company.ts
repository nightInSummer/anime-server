import agent from '../../common/agent'

export async function getCompanyInfo(data: any) {
  const res = await agent.get('/company')
    .query(data)
  return res.body
}

export async function saveCompanyInfo(data: any) {
  const res = await agent.post('/company')
    .send(data)
  return res.body
}

export async function deleteCompanyInfo(data: any) {
  const res = await agent.delete('/company')
    .query(data)
  return res.body
}

export async function updateCompanyInfo(data: any) {
  const res = await agent.put('/company')
    .send(data)
  return res.body
}
