import * as superagent from 'superagent'
import * as agentUse from 'superagent-use'
import * as prefix from 'superagent-prefix'

const agent = agentUse(superagent)

agent.use(prefix('/api'))

export default agent
