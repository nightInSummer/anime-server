import agent from '../../common/agent'

export async function getRecruitInfo(data: any) {
  const res = await agent.get('/recruit')
    .query(data)
  return res.body
}

export async function saveRecruitInfo(data: any) {
  const res = await agent.post('/recruit')
    .send(data)
  return res.body
}

export async function publishRecruit(data: any) {
  const res = await agent.put('/recruit')
    .send(data)
  return res.body
}

export async function deleteRecruitInfo(data: any) {
  const res = await agent.delete('/recruit')
    .query(data)
  return res.body
}
