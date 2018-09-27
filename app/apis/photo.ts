import agent from '../../common/agent'

export async function getPhotoInfo(data: any) {
  const res = await agent.get('/photo')
    .query(data)
  return res.body
}

export async function savePhotoInfo(data: any) {
  const res = await agent.post('/photo')
    .send(data)
  return res.body
}

export async function deletePhotoInfo(data: any) {
  const res = await agent.delete('/photo')
    .query(data)
  return res.body
}

