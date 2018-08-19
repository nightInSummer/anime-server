import agent from '../../common/agent'

export async function getActivityInfo(data: any) {
  const res = await agent.get('/activity')
    .query(data)
  return res.body
}

export async function getActivityKey(data: any) {
  const res = await agent.get('/activityKey')
    .query(data)
  return res.body
}

export async function saveActivityKey(data: any) {
  const res = await agent.post('/activityKey')
    .send(data)
  return res.body
}

export async function saveActivityValue(data: any) {
  const res = await agent.post('/activityValue')
    .send(data)
  return res.body
}

export async function deleteCompanyKey(data: any) {
  const res = await agent.delete('/activityKey')
    .query(data)
  return res.body
}

export async function deleteCompanyValue(data: any) {
  const res = await agent.delete('/activityValue')
    .query(data)
  return res.body
}
