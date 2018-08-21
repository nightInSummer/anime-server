import agent from '../../common/agent'

export async function getNewsInfo(data: any) {
  const res = await agent.get('/news')
    .query(data)
  return res.body
}

export async function saveNewsInfo(data: any) {
  const res = await agent.post('/news')
    .send(data)
  return res.body
}

export async function publishNews(data: any) {
  const res = await agent.put('/news')
    .send(data)
  return res.body
}

export async function deleteNewsInfo(data: any) {
  const res = await agent.delete('/news')
    .query(data)
  return res.body
}

export async function updateNewsInfo(data: any) {
  const res = await agent.put('/updateNews')
    .send(data)
  return res.body
}
