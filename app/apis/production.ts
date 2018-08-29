import agent from '../../common/agent'

export async function getProductionInfo(data: any) {
  const res = await agent.get('/production')
    .query(data)
  return res.body
}

export async function saveProductionInfo(data: any) {
  const res = await agent.post('/production')
    .send(data)
  return res.body
}

export async function deleteProductionInfo(data: any) {
  const res = await agent.delete('/production')
    .query(data)
  return res.body
}

export async function updateProductionInfo(data: any) {
  const res = await agent.put('/production')
    .send(data)
  return res.body
}
