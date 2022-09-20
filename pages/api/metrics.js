import { register, collectDefaultMetrics } from 'prom-client'

/* istanbul ignore next */
collectDefaultMetrics({ prefix: 'omnidevfrontend_' })

/* istanbul ignore next */
export default function handler(req, res) {
  res.setHeader('Content-type', register.contentType)
  res.send(register.metrics())
}
