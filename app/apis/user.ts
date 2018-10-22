import agent from '../../common/agent'

export async function login(data: any) {
  const res = await agent.post('/login')
    .send(data)
  return res.body
}

