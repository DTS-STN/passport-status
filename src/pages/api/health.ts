import { NextApiRequest, NextApiResponse } from 'next'

import { HealthApiResponse } from '../../lib/types'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('health')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthApiResponse | string>,
) {
  if (req.method !== 'GET') {
    logger.debug(`error 405: Invalid request method ${req.method}`)
    res.status(405).send(`Invalid request method ${req.method}`)
    return
  }

  res.status(200).json({
    adobeAnalyticsScriptSrc: process.env.ADOBE_ANALYTICS_SCRIPT_SRC ?? null,
    appBaseUri: process.env.APP_BASE_URI ?? null,
    buildDate: process.env.NEXT_PUBLIC_BUILD_DATE ?? null,
    environment: process.env.ENVIRONMENT ?? null,
    loggingLevel: process.env.LOGGING_LEVEL ?? null,
    status: 'UP',
    uptime: `${process.uptime()} seconds`,
  })
}
