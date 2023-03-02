import { NextApiRequest, NextApiResponse } from 'next'

import { HealthApiResponse } from '../../lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthApiResponse | string>
) {
  if (req.method !== 'GET') {
    res.status(405).send(`Invalid request method ${req.method}`)
    return
  }

  res.status(200).json({
    appBaseUri: process.env.NEXT_PUBLIC_APP_BASE_URI ?? '',
    buildDate: process.env.NEXT_PUBLIC_BUILD_DATE ?? '',
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? '',
    status: 'UP',
    uptime: `${process.uptime()} seconds`,
  })
}
