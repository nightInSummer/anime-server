import agent from '../../common/agent'

export async function getSowingInfo(data: any) {
  const res = await agent.get('/sowing')
    .query(data)
  return res.body
}

export async function saveSowingInfo(data: any) {
  const res = await agent.post('/sowing')
    .send(data)
  return res.body
}

export async function deleteSowingInfo(data: any) {
  const res = await agent.delete('/sowing')
    .query(data)
  return res.body
}
