import agent from '../../common/agent'

export async function getVideoInfo(data: any) {
  const res = await agent.get('/video')
    .query(data)
  return res.body
}

export async function saveVideoInfo(data: any) {
  const res = await agent.post('/video')
    .send(data)
  return res.body
}

export async function deleteVideoInfo(data: any) {
  const res = await agent.delete('/video')
    .query(data)
  return res.body
}

export async function updateVideoInfo(data: any) {
  const res = await agent.put('/video')
    .send(data)
  return res.body
}
