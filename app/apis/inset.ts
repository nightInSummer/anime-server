import agent from '../../common/agent'

export async function getInsetInfo(data: any) {
  const res = await agent.get('/inset')
    .query(data)
  return res.body
}

export async function saveInsetInfo(data: any) {
  const res = await agent.post('/inset')
    .send(data)
  return res.body
}

export async function deleteInsetInfo(data: any) {
  const res = await agent.delete('/inset')
    .query(data)
  return res.body
}

