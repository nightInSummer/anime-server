import * as superagent from 'superagent'
import * as agentUse from 'superagent-use'
import * as prefix from 'superagent-prefix'
import * as _ from '../common/utils'

const agent = agentUse(superagent)

agent.use(prefix('/api'))

agent.use((req: any) => {
  const ucCookie = _.getCookie('u_c')
  const token = ucCookie ? JSON.parse(ucCookie)['token'] : ''
  req.set('Authorization', `Bearer ${token}`)
  return req
})
agent.use(((req: any) => {
  const _then = req.then.bind(req)
  req.then = (resolveHandle) => {
    return new Promise((resolve) => {
      _then((res) => {
        resolve(resolveHandle(res))
      }).catch((err: any) => {
        if (err.status === 401) {
          window.location.href = '/login'
        }
      })
    })
  }
}))

export default agent
